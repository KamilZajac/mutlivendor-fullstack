import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ShopItemService } from './shop-item.service';
import { AuthGuard } from '@nestjs/passport';
import { ShopItemResponse } from '@multivendor-fullstack/interfaces';
import { CreateShopItemDto, UpdateShopItemDto } from '@multivendor-fullstack/dto';

@Controller('shop-item')
export class ShopItemController {
  constructor(private readonly shopItemService: ShopItemService) {}

  @Post()
	@UseGuards(AuthGuard('jwt'))
  create(
  	@Body() createShopItemDto: CreateShopItemDto,
		@Req() request
		) {
    return this.shopItemService.create(createShopItemDto, request.user);
  }

  @Get()
  findAll(): Promise<ShopItemResponse[]>  {
    return this.shopItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ShopItemResponse> {
    return this.shopItemService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShopItemDto: UpdateShopItemDto): Promise<ShopItemResponse> {
    return this.shopItemService.update(id, updateShopItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shopItemService.remove(+id);
  }
}
