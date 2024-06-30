import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { DbServiceModule } from 'src/db-service/db-service.module';

@Module({
  providers: [WalletService],
  imports: [DbServiceModule],
  exports: [WalletService],
})
export class WalletModule {}
