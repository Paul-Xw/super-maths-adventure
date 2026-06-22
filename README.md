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


## v3.2.1 Student Clean Mode

ปรับแล้ว:
- นักเรียนไม่เห็นปุ่ม Run QA
- นักเรียนไม่เห็นปุ่ม QA Runner บน World Map
- Teacher ยังเห็น Run QA ได้เมื่อเลือก Role = Teacher
- QA Engine ยังอยู่ เพื่อให้ครู/ผู้ดูแลใช้ตรวจระบบก่อนเพิ่มบทเรียน

วิธีใช้งาน:
1. นักเรียนเลือก Role = Student → จะเห็นเฉพาะ Enter World Map / Dashboard
2. ครูเลือก Role = Teacher → จะเห็น Run QA และ Teacher Dashboard


## v3.2.2 Teacher QA Fix

แก้ไข:
- ไม่ให้แสดงข้อความ `${qaHomeButton()}`
- Role = Teacher จะแสดงปุ่ม Run QA
- Role = Student จะไม่แสดงปุ่ม Run QA
