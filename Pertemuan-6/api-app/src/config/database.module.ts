import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const caPath = path.join(__dirname, '../..', 'certs', 'ca.pem');
        const sslOptions = {
          ca: fs.readFileSync(caPath),
        };

        return {
          type: 'mysql',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          database: configService.get<string>('DB_NAME'),
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASS'),
          autoLoadEntities: true,
          synchronize: configService.get<boolean>('DB_SYNC', true),
          ssl: sslOptions,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
