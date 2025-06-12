# 🧩 OpenAPI Template — GDGoC UIN Jakarta

Selamat datang di **OpenAPI Template** untuk komunitas **GDGoC UIN Jakarta**! 🎉
Template ini memudahkan kamu dalam mendefinisikan API secara **terstandarisasi, terbuka, dan mudah dibagikan** — tanpa harus bergantung pada tools berbayar seperti Postman. 💸❌

## 🚀 Fitur Utama

✨ **Deklaratif & Terbuka**
Tulis API kamu dalam format [OpenAPI 3.0](https://spec.openapis.org/oas/v3.0.3), cukup edit satu file:
📄 `public/openapi.yaml`

🌐 **Mudah Dipublikasikan**
Deploy ke [Vercel](https://vercel.com) dan bagikan dokumentasi API kamu dengan tim frontend atau kolaborator eksternal dengan **satu URL**. 🔗

👥 **Kolaboratif & Gratis**
Semua member GDGoC bisa pakai, tanpa batasan fitur seperti di platform komersial.

## 🛠️ Cara Menggunakan

1. **Clone repo ini**

   ```bash
   git clone https://github.com/GDGoC-UINJKT/openapi-template.git
   cd openapi-template
   ```

2. **Install dependencies**

   > Menggunakan [pnpm](https://pnpm.io) (direkomendasikan):

   ```bash
   pnpm install
   ```

   > Alternatif (pakai npm):

   ```bash
   npm install
   ```

3. **Jalankan server dokumentasi**

   > Dengan pnpm:

   ```bash
   pnpm dev
   ```

   > Dengan npm:

   ```bash
   npm run dev
   ```

📌 Setelah itu, buka [http://localhost:3000](http://localhost:3000) di browser untuk melihat dokumentasi API kamu secara live!

## ✏️ Cara Edit API

Semua definisi API ditulis di:

```bash
/public/openapi.yaml
```

📚 Template ini sudah siap dengan struktur dasar OpenAPI, jadi kamu cukup ubah bagian:

- `paths` (endpoint dan metode HTTP)
- `components` (schema, responses, parameters, dll)

> Tidak perlu utak-atik file lainnya. Simpel dan fokus. 🧘‍♂️

## 📦 Siap Deploy ke Vercel

Template ini **100% kompatibel dengan Vercel**, cukup:

1. Push repo ke GitHub kamu.
2. Hubungkan ke Vercel.
3. Done! 🎉

Kamu akan mendapatkan URL seperti:

```
https://your-openapi-template.vercel.app
```

## 🤝 Untuk Siapa?

- Member GDGoC UIN Jakarta 🏫
- Tim backend yang butuh API docs cepat
- Frontend dev yang butuh spec konsisten
- Kolaborasi eksternal tanpa akses Postman

## ❤️ Kontribusi

Pull request terbuka untuk semua member GDGoC!
Jika kamu punya ide, ingin menambahkan fitur, atau menemukan bug — silakan kontribusi. 🚀

📢 **Yuk gunakan OpenAPI Template ini untuk membuat dokumentasi API yang profesional, mudah dibagikan, dan terbuka untuk kolaborasi!**
Jika ada pertanyaan, langsung hubungi kami di komunitas GDGoC. 🎓💬
