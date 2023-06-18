import {Args, Command} from '@oclif/core'
import * as fs from 'node:fs'
import {AppDataSource} from '../../modules/providers/datasource.provider'
import {TelegramChannelData} from '../../modules/interfaces/telegram-channel-data.interface'
import {PartNormalized, VideoNormalize} from '../../modules/interfaces/part-normalized.interface'
import {Module} from '../../modules/database/entities/module/module.entity'
import {Class} from '../../modules/database/entities/class/class.entity'
import {Section} from '../../modules/database/entities/section/section.entity'
import {Video} from '../../modules/database/entities/section/video.entity'
import {s3} from '../../modules/providers/s3.provider'
import * as path from 'path'

export default class Import extends Command {
  static description = 'Importa os dados do telegram'

  static examples = [`<%= config.bin %> <%= command.id %>`]

  static args = {
    file: Args.string({description: 'Telegram json file path', required: true}),
  }

  private readonly moduleRepository = AppDataSource.getRepository(Module);
  private readonly classRepository = AppDataSource.getRepository(Class);
  private readonly sectionRepository = AppDataSource.getRepository(Section);
  private readonly videoRepository = AppDataSource.getRepository(Video);
  private rootPath = '';

  async run(): Promise<void> {
    const {args} = await this.parse(Import)
    await AppDataSource.initialize();

    this.rootPath = args.file.replace(path.basename(args.file), '');

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
          path: video.file.indexOf('(') === 0 ? video.file : this.rootPath + video.file,
          duration: Number(video.duration_seconds),
          size: fs.existsSync(video.file) ? Math.floor(fs.statSync(video.file).size/1024/1024 * 100) / 100 : 0,
          mimeType: video.mime_type,
          thumbnailPath: video.thumbnail.indexOf('(') === 0 ? video.thumbnail : this.rootPath + video.thumbnail,
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

  private async saveVideos(aulas: PartNormalized[], index = 0) {
    if (!aulas[index]) return;
    this.log('Saving video', { index, id: aulas[index].video.id });
    await this.uploadVideo(aulas[index].video).then(() => { this.saveVideos(aulas, index + 1) });
  }

  private async uploadVideo(video: VideoNormalize) {
    await this.saveThumbs(video);
    if (await s3.exists(`course/${video.id}`)) {
      video.path = await s3.get(`course/${video.id}`)
      await this.videoRepository.save(video);
      return;
    }
    if (fs.existsSync(video.path)) {
      video.path = await s3.put(`course/${video.id}`, fs.readFileSync(video.path));
    }
    await this.videoRepository.save(video);
  }

  private async saveClassesParts(aulas: PartNormalized[]) {
    return this.sectionRepository.save(
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

  private async saveThumbs(video: VideoNormalize) {
    if (video.thumbnailPath === undefined) return;

    if (await s3.exists(`course/${video.id}.jpg`)) {
      video.thumbnailPath = await s3.get(`course/${video.id}.jpg`)
      await this.videoRepository.save(video);
      return;
    }

    if (fs.existsSync(video.thumbnailPath)) {
      video.thumbnailPath = await s3.put(`course/${video.id}.jpg`, fs.readFileSync(video.thumbnailPath));
    }
  }
}
