# PROJECT STRUCTURE

```bash
Project
├── package.json
├── package-lock.json
├── _public
│   ├── uploads
│   └── _views
│       ├── form2.html #probate form
│       ├── form.css 
│       └── form.html  #evaluate form
├── SQL_SRIPT&POSTMAN #postman and sql
│   ├── adminCollection.json 
│   ├── db.sql
│   ├── form_Colections.json
│   └── userCollections.json
└── _src
    ├── _config
    │   ├── config.js #main config
    │   ├── db.config.js #config database for sequelize
    │   ├── index.js 
    │   ├── multer.config.js #config multer upload
    │   ├── nodemailer.config.js
    │   ├── responseInterface.js
    │   └── validator
    │       └── payload.js
    ├── _middleware
    │   ├── auth.js
    │   ├── handerError.js
    │   ├── handling
    │   │   └── ErrorHandle.js
    │   ├── multerUpload.js
    │   ├── request-validator
    │   │   ├── admin
    │   │   │   ├── index.js
    │   │   │   └── schema.js
    │   │   ├── authentication
    │   │   │   ├── index.js
    │   │   │   └── schema.js
    │   │   ├── base
    │   │   │   └── base-validate.js
    │   │   ├── error.interface.js
    │   │   ├── form
    │   │   │   ├── index.js
    │   │   │   └── schema.js
    │   │   ├── helper.js
    │   │   ├── index.js
    │   │   ├── response.error.js
    │   │   └── user
    │   │       ├── index.js
    │   │       └── schema.js
    │   ├── response.js
    │   ├── sendmail.js
    │   └── test.js
    ├── _models
    │   ├── api
    │   │   ├── index.js
    │   │   └── schema.js
    │   ├── base.js
    │   ├── db.connect.js
    │   ├── employee
    │   │   ├── index.js
    │   │   └── schema.js
    │   ├── form
    │   │   ├── index.js
    │   │   └── schema.js
    │   ├── formDetail
    │   │   ├── index.js
    │   │   └── schema.js
    │   ├── role
    │   │   ├── index.js
    │   │   └── schema.js
    │   ├── role_permission
    │   │   ├── index.js
    │   │   └── schema.js
    │   ├── user
    │   │   ├── index.js
    │   │   └── schema.js
    │   └── userRole
    │       ├── index.js
    │       └── schema.js
    ├── server.js
    ├── _services
    │   ├── admin
    │   │   ├── index.js
    │   │   └── service.js
    │   ├── authentication
    │   │   ├── index.js
    │   │   └── service.js
    │   ├── base
    │   │   ├── base.js
    │   │   ├── base-services.js
    │   │   └── core-services.js
    │   ├── form
    │   │   ├── index.js
    │   │   └── service.js
    │   ├── index.js
    │   └── user
    │       ├── index.js
    │       └── service.js
    ├── test
    │   ├── data
    │   │   └── case.js
    │   ├── form.js
    │   ├── helper
    │   │   ├── functionInterface.js
    │   │   └── helper.js
    │   ├── index.js
    │   ├── token
    │   │   └── token.js
    │   └── user.js
    └── _utils
        ├── fileUtils.js
        ├── index.js
        └── logger.js

```

# SETUP:

```
git clone git@github.com:quanghvvmo/f11-n12-project.git
cd f11-n12-project
git checkout longnt1
npm install
```

# Configuration

- Check file **config.js** in directory `_src/_config/config.js` for database or other
  - **The following is important:**
    - DB_HOST
    - DB_USERNAME
    - DB_PASSWORD
    - DB_DATABASE
    - TOKEN_SECRET (**for tokenize**) 

# Operations:

```bash
npm run dev   #run the server in dev mode
npm run test  #run in test mode
```

# Database

You can use the ```db.sql``` from ```SQL_SRIPT&POSTMAN ``` folder to create table or seed data

# Postman
Import postman from ```SQL_SRIPT&POSTMAN```

