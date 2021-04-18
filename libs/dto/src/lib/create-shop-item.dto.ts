import { IsNumber, IsString } from 'class-validator';

export class CreateShopItemDto {
	@IsString()
	public description: string;
	@IsString()
	public name: string;
	@IsNumber()
	public price: number;
}
