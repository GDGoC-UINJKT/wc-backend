# Pendahuluan

Arsitektur backend yang baik sangat penting agar aplikasi dapat **skalabel**, **mudah dipelihara**, dan **efisien** dalam menangani permintaan. NestJS adalah framework Node.js progresif untuk membangun aplikasi server-side yang efisien dan skalabel. NestJS dibangun dengan TypeScript dan menggabungkan paradigma OOP, FP, dan FRP, sehingga memberikan abstraksi di atas framework HTTP (seperti Express/Fastify) namun tetap memungkinkan penggunaan API dasar mereka. NestJS menyediakan arsitektur bawaan (out-of-the-box) yang *loosely coupled*, mudah diuji, dan mudah dipelihara. Oleh karena itu, memahami fondasi arsitektur NestJS adalah langkah awal yang penting bagi pengembang backend pemula.

## Pondasi Arsitektur NestJS

### Modularitas

Modularitas adalah konsep kunci dalam NestJS. **Modul** adalah kelas yang dianotasi dengan dekorator `@Module()` dan mengorganisir struktur aplikasi secara efisien. Setiap aplikasi NestJS memiliki minimal satu modul root (biasanya `AppModule`) sebagai titik awal. Modul ini mengelola kumpulan *provider* (layanan), *controller*, dan modul lain agar aplikasi terstruktur dengan baik. Dengan memisahkan fitur ke modul-modul terpisah, pengembangan menjadi lebih terorganisir dan mudah di-maintain. Misalnya, jika kita memiliki fitur manajemen kucing, kita bisa membuat `CatsModule` yang menggabungkan `CatsController` dan `CatsService`. Dengan begitu, kode yang berkaitan dengan fitur “kucing” terkumpul dalam modul khusus, sesuai prinsip *Separation of Concerns* (SoC). Setiap modul NestJS bersifat singleton secara default, sehingga penyedia (*providers*) dapat dibagi antar modul saat diperlukan.

### Controller

**Controller** bertugas menangani permintaan (request) yang masuk dan mengembalikan respon ke klien. Dalam NestJS, controller adalah kelas yang menggunakan dekorator `@Controller()`. Dekorator ini menambahkan *metadata* sehingga NestJS dapat membuat peta routing permintaan ke metode-metode yang sesuai. Misalnya, menambahkan `@Controller('cats')` pada kelas akan membuat path prefiks `/cats` untuk semua rute di controller tersebut. Setiap metode dalam controller biasanya diberi dekorator HTTP seperti `@Get()`, `@Post()`, dll (dibahas selanjutnya). Dengan cara ini, controller bisa memiliki beberapa rute yang melakukan aksi berbeda, seperti mengambil data atau menyimpan data. **Catatan:** Controller sebaiknya hanya menangani logika routing dan delegasi; logika bisnis kompleks diserahkan ke provider (service) agar kode tetap terpisah dengan jelas.

### Provider (Service)

**Provider** di NestJS mencakup banyak jenis kelas, seperti *services*, *repositories*, *helpers*, dsb. Intinya, provider adalah kelas biasa yang dapat di-*inject* (disuntikkan) sebagai dependensi ke kelas lain. Contohnya, *service* biasanya didefinisikan sebagai provider yang berisi logika aplikasi dan mengelola data. Controllers akan mendelegasikan tugas-tugas kompleks kepada provider. Untuk membuat kelas service, kita menambahkan dekorator `@Injectable()` pada kelas tersebut. Dekorator `@Injectable()` menandakan bahwa kelas itu adalah provider yang dapat dikelola oleh container IoC NestJS. Misalnya:

```ts
@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
```

Kode di atas menunjukkan `CatsService` dengan dekorator `@Injectable()`, yang memungkinkan NestJS menangani kelas tersebut sebagai provider. Controller nantinya dapat menggunakan `CatsService` ini untuk menyimpan dan mengambil data kucing.

### Dependency Injection

NestJS dibangun di atas pola desain **Dependency Injection (DI)** yang kuat. Dengan DI, kita tidak perlu membuat instance manual provider di dalam controller. Sebaliknya, kita cukup mendeklarasikan dependensi di konstruktor controller, dan NestJS secara otomatis akan membuat atau menyediakan instance-nya. Contoh:

