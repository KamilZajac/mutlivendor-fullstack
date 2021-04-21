import { BadRequestException, Injectable } from '@nestjs/common';
import { ShopItemResponse, ShopItemStatus } from '@multivendor-fullstack/interfaces';
import { CreateShopItemDto, UpdateShopItemDto } from '@multivendor-fullstack/dto';
import { ShopItem } from '@multivendor-fullstack/entities';
import { ShopItemsQuery } from './shop-item.controller';

@Injectable()
export class ShopItemService {
  async create(createShopItemDto: CreateShopItemDto, user): Promise<ShopItemResponse>  {
   	const newItem = new ShopItem();
   	newItem.price = createShopItemDto.price;
   	newItem.description = createShopItemDto.description;
   	newItem.name = createShopItemDto.name;
   	newItem.owner = user;

   	await newItem.save()

		return newItem;
  }

  async findAll(query: ShopItemsQuery): Promise<ShopItemResponse[]> {
    let filters = {};
    console.log(query)
    if(query.status && query.status in ShopItemStatus) {
      filters = {...filters, status: ShopItemStatus[status]}
    }

    return await ShopItem.find({
      where: {
        ...filters
      }
    })
  }

  async findOne(id: string): Promise<ShopItemResponse> {
    return await ShopItem.findOneOrFail(id)
  }

  async update(id: string, updateShopItemDto: UpdateShopItemDto): Promise<ShopItemResponse> {
		if(!updateShopItemDto.name && !updateShopItemDto.price && !updateShopItemDto.description){
			throw new BadRequestException('At least one value should be provided')
		}
		await ShopItem.update(id, { ...updateShopItemDto });

		return await ShopItem.findOne(id)
	}

  remove(id: number) {
    return `This action removes a #${id} shopItem`;
  }
}
