const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const mongoURI = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/insert', async (req, res) => {
  const data = req.body.data;

  try {
    await client.connect();
    const db = client.db('usersdb');
    const collection = db.collection('userscollection');

    const result = await collection.insertOne(data);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  } finally {
    await client.close();
  }
});

//get method
app.get('/get', async (req, res) => {
    
    try {
      await client.connect();
      const db = client.db('usersdb');
      const collection = db.collection('userscollection');
  
      const result = await collection.find({}).toArray();
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    } finally {
      await client.close();
    }
  });

  //for updating the value in table
  app.post('/update', async (req, res) => {
    const data = req.body.data;
    const id=req.query.id;
    try {
      await client.connect();
      const db = client.db('usersdb');
      const collection = db.collection('userscollection');
  
      // Assuming you want to update the document based on the user ID
    const result = await collection.updateOne({ _id: new  ObjectId(id) }, { $set:data });
      

      res.send(result);
      console.log(result)
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    } finally {
      await client.close();
    }
  });

  //for delete the value in table
  app.get('/delete', async (req, res) => {
    const id=req.query.id;
    try {
      await client.connect();
      const db = client.db('usersdb');
      const collection = db.collection('userscollection');
  
// Assuming you want to delete the document based on the user ID
const result = await collection.deleteOne({ _id: new ObjectId(id) });      

      res.send(result);
      console.log(result)
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    } finally {
      await client.close();
    }
  });


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
