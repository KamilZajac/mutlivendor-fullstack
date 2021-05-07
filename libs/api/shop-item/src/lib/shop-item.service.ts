import { BadRequestException, Injectable } from '@nestjs/common';
import { ShopItemResponse, ShopItemStatus } from '@multivendor-fullstack/interfaces';
import { CreateShopItemDto, UpdateShopItemDto } from '@multivendor-fullstack/dto';
import { ShopItem } from '@multivendor-fullstack/entities';
import { ShopItemsQuery } from './shop-item.controller';
import { ShopItemImage } from '../../../../entities/src/lib/shop-item-image.entity';
import * as path from "path";
import { storageDir } from '@multivendor-fullstack/api/shared';
import * as fs from 'fs';

@Injectable()
export class ShopItemService {
  async create(createShopItemDto: CreateShopItemDto, user, files): Promise<ShopItemResponse> {

    try {
      const newItem = new ShopItem();
      newItem.price = createShopItemDto.price;
      newItem.description = createShopItemDto.description;
      newItem.name = createShopItemDto.name;
      newItem.owner = user;

      await newItem.save();

      if (files && files.photo) {
        files.photo.forEach(file => {
          console.log(file);
          const photo = new ShopItemImage();
          photo.path = file.filename;
          photo.shopItem = newItem;
          photo.save();
        });
      }

      return newItem;

    } catch (e) {
      try {
        if (files) {
          console.log('FOTOO');
          // fs.unlinkSync(path.join(storageDir(), 'product-photos', photo.filename));
        }
      } catch (e2) {
        console.log(e2);
      }
      throw e;
    }

  }

  async findAll(query: ShopItemsQuery): Promise<ShopItemResponse[]> {
    let filters = {};

    if (query.status && query.status in ShopItemStatus) {
      filters = { ...filters, status: ShopItemStatus[status] };
    }

    return await ShopItem.find({
      where: {
        ...filters
      },
      relations: [
        'photos'
      ]
    });
  }

  async findOne(id: string): Promise<ShopItemResponse> {
    return await ShopItem.findOneOrFail(id);
  }

  async update(id: string, updateShopItemDto: UpdateShopItemDto): Promise<ShopItemResponse> {
    if (!updateShopItemDto.name && !updateShopItemDto.price && !updateShopItemDto.description) {
      throw new BadRequestException('At least one value should be provided');
    }
    await ShopItem.update(id, { ...updateShopItemDto });

    return await ShopItem.findOne(id);
  }

  async remove(id: string) {
    const shopItem = await ShopItem.findOne(id, {
      relations:['photos']
    });


    shopItem.photos.forEach(photo => {
      fs.unlinkSync(path.join(storageDir(), 'product-photos', photo.path));
    })

    await shopItem.remove();

    return true;
  }

  public async getPhoto(id: string, res: any) {
    try {
      const one = await ShopItemImage.findOne(id);

      if (!one) {
        throw new Error('no item found');
      }
      if (!one.path) {
        throw new Error('no photo addded');
      }

      res.sendFile(
        one.path,
        {
          root: path.join(storageDir(), 'product-photos')
        }
      );
    } catch (e) {
      throw e;
    }
  }
}