```ts
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}  // CatsService diinjeksi di sini

  @Get()
  findAll(): Cat[] {
    return this.catsService.findAll();
  }
}
```

Pada contoh di atas, `CatsService` di-inject melalui konstruktor controller. Kata kunci `private` di konstruktor sekaligus mendeklarasikan dan menginisialisasi anggota `catsService` dalam satu baris. NestJS memanfaatkan tipe data TypeScript untuk menentukan provider yang dibutuhkan: ketika aplikasi dimulai, Nest akan membuat instance `CatsService` (atau menggunakan yang sudah ada jika singleton) lalu menginjeksikannya ke `CatsController`. Dengan DI, kelas-kelas menjadi *loosely coupled* dan mudah diuji karena dependensi dapat di-*mock* atau diganti saat pengujian.

### Dekorator

NestJS memanfaatkan fitur **deklarator (decorator)** di TypeScript/ES untuk menambahkan *metadata* pada kelas atau metode. Secara umum, dekorator adalah ekspresi ES2016 yang mengembalikan fungsi dan diterapkan dengan awalan `@` pada kelas, metode, atau properti. Misalnya, `@Controller`, `@Injectable`, `@Module`, atau `@Get` adalah dekorator yang menambahkan informasi khusus untuk NestJS. Dekorator ini memungkinkan NestJS membangun pemetaan routing, manajemen dependensi, dan konfigurasi lainnya di balik layar. Sebagai contoh, `@Injectable()` memberitahu NestJS bahwa kelas tersebut adalah provider yang dapat diinjeksi. Demikian juga, `@Controller('cats')` memberi tahu NestJS bahwa kelas tersebut adalah controller dengan route prefiks `/cats`.

### Routing dan HTTP Method

Dalam NestJS, **routing** ditentukan oleh kombinasi dekorator pada controller dan metode HTTP. Dekorator `@Controller('path')` pada kelas controller menetapkan prefiks path untuk seluruh rutenya. Misalnya `@Controller('cats')` berarti semua rute di controller ini diawali dengan `/cats`. Selanjutnya, setiap metode di controller dapat diberi dekorator HTTP seperti `@Get()`, `@Post()`, `@Put()`, `@Delete()`, dan lain-lain. Misalnya:

```ts
@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'Mengembalikan semua data kucing';
  }
}
```

Dekorator `@Get()` sebelum metode `findAll()` memberi tahu NestJS untuk membuat handler endpoint HTTP GET. Jalur lengkap (route path) ditentukan dengan menggabungkan prefix dari `@Controller` dan path dari dekorator metode. Jika kita memiliki `@Controller('cats')` dan `@Get()` tanpa parameter, maka permintaan `GET /cats` akan diarahkan ke metode ini. NestJS menyediakan banyak dekorator HTTP, di antaranya adalah `@Get()`, `@Post()`, `@Put()`, `@Delete()`, `@Patch()`, `@Options()`, dan `@Head()`. Misalnya, `@Get('profile')` di dalam `@Controller('customers')` akan membuat route `GET /customers/profile`. Dengan kombinasi ini, kita dapat menetapkan berbagai endpoint RESTful dengan mudah.

> **Catatan:** Ketika sebuah handler controller mengembalikan objek JavaScript atau array, NestJS secara otomatis men-serialisasi hasilnya ke format JSON untuk dikirim ke klien. Sebagai contoh, jika metode controller kita mengembalikan array data, maka respon HTTP-nya adalah JSON array secara default.

### DTO (Data Transfer Object)

**Data Transfer Object (DTO)** adalah pola desain yang mendefinisikan bentuk data yang dikirim antara klien dan server. DTO biasanya berupa kelas atau interface TypeScript yang berisi properti yang diizinkan dalam permintaan/response. Dalam NestJS, DTO digunakan untuk menentukan tipe data input (misalnya pada permintaan POST atau PUT). Sebagai contoh, kita bisa membuat:

```ts
export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}
```

