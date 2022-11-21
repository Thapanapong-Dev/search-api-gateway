### Focus

เนื่องจากไฟล์มีขนาดใหญ่เกินไปครับ ผมจึงจำเป็นต้องลบ node modules ออกไปเพื่อให้สามารถอัปโหลดฟอร์มได้ แต่สามารถโหลดไฟล์โค้ดทั้งหมดได้ที่
https://drive.google.com/drive/folders/1yITnYT8SibYja0gsYxAgwKDXO3JRF_i_?usp=share_link

### API Gateway

วิธีการ run api gateway

```
cd api-gateway
npm start
```

### Example

http://localhost:5000/api/trips?keyword=ภูเขา

Open [running on port 5000](http://localhost:5000/api/trips?title=คู่มือเที่ยว) to view it in the browser.

### Sol. title and description

title และ description จะ filter จากคำค้นหาว่ามีอยู่ในเนื้อความหรือไม่ โดยจะเอาทั้งประโยคไปค้นหา หมายความว่า ถ้าในคำค้นหาบางคำตรงกับในเนื้อความ จะไม่ math กันเพราะระบบจะเอาทั้งประโยคไปค้นหา เช่น search keyword => "ท่องเที่ยว" จะไม่ตรงกับ title => "เที่ยวสิ้นปี บ้านอีต่องเหมืองปิล็อก ชมหมอก กินหมูกระทะ ล่าทางช้างเผือก"

### Sol. tags

ในกรณีของ tags จะต่างออกไป เช่น search keyword => "อยากไปเที่ยวญี่ปุ่น" จะตรงกับ tags => "ญี่ปุ่น" เหตุผลที่ทำเช่นนี้เพราะ tags เป็นข้อความสั้นๆ สามารถควบคุมได้ และเพื่อ user experience ที่ดียิ่งขึ้น (ค้นหาว่าอยากไปญี่ปุ่นแต่ไม่เจอทริปญี่ปุ่นก็แอบแปลกๆ)

#### Requirements

สร้าง Search API ที่สามารถนำ keyword ที่ได้จาก ฝั่ง client มาหา trip จาก JSON Server API

โดยค้นหาจาก title, description และ tag จาก JSON data

สิ่งที่ client จะได้รับคือ list ของ trip object ที่ตอบโจทย์ keyword ที่ user search เข้ามา

โดยจะต้องแน่ใจว่า API ที่ส่งออกไปนั้น จะสามารถทำงานได้อย่างถูกต้องด้วย

#### non-requirements (add on)

เพิ่ม API เส้น http://localhost:5000/api/all-trips เพื่อดึงข้อมูลทริปทั้งหมดและนำไปใช้ใน ฟีเจอร์ Recommend
