const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongo = require('mongodb');

const PORT = 4201;

app.use(bodyParser.json());

const api = express.Router();

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

        collection.find({}).toArray(function(err, res) {
          if (err) {
            console.log('error retreiving the documents', err);
          } else if (res.length){
            console.log(res);
          } else {
            console.log('no documents found');
          }
          db.close();
        })
      }
    })
});

app.use('/api', api); //localhost:4200/api/jobs sera le chemin que devra utiliser le client angular

app.listen(PORT, () => {
  console.log('listening on port ${PORT}');
});
