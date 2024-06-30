import { Module } from '@nestjs/common';
import { WebService } from './web.service';
import { WebController } from './web.controller';
import { DbServiceModule } from 'src/db-service/db-service.module';
import { WalletModule } from 'src/wallet/wallet.module';

@Module({
  imports: [DbServiceModule,WalletModule],
  providers: [WebService],
  controllers: [WebController]
})
export class WebModule {}
