import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  UploadedFiles, UsePipes, UseInterceptors, Res
} from '@nestjs/common';
import { ShopItemService } from './shop-item.service';
import { AuthGuard } from '@nestjs/passport';
import { ShopItemResponse } from '@multivendor-fullstack/interfaces';
import { CreateShopItemDto, UpdateShopItemDto } from '@multivendor-fullstack/dto';
import * as  path from 'path';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerStorage, storageDir } from '@multivendor-fullstack/api/shared';
import { ShopItem } from '@multivendor-fullstack/entities';


export interface ShopItemsQuery {
  status: string;
  page: string;
}

@Controller('shop-item')
export class ShopItemController {
  constructor(private readonly shopItemService: ShopItemService) {
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileFieldsInterceptor([
        {
          name: 'photo', maxCount: 10
        }
      ], { storage: multerStorage(path.join(storageDir(), 'product-photos')) }
    )
  )
  create(
    @Body() createShopItemDto: CreateShopItemDto,
    @UploadedFiles() files,
    @Req() request) {
    return this.shopItemService.create(createShopItemDto, request.user, files);
  }

  @Get()
  findAll(
    @Query() query: ShopItemsQuery
  ): Promise<ShopItemResponse[]  | ShopItem[]> {
    return this.shopItemService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ShopItemResponse | ShopItem> {
    return this.shopItemService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShopItemDto: UpdateShopItemDto): Promise<ShopItemResponse | ShopItem> {
    return this.shopItemService.update(id, updateShopItemDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.shopItemService.remove(id);
  }

  @Get('/photo/:id')
  async getPhoto(
    @Param('id') id: string,
    @Res() res: any
  ): Promise<any> {
    return this.shopItemService.getPhoto(id, res)
  }
}
