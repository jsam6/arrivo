# Gateway

## Prerequisites

- MySQL (Port: 3306)
- Node JS > 14

### Project setup configuration can be found at:

```
./env.example
```

## Setup/Running

- Copy `.env.example` to `.env`
```
cp .env.example .env
```
- Fill in the variables
```
DATABASE_URL="mysql://<username>:<password>@<host>:3306/arrivo"
JWT_SECRET_KEY="" // Any random string
STRIPE_SECRET_KEY="" // Get from Stripe
```

- Run the application
```
npm install
npm run dev
```

*** To run app for production ***
```
npm install
npm run build
npm run start
```

## Seeders and migration
```
npx prisma migrate dev --name init
npx prisma db seed
```

# Postman
```
./arrivo.postman_collection.json
```

# File Structure

📦 arrivo-backend
 ┣ 📂 node_modules
 ┣ 📂 prisma
 ┃ ┣ 📂 seeders
 ┃ ┣ ┗ 📜 user.seeder.ts
 ┃ ┗ 📜 schema.prisma
 ┣ 📂 src
 ┃ ┣ 📂 controllers
 ┃ ┣ ┣ 📂 admin
 ┃ ┣ ┃ ┣ 📜 auth.controller.ts
 ┃ ┣ ┃ ┣ 📜 category.controller.ts
 ┃ ┣ ┃ ┣ 📜 post.controller.ts
 ┃ ┣ ┃ ┗ 📜 user.controller.ts
 ┃ ┣ ┗ 📂 client
 ┃ ┣ ┃ ┣ 📜 auth.controller.ts
 ┃ ┣ ┃ ┣ 📜 category.controller.ts
 ┃ ┣ ┃ ┣ 📜 payment.controller.ts
 ┃ ┣ ┃ ┗ 📜 post.controller.ts
 ┃ ┣ 📂 middlewares
 ┃ ┃ ┣ 📜 VerifyMembership.ts
 ┃ ┃ ┣ 📜 VerifyPremium.ts
 ┃ ┃ ┣ 📜 VerifyToken.ts
 ┃ ┃ ┗ 📜 VerifyTokenAdmin.ts
 ┃ ┣ 📂 routes
 ┃ ┣ ┣ 📂 admin
 ┃ ┣ ┃ ┣ 📜 auth-admin.route.ts
 ┃ ┣ ┃ ┣ 📜 category-admin.route.ts
 ┃ ┣ ┃ ┣ 📜 post-admin.route.ts
 ┃ ┣ ┃ ┗ 📜 user-admin.route.ts
 ┃ ┣ ┗ 📂 client
 ┃ ┣ ┃ ┣ 📜 auth.route.ts
 ┃ ┣ ┃ ┣ 📜 category.route.ts
 ┃ ┣ ┃ ┣ 📜 payment.route.ts
 ┃ ┣ ┃ ┗ 📜 post.route.ts
 ┃ ┗ 📜 index.ts
 ┣ 📜 .env.example
 ┣ 📜 package-lock.json
 ┣ 📜 package.json
 ┣ 📜 tsconfig.json
 ┣ 📜 arrivo.postman_collection.json
 ┗ 📜 README.md


# REST API

# User Routes
- ## <u>Authentication</u>
### User Login
`POST /auth/login/`


### User Register

`POST /auth/register/`

- ## <u>Post</u>
### List Post

`GET /post`

### View Post by ID
`GET /post`


### Create Post for Normal user

`POST /post/normal/`

### Create Post for Premium user

`POST /post/premium/`

### Update Post

`PUT /post/`

### Delete Post
`DELETE /post/`


- ## <u>Category</u>
### List Category
`GET /category`

### View Category by ID
`GET /category`

### Create Category
`POST /category/`

### Update Category

`PUT /category/`

### Delete Category
`DELETE /category/`


- ## <u>Payment</u>
### Make Payment
`POST /payment/`

### Payment Success Callback
`GET /payment/success?session_id={{session_id}}`


# Admin Routes

- ## <u>Authentication</u>
### Admin Login
`POST /admin/auth/`



- ## <u>User</u>
### Create User
`POST /admin/user`

- ## <u>Post</u>
### List Post

`GET /admin/post`

### View Post by ID
`GET /admin/post`


### Create Post

`POST /admin/post/`


### Update Post

`PUT /admin/post/`

### Delete Post
`DELETE /admin/post/`


- ## <u>Category</u>
### List Category
`GET /admin/category`

### View Category by ID
`GET /admin/category`

### Create Category
`POST /admin/category/`

### Update Category

`PUT /admin/category/`

### Delete Category
`DELETE /admin/category/`