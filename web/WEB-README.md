### Focus

เนื่องจากไฟล์มีขนาดใหญ่เกินไปครับ ผมจึงจำเป็นต้องลบ node modules ออกไปเพื่อให้สามารถอัปโหลดฟอร์มได้ แต่สามารถโหลดไฟล์โค้ดทั้งหมดได้ที่
https://drive.google.com/drive/folders/1yITnYT8SibYja0gsYxAgwKDXO3JRF_i_?usp=share_link

### WEB

วิธีการ run web search trips

```
cd web
npm start
```

### Example

Open [running on port 3000](http://localhost:3000) to view it in the browser.

#### requirements

สร้าง Web Application ที่ใช้ในการค้นหา trip จาก keyword ที่ user กรอกเข้ามา ตามตัวอย่าง Design ด้านล่าง โดยใช้ API จาก API Gateway ที่เราเขียนไว้ใน Task ที่ 1

![](./design.jpg)
![](./design-searching.jpg)

ในการแสดงผลข้อมูลที่ได้มา จะต้องเป็นตามที่กำหนดไว้ดังต่อไปนี้

- [ ] เมื่อกดชื่อทริป จะต้อง link ไปยัง url ที่ได้จาก trip data
- [ ] เมื่อกดอ่านต่อ จะต้อง link ไปยัง url ที่ได้จาก trip data
- [ ] จะต้องมีการแสดงผลรูปที่ได้รับมา เพื่อดึงดูดให้ user กดเข้าไปที่ตัวทริป
- [ ] หมวดหมู่ที่แสดง สามารถกดและกลายเป็น search keyword โดยเป็นชื่อ tag นั้น
- [ ] User สามารถ copy link และส่งต่อไปให้เพื่อน สำหรับ keyword เดียวกัน

#### non-requirements (add on)

- [ ] ระบบ Loading ในขณะที่ผู้ใช้ค้นหา
- [ ] ระบบ Pin หรือ ปักหมุด ที่ทริปที่ผู้ใช้สนใจ
- [ ] ระบบ Recommend เพื่อแนะนำทริปให้ผู้ใช้
- [ ] ระบบ Header Searching เพื่อให้ผู้ใช้สามารถค้นหาทริปได้ไม่ว่าจะอยู่ส่วนไหนของ Page
- [ ] และองค์ประกอบอื่นๆ เพื่อให้ตอบโจทย์ UX มากที่สุด
