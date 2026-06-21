# Super Maths Adventure Online

โครงสร้างใหม่สำหรับอัปขึ้น Cloudflare Pages + Supabase

## วิธีใช้งาน

1. แตกไฟล์ ZIP
2. เปิดโฟลเดอร์ `super-maths-adventure`
3. อัปโหลดทั้งหมดขึ้น GitHub
4. Cloudflare Pages → Connect GitHub → Deploy

## Build Settings

Framework preset: None  
Build command: เว้นว่าง  
Output directory: /

## โครงสร้างไฟล์

```text
super-maths-adventure/
├─ index.html
├─ css/styles.css
├─ js/app.js
├─ js/config.js
├─ js/supabase-client.js
├─ js/utils.js
├─ js/game/questionBank.js
├─ js/game/audio.js
├─ js/game/effects.js
├─ data/collecting_data.json
└─ assets/
```

## Supabase

ตั้งค่าไว้แล้วใน `js/config.js`

- Project URL: `https://dofouumnszmdzkebybigs.supabase.co`
- Publishable Key: `sb_publishable_...`

ใช้ tables/views:

- games
- game_scenes
- scores
- leaderboard_scores
