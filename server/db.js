const mongoose = require('mongoose');
const url= "mongodb+srv://gyisca:lokhkU8EeNLQMLVO@cluster2.0e1zr2d.mongodb.net/?retryWrites=true&w=majority";
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';

const connectToDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoCreate: true,
      // findOneAndUpdate: false,
    });

    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error(`Error while connecting to MongoDB: `, error.message);
  }
  const dbName = 'test';

  // async function dropDatabase() {
  //   const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  //   try {
  //     // Connect to the MongoDB cluster
  //     await client.connect();

  //     // Connect to the database
  //     const database = client.db(dbName);

  //     // Drop the database
  //     await database.dropDatabase();

  //     console.log(`Database '${dbName}' dropped successfully.`);
  //   } finally {
  //     // Close the connection
  //     await client.close();
  //   }
  // }

  // dropDatabase().catch(console.error);
};

module.exports = connectToDB;