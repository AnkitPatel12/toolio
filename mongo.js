const { MongoClient, ServerApiVersion } = require('mongodb');

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

async function addUser(name, age){
  const client = await connectDB();
  const db = client.db("toolioDB");
  const collection = db.collection("users");
  const document = { name: name, age: age };
  const result = await collection.insertOne(document);
  // console.log(`Inserted ${result.insertedCount} document`);
  client.close();
}

async function main(){
  addUser("Boke", "25");
  addUser("Boke", "20");
  addUser("Boke", "15");
}

main();