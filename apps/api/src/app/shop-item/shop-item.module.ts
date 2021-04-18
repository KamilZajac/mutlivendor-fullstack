import { Module } from '@nestjs/common';
import { ShopItemService } from './shop-item.service';
import { ShopItemController } from './shop-item.controller';

@Module({
  controllers: [ShopItemController],
  providers: [ShopItemService]
})
export class ShopItemModule {}
