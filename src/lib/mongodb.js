// mongodb.js

import { MongoClient } from 'mongodb'
const user = "codinggodsquad";
const pass = "R0acDp4dmt0slNpN";
const uri = "mongodb+srv://" + user + ":" + pass + "@cluster0.mx8wuc3.mongodb.net/?retryWrites=true&w=majority";

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}

let client
let clientPromise

if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options)
        global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
} else {
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
}

export default clientPromise