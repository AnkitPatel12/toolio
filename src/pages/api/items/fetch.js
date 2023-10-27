import clientPromise from "../../../lib/mongodb";
import Item from "../../../lib/item"




export default async function handler() { 
    const client = await clientPromise;
    let db = client.db("toolioDB");
    const collection = db.collection("items");

    const userDocuments = await collection.find({}).toArray();

    // Convert user documents to user objects using the constructor
    const itemsArray = userDocuments.map((userDoc) => {
      return new Item(formData.name, formData.price, formData.quantity, formData.unit, formData.details, formData.capacity);;
    });

    return itemsArray;
}
