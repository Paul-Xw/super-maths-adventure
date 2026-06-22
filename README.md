# Super Maths Adventure v5 CMS

เพิ่ม:
- Teacher CMS
- Question Bank
- Add Question
- Save Local
- Save Online Supabase
- Import CSV
- Export JSON
- QA ก่อนใช้โจทย์
- Student ใช้โจทย์จาก Question Bank ก่อน ถ้าไม่มีจะ fallback เป็น generator

ติดตั้ง:
1. Supabase → SQL Editor → Run `sql/sma_v5_cms_patch.sql`
2. Upload files to GitHub
3. Cloudflare Deploy
4. เลือก Role = Teacher → Teacher CMS
5. เพิ่มโจทย์ → Run QA → Save Online
6. เลือก Role = Student → เล่นเกม

CSV Template:
`templates/question_import_template.csv`
