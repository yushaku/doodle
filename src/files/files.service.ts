import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as ffmpeg from 'fluent-ffmpeg';
import * as fs from 'fs';

@Injectable()
export class FilesService {

  constructor(
    private configService: ConfigService
  ) { }

  async upload(file: Express.Multer.File) {
    const storePath = `${this.configService.get('FILE_PATH')}/${file.originalname}`;

    console.log(file)
    const readStream = fs.createReadStream(file.buffer)
    const writeStream = fs.createWriteStream(storePath)

    readStream.on('data', (chunk) => {
      console.log(chunk.toString())
    })

    const ffmpegCommand = ffmpeg(readStream).outputOptions('-c copy').output(writeStream);

    ffmpegCommand
      .on('finish', () => console.log("success"))
      .on('error', () => console.error('fail'))
      .run()
  }
}
