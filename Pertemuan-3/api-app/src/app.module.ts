import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database.module';
import { ConfigModule } from '@nestjs/config';
import { ItemModule } from './modules/item/item.module';

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot({ isGlobal: true }), ItemModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
