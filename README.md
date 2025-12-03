# 🚀 **Predictive Maintenance API – Documentation (v1)**

API ini merupakan backend service untuk *Predictive Maintenance Copilot*, sebuah sistem untuk memonitor kondisi mesin, memprediksi potensi kerusakan, dan membantu teknisi dalam menangani masalah melalui pencatatan tiket dan status kondisi sensor mesin.

---

# 📦 **Postman Collection**

Untuk mempermudah testing seluruh endpoint API, gunakan Postman Collection berikut:

👉 **[Download Predictive Maintenance Copilot API V1.postman_collection.json](postman/collections/Predictive%20Maintenance%20Copilot%20API%20V1.postman_collection.json)**

Atau impor file yang berada di folder:

```
postman/collections/Predictive Maintenance Copilot API V1.postman_collection.json
```

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

| Method | Endpoint                           | Deskripsi       |
| ------ | ---------------------------------- | --------------- |
| GET    | `/api/v1/machines`                 | Get list mesin  |
| POST   | `/api/v1/machines`                 | Create mesin    |
| GET    | `/api/v1/machines/:id`             | Get mesin by id |
| PUT    | `/api/v1/machines/:id`             | Update mesin    |
| DELETE | `/api/v1/machines/:id`             | Delete mesin    |
| POST   | `/api/v1/machines/check/:statusId` | Check mesin     |

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

## **🤖 6. AI Chat WebSocket**

| Event Type         | Deskripsi                                        |
| ------------------ | ------------------------------------------------ |
| `history`          | Data riwayat chat user saat pertama kali connect |
| `message`          | Respons AI terhadap pesan user                   |
| `error`            | Error message dari server                        |

---

### **WebSocket Endpoint**

| Protocol | Endpoint   | Otorisasi | Deskripsi                       |
| -------- | ---------- | --------- | ------------------------------- |
| WS       | `/ws/chat` | JWT       | Chat dengan AI secara real-time |

---

### **Authentication (Mandatory)**

| Opsi              | Cara Kirim                    |
| ----------------- | ----------------------------- |
| Header            | `Authorization: Bearer <JWT>` |

> Tanpa JWT → koneksi akan ditutup otomatis

---

## **🎫 7. Chat**

| Method | Endpoint                       | Deskripsi                      |
| ------ | ------------------------------ | ------------------------------ |
| GET    | `/api/v1/chat`                 | Get 100 pesan terakhir         |
| POST   | `/api/v1/chat`                 | Create pesan                   |
| DELETE | `/api/v1/chat`                 | Delete semua pesan             |
| DELETE | `/api/v1/chat/:id`             | Delete pesan berdasarkan id    |

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

## **3.6 Check Machine**

### DELETE `/api/v1/machines/check/:statusId`

#### Body

```json
{
    "air_temp": 300,
    "process_temp": 330,
    "rpm": 1600,
    "torque": 55,
    "tool_wear": 45,
    "type": "L"
}
```

#### Response

```json
{
    "message": "Success",
    "data": {
        "analysis": {
            "id": "69305d045236ef1a12b8f03e",
            "statusId": "693057e8f632886662bbf2c6",
            "healthScore": 89,
            "riskProbability": 0.08,
            "status": "WARNING",
            "diagnosis": "Unknown Anomaly Pattern",
            "isAnomaly": true,
            "llmPrompt": "\n            PERAN: Anda adalah Asisten Ahli Maintenance Senior. Nada bicara: Waspada, Analitis.\n            \n            SITUASI: Sistem mendeteksi ANOMALI pada mesin ini.\n            - Skor Kesehatan: 89/100 (Perlu Perhatian)\n            - Deteksi Anomali: YA (Pola data tidak biasa/Outlier)\n            - Prediksi Risiko Kegagalan: Rendah (Belum tentu rusak, tapi aneh)\n            \n            \n        DATA SENSOR TERKINI:\n        - Suhu Udara: 300.0 K\n        - Suhu Proses: 330.0 K\n        - Kecepatan Putar (RPM): 1600\n        - Torsi: 55.0 Nm\n        - Keausan Alat: 45 min\n        \n            \n            TUGAS ANDA:\n            1. Beritahu teknisi bahwa mesin menunjukkan perilaku yang tidak biasa (anomali).\n            2. Tekankan bahwa belum ada risiko kegagalan spesifik yang terdeteksi, namun pola sensornya menyimpang dari normal.\n            3. Sarankan mereka untuk melakukan pengecekan manual atau memantau mesin lebih ketat dalam 24 jam ke depan.\n            ",
            "llmResponse": "Teknisi, perlu diwaspadai bahwa sistem kami mendeteksi adanya anomali pada mesin ini. Skor kesehatan mesin saat ini adalah 89/100, yang menunjukkan bahwa mesin memerlukan perhatian. Deteksi anomali juga menunjukkan pola data yang tidak biasa, yang berarti ada penyimpangan dari pola normal operasional mesin.\n\nNamun, perlu dicatat bahwa prediksi risiko kegagalan masih tergolong rendah, yang berarti belum ada indikasi spesifik bahwa mesin akan mengalami kegagalan. Tetapi, pola sensor yang tidak biasa ini perlu diinvestigasi lebih lanjut untuk memastikan keselamatan dan keandalan mesin.\n\nData sensor terkini menunjukkan bahwa suhu udara dan suhu proses berada dalam batas normal, tetapi kecepatan putar dan torsi sedikit lebih tinggi dari biasanya. Keausan alat juga mencapai 45 menit, yang perlu dipantau lebih ketat.\n\nOleh karena itu, saya sarankan agar Anda melakukan pengecekan manual pada mesin ini dalam 24 jam ke depan untuk memastikan bahwa tidak ada masalah yang lebih serius. Pemantauan yang lebih ketat juga diperlukan untuk memantau pola sensor dan memastikan bahwa mesin tetap beroperasi dalam batas normal. Dengan demikian, kita dapat meminimalkan risiko kegagalan dan memastikan keselamatan operasional mesin.",
            "createdAt": "2025-12-03T15:53:38.188Z"
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
    "tickets": [
      { 
        ...,
        machine: {}
      }
    ]
  }
}
```