DTO ini mendefinisikan bahwa saat membuat kucing baru, kita memerlukan tiga properti: `name`, `age`, dan `breed`. NestJS tidak memaksa penggunaan DTO, namun ini membantu memetakan data dan mempermudah validasi di kemudian hari. Sebagai catatan, validasi belum kita terapkan di awal; kita hanya mendefinisikan struktur datanya saja. Definisi DTO memudahkan kolaborasi antara bagian frontend dan backend karena menjadi kontrak yang jelas tentang format data.

### Struktur Direktori dan Berkas Penting

Saat kita membuat proyek baru dengan Nest CLI, struktur direktori dasar di dalam folder `src/` akan terlihat seperti ini:

```
src/
├─ app.controller.ts      # Contoh controller dasar
├─ app.service.ts         # Contoh service dasar
├─ app.module.ts          # Modul root aplikasi
└─ main.ts                # File entri aplikasi (bootstrap)
```

* `app.controller.ts` adalah controller sederhana dengan satu rute sebagai contoh.
* `app.service.ts` adalah service sederhana dengan satu metode.
* `app.module.ts` adalah **modul root** aplikasi yang menggabungkan controller dan service.
* `main.ts` adalah file entri aplikasi yang menjalankan bootstrap NestJS.

Modularisasi menggunakan folder juga dianjurkan: tiap modul (misalnya `cats`) sering dibuat dalam folder terpisah yang berisi `*.module.ts`, `*.controller.ts`, dan `*.service.ts`. Pendekatan ini menjaga kode tetap rapi dan terstruktur.

### `main.ts` dan `AppModule`

File `main.ts` adalah titik awal eksekusi aplikasi NestJS. Di dalamnya terdapat fungsi `bootstrap()` yang bertugas mem-bootstrap (menjalankan) aplikasi. Contohnya:

