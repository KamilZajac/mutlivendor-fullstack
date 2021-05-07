import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateShopItemDto {
	@IsString()
  @IsOptional()
	public description: string;
	@IsString()
  @IsOptional()
	public name: string;
	@IsNumber()
  @IsOptional()
	public price: number;
}
