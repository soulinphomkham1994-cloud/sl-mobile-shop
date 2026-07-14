// api/send-notify.js
// Serverless function (Vercel) — ຮັບ request ຈາກໜ້າເວັບ ແລ້ວສົ່ງຕໍ່ໄປຫາ WhatsApp Cloud API ຂອງ Meta
// ຕັ້ງຄ່າ Environment Variables ໃນ Vercel Dashboard ກ່ອນ deploy:
//   META_WA_TOKEN     = access token ຈາກ Meta for Developers (WhatsApp product)
//   META_WA_PHONE_ID  = Phone Number ID ຂອງເບີ WhatsApp Business ຂອງຮ້ານ

export default async function handler(req, res) {
  // ອະນຸຍາດໃຫ້ໜ້າເວັບ (ເຊັ່ນທີ່ຢູ່ໃນ GitHub Pages) ເອີ້ນ endpoint ນີ້ຂ້າມ origin ໄດ້
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed, use POST' });
  }

  const { phone, message } = req.body || {};
  if (!phone || !message) {
    return res.status(400).json({ error: 'ຕ້ອງການ phone ແລະ message' });
  }

  const WA_TOKEN = process.env.META_WA_TOKEN;
  const WA_PHONE_ID = process.env.META_WA_PHONE_ID;

  if (!WA_TOKEN || !WA_PHONE_ID) {
    return res.status(500).json({ error: 'ຍັງບໍ່ໄດ້ຕັ້ງຄ່າ META_WA_TOKEN / META_WA_PHONE_ID ໃນ server' });
  }

  try {
    const waRes = await fetch(`https://graph.facebook.com/v20.0/${WA_PHONE_ID}/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${WA_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: phone,
        // ໝາຍເຫດ: type "text" ໃຊ້ໄດ້ສະເພາະພາຍໃນ 24 ຊົ່ວໂມງ ຫລັງລູກຄ້າທັກຫາຮ້ານກ່ອນ
        // ຖ້າຈະສົ່ງແຈ້ງເຕືອນນອກຊ່ວງ 24 ຊົ່ວໂມງ (ເຊັ່ນຮ້ານເປັນຝ່າຍແຈ້ງກ່ອນ) ຕ້ອງໃຊ້ "template"
        // ທີ່ຜ່ານການອະນຸມັດຈາກ Meta ແທນ — ເບິ່ງລາຍລະອຽດໃນ README-whatsapp-integration.md
        type: 'text',
        text: { body: message },
      }),
    });

    const data = await waRes.json();

    if (!waRes.ok) {
      return res.status(waRes.status).json({ error: data });
    }
    return res.status(200).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
