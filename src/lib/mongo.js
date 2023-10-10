const { MongoClient, ServerApiVersion } = require('mongodb');
const User = require('./user.js');

async function connectDB() {
  const user = "codinggodsquad";
  const pass = "R0acDp4dmt0slNpN";
  const uri = "mongodb+srv://" + user + ":" + pass + "@cluster0.mx8wuc3.mongodb.net/?retryWrites=true&w=majority";

  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    // console.log("You successfully connected to MongoDB!");
  } catch (err) {
    console.log("Error connecting to MongoDB:");
    console.error("Error connecting to MongoDB:", err);
  }
  return client;
}

// export default async function initDB() {

// }

async function addUser(user) {
  const client = await connectDB();
  const db = client.db("toolioDB");
  const collection = db.collection("users");

  // const document = user.toJSON();
  const result = await collection.insertOne(user);
  client.close();
  return result
}

async function findUser(user) {
  const client = await connectDB();
  const db = client.db("toolioDB");
  const collection = db.collection("users");

  const target = await collection.findOne({ username: user.getUsername(), hashedPassword: user.getHashedPassword() });
  client.close();
  return target;
}

async function main() {
  var user = new User("Boke", "30", false);
  console.log(await findUser(user));
  user = new User("Boke", "60", false);
  console.log(await findUser(user));
  user = new User("Boke", "25", false);
  console.log(await findUser(user));
}

main();