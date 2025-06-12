import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const item = new Item(createItemDto);

    await this.itemRepository.save(item);
  }

  async findAll() {
    const items = await this.itemRepository.find();
    console.log(items);
    return items;
  }

  async findOne(id: number) {
    return await this.itemRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.itemRepository.findOne({ where: { id } });

    if (!item) {
      throw new UnprocessableEntityException('Item not found');
    }

    Object.assign(item, updateItemDto);

    await this.itemRepository.save(item);
  }

  async remove(id: number) {
    return await this.itemRepository.delete({ id });
  }
}
