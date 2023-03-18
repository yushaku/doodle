import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as ffmpeg from 'fluent-ffmpeg'
import * as fs from 'fs'

@Injectable()
export class UploadService {

  constructor(
    private configService: ConfigService
  ) { }

  async upload(file: Express.Multer.File) {
    const storePath = `${this.configService.get('FILE_PATH')}/${file.filename}`;

    const readStream = fs.createReadStream(file.path)
    const writeStream = fs.createWriteStream(storePath)

    const ffmpegCommand = ffmpeg(readStream).outputOptions('-c copy').output(writeStream);

    await new Promise((resolve, rejects) => {
      ffmpegCommand
        .on('finish', resolve)
        .on('error', rejects)
        .run()
    })
  }
}
