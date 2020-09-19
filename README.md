## Chat-app
Simple Chat/Messaging app build with React, Material-ui & Firebase

### Requires

 - Node.js
 - NPM (Node Package Manager)
 - Firebase (Google Account)

### Run
- Install dependencies:
`npm install`

- Create a project in [Firebase](base.google.com)

- Copy the web [configuration](https://firebase.google.com/docs/web/setup?authuser=0#add-sdks-initialize) object in to `/src/firebase.js`: 
```
var firebaseConfig = {
  apiKey: "AIzaSyDOCAbC123dEf456GhI789jKl01-MnO",
  authDomain: "myapp-project-123.firebaseapp.com",
  databaseURL: "https://myapp-project-123.firebaseio.com",
  projectId: "myapp-project-123",
  storageBucket: "myapp-project-123.appspot.com",
  messagingSenderId: "65211879809",
  appId: "1:65211879909:web:3ae38ef1cdcb2e01fe5f0c",
  measurementId: "G-8GSGZQ44ST"
};
```

- Create a collection named `'rooms'` on Firebase
- Create a few documents inside 'rooms' with fields:
```
name: 'RoomName'
imgUrl: 'imageUrl'
```

- Enable google sign-in method authentication on firebase

- Start the development server with: `npm start`

- Go to `http://localhost:3000/` in the browser


### Build

`npm run build`
