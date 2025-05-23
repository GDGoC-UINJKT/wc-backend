import { Injectable } from '@nestjs/common';

type Book = {
  judul: string;
  penulis: string;
};

@Injectable()
export class AppService {
  private inMemoryData: Book[] = [];

  getHello(): string {
    return 'Hello World!';
  }

  create(createBookDto: Book): Book {
    const book: Book = {
      judul: createBookDto.judul,
      penulis: createBookDto.penulis,
    };
    this.inMemoryData.push(book);
    return book;
  }

  update(judul: string, updateBookDto: Book): void {
    this.inMemoryData = this.inMemoryData.map((book) =>
      book.judul === judul ? updateBookDto : book,
    );
  }

  findOne(judul: string): Book {
    const book = this.inMemoryData.find((book) => book.judul === judul);
    if (!book) {
      throw new Error(`Cannot find book by id: ${judul}`);
    }
    return book;
  }

  findAll(): Book[] {
    return this.inMemoryData;
  }

  deleteOne(judul: string): void {
    this.inMemoryData = this.inMemoryData.filter(
      (book) => book.judul !== judul,
    );
  }
}