---

## **5.2 Create Ticket**

### POST `/api/v1/tickets`

#### Body

```json
{
  "productId": "uuid",
  "priority": "HIGH",
  "status": "OPEN",
  "problem": "Mesin mengalami suara berisik.",
  "problemDetail": "Mesin mengalami suara berisik.",
  "isPublished": true,
}
```

#### Response

```json
{
  "message": "Berhasil membuat ticket baru",
  "data": {
    "ticket": {
      "id": "id",
      "machineId": "uuid",
      "priority": "HIGH",
      "status": "OPEN",
      "problem": "Mesin mengalami suara berisik.",
      "problemDetail": "Mesin mengalami suara berisik.",
      "isPublished": true
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

# 6) 🤖 **AI Chat WebSocket**

## **6.1 Connect to AI Chat**

### GET `ws://{{ BASE_URL }}/ws/chat`

#### Headers Required

| Header                          | Deskripsi                        |
| ------------------------------- | -------------------------------- |
| `Authorization: Bearer <token>` | Token JWT user untuk autentikasi |

#### Example (Postman / Client)

```
Authorization: Bearer eyJhbGciOi...
```

Jika token invalid → koneksi akan otomatis ditutup ❌

---

## **6.2 Initial Data Received on Connect**

Saat WebSocket berhasil terhubung:

* Server mengirim **riwayat chat user**
* Server mengirim **konteks mesin** milik user

#### Response: History Chat

```json
{
  "type": "history",
  "data": [
    {
      "id": "msg_123",
      "role": "USER",
      "content": "Hai AI!",
      "createdAt": "2025-12-01T10:05:00.000Z",
      "user": {}
    }
  ]
}
```

---

## **6.3 Send Message to AI**

### Payload Format

```json
"Pesan tekstual dari user"
```

> ⚠️ Bukan HTTP request, cukup kirim **message** via WebSocket

---

## **6.4 AI Response Message**

Saat AI menjawab:

```json
{
  "type": "message",
  "role": "ASSISTANT",
  "content": "Halo! Apakah ada mesin tertentu yang ingin Anda cek?"
}
```

Response akan:

* Disimpan ke database (Prisma)
* Dikirim kembali ke WebSocket client

---

## **6.5 Error Cases**

| Error                     | Kapan Terjadi                       |
| ------------------------- | ----------------------------------- |
| **Socket closed**         | Token tidak valid / tidak ada token |
| **No response**           | API key OpenAI tidak dikonfigurasi  |
| **Empty machine context** | User belum punya mesin terhubung    |

Contoh error dari server:

```json
{
  "error": "Unauthorized WebSocket"
}
```

---

# 7) 🎫 **Chat API**

## **7.1 Get Last 100 Messages**

### GET `/api/v1/chat`

#### Response

```json
{
  "data": {
    "messages": [
      { 
        ...,
        user: {}
      }
    ]
  }
}
```

---

## **7.2 Create Message**

### POST `/api/v1/chat`

#### Body

```json
{
  "content": "Halo AI",
}
```

#### Response

```json
{
  "message": "Berhasil membuat pesan baru",
  "data": {
    "message": {
      "id": "id",
      ...
    }
  }
}
```

---

## **7.3 Delete All Message**

### DELETE `/api/v1/chat`

---

## **7.4 Delete Message By ID**

### DELETE `/api/v1/chat/:id`

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
src/middleware/errorHandler.ts
src/middleware/validate.ts
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