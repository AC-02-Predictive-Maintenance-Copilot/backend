# 🚀 **Predictive Maintenance API – Documentation (v1)**

API ini merupakan backend service untuk *Predictive Maintenance Copilot*, sebuah sistem untuk memonitor kondisi mesin, memprediksi potensi kerusakan, dan membantu teknisi dalam menangani masalah melalui pencatatan tiket dan status kondisi sensor mesin.

---

# ⚙️ **Tech Stack**

* **Node.js + Express** – Backend server
* **TypeScript** – Typed JavaScript
* **Prisma ORM** – Akses dan schema database PostgreSQL
* **Zod** – Validasi request
* **PostgreSQL** – Database utama

---

# 📦 **Setup & Installation**

### 1. Clone Repository

```bash
git clone https://github.com/AC-02-Predictive-Maintenance-Copilot/backend.git
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Buat file `.env` dan sesuaikan database & konfigurasi lainnya.

### 4. Prisma Init

```bash
npx prisma db push
```

### 5. Run Server

```bash
npm run dev
```

---

# 🌍 **Base URL**

```
http://localhost:PORT/api/v1
```

PORT diambil dari `process.env.PORT`.

---

# 📚 **Daftar Endpoint (Overview)**

## **📌 1. Health**

| Method | Endpoint         | Deskripsi         |
| ------ | ---------------- | ----------------- |
| GET    | `/api/v1/health` | Cek status server |

---

## **🔐 2. Auth**

| Method | Endpoint                | Deskripsi                          |
| ------ | ----------------------- | ---------------------------------- |
| POST   | `/api/v1/auth/register` | Registrasi user                    |
| POST   | `/api/v1/auth/login`    | Login & mendapatkan token          |
| GET    | `/api/v1/auth/me`       | Mendapatkan user yang sedang login |

---

## **🛠️ 3. Machines**

| Method | Endpoint               | Deskripsi       |
| ------ | ---------------------- | --------------- |
| GET    | `/api/v1/machines`     | Get list mesin  |
| POST   | `/api/v1/machines`     | Create mesin    |
| GET    | `/api/v1/machines/:id` | Get mesin by id |
| PUT    | `/api/v1/machines/:id` | Update mesin    |
| DELETE | `/api/v1/machines/:id` | Delete mesin    |

---

## **🌡️ 4. Machine Status**

| Method | Endpoint                               | Deskripsi                       |
| ------ | -------------------------------------- | ------------------------------- |
| GET    | `/api/v1/machines/statuses/all`                 | Get semua status seluruh mesin  |
| GET    | `/api/v1/machines/:machineId/statuses` | Get status milik mesin tertentu |
| POST   | `/api/v1/machines/statuses`                     | Create status                   |
| PUT    | `/api/v1/machines/statuses/:id`                 | Update status                   |
| DELETE | `/api/v1/machines/statuses/:id`                 | Delete status                   |

---

## **🎫 5. Tickets**

| Method | Endpoint                              | Deskripsi                      |
| ------ | ------------------------------------- | ------------------------------ |
| GET    | `/api/v1/machines/:machineId/tickets` | Get tiket untuk mesin tertentu |
| POST   | `/api/v1/tickets`                     | Create ticket                  |
| PUT    | `/api/v1/tickets/:id`                 | Update ticket                  |
| DELETE | `/api/v1/tickets/:id`                 | Delete ticket                  |

---

# 📘 **Endpoint Detail & Response Lengkap**

---

# 1) 🟢 **Health**

### **GET /api/v1/health**

#### Response (200)

```json
{
  "ok": true,
  "ts": "2025-11-15T10:00:00.000Z"
}
```

---

# 2) 🔐 **Authentication API**

## **2.1 Register User**

### POST `/api/v1/auth/register`

#### Body

```json
{
  "name": "Nama Pengguna",
  "username": "username",
  "email": "email@example.com",
  "password": "rahasia"
}
```

#### Response (201)

```json
{
  "message": "Registrasi berhasil",
  "data": {
    "id": "uuid",
    "name": "Nama Pengguna",
    "username": "username",
    "email": "email@example.com"
  }
}
```

---

## **2.2 Login User**

### POST `/api/v1/auth/login`

#### Body

```json
{
  "email": "email@example.com",
  "password": "rahasia"
}
```

#### Response (200)

```json
{
  "message": "Login berhasil",
  "data": {
    "token": "JWT_TOKEN",
    "user": {
      "id": "uuid",
      "name": "Nama Pengguna",
      "email": "email@example.com"
    }
  }
}
```

---

## **2.3 Get Authenticated User**

### GET `/api/v1/auth/me`

#### Headers

```
Authorization: Bearer <token>
```

#### Response (200)

```json
{
  "data": {
    "id": "uuid",
    "name": "Nama Pengguna",
    "email": "email@example.com"
  }
}
```

---

# 3) 🛠️ **Machines API**

## **3.1 Get All Machines**

### GET `/api/v1/machines`

#### Response

```json
{
  "data": {
    "machines": [
      {
        "id": "uuid",
        "productId": "001",
        "name": "Mesin 001"
      }
    ]
  }
}
```

---

## **3.2 Create Machine**

### POST `/api/v1/machines`

#### Body

```json
{
  "productId": "001",
  "name": "Mesin 001"
}
```

#### Response (201)

```json
{
  "message": "Berhasil menambahkan mesin baru",
  "data": {
    "machine": {
      "id": "uuid",
      "productId": "001",
      "name": "Mesin 001"
    }
  }
}
```

---

## **3.3 Get Machine By ID**

### GET `/api/v1/machines/:id`

#### Response

```json
{
  "data": {
    "machine": {
      "id": "uuid",
      "productId": "001",
      "name": "Mesin 001"
    }
  }
}
```

---

## **3.4 Update Machine**

### PUT `/api/v1/machines/:id`

#### Body

```json
{
  "productId": "001",
  "name": "Mesin 001 Updated"
}
```

#### Response

```json
{
  "message": "Data mesin berhasil diperbarui",
  "data": {
    "machine": {
      "id": "uuid",
      "productId": "001",
      "name": "Mesin 001 Updated"
    }
  }
}
```

---

## **3.5 Delete Machine**

### DELETE `/api/v1/machines/:id`

#### Response

```json
{
  "message": "Data mesin berhasil dihapus",
  "data": {
    "machine": {
      "id": "uuid",
      "productId": "001",
      "name": "Mesin 001"
    }
  }
}
```

---

# 4) 🌡️ **Machine Status API**

## **4.1 Get All Statuses**

### GET `/api/v1/machines/statuses/all`

#### Response

```json
{
  "data": {
    "statuses": []
  }
}
```

---

## **4.2 Get Status by Machine**

### GET `/api/v1/machines/:machineId/statuses`

#### Response

```json
{
  "data": {
    "statuses": [
      {
        "id": "uuid",
        "machineId": "uuid",
        "type": "warning",
        "airTemperature": 300.1,
        "processTemperature": 315,
        "rotationalSpeed": 1400,
        "torque": 39.2,
        "toolWear": 8,
        "target": 1,
        "failureType": null,
        "recordedAt": "2025-11-15T09:00:00.000Z"
      }
    ]
  }
}
```

---

## **4.3 Create Status**

### POST `/api/v1/machines/statuses`

#### Body

```json
{
  "machineId": "uuid",
  "type": "normal",
  "airTemperature": 298.5,
  "processTemperature": 310.2,
  "rotationalSpeed": 1500,
  "torque": 35.4,
  "toolWear": 12,
  "target": 1,
  "failureType": null
}
```

#### Response

```json
{
  "message": "Berhasil menambahkan status baru",
  "data": {
    "status": {
      "id": "uuid",
      "machineId": "uuid",
      "type": "normal",
      "airTemperature": 298.5,
      "processTemperature": 310.2,
      "rotationalSpeed": 1500,
      "torque": 35.4,
      "toolWear": 12,
      "target": 1,
      "failureType": null,
      "recordedAt": "2025-11-15T10:00:00.000Z"
    }
  }
}
```

---

## **4.4 Update Status**

### PUT `/api/v1/machines/statuses/:id`

---

## **4.5 Delete Status**

### DELETE `/api/v1/machines/statuses/:id`

---

# 5) 🎫 **Tickets API**

## **5.1 Get Tickets by Machine**

### GET `/api/v1/machines/:machineId/tickets`

#### Response

```json
{
  "data": {
    "tickets": []
  }
}
```

---

## **5.2 Create Ticket**

### POST `/api/v1/tickets`

#### Body

```json
{
  "machineId": "uuid",
  "priority": "HIGH",
  "status": "OPEN",
  "description": "Mesin mengalami suara berisik."
}
```

#### Response

```json
{
  "message": "Berhasil membuat ticket baru",
  "data": {
    "ticket": {
      "id": "uuid",
      "machineId": "uuid",
      "priority": "HIGH",
      "status": "OPEN",
      "description": "Mesin mengalami suara berisik."
    }
  }
}
```

---

## **5.3 Update Ticket**

### PUT `/api/v1/tickets/:id`

---

## **5.4 Delete Ticket**

### DELETE `/api/v1/tickets/:id`

---

# 🧩 **Schemas & Validation**

* Semua body request divalidasi dengan **Zod schema** menggunakan middleware `validateBody`.
* Schema berada di:

```
src/model/*/*.validator.ts
```

---

# ❗ Error Handling

Semua error ditangani oleh middleware:

```
/src/middleware/errorHandler.ts
/src/middleware/validate.ts
```

Format error standar:

```json
{
 "message": "Error message here",
 "errors": [],
 "status": "status"
}
```

---

# 📌 Notes

* Pastikan environment variable `PORT`, `DATABASE_URL`, dan `CORS_ORIGIN` sudah diset.
* Script:

  * `npm run dev` — jalankan server mode development
  * `npm run build` — compile ke JavaScript