import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) { 
    const client = await clientPromise;
    let db = client.db("toolioDB");
    const collection = db.collection("items");

    const items = await collection.find().toArray();

    if(items.length == 0) {
      res.send({ status: 200, success: false, message: "An unknown error occurred"});
      return;
    }
    res.send({ status: 200, success: true, message: items ? "Items retrieved" : "There are no items", items: items});
}
