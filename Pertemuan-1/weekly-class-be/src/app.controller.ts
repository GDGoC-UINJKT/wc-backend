import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

type Book = {
  judul: string;
  penulis: string;
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('items/hello-world')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('buku')
  findAll(): Book[] {
    return this.appService.findAll();
  }

  @Get('buku/:judul')
  findOne(@Param('judul') judul: string): Book {
    return this.appService.findOne(judul);
  }

  @Post('buku')
  create(@Body() createBookDto: Book): Book {
    return this.appService.create(createBookDto);
  }

  @Put('buku/:judul')
  update(@Param('judul') judul: string, @Body() updateBookDto: Book): void {
    this.appService.update(judul, updateBookDto);
  }

  @Delete('buku/:judul')
  deleteOne(@Param('judul') judul: string): void {
    this.appService.deleteOne(judul);
  }
}
