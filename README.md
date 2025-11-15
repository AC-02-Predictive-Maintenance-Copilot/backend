# 🚀 **Predictive Maintenance API – Documentation (v1)**

API ini merupakan backend service untuk *Predictive Maintenance Copilot*, sebuah sistem untuk memonitor kondisi mesin, memprediksi potensi kerusakan, dan membantu teknisi dalam menangani masalah melalui pencatatan tiket dan status kondisi sensor mesin.

---

# 📦 **Postman Collection**

Untuk mempermudah testing seluruh endpoint API, gunakan Postman Collection berikut:

👉 **[Download Predictive Maintenance Copilot API V1.postman_collection.json](collections/Predictive%20Maintenance%20Copilot%20API%20V1.postman_collection.json)**

Atau impor file yang berada di folder:

```
collections/Predictive Maintenance Copilot API V1.postman_collection.json
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
        "mlDiagnosis": {
            "is_anomaly": true,
            "risk_probability": 0.01,
            "is_at_risk": false,
            "failure_cause": "No Failure"
        },
        "aiAnalysis": "## 1. Ringkasan Kondisi Mesin\n- Berdasarkan data diagnosis ML, kondisi mesin saat ini menunjukkan adanya anomali (`is_anomaly`: true), namun dengan probabilitas risiko yang sangat rendah (`risk_probability`: 0.01) dan tidak berada dalam kondisi bahaya (`is_at_risk`: false). Penyebab kegagalan yang terdeteksi adalah \"No Failure\", menunjukkan bahwa mesin tidak mengalami kegagalan yang signifikan.\n\n## 2. Alasan Teknis (Why)\nKondisi ini mungkin terjadi karena beberapa faktor, seperti:\n- Suhu: Fluktuasi suhu yang tidak signifikan mungkin tidak mempengaruhi kinerja mesin secara keseluruhan.\n- Rpm: Putaran mesin yang stabil dan dalam batas normal mungkin tidak menyebabkan kegagalan.\n- Torque: Torsi yang stabil dan sesuai dengan operasional mesin mungkin tidak menyebabkan kelelahan komponen.\n- Tool wear: Kondisi alat yang masih baik dan tidak aus mungkin tidak mempengaruhi kinerja mesin.\n- Failure mode: Tidak ada mode kegagalan yang teridentifikasi, menunjukkan bahwa mesin beroperasi dalam parameter yang diterima.\n\n## 3. Tingkat Risiko (0–100)\n- Klasifikasi: Low (<5%), karena probabilitas risiko yang sangat rendah (0.01) menunjukkan bahwa mesin berada dalam kondisi yang relatif aman.\n\n## 4. Potensi Penyebab\n- List penyebab yang paling mungkin:\n  1. Kesalahan pengukuran atau kalibrasi sensor.\n  2. Fluktuasi kecil dalam operasional mesin yang tidak signifikan.\n  3. Kondisi lingkungan yang tidak ekstrem.\n\n## 5. Rekomendasi Aksi (Actionable)\n- Berikan langkah teknis yang bisa dilakukan teknisi:\n  1. Verifikasi kalibrasi sensor untuk memastikan akurasi data.\n  2. Lakukan pemantauan terus-menerus untuk memastikan kondisi mesin tetap stabil.\n  3. Periksa kondisi lingkungan untuk memastikan tidak ada faktor eksternal yang mempengaruhi kinerja mesin.\n\n## 6. Prioritas\n- Prioritas: Monitoring, karena mesin berada dalam kondisi yang relatif aman dan hanya memerlukan pemantauan terus-menerus untuk memastikan tidak ada perubahan kondisi yang signifikan.\n\n## 7. Executive Summary\nKondisi mesin saat ini menunjukkan adanya anomali dengan probabilitas risiko yang sangat rendah. Tidak ada tanda-tanda kegagalan yang signifikan, dan mesin beroperasi dalam parameter yang diterima. Dengan demikian, prioritas adalah pemantauan terus-menerus untuk memastikan kinerja mesin tetap stabil dan aman. Tidak diperlukan tindakan darurat, dan rekomendasi adalah memverifikasi kalibrasi sensor dan melakukan pemantauan rutin.",
        "savedRecord": {
            "id": "7bb0a80c-efcd-4d65-b927-2400626634a5",
            "statusId": "d39e6082-fac0-4db2-adf9-f26566279273",
            "diagnosisJson": {
                "is_anomaly": true,
                "is_at_risk": false,
                "failure_cause": "No Failure",
                "risk_probability": 0.01
            },
            "agentMessage": "## 1. Ringkasan Kondisi Mesin\n- Berdasarkan data diagnosis ML, kondisi mesin saat ini menunjukkan adanya anomali (`is_anomaly`: true), namun dengan probabilitas risiko yang sangat rendah (`risk_probability`: 0.01) dan tidak berada dalam kondisi bahaya (`is_at_risk`: false). Penyebab kegagalan yang terdeteksi adalah \"No Failure\", menunjukkan bahwa mesin tidak mengalami kegagalan yang signifikan.\n\n## 2. Alasan Teknis (Why)\nKondisi ini mungkin terjadi karena beberapa faktor, seperti:\n- Suhu: Fluktuasi suhu yang tidak signifikan mungkin tidak mempengaruhi kinerja mesin secara keseluruhan.\n- Rpm: Putaran mesin yang stabil dan dalam batas normal mungkin tidak menyebabkan kegagalan.\n- Torque: Torsi yang stabil dan sesuai dengan operasional mesin mungkin tidak menyebabkan kelelahan komponen.\n- Tool wear: Kondisi alat yang masih baik dan tidak aus mungkin tidak mempengaruhi kinerja mesin.\n- Failure mode: Tidak ada mode kegagalan yang teridentifikasi, menunjukkan bahwa mesin beroperasi dalam parameter yang diterima.\n\n## 3. Tingkat Risiko (0–100)\n- Klasifikasi: Low (<5%), karena probabilitas risiko yang sangat rendah (0.01) menunjukkan bahwa mesin berada dalam kondisi yang relatif aman.\n\n## 4. Potensi Penyebab\n- List penyebab yang paling mungkin:\n  1. Kesalahan pengukuran atau kalibrasi sensor.\n  2. Fluktuasi kecil dalam operasional mesin yang tidak signifikan.\n  3. Kondisi lingkungan yang tidak ekstrem.\n\n## 5. Rekomendasi Aksi (Actionable)\n- Berikan langkah teknis yang bisa dilakukan teknisi:\n  1. Verifikasi kalibrasi sensor untuk memastikan akurasi data.\n  2. Lakukan pemantauan terus-menerus untuk memastikan kondisi mesin tetap stabil.\n  3. Periksa kondisi lingkungan untuk memastikan tidak ada faktor eksternal yang mempengaruhi kinerja mesin.\n\n## 6. Prioritas\n- Prioritas: Monitoring, karena mesin berada dalam kondisi yang relatif aman dan hanya memerlukan pemantauan terus-menerus untuk memastikan tidak ada perubahan kondisi yang signifikan.\n\n## 7. Executive Summary\nKondisi mesin saat ini menunjukkan adanya anomali dengan probabilitas risiko yang sangat rendah. Tidak ada tanda-tanda kegagalan yang signifikan, dan mesin beroperasi dalam parameter yang diterima. Dengan demikian, prioritas adalah pemantauan terus-menerus untuk memastikan kinerja mesin tetap stabil dan aman. Tidak diperlukan tindakan darurat, dan rekomendasi adalah memverifikasi kalibrasi sensor dan melakukan pemantauan rutin.",
            "createdAt": "2025-11-15T21:34:52.615Z"
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