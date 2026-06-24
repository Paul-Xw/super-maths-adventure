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


## v6.0.2 Cache Killer Hotfix

แก้:
- Browser / Service Worker ยังโหลด SMA v6 Performance ตัวเก่า
- เปลี่ยน cache name เป็น sma-v602-cache-1
- unregister service worker เก่าก่อน register ใหม่
- clear Cache Storage เก่า
- ใส่ query string app.js?v=6.0.2 และ styles.css?v=6.0.2
- เพิ่ม inline onclick fallback ให้ปุ่ม Start

หลัง Deploy:
1. เปิดเว็บ
2. กด Ctrl+Shift+R หรือ Ctrl+F5
3. ถ้ายังขึ้น v6 Performance ให้เปิด DevTools → Application → Service Workers → Unregister


## v6.0.3 Syntax Fix

แก้:
- JavaScript SyntaxError: Unexpected identifier 'renderStory'
- ลบ window.smaStartMission ที่ถูกแทรกผิดตำแหน่ง
- เขียน renderStory() ใหม่ให้ clean
- ตรวจ syntax ด้วย `node --check js/app.js`
- เปลี่ยน cache/version query เป็น v6.0.3


## v6.0.4 End Scene Guard Fix

แก้:
- Cannot read properties of undefined (reading 'answer') หลังเล่นจบฉาก
- เพิ่ม state.isAnswering กันกดซ้ำ
- เพิ่ม guard ถ้า state.qs[state.q] ไม่มี ให้ complete ทันที
- ทำ complete() เป็น idempotent ป้องกันเรียกซ้ำ
- เปลี่ยน cache/version query เป็น v6.0.4
- ตรวจ syntax ด้วย node --check


## v6.0.5 Topic Question Bank + End Fix
- Fix Q10/10 stuck after boss.
- Generated questions now match each world topic: algebra, decimals, angles, data, fractions, shapes, percentage, graphs, ratio, probability, transformations, measurement/area/volume.

## v6.0.6 Hard Reset + Topic Engine
- Force clear old cache/local cache once.
- Ignore integer-only questions on non-integer worlds.
- Boss Q10/10 complete guard.
- Use app.js?v=6.0.6.

## v6.0.7 Boss Final Auto Complete
- Fix stuck after Boss Q10/10 with Correct feedback.
- next() detects final question before increment and calls nextLoop/complete.
- Version query bumped to app.js?v=6.0.7.

## v6.0.8 Complete Screen Fix
- Fix stuck on Correct feedback after final Boss question.
- complete() now always renders final screen once.
- Added Play Again and World Scenes buttons.
- Uses state.finishing separate from state.completed.

## v6.0.9 Celebration Feedback
- ตอบถูกแล้วแสดง Celebration Overlay ประมาณ 1.4 วินาที
- ข้อสุดท้ายแสดงนานขึ้นก่อน Level Complete
- เพิ่ม glow/card animation ให้เด็กเห็นว่าตอบถูก
- เพิ่มข้อความ Correct! Great job! +10
