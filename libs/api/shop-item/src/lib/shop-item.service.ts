import { BadRequestException, Injectable } from '@nestjs/common';
import { ShopItemResponse } from '@multivendor-fullstack/interfaces';
import { CreateShopItemDto, UpdateShopItemDto } from '@multivendor-fullstack/dto';
import { ShopItem } from '@multivendor-fullstack/entities';

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

  async findAll(): Promise<ShopItemResponse[]> {
    return await ShopItem.find()
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
