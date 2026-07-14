# ຄູ່ມືຕັ້ງຄ່າ ບັນທຶກຂໍ້ມູນຖາວອນຜ່ານ Cloud (Firebase Firestore)

ຄູ່ມືນີ້ອະທິບາຍວິທີເຮັດໃຫ້ຂໍ້ມູນ (ສະຕັອກ, ການຂາຍ, ໃບງານສ້ອມ, ບັນຊີ ຯລຯ) ບັນທຶກຖາວອນ
ແລະ ເບິ່ງເຫັນຄືກັນທຸກອຸປະກອນ/ທຸກເຄື່ອງ (ຄອມ, ມືຖື, ຫລາຍຄົນໃຊ້ພ້ອມກັນໄດ້) ແບບ real-time

## ພາບລວມ

ລະບົບໃຊ້ **Firebase Firestore** (ບໍລິການ NoSQL database ຟຣີຈາກ Google) ໂດຍ
ໜ້າເວັບຈະເຊື່ອມຕໍ່ກັບ Firestore ໂດຍກົງ (ບໍ່ຕ້ອງຜ່ານ backend server ເໝືອນ WhatsApp)
ເພາະ Firebase ມີລະບົບ **security rules** ຄວບຄຸມການເຂົ້າເຖິງຢູ່ໃນຕົວແລ້ວ

---

## ຂັ້ນຕອນທີ 1: ສ້າງໂປຣເຈັກ Firebase

1. ເຂົ້າ https://console.firebase.google.com → ລົງທະບຽນ/ເຂົ້າສູ່ລະບົບດ້ວຍບັນຊີ Google
2. ກົດ **Add project** → ຕັ້ງຊື່ໂປຣເຈັກ ເຊັ່ນ `mobile-shop-system` → ດຳເນີນຕໍ່ຈົນສ້າງສຳເລັດ
   (ບໍ່ຈຳເປັນຕ້ອງເປີດ Google Analytics ກໍ່ໄດ້)

## ຂັ້ນຕອນທີ 2: ເປີດໃຊ້ Firestore Database

