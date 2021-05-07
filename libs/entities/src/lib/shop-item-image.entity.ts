import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ShopItem, User } from '@multivendor-fullstack/entities';

@Entity()
export class ShopItemImage extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: null,
    nullable: true
  })
  path: string;

  @ManyToOne(() => ShopItem, item => item.photos, { onDelete: 'CASCADE' })
  shopItem: ShopItem;
}
