import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BrandModule } from './brand/brand.module';

@Module({
  imports: [BrandModule],
  controllers: [AppController],
})
export class AppModule {}