1. ໃນເມນູຊ້າຍ ກົດ **Build → Firestore Database**
2. ກົດ **Create database**
3. ເລືອກ **Start in production mode** (ແນະນຳ ປອດໄພກວ່າ) → ເລືອກ region ທີ່ໃກ້ (ເຊັ່ນ `asia-southeast1`)
4. ຫລັງສ້າງແລ້ວ ໄປທີ່ແທັບ **Rules** ແລ້ວປ່ຽນເປັນ:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /shopData/main {
         allow read, write: if true;
       }
     }
   }
   ```
   ກົດ **Publish**

   > ⚠️ **ຄວາມປອດໄພ:** rule ນີ້ອະນຸຍາດໃຫ້ໃຜກໍ່ໄດ້ທີ່ຮູ້ລິ້ງເວັບໄຊທ໌ (ຫລືອ່ານ source code)
   > ອ່ານ/ແກ້ໄຂຂໍ້ມູນຮ້ານໄດ້ ເໝາະສຳລັບໃຊ້ພາຍໃນຮ້ານ/ທົດລອງເທົ່ານັ້ນ.
   > ຖ້າຕ້ອງການປອດໄພກວ່ານີ້ (ເຊັ່ນ ຕ້ອງລ໊ອກອິນກ່ອນຈຶ່ງແກ້ໄຂໄດ້) ແຈ້ງໄດ້
   > ຜົມສາມາດເພີ່ມລະບົບ Firebase Authentication (ໃສ່ລະຫັດຜ່ານ) ໃຫ້ໄດ້.

## ຂັ້ນຕອນທີ 3: ດຶງ Firebase Config

1. ໄປທີ່ **Project settings** (ຮູບເຟືອງມຸມເທິງຊ້າຍ) → ແທັບ **General**
2. ເລື່ອນລົງມາຫາ **Your apps** → ກົດໄອຄອນ **</>** (Web app)
3. ຕັ້ງຊື່ app ເຊັ່ນ `shop-web` → ກົດ **Register app**
4. ຈະໄດ້ໂຄ້ດ `firebaseConfig` ປະມານນີ້:
   ```js
   const firebaseConfig = {
     apiKey: "AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
     authDomain: "mobile-shop-system.firebaseapp.com",
     projectId: "mobile-shop-system",
     storageBucket: "mobile-shop-system.appspot.com",
     messagingSenderId: "123456789012",
     appId: "1:123456789012:web:abcdef1234567890",
   };
   ```
5. Copy ຄ່າທັງໝົດນີ້ໄວ້

## ຂັ້ນຕອນທີ 4: ວາງ Config ເຂົ້າ index.html

1. ເປີດໄຟລ໌ `index.html` ຄົ້ນຫາ (Ctrl+F) ຄຳວ່າ `firebaseConfig`
2. ຈະເຫັນໂຄ້ດປະມານນີ້:
   ```js
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_PROJECT.appspot.com",
     messagingSenderId: "YOUR_SENDER_ID",
     appId: "YOUR_APP_ID",
   };
   ```
3. ແທນທີ່ຄ່າທັງໝົດດ້ວຍຄ່າຈິງທີ່ copy ມາຈາກຂັ້ນຕອນທີ 3
4. ບັນທຶກໄຟລ໌ ແລ້ວ upload `index.html` ໃໝ່ຂຶ້ນ GitHub (Add file → Upload files → Commit)

## ຂັ້ນຕອນທີ 5: ທົດສອບ

1. ເປີດເວັບໄຊທ໌ຮ້ານ → ເບິ່ງມຸມລຸ່ມຊ້າຍ (ໃຕ້ປຸ່ມມືດ/ແຈ້ງ) ຄວນຂຶ້ນຂໍ້ຄວາມ
   **"☁️ ເຊື່ອມຕໍ່ Cloud ແລ້ວ"** (ສີຂຽວ) ພາຍໃນສອງ-ສາມວິນາທີ
2. ລອງເພີ່ມ/ແກ້ໄຂຂໍ້ມູນຫຍັງກໍ່ໄດ້ (ເຊັ່ນ ຮັບອໍເດີໃໝ່) ແລ້ວເປີດເວັບໄຊທ໌ດຽວກັນຢູ່ອຸປະກອນອື່ນ
   (ຫລືອີກແທັບໜຶ່ງ) — ຄວນເຫັນຂໍ້ມູນດຽວກັນ ອັບເດດອັດຕະໂນມັດ

ຖ້າຂຶ້ນ **"⚠️ ເຊື່ອມຕໍ່ Cloud ບໍ່ສຳເລັດ"** ໃຫ້ເປີດ Developer Console (F12 → Console)
ເບິ່ງ error ແລ້ວກວດເບິ່ງວ່າ copy `firebaseConfig` ຖືກຕ້ອງ ແລະ Firestore rules ໄດ້ publish ແລ້ວ

---

## ຂໍ້ຈຳກັດ / ສິ່ງທີ່ຄວນຮູ້

- **ຟຣີ tier ຂອງ Firebase (Spark Plan)** ພຽງພໍສຳລັບຮ້ານຂະໜາດນ້ອຍ-ກາງ
  (ຈຳກັດ 50,000 reads / 20,000 writes ຕໍ່ວັນ — ຮ້ານທົ່ວໄປໃຊ້ບໍ່ຮອດ)
- ຂໍ້ມູນທັງໝົດເກັບໄວ້ໃນເອກະສານດຽວ (`shopData/main`) ເພື່ອຄວາມງ່າຍ — ຖ້າຮ້ານໃຫຍ່ຂຶ້ນຫລາຍ
  (ຂໍ້ມູນຫລາຍພັນລາຍການ) ອາດຕ້ອງແຍກເປັນຫລາຍ collection ໃນອະນາຄົດ
- ຖ້າສອງຄົນແກ້ໄຂຂໍ້ມູນພ້ອມກັນໃນເວລາດຽວກັນແທ້ໆ (ວິນາທີດຽວກັນ) ອາດມີການທັບຊ້ອນກັນໄດ້ແດ່
  ແຕ່ໂດຍທົ່ວໄປສຳລັບຮ້ານຄ້າຂະໜາດນ້ອຍ ບໍ່ແມ່ນບັນຫາໃຫຍ່
- ຖ້າຍັງບໍ່ໄດ້ຕັ້ງຄ່າ Firebase (ຄ່າຍັງເປັນ `YOUR_API_KEY`) ລະບົບຈະເຮັດວຽກແບບເກັບຂໍ້ມູນ
  ຊົ່ວຄາວໃນ browser ຄືເດີມ ບໍ່ມີຜົນກະທົບຫຍັງ — ສາມາດຕັ້ງຄ່າພາຍຫລັງໄດ້ທຸກເວລາ
