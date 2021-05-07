import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { User } from './user.entity';
import { ShopItemStatus } from '@multivendor-fullstack/interfaces';
import { ShopItemImage } from './shop-item-image.entity';
import { JoinColumn } from 'typeorm/browser';

@Entity()
export class ShopItem extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({
		length: 255
	})
	name: string;

	@Column()
	description: string;

	@Column()
	price: number;

	@Column({
		default: () => 'CURRENT_TIMESTAMP'
	})
	createdAt: Date;

	@Column({
		default: () => 'CURRENT_TIMESTAMP'
	})
	updatedAt: Date;

	@Column({
		default: null
	})
	validUntil: Date;

	@Column({
		default: 'pending',
	})
	status: string;

	@ManyToOne(() => User, user => user.shopItems)
	owner: User;

  @OneToMany(() => ShopItemImage, photo => photo.shopItem)
  photos: ShopItemImage[];
}
