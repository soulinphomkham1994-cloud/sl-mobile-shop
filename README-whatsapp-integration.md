# ຄູ່ມືເຊື່ອມຕໍ່ແຈ້ງເຕືອນລູກຄ້າຜ່ານ WhatsApp Business API

ເອກະສານນີ້ອະທິບາຍວິທີເຮັດໃຫ້ລະບົບ (index.html) ສົ່ງຂໍ້ຄວາມແຈ້ງເຕືອນຫາລູກຄ້າຈິງ
ຜ່ານ WhatsApp ອັດຕະໂນມັດ ທຸກຄັ້ງທີ່ສະຖານະງານສ້ອມປ່ຽນ

## ພາບລວມສະຖາປັດຕະຍະກຳ

```
[index.html บน GitHub Pages]  --(1) status ປ່ຽນ-->  [api/send-notify.js บน Vercel]  --(2) ເອີ້ນ API-->  [Meta WhatsApp Cloud API]  --(3)--> [ລູກຄ້າ]
```

- **index.html** = ໜ້າເວັບຮ້ານ (static) → ຝາກໄວ້ທີ່ GitHub Pages ຄືເກົ່າ
- **api/send-notify.js** = backend ນ້ອຍໆ (serverless function) → ຕ້ອງ deploy ແຍກຕ່າງຫາກທີ່ **Vercel**
  (GitHub Pages ບໍ່ຮອງຮັບການຮັນໂຄ້ດ backend, ຮອງຮັບສະເພາະໄຟລ໌ static)
- **Meta WhatsApp Cloud API** = ບໍລິການທາງການຂອງ Meta (ເຈົ້າຂອງ WhatsApp) ໃຊ້ຟຣີໃນລະດັບໜຶ່ງ

---

## ຂັ້ນຕອນທີ 1: ສະໝັກ WhatsApp Business API ຈາກ Meta

1. ເຂົ້າ https://developers.facebook.com/ → ລົງທະບຽນເປັນ Meta Developer (ໃຊ້ບັນຊີ Facebook)
2. ກົດ **My Apps → Create App** → ເລືອກປະເພດ **Business**
3. ໃນໜ້າ App Dashboard ກົດເພີ່ມ product **WhatsApp**
4. ໃນໜ້າ WhatsApp → Getting Started ຈະໄດ້ຂໍ້ມູນ 2 ຢ່າງທີ່ຕ້ອງໃຊ້:
   - **Temporary access token** (ໃຊ້ທົດສອບໄດ້ 24 ຊົ່ວໂມງ, ຕໍ່ອາຍຸໄດ້ຫລືສ້າງ permanent token ພາຍຫລັງ)
   - **Phone number ID** (ID ຂອງເບີທົດສອບທີ່ Meta ໃຫ້ມາຟຣີ)
5. ໃນໜ້າດຽວກັນ ມີຊ່ອງ **To** ໃຫ້ເພີ່ມເບີໂທຂອງທ່ານເອງເປັນ "ຜູ້ຮັບທົດສອບ" (ຕ້ອງຢືນຢັນ OTP ຜ່ານ WhatsApp)
6. ລອງກົດ **Send Message** ໃນໜ້ານັ້ນເບິ່ງກ່ອນ ວ່າໄດ້ຮັບຂໍ້ຄວາມທົດສອບຢູ່ WhatsApp ຂອງທ່ານຫລືບໍ່

> **ສຳລັບໃຊ້ງານແທ້ (production):** ຕ້ອງເອົາເບີໂທຮ້ານແທ້ມາລົງທະບຽນເປັນ WhatsApp Business Number,
> ຢືນຢັນ Business Verification ກັບ Meta, ແລະ ສ້າງ **Message Template** ທີ່ຜ່ານການອະນຸມັດ
> (ຈຳເປັນ ຖ້າຮ້ານເປັນຝ່າຍທັກຫາລູກຄ້າກ່ອນ ໂດຍລູກຄ້າຍັງບໍ່ໄດ້ທັກມາໃນ 24 ຊົ່ວໂມງທີ່ຜ່ານມາ —
> ນີ້ຄືກົດລະບຽບຂອງ WhatsApp ເພື່ອປ້ອງກັນສະແປມ)

---

## ຂັ້ນຕອນທີ 2: Deploy Backend (api/send-notify.js) ຂຶ້ນ Vercel

1. ເຂົ້າ https://vercel.com → ສະໝັກບັນຊີ (ໃຊ້ GitHub login ໄດ້ເລີຍ)
2. ອັບໂຫລດໂຟນເດີນີ້ທັງໝົດ (ລວມທັງ `api/send-notify.js`, `package.json`) ຂຶ້ນ GitHub repository
   ດຽວກັນ ຫລື repository ໃໝ່ (ແນະນຳໃຫ້ຢູ່ repo ດຽວກັນກັບ index.html ກໍ່ໄດ້)
3. ໃນໜ້າ Vercel ກົດ **Add New → Project** → ເລືອກ repository ນັ້ນ → ກົດ **Deploy**
4. ຫລັງ deploy ສຳເລັດ ໄປທີ່ **Project → Settings → Environment Variables** ເພີ່ມ:
   - `META_WA_TOKEN` = access token ຈາກຂັ້ນຕອນທີ 1
   - `META_WA_PHONE_ID` = Phone number ID ຈາກຂັ້ນຕອນທີ 1
