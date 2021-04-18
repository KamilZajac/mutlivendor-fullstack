import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ShopItem } from '../../shop-item/entities/shop-item.entity';

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({
		length: 255
	})
	username: string;

	@Column({
		length: 255
	})
	password: string;

	@Column({
		length: 255,
		nullable: true,
		default: null
	})
	email: string;

	@Column({
		default: 'user'
	})
	role: string;

	@OneToMany(() => ShopItem, photo => photo.owner)
	shopItems: ShopItem[];
}
