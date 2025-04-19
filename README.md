## Newsletter Creator App

A full-stack newsletter management platform featuring:

Rich editor (TinyMCE), Drag & Drop Editor, Write with Preview for composing email newsletters

Draft, schedule, and “send now” workflows

Subscriber management (add/delete/filter subscribers)

Rich Templates

Analytics dashboards (charts for send/open/click rates)

User authentication with JWT and Google OAuth

REST API (Express + MongoDB) with OpenAPI/Swagger docs

GraphQL endpoint (Apollo Server) with per‑user access control

Background scheduler (node‑cron) for dispatching scheduled newsletters

Angular 17 front‑end with NgRx state management, internationalization, accessibility, Cypress e2e, and Jest unit tests

## 🔧 Tech Stack

## Backend:

Node.js, Express, MongoDB (Mongoose), Apollo Server (GraphQL), Passport.js (Google OAuth), JWT, Nodemailer

## Frontend: 

Angular 17, NgRx, @ngx-translate, TinyMCE, ng2-charts, Cypress, Jest

## DevOps & Docs:

Swagger/OpenAPI, Docker support (optional), node-cron

## 🚀 Features

Authentication

Sign up / log in / log out

JWT token guard

Google OAuth 2.0 integration

Newsletter Workflows

Draft, Schedule, Send Now

WYSIWYG editor with color‑picker & templates

Recurring background job to dispatch scheduled newsletters

Subscribers Management

Add, delete, and filter subscribers (active / inactive / pending / need approval)

Segmentation support

Analytics

Charts for daily/weekly/monthly sends, opens, clicks

External trackers (Google Analytics, Meta Pixel) hooks

REST API & GraphQL

Fully documented OpenAPI at /api-docs

GraphQL playground (introspection enabled) at /graphql

Front‑end Excellence

Feature modules & shared components

NgRx for global state (posts, drafts, subscribers)

Internationalization (en, fr, ar)

Accessibility enhancements (ARIA, keyboard nav)

E2E testing with Cypress

Unit tests with Jest

## 📥 Prerequisites

Node.js >= 18

npm or yarn

MongoDB (local or Atlas)

Google OAuth credentials (for 3rd‑party login)

## 🔨 Backend Setup 

Clone & install

git clone https://github.com/shaukinkhan477/Newsletter-Creator-App
cd newsLetter-backend
npm install

## Environment variables (.env in /backend):


PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/newsletterAppDB
MONGO_URI=mongodb://mongo:27017/newsletterAppDB
JWT_SECRET=someSuperSecretKey
JWT_EXPIRES_IN=1d
RESET_TOKEN_EXPIRES=3600000
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=
EMAIL_USER=
EMAIL_PASS=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
CLIENT_URL=http://localhost:4200
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback

## Start server
node server.js


## 🖥 Frontend Setup

Install & launch

cd newsLetterCreatorApp
npm install
ng serve --open
App runs at http://localhost:4200

## Configuration

The Angular HTTP interceptor attaches JWT from localStorage

i18n JSON files in src/assets/i18n/{en,fr,ar}.json

To add languages, drop in a new JSON and register in app.config.ts

Testing

Unit: npm run test (Jest)

E2E: npm run e2e (Cypress)

## 📂 Folder Structure

## backend

newsLetter-backend/
├── config/                   # app‑wide configuration (DB, passport strategies, etc.)
│   ├── db.js
│   └── passport.js
│
├── controllers/              # Express route handlers
│   ├── auth.controller.js
│   ├── post.controller.js
│   └── subscriber.controller.js
│
├── graphql/                  # Apollo / GraphQL server
│   ├── index.js              # applies ApolloServer to Express
│   ├── resolvers.js
│   └── schema.graphql
│
├── middlewares/              # custom Express middleware
│   └── auth.middleware.js
│
├── models/                   # Mongoose schemas
│   ├── user.model.js
│   ├── post.model.js
│   └── subscriber.model.js
│
├── routes/                   # Express route definitions
│   ├── auth.routes.js
│   ├── post.routes.js
│   └── subscriber.routes.js
│
├── docs/                     # OpenAPI / Swagger specs
│   └── openapi.yaml
│
├── cron.js                   # scheduled job to send out posts
├── server.js                 # main Express + Apollo startup
├── Dockerfile
├── .dockerignore
├── .env
├── package.json
└── package-lock.json

## frontend

newsLetterCreatorApp/
├── src/
│   ├── app/
│   │   ├── auth/                 # standalone auth components
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   ├── forgot-password/
│   │   │   ├── reset-password/
│   │   │   └── profile/
│   │   │
│   │   ├── components/           # feature components
│   │   │   ├── header/
│   │   │   ├── sidebar/
│   │   │   ├── main-content/
│   │   │   ├── posts/
│   │   │   ├── subscribers/
│   │   │   ├── analytics/
│   │   │   └── templates/
│   │   │
│   │   ├── services/             # HTTP & GraphQL services
│   │   │   ├── auth.service.ts
│   │   │   ├── posts.service.ts
│   │   │   └── subscribers.service.ts
│   │   │
│   │   ├── interceptors/         # HTTP interceptors (JWT)
│   │   │   └── auth.interceptor.ts
│   │   │
│   │   ├── store/                # NgRx state
│   │   │   ├── newsletter/
│   │   │   │   ├── post.actions.ts
│   │   │   │   ├── post.reducer.ts
│   │   │   │   └── post.selectors.ts
│   │   │   ├── posts/
│   │   │   └── subscribers/
│   │   │
│   │   ├── app.routes.ts         # route definitions
│   │   ├── app.config.ts         # all providers (HTTP, Store, i18n, etc.)
│   │   └── app.component.ts      # root shell (header + sidebar + outlet)
│   │
│   ├── assets/                   # images, icons, i18n JSON files…
│   ├── environments/             # environment.ts / production.ts
│   └── main.ts                   # bootstrapping
│
├── e2e/                          # Cypress end‑to‑end tests
├── jest.config.ts                # Jest unit‑test config
├── cypress.config.ts
├── angular.json
├── tsconfig.json
├── package.json
├── Dockerfile
└── README.md


## 💡 Usage

Sign up a new account (or log in via Google OAuth).

Create or import subscribers.

Compose a newsletter using the rich editors, choose draft/schedule/send.

choose prebuilt rich templates

View your analytics on the dashboard.

Manage your account profile, change password, log out.

## 🤝 Contributing

Fork the repo & create a feature branch

Write tests & ensure npm run test passes

Submit a pull request describing your changes

## 📄 License

This project is licensed under the MIT License.