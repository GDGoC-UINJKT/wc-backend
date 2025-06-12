import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item {
  constructor(payload: Partial<Item>) {
    Object.assign(this, payload);
  }

  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'float' })
  price: number;
}