```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

Kode di atas menggunakan `NestFactory.create(AppModule)` untuk membuat instance aplikasi NestJS dengan modul root `AppModule`. Setelah itu, aplikasi mulai mendengarkan permintaan pada port yang ditentukan (misalnya 3000). `NestFactory.create()` mengembalikan objek aplikasi (`INestApplication`) yang menyediakan metode seperti `listen()`.

`AppModule` sendiri (dalam `app.module.ts`) adalah modul utama yang mengimpor dan mendaftarkan modul-modul fitur lainnya. Di situlah kita mendaftarkan semua module, controller, dan provider yang digunakan secara global. Secara sederhana, `main.ts` menjalankan *bootstrap*, lalu `AppModule` memberitahu NestJS elemen-elemen aplikasi apa yang perlu di-load.

### Urutan Eksekusi (Lifecycle)

Secara garis besar, urutan eksekusi NestJS saat aplikasi berjalan adalah sebagai berikut:

1. **Bootstrap Aplikasi:** Panggilan `NestFactory.create(AppModule)` di `main.ts` memulai proses bootstrap.
2. **Inisialisasi Modul:** NestJS memuat `AppModule` dan semua modul yang di-*import* di dalamnya. Setiap modul dan provider diinisialisasi, dependensi diselesaikan melalui sistem DI.
3. **Lifecycle Hooks:** Setelah modul diinisialisasi, NestJS akan memanggil *lifecycle hook* yang sesuai. Misalnya, `onModuleInit()` dipanggil sekali setelah modul selesai menyiapkan dependensinya, dan `onApplicationBootstrap()` dipanggil setelah semua modul selesai diinisialisasi. (Jika kita mengimplementasikan antarmuka ini di kelas, kita dapat menjalankan kode khusus saat fase ini.)
4. **Menunggu Permintaan:** Setelah bootstrap selesai, NestJS mulai mendengarkan koneksi (HTTP listener). Setiap permintaan yang masuk akan melewati mekanisme yang ditetapkan (misalnya *middleware*, *guard*, *pipe*, dll) sebelum mencapai metode handler di controller.

> **Catatan:** Kehidupan aplikasi NestJS juga mencakup hook seperti `onModuleDestroy()` dan `onApplicationShutdown()` untuk membersihkan sumber daya saat aplikasi ditutup. Namun, untuk pemula, fokus utama adalah memahami bagaimana aplikasi di-*bootstrap* dan routing permintaan ke controller.

## Praktik CRUD In-Memory

Sebagai contoh penerapan, kita akan membuat operasi CRUD sederhana menggunakan penyimpanan *in-memory* (array). Misalkan kita mengelola entitas **Item** dengan properti `id`, `name`, dan `quantity`. Langkahnya:

1. **DTO (tanpa validasi):** Pertama, buat kelas DTO untuk operasi Create dan Update.

   ```ts
   export class CreateItemDto {
     name: string;
     quantity: number;
   }

   export class UpdateItemDto {
     name?: string;
     quantity?: number;
   }
   ```

2. **Service:** Buat service yang menyimpan data dalam array dan menyediakan metode CRUD.

   ```ts
   import { Injectable } from '@nestjs/common';

   export interface Item {
     id: number;
     name: string;
     quantity: number;
   }

   @Injectable()
   export class ItemsService {
     private items: Item[] = [];
     private nextId = 1;

     findAll(): Item[] {
       return this.items;
     }

     findOne(id: number): Item | undefined {
       return this.items.find(item => item.id === id);
     }

     create(dto: CreateItemDto): Item {
       const newItem: Item = {
         id: this.nextId++,
         name: dto.name,
         quantity: dto.quantity,
       };
       this.items.push(newItem);
       return newItem;
     }

     update(id: number, dto: UpdateItemDto): Item | undefined {
       const item = this.findOne(id);
       if (item) {
         item.name = dto.name ?? item.name;
         item.quantity = dto.quantity ?? item.quantity;
       }
       return item;
     }

     remove(id: number): boolean {
       const index = this.items.findIndex(item => item.id === id);
       if (index >= 0) {
         this.items.splice(index, 1);
         return true;
       }
       return false;
     }
   }
   ```

3. **Controller:** Buat controller dengan endpoint HTTP untuk operasi CRUD, delegasi ke service.

   ```ts
   import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';

   @Controller('items')
   export class ItemsController {
     constructor(private readonly itemsService: ItemsService) {}

     @Get()
     getAll(): Item[] {
       return this.itemsService.findAll();
     }

     @Get(':id')
     getOne(@Param('id') id: string): Item {
       return this.itemsService.findOne(+id);
     }

     @Post()
     create(@Body() createItemDto: CreateItemDto): Item {
       return this.itemsService.create(createItemDto);
     }

     @Put(':id')
     update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto): Item {
       return this.itemsService.update(+id, updateItemDto);
     }

     @Delete(':id')
     delete(@Param('id') id: string): { message: string } {
       const success = this.itemsService.remove(+id);
       return { message: success ? `Item ${id} berhasil dihapus` : `Item ${id} tidak ditemukan` };
     }
   }
   ```

Dengan setup di atas, kita memiliki endpoint CRUD untuk `items`. Contoh request dan response JSON:

* **GET /items** – Mengambil semua item.
  Contoh respon (HTTP 200):

  ```json
  [
    { "id": 1, "name": "Item A", "quantity": 3 },
    { "id": 2, "name": "Item B", "quantity": 5 }
  ]
  ```
* **GET /items/1** – Mengambil item dengan id 1.
  Contoh respon (HTTP 200):

  ```json
  { "id": 1, "name": "Item A", "quantity": 3 }
  ```
* **POST /items** – Menambahkan item baru.
  Contoh request:

  ```json
  { "name": "Item C", "quantity": 7 }
  ```

  Contoh respon (HTTP 201):

  ```json
  { "id": 3, "name": "Item C", "quantity": 7 }
  ```
* **PUT /items/1** – Memperbarui item dengan id 1.
  Contoh request:

  ```json
  { "name": "Item A (Baru)", "quantity": 4 }
  ```

  Contoh respon (HTTP 200):

  ```json
  { "id": 1, "name": "Item A (Baru)", "quantity": 4 }
  ```
* **DELETE /items/1** – Menghapus item dengan id 1.
  Contoh respon (HTTP 200):

  ```json
  { "message": "Item 1 berhasil dihapus" }
  ```

Pada setiap rute di atas, controller memanggil metode yang sesuai di `ItemsService`. Sederhana ini cocok untuk *prototipe* awal. Perlu diingat bahwa data yang disimpan di sini hanya ada selama aplikasi berjalan — saat aplikasi dihentikan atau restart, data akan hilang karena hanya disimpan di memori.

## Filosofi dan Best Practices dalam Pengembangan Backend

Dalam pengembangan perangkat lunak, beberapa prinsip penting membantu menjaga kualitas kode:

* **Separation of Concerns (SoC):** Memecah sistem kompleks menjadi bagian-bagian yang *independen*, masing-masing bertanggung jawab pada satu hal saja. Ini meningkatkan modularitas, keterbacaan, dan skalabilitas aplikasi. Dengan SoC, setiap modul/fitur fokus pada satu tanggung jawab, mengurangi kompleksitas.
* **DRY (Don't Repeat Yourself):** Prinsip menghindari pengulangan kode. Setiap logika sebaiknya hanya ditulis sekali dan digunakan kembali bila perlu. Kode yang berulang menyebabkan pemeliharaan sulit; sebaiknya ekstrak fungsi atau kelas agar kode tidak duplikasi.
* **Clean Code:** Kode yang bersih mudah dipahami, dipelihara, dan diperluas oleh pengembang lain. Menurut Robert C. Martin (Uncle Bob), menulis kode bersih adalah kewajiban setiap profesional. Dengan menulis kode yang jelas dan konsisten, tim dapat mengurangi kesalahan dan mempercepat pengembangan di masa depan.
* **SOLID (SRP & DIP):** SOLID adalah kumpulan prinsip desain kode berorientasi objek. Dua di antaranya yang penting:

  * *Single Responsibility Principle (SRP):* Setiap kelas atau modul sebaiknya hanya memiliki satu tanggung jawab. Dengan SRP, kelas lebih mudah diubah karena hanya satu alasan yang bisa memicu perubahan.
  * *Dependency Inversion Principle (DIP):* Modulus tingkat tinggi tidak boleh bergantung langsung pada modul tingkat rendah; keduanya harus bergantung pada abstraksi. DIP mendorong penggunaan antarmuka atau abstraksi sehingga komponen lebih fleksibel saat terjadi perubahan.

Menerapkan prinsip di atas membantu memastikan kode bersih, modular, dan mudah dirawat. Misalnya, dengan menjaga layanan masing-masing modul terpisah dan menggunakan DI, kita mendukung SoC dan DIP sekaligus.

**Mengapa kode modular penting?** Dengan memisahkan kode ke modul-modul yang terfokus, tim dapat bekerja secara paralel pada fitur berbeda tanpa konflik besar. Modularitas juga mempermudah pengujian unit karena setiap modul kecil bisa diuji terpisah. NestJS sendiri mendorong pendekatan ini melalui modul dan arsitekturnya.

Pada contoh CRUD di atas kita menggunakan *in-memory storage* sebagai prototipe. Penting diingat bahwa **in-memory hanya untuk pengembangan awal**. Di aplikasi nyata, data sebaiknya disimpan di database agar persisten dan dapat diakses oleh banyak instansi server. Pada pertemuan selanjutnya, kita akan mengenalkan penggunaan database (misalnya PostgreSQL, MongoDB, dll) untuk menggantikan penyimpanan in-memory ini.

## Kesimpulan

Pada pertemuan ini, kita telah mempelajari fondasi arsitektur NestJS, mulai dari modularitas hingga prinsip-prinsip pengembangan backend yang baik. NestJS memanfaatkan konsep modul, controller, dan provider dengan Dependency Injection untuk menciptakan aplikasi yang terstruktur dan mudah dipelihara. Kita juga melihat contoh implementasi CRUD sederhana dengan in-memory array, serta membahas mengapa prinsip-prinsip seperti SoC, DRY, Clean Code, dan SOLID sangat penting dalam pengembangan backend. Pada pertemuan selanjutnya, kita akan melanjutkan dengan pengenalan database untuk menggantikan penyimpanan sementara ini, sehingga aplikasi kita menjadi lebih realistis dan kuat.
