
# Predictive Maintenance API

API ini merupakan backend service untuk... (jelaskan)

---
## Tech Stack

- **Node.js + Express** – Framework backend
- **TypeScript** – Supaya lebih aman dan terstruktur
- **Prisma ORM** – Manajemen database PostgreSQL
- **Zod** – Validasi input
- **PostgreSQL** – Database utama

---

## Setup dan Instalasi

### Clone Repository
```powershell
git clone https://github.com/AC-02-Predictive-Maintenance-Copilot/backend.git
```
```powershell
cd backend
```

### Install Dependencies
```powershell
npm install
```
### Konfigurasi Environment (.env)

Sesuaikan file .env isi dengan konfigurasi database kamu:

### Inisialisasi Prisma

Push schema ke database:

```powershell
npx prisma db push
```

### Jalankan Server
```powershell
npm run dev
```
---
Base URL
--

- Local (default): `http://localhost:PORT/api/v1`

PORT dibaca dari environment variable `PORT` (lihat `src/server.ts`).

Endpoints
--

Semua endpoint diawali dengan path base `/api/v1`.
---

1) Health

- GET /api/v1/health
	- Response: 200 OK
	- Body: `{ "ok": true, "ts": "2025-..." }`
---

2) Auth
--

Prefix: `/api/v1/auth`

- POST /register
	- Deskripsi: Registrasi user baru.
	- Validation: `registerSchema` (divalidasi oleh middleware Zod)
	- Request body (contoh JSON):
		```json
		{
			"name": "Nama Pengguna",
			"username": "username",
			"email": "email@example.com",
			"password": "rahasia"
		}
		```
	- Response (201 Created):
		```json
		{
			"message": "Registrasi berhasil",
			"data": { /* objek user tanpa password */ }
		}
		```

- POST /login
	- Deskripsi: Login dan mendapatkan token.
	- Rate-limited (loginRateLimiter)
	- Request body (contoh JSON):
		```json
		{ "email": "email@example.com", "password": "rahasia" }
		```
	- Response (200 OK):
		```json
		{
			"message": "Login berhasil",
			"data": {
				"token": "<jwt-token>",
				"user": { "id": "...", "name": "...", "email": "..." }
			}
		}
		```

- GET /me
	- Deskripsi: Mendapatkan data user saat ini.
	- Autentikasi: `requireAuth` middleware (harus mengirimkan header Authorization: `Bearer <token>`)
	- Response (200 OK): `{ "user": { ... } }`
---

3) Machine
--

Prefix: `/api/v1/machine`

- GET /
	- Deskripsi: Ambil semua data mesin
	- Response (200 OK): `[{ ... }, ...]`

- GET /:id
	- Deskripsi: Ambil mesin berdasarkan ID
	- Response (200 OK): `{ ... }` atau 404 jika tidak ditemukan

- POST /
	- Deskripsi: Tambah data mesin baru
	- Request body (contoh JSON)
		```json
		{
        "productId": "L47183",
        "type": "L",
        "airTemperature": 288.2,
        "processTemperature": 390.7,
        "rotationalSpeed": 1108,
        "torque": 30.3,
        "toolWear": 1,
        "target": 0,
        "failureType": "Power Failure"
        }
		```
	- Response (200 OK default helper):
		```json
		{ "message": "Berhasil menambahkan mesin baru" }
		```

- PUT /:id
	- Deskripsi: Update data mesin
	- Request body: sama struktur dengan POST (field yang tidak dikirim akan di-set ke `undefined` pada repository update call)
	- Response (200 OK): `{ "message": "Data mesin berhasil diupdate", "data": { ... } }` atau 404 kalau ID tidak ditemukan

- DELETE /:id
	- Deskripsi: Hapus data mesin
	- Response (200 OK): `{ "message": "Data mesin berhasil dihapus" }` atau 404 kalau ID tidak ditemukan
---

4. Status
--

Prefix: `/api/v1/machine/status`

- GET /
	- Deskripsi: Ambil semua data satus
	- Response (200 OK): `[{ ... }, ...]`

- GET /:machineId
	- Deskripsi: Ambil status berdasarkan machine ID
	- Response (200 OK): `{ ... }` atau 404 jika tidak ditemukan

- POST /
	- Deskripsi: Tambah data status baru
	- Request body (contoh JSON)
		```json
		{
		"machineId": "77c70d13-57e5-4839-9f89-bc3c7e63dc8a",
		"type": "L",
		"airTemperature": 288.2,
		"processTemperature": 390.7,
		"rotationalSpeed": 1108,
		"torque": 30.3,
		"toolWear": 1,
		"target": 0,
		"failureType": "Power Failure"
		}
		```
	- Response (200 OK default helper):
		```json
		{ "message": "Berhasil menambahkan Status baru" }
		```

- PUT /:id
	- Deskripsi: Update data Status
	- Request body: sama struktur dengan POST (field yang tidak dikirim akan di-set ke `undefined` pada repository update call)
	- Response (200 OK): `{ "message": "Data Status berhasil diupdate", "data": { ... } }` atau 404 kalau ID tidak ditemukan

- DELETE /:id
	- Deskripsi: Hapus data mesin
	- Response (200 OK): `{ "message": "Data Status berhasil dihapus" }` atau 404 kalau ID tidak ditemukan
--

Schemas & Validasi
--

- Validasi request untuk endpoint tertentu dilakukan oleh middleware `validateBody` yang menggunakan schema Zod (lihat file `src/model/*/*.validator.ts`).
- Auth endpoint juga dilindungi oleh rate limiter.

Error handling
--

- API menggunakan middleware `errorHandler` untuk membentuk response error konsisten.
- Contoh response error 404 / 400 / 500 (sering berisi fields: `message`, optional `details`).

Notes
--

- Pastikan environment variables berikut diset: `PORT`, `CORS_ORIGIN`, DB connection untuk Prisma (lihat `prisma/schema.prisma`).
- Scripts tersedia di `package.json`:
	- `npm run dev` — jalankan development server (ts-node-dev)
	- `npm run build` — compile TypeScript