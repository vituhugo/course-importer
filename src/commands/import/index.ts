import {Args, Command} from '@oclif/core'
import * as fs from 'node:fs'
import {AppDataSource} from '../../modules/providers/datasource.provider'
import {Module} from '../../modules/entities/module.entity'
import {Class} from '../../modules/entities/class.entity'
import {ClassPart} from '../../modules/entities/class-part.entity'
import {TelegramChannelData} from '../../modules/interfaces/telegram-channel-data.interface'
import {PartNormalized} from '../../modules/interfaces/part-normalized.interface'
import {Video} from '../../modules/entities/video.entity'

export default class Import extends Command {
  static description = 'Importa os dados do telegram'

  static examples = [`<%= config.bin %> <%= command.id %>`]

  static args = {
    file: Args.string({description: 'Telegram json file path', required: true}),
  }

  private readonly moduleRepository = AppDataSource.getRepository(Module);
  private readonly classRepository = AppDataSource.getRepository(Class);
  private readonly classPartRepository = AppDataSource.getRepository(ClassPart);
  private readonly videoRepository = AppDataSource.getRepository(Video);

  async run(): Promise<void> {
    const {args} = await this.parse(Import)
    await AppDataSource.initialize();

    const data = JSON.parse(fs.readFileSync(args.file.toString()).toString())

    const aulas = await this.normalizarDados(data)

    await this.saveModules(aulas)
    await this.saveClasses(aulas)
    await this.saveClassesParts(aulas)
    await this.saveVideos(aulas)
  }

  private async normalizarDados(data: TelegramChannelData): Promise<PartNormalized[]> {
    const item = data.messages
    .filter(({media_type}) => media_type === 'video_file')

    return item.map(video => {
      const matcher = video.text_entities.reduce((carry, item) => item.type === 'plain' || item.type === 'link' ? carry + item.text : carry, ''
      ).split('\n')
      .map(line => line.match(/^(\s|=)*(\d+)(\.\s)(.*$)/))
      .filter(t => t) as RegExpMatchArray[]

      return {
        id: Number(video.text_entities[0].text.slice(2)),
        modulo: matcher[1][4],
        moduloIndex: Number(matcher[1][2]),
        aula: matcher[2][4],
        aulaIndex: Number(matcher[2][2]),
        parte: matcher[0][4],
        parteIndex: Number(matcher[0][2]),
        video: {
          id: Number(video.text_entities[0].text.slice(2)),
          path: video.file,
          duration: Number(video.duration_seconds),
          size: fs.existsSync(video.file) ? Math.floor(fs.statSync(video.file).size/1024/1024 * 100) / 100 : 0,
          mimeType: video.mime_type,
          thumbnailPath: video.thumbnail,
        },
      }
    })
  }

  private async saveModules(aulas: PartNormalized[]) {
    await this.moduleRepository.save(
      aulas.map(({moduloIndex, modulo}) => ({id: moduloIndex, name: modulo}))
      .filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i),
    )
  }

  private classesIds: Record<string, number> = {};

  private async saveClasses(aulas: PartNormalized[]) {
    const classes = await this.classRepository.save(
      aulas.map(({moduloIndex, aula, aulaIndex}) => ({module: { id: moduloIndex }, index: aulaIndex, name: aula}))
      .filter((v, i, a) => a.findIndex(t => (t.module.id === v.module.id && t.index === v.index)) === i),
    )
    classes.forEach(({id, module, index}) => {
      this.classesIds[`${module.id}-${index}`] = id
    })
  }

  private async saveVideos(aulas: PartNormalized[]) {
    return this.videoRepository.save(aulas.map(({ video }) => video))
  }

  private async saveClassesParts(aulas: PartNormalized[]) {
    return this.classPartRepository.save(
      aulas.map(({
        id,
        parte,
        moduloIndex,
        aulaIndex,
        parteIndex
      }) => ({
        id,
        name: parte,
        class: { id: this.classesIds[`${moduloIndex}-${aulaIndex}`] },
        index: parteIndex
      })),
    );
  }
}
