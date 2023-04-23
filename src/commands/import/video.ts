import {Args, Command} from '@oclif/core'
import {AppDataSource} from '../../modules/providers/datasource.provider'
import * as fs from 'fs'
import {s3} from '../../modules/providers/s3.provider'
import {Video} from '../../modules/database/entities/section/video.entity'

// noinspection JSUnusedGlobalSymbols
export default class Import extends Command {
  static description = 'Importa os dados do telegram'

  static examples = [`<%= config.bin %> <%= command.id %>`]

  static args = {
    file: Args.string({description: 'Telegram json file path', required: true}),
    id: Args.string({description: 'id of video', required: false}),
  }

  private readonly videoRepository = AppDataSource.getRepository(Video);

  async run(): Promise<void> {
    const {args} = await this.parse(Import)
    await AppDataSource.initialize();

    if (!fs.existsSync(args.file.toString())) {
      throw new Error(`File ${args.file.toString()} not exists`);
    }

    const id = Number(args.id ?? args.file.toString().match(/(F?0*)([0-9]+)(\.....?)$/)?.[2])

    await this.videoRepository.update({ id }, {
      size: fs.statSync(args.file.toString()).size,
      path: await s3.put(id.toString(), fs.readFileSync(args.file.toString())),
    })
  }
}
