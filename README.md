# Super Maths Adventure v3.2 Open World RPG + QA Runner

เพิ่ม:
- Open World Map 16 Worlds ตามลำดับหนังสือ
- World Unlock System
- Scene/Level Map
- QA Runner ในหน้าเว็บ
- QA Engine ตรวจโครงสร้าง world/scene/questions
- รองรับ Supabase score, leaderboard, dashboard

## วิธีติดตั้ง

1. Supabase → SQL Editor → Run `sql/smao_v32_open_world.sql`
2. อัปโหลดไฟล์ทั้งหมดขึ้น GitHub แทนเวอร์ชันเดิม
3. Cloudflare Pages จะ Deploy ใหม่อัตโนมัติ

## วิธี Test

1. เปิดเว็บ
2. กด Run QA
3. ต้องเห็น Fail = 0
4. เข้า Open World Map
5. เข้า World 1 → Level 1 → เล่นจนจบ
6. ตรวจ scores / coins_wallet ใน Supabase

Class Code ทดสอบ: YEAR8A
