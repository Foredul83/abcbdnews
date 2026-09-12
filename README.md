# ABCBD News - Advanced News Portal

একটি আধুনিক এবং উন্নত নিউজ পোর্টাল যা রিয়েল-টাইম আপডেট, ইউজার অ্যাকাউন্ট, এবং এআই-চালিত সুপারিশ প্রদান করে।

## ফিচার

- ✅ ইউজার অ্যাকাউন্ট সিস্টেম (রেজিস্ট্রেশন, লগইন, প্রোফাইল)
- ✅ নিউজ ক্যাটাগরি এবং ট্যাগিং
- ✅ সংরক্ষিত নিউজ ফিচার
- ✅ কমেন্ট এবং রেটিং সিস্টেম
- ✅ ডার্ক মোড সাপোর্ট
- ✅ মাল্টি-ল্যাঙ্গুয়েজ (বাংলা, ইংরেজি)
- ✅ রেসপন্সিভ ডিজাইন
- ✅ রিয়েল-টাইম নিউজ আপডেট (Socket.io)
- ✅ এডভান্সড সার্চ ফিচার
- ✅ এডমিন প্যানেল

## টেকনোলজি স্ট্যাক

### Frontend
- React 18.2.0
- React Router DOM
- Axios (HTTP Client)
- Socket.io Client
- React Icons
- CSS3 (Custom Styles)

### Backend
- Node.js
- Express.js
- MongoDB
- JWT (Authentication)
- Socket.io (Real-time)
- Bcryptjs (Password Hashing)
- Multer (File Upload)

## ইনস্টলেশন

### প্রি-রিকোয়ারমেন্টস
- Node.js v14 বা উপরে
- MongoDB
- npm বা yarn

### সেটআপ

1. রিপোজিটরি ক্লোন করুন:
```bash
git clone https://github.com/Foredul83/abcbdnews.git
cd abcbdnews
```

2. রুট ডিরেক্টরিতে ডিপেন্ডেন্সি ইনস্টল করুন:
```bash
npm install
```

3. ক্লায়েন্ট ডিরেক্টরিতে ডিপেন্ডেন্সি ইনস্টল করুন:
```bash
cd client
npm install
cd ..
```

4. `.env` ফাইল তৈরি করুন (`.env.example` থেকে কপি করুন):
```bash
cp .env.example .env
```

5. `.env` ফাইলে আপনার মূল্যবান তথ্য যোগ করুন:
```
MONGODB_URI=mongodb://localhost:27017/abcbdnews
JWT_SECRET=your_secret_key_here
PORT=5000
FRONTEND_URL=http://localhost:3000
```

6. ডেভেলপমেন্ট সার্ভার চালু করুন:
```bash
npm run dev
```

সার্ভার রান হবে `http://localhost:5000`-এ এবং ক্লায়েন্ট `http://localhost:3000`-এ।

## ফোল্ডার স্ট্রাকচার

```
abcbdnews/
├── server/
│   ├── models/          # Database models
│   │   ├── User.js
│   │   ├── News.js
│   │   └── Category.js
│   ├── routes/          # API routes
│   │   ├── auth.js
│   │   ├── news.js
│   │   ├── category.js
│   │   └── user.js
│   ├── middleware/      # Custom middleware
│   │   └── auth.js
│   └── index.js         # Server entry point
├── client/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   └── NewsCard.js
│   │   ├── pages/       # Page components
│   │   │   ├── Home.js
│   │   │   ├── NewsDetail.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Profile.js
│   │   │   └── Category.js
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## API এন্ডপয়েন্টস

### Authentication
- `POST /api/auth/register` - নতুন ইউজার রেজিস্টার করুন
- `POST /api/auth/login` - লগইন করুন
- `GET /api/auth/me` - বর্তমান ইউজার তথ্য পান

### News
- `GET /api/news` - সমস্ত নিউজ পান
- `GET /api/news/featured` - বৈশিষ্ট্যযুক্ত নিউজ পান
- `GET /api/news/:id` - নির্দিষ্ট নিউজ পান
- `POST /api/news` - নতুন নিউজ তৈরি করুন (এডমিন অনুমতি প্রয়োজন)
- `POST /api/news/:id/like` - নিউজ পছন্দ করুন
- `POST /api/news/:id/comment` - কমেন্ট করুন

### Category
- `GET /api/category` - সমস্ত ক্যাটাগরি পান
- `POST /api/category` - নতুন ক্যাটাগরি তৈরি করুন (এডমিন অনুমতি প্রয়োজন)

### User
- `GET /api/user/profile` - ইউজার প্রোফাইল পান
- `PUT /api/user/profile` - প্রোফাইল আপডেট করুন
- `POST /api/user/save-news/:newsId` - নিউজ সংরক্ষণ করুন

## অবদান

অবদান স্বাগত! দয়া করে:

1. এই রিপোজিটরি ফোর্ক করুন
2. একটি ফিচার ব্রাঞ্চ তৈরি করুন (`git checkout -b feature/amazing-feature`)
3. আপনার পরিবর্তনগুলি কমিট করুন (`git commit -m 'Add amazing feature'`)
4. ব্রাঞ্চে পুশ করুন (`git push origin feature/amazing-feature`)
5. একটি পুল রিকোয়েস্ট খুলুন

## লাইসেন্স

এই প্রজেক্টটি MIT লাইসেন্সের অধীন।

## সাপোর্ট

যেকোনো প্রশ্ন বা সমস্যার জন্য, দয়া করে একটি ইস্যু তৈরি করুন বা যোগাযোগ করুন।

---

**লেখক:** Foredul83
**তৈরি:** 2026
**আপডেট:** সেপ্টেম্বর ২০২৬
