import { Module } from '@nestjs/common';
import { KontratController } from './kontrat.controller';
import { kontratService } from './kontrat.service';

@Module({
  controllers: [KontratController],
  providers: [kontratService],
  exports: [kontratService],
})
export class KontratModule {}
