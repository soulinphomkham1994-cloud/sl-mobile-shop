# ລະບົບບໍລິຫານຮ້ານສ້ອມ-ຂາຍໂທລະສັບມືຖື (Red & Black Mobile)

ລະບົບຕົ້ນແບບແບບ Interactive Prototype ສ້າງດ້ວຍ HTML/CSS/JavaScript ໄຟລ໌ດຽວ (single-page app)
ບໍ່ຕ້ອງມີ backend/server — ເປີດຜ່ານ browser ໄດ້ທັນທີ

## ຟັງຊັນຫຼັກ
1. ຈັດການການຂາຍ (POS)
2. ສະຕັອກອາໄຫລ່ & ອຸປະກອນ
3. ອັບເດດສະຖານະ & ຕິດຕາມງານ
4. ຮັບອໍເດີ & ຈັດຄິວງານ
5. ແຈ້ງເຕືອນລູກຄ້າ
6. ບັນຊີລາຍຮັບ-ລາຍຈ່າຍ-ກຳໄລ (ພິມເອກະສານໄດ້)

> **ໝາຍເຫດ:** ຂໍ້ມູນທັງໝົດເກັບຢູ່ໃນໜ່ວຍຄວາມຈຳຂອງ browser (in-memory) ເທົ່ານັ້ນ
> ເມື່ອ refresh ໜ້າເວັບ ຂໍ້ມູນຈະຣີເຊັດກັບຄືນເປັນຂໍ້ມູນຕົວຢ່າງ. ຖ້າຕ້ອງການເກັບຂໍ້ມູນຖາວອນ
> ຕ້ອງຕໍ່ເຊື່ອມກັບຖານຂໍ້ມູນ/backend ເພີ່ມເຕີມ.

## 🔔 ແຈ້ງເຕືອນລູກຄ້າຜ່ານ WhatsApp ຈິງ

ໄຟລ໌ `api/send-notify.js` ຄື backend ຕົວຢ່າງທີ່ເຊື່ອມກັບ WhatsApp Business API (Meta Cloud API)
ອ່ານຂັ້ນຕອນຕັ້ງຄ່າ+deploy ແບບລະອຽດໄດ້ທີ່ **[README-whatsapp-integration.md](./README-whatsapp-integration.md)**
(ຕ້ອງ deploy backend ນີ້ແຍກຕ່າງຫາກທີ່ Vercel ເພາະ GitHub Pages ຮອງຮັບສະເພາະໄຟລ໌ static)

## ☁️ ບັນທຶກຂໍ້ມູນຖາວອນ ຂ້າມອຸປະກອນ (Cloud Database)

ໂດຍຄ່າເລີ່ມຕົ້ນ ຂໍ້ມູນຈະຫາຍເມື່ອຣີເຟຣັດ (ເກັບໃນໜ່ວຍຄວາມຈຳຊົ່ວຄາວເທົ່ານັ້ນ)
ຖ້າຕ້ອງການໃຫ້ຂໍ້ມູນບັນທຶກຖາວອນ ແລະ ເບິ່ງເຫັນຄືກັນທຸກອຸປະກອນ (ຄອມ/ມືຖືຫລາຍເຄື່ອງ)
ອ່ານຂັ້ນຕອນຕັ້ງຄ່າໄດ້ທີ່ **[README-cloud-database.md](./README-cloud-database.md)**
(ໃຊ້ Firebase Firestore ຟຣີ ບໍ່ຕ້ອງມີ backend ເພີ່ມ)

---

## ວິທີ Deploy ຂຶ້ນ GitHub Pages (ຟຣີ, ບໍ່ຕ້ອງມີ server)

### ຂັ້ນຕອນທີ 1: ສ້າງ Repository ໃໝ່
1. ເຂົ້າ https://github.com/new
2. ຕັ້ງຊື່ repository ເຊັ່ນ `mobile-shop-system`
3. ເລືອກ **Public** → ກົດ **Create repository**

### ຂັ້ນຕອນທີ 2: ອັບໂຫລດໄຟລ໌
**ວິທີງ່າຍ (ຜ່ານໜ້າເວັບ ບໍ່ຕ້ອງໃຊ້ terminal):**
1. ໃນໜ້າ repository ທີ່ສ້າງ ກົດ **Add file → Upload files**
2. ລາກໄຟລ໌ `index.html`, `README.md`, `README-whatsapp-integration.md`, `README-cloud-database.md`,
   ໂຟນເດີ `api/` (ມີ `send-notify.js` ຢູ່ໃນ), `package.json`, ແລະ `.env.example`
   ຈາກໂຟນເດີນີ້ເຂົ້າໄປວາງ
3. ກົດ **Commit changes**

**ຫຼື ຜ່ານ Git command line:**
```bash
git init
git add index.html README.md
git commit -m "Initial commit: mobile shop management system"
git branch -M main
git remote add origin https://github.com/<ຊື່ບັນຊີຂອງທ່ານ>/mobile-shop-system.git
git push -u origin main
```

### ຂັ້ນຕອນທີ 3: ເປີດໃຊ້ GitHub Pages
1. ໄປທີ່ repository → **Settings → Pages**
2. ໃນຊ່ອງ **Source** ເລືອກ branch `main` ແລະ folder `/ (root)`
3. ກົດ **Save**
4. ລໍຖ້າປະມານ 1-2 ນາທີ ຈະໄດ້ລິ້ງເວັບໄຊທ໌ປະມານ:
   ```
   https://<ຊື່ບັນຊີຂອງທ່ານ>.github.io/mobile-shop-system/
   ```

ເປັນອັນສຳເລັດ — ລະບົບຈະໃຊ້ງານໄດ້ຜ່ານລິ້ງນີ້ທັນທີ ໂດຍບໍ່ຕ້ອງມີ server ຂອງຕົນເອງ

---

## ໝາຍເຫດເລື່ອງໄຟລ໌ດາວໂຫລດ
ໄຟລ໌ໄດ້ປ່ຽນຊື່ເປັນ `index.html` (ຕົວອັກສອນພາສາອັງກິດ) ເພື່ອປ້ອງກັນບັນຫາ browser
ບໍ່ຮອງຮັບຊື່ໄຟລ໌ພາສາລາວ/ໄທຕອນດາວໂຫລດ — ນີ້ຄືຊື່ໄຟລ໌ມາດຕະຖານທີ່ GitHub Pages ຕ້ອງການຢູ່ແລ້ວ.
