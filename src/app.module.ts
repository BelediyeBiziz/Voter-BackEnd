import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbServiceModule } from './db-service/db-service.module';
import { MobileModule } from './mobile/mobile.module';
import { WebModule } from './web/web.module';
import { WalletModule } from './wallet/wallet.module';
import { KontratModule } from './kontrat/kontrat.module';

@Module({
  imports: [DbServiceModule, MobileModule, WebModule, WalletModule, KontratModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
