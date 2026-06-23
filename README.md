# Super Maths Adventure v6 Performance + Architecture

เพิ่มจาก v5:
- Lazy Loading: โหลดเฉพาะ World ที่เลือก
- Cache Layer: ลด Supabase calls
- Offline-first: Service Worker + PWA
- Single-module app.js ลดปัญหา import/export
- Performance Debug Panel เฉพาะ Teacher
- Clear Cache button
- Question Bank ยังใช้ได้เหมือนเดิม
- Teacher CMS ยังเพิ่มโจทย์เองได้

ติดตั้ง:
1. Supabase → SQL Editor → Run `sql/sma_v6_performance_patch.sql`
2. Upload files ทั้งหมดขึ้น GitHub
3. Cloudflare Deploy
4. Hard refresh: Ctrl+F5
5. Teacher mode จะเห็น Performance Panel ด้านขวาบน


## v6.0.1 Start Button Hotfix

แก้:
- กด Start แล้วดูเหมือนค้าง
- เพิ่ม Loading Questions screen
- เพิ่ม timeout 2.5–3 วินาที สำหรับ Supabase question_bank
- ถ้า Supabase ช้า จะ fallback เป็น generated questions ทันที
- ป้องกัน async error ตอนเริ่มด่าน
