import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateShopItemDto {
	@IsString()
	@IsOptional()
	public description?: string;
	@IsString()
	@IsOptional()
	public name?: string;
	@IsNumber()
	@IsOptional()
	public price?: number;
	@IsString()
  @IsOptional()
  public status?: string;
}