5. ກົດ **Redeploy** ໜຶ່ງຄັ້ງ ເພື່ອໃຫ້ Environment Variables ມີຜົນ
6. ຈະໄດ້ URL backend ປະມານ:
   ```
   https://ຊື່ໂປຣເຈັກຂອງທ່ານ.vercel.app/api/send-notify
   ```

---

## ຂັ້ນຕອນທີ 3: ເຊື່ອມ URL ເຂົ້າກັບ index.html

ເປີດໄຟລ໌ `index.html` ຄົ້ນຫາແຖວນີ້ (ຢູ່ໃກ້ຕົ້ນ `<script>`):

```js
const NOTIFY_BACKEND_URL = '';
```

ປ່ຽນເປັນ URL backend ທີ່ໄດ້ຈາກຂັ້ນຕອນທີ 2:

```js
const NOTIFY_BACKEND_URL = 'https://ຊື່ໂປຣເຈັກຂອງທ່ານ.vercel.app/api/send-notify';
```

ບັນທຶກ ແລ້ວ upload `index.html` ໃໝ່ຂຶ້ນ GitHub Pages ຄືເກົ່າ (Add file → Upload files → Commit)

---

## ຂັ້ນຕອນທີ 4: ໃຊ້ງານ

1. ໃນໜ້າ **ຮັບອໍເດີ & ຈັດຄິວງານ** ຕອນເປີດໃບງານໃໝ່ ໃຫ້ໃສ່ຊ່ອງ **"ເບີ WhatsApp ລູກຄ້າ"**
   ຮູບແບບ: ໃສ່ລະຫັດປະເທດ ຕິດກັບເບີໂທ ບໍ່ຕ້ອງມີ `+` ຫລືວັກ (ຕົວຢ່າງ: `85620xxxxxxxx`)
2. ທຸກຄັ້ງທີ່ປ່ຽນສະຖານະງານ (ໃນໜ້າ ອັບເດດສະຖານະ) ລະບົບຈະຍິງຂໍ້ຄວາມໄປຫາ backend ອັດຕະໂນມັດ
3. ຖ້າສົ່ງບໍ່ສຳເລັດ ລະບົບຈະບໍ່ຄ້າງ/ບໍ່ຟ້อง error ໃຫ້ລູກຄ້າເຫັນ (ຈະ log ໄວ້ໃນ console ຂອງ browser ເທົ່ານັ້ນ)
   — ສາມາດເປີດ Developer Console (F12) ເບິ່ງ log ຕອນທົດສອບໄດ້

---

## ຂໍ້ຈຳກັດ / ສິ່ງທີ່ຄວນຮູ້

- **Temporary token** ໝົດອາຍຸທຸກ 24 ຊົ່ວໂມງ ຕ້ອງໄປສ້າງໃໝ່ໃນ Meta Dashboard ຫລືສ້າງ
  **System User + Permanent Token** ສຳລັບໃຊ້ງານຈິງ (ຄົ້ນຫາ "Meta WhatsApp permanent access token" ໃນເອກະສານທາງການ)
- ຖ້າຮ້ານເປັນຝ່າຍທັກລູກຄ້າກ່ອນ (ນອກ 24 ຊົ່ວໂມງ) ຕ້ອງໃຊ້ **Message Template** ທີ່ Meta ອະນຸມັດ
  ບໍ່ແມ່ນ `type: "text"` ທຳມະດາ — ຕ້ອງໄປສ້າງ template ໃນ Meta Business Manager ກ່ອນ
- ຄ່າໃຊ້ຈ່າຍ: WhatsApp Cloud API ມີ conversation ຟຣີຈຳນວນໜຶ່ງຕໍ່ເດືອນ ຫລັງຈາກນັ້ນຄິດຄ່າ
  ຕໍ່ conversation (ລາຄາປ່ຽນແປງຕາມນະໂຍບາຍ Meta — ຄວນເຊັກລາຄາລ້າສຸດຢູ່ໜ້າ Meta ໂດຍກົງ)
- Vercel free tier ພຽງພໍສຳລັບຮ້ານຂະໜາດນ້ອຍ-ກາງ (ຈຳກັດຈຳນວນ request ຕໍ່ເດືອນ ແຕ່ໂດຍທົ່ວໄປພຽງພໍ)

---

## ຢາກລອງ WhatsApp ຜ່ານ Twilio ແທນ Meta ໂດຍກົງ?

Twilio ມີ WhatsApp API ທີ່ຕັ້ງຄ່າງ່າຍກວ່າ (ບໍ່ຕ້ອງຜ່ານຂັ້ນຕອນ Business Verification ຫລາຍຂັ້ນ)
ແຕ່ຄ່າໃຊ້ຈ່າຍຕໍ່ຂໍ້ຄວາມສູງກວ່າໜ້ອຍໜຶ່ງ — ຖ້າສົນໃຈແຈ້ງໄດ້ ຜົມສາມາດປັບ `api/send-notify.js`
ໃຫ້ໃຊ້ Twilio SDK ແທນໄດ້ ໂດຍໂຄງສ້າງ frontend ບໍ່ຕ້ອງແກ້ຫຍັງເພີ່ມ.
