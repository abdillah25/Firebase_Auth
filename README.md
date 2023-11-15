# Firebase Auth Project
This is an authentication project using Firebase as the database.

## Demo

https://firebase-auth-by-dillahcodes.vercel.app/

## Features

- Register with email/Google account
- Login with email and password or Google account
- forgot password
- Delete account
- Change user email/password and profile photo

## Installation

#### clone this repository

```bash
 git clone https://github.com/abdillah25/Firebase_Auth.git
```

#### Go to Directory

```bash
 cd Firebase_Auth-main
```
#### Install dependencies

```bash
 npm install
```
#### run the project in your localhost

```bash
 npm run dev
```


## configuration

#### create .env file for firebase configuration in root folder
```bash
 .env
```

#### Enter your Firebase configuration into this variable in the .env file

```bash
VITE_FB_API_KEY="YOUR_FIREBASE_API_KEY"
VITE_FB_AUTHDOMAIN="YOUR_FIREBASE_AUTHDOMAIN"
VITE_FB_PROJECT_ID="YOUR_FIREBASE_PROJECT_ID"
VITE_FB_STORAGE_BUCKET="YOUR_FIREBASE_STORAGE_BUCKET"
VITE_FB_MESSAGING_SENDER_ID="YOUR_FIEBASE_MESSAGING_SENDER_ID"
VITE_FB_APP_ID="YOUR_APP_ID"
VITE_MEASUREMENT_ID=""YOUR_MEASUREMENT_ID"
```

## how to get firebase configuration

#### go to project overview > project configuration
 ![App Screenshot](https://firebasestorage.googleapis.com/v0/b/react-auth-project-6b4ad.appspot.com/o/Screenshot%202023-11-15%20110743.png?alt=media&token=9924d1d6-d081-4af8-868b-97b9e2834546)

#### in project settings scroll to bottom you will find the firebase configuration
 ![App Screenshot](https://firebasestorage.googleapis.com/v0/b/react-auth-project-6b4ad.appspot.com/o/Screenshot%202023-11-15%20111031.png?alt=media&token=9efc7657-c0ec-4fc6-b9ea-1812a59a095e)
## Tech Stack

**Client:** React, vite, TailwindCSS, react router dom v6, daisyUI

**Server:** firebase


## License

[MIT](https://choosealicense.com/licenses/mit/)


## Authors

- [@abdillah25](https://www.github.com/abdillah25)

