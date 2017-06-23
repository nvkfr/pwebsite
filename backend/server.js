const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongo = require('mongodb');

const fakeUser = {email: 'aze@aze.com', password: 'aze'};
const jwt = require('jsonwebtoken');

const PORT = 4201;
const secret = 'qwJNhQ5YCupe4vFjV8VuHcXnAvuV73rEJhj8vmXdXnrU7ftBAzrmcsBkc6eeY6LU';

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const api = express.Router();
const auth = express.Router();

auth.post('/login', (req, res) => {
  if(req.body) {
    const email = req.body.email.toLocaleLowerCase();
    const password = req.body.password.toLocaleLowerCase();
    if(email === fakeUser.email && password === fakeUser.password) {
      delete req.body.password;
      /*res.json({sucess: true, data: req.body});*/
      const token = jwt.sign({ iss: 'http://localhost:4201', role: 'admin', email: req.body.email }, secret);
      res.json({ success: true, token: token });
    } else {
      res.json({success: false, message: 'identifiants incorrects'});
    }
  } else {
    res.json({success: false, message: 'données manquantes'});
  }
});

api.get('/articles', (req, res) => {
    const MongoClient = mongo.MongoClient;

    const url = 'mongodb://localhost:27017/articles';

    MongoClient.connect(url, (err, db) => {
      if (err) {
        console.log('Unable to connect to the server', err);
      } else {
        console.log('connection established');

        const collection = db.collection('article');
        console.log(collection);

        collection.find({}).toArray(function(err, result) {
          if (err) {
            console.log('error retreiving the documents', err);
          } else if (result.length){
            console.log(result);
            res.json({result});
          } else {
            console.log('no documents found');
          }
          db.close();
        })
      }
    })
});

app.use('/api', api); //localhost:4201/api/articles sera le chemin que devra utiliser le client angular pour récupérer les news
app.use('/auth', auth); //localhost:4201/auth/login sera le chemin que devra utiliser le client angular pour se connecter

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
