import User from "@/js/user";
import clientPromise from "@/js/mongodb";




export default async function handler() { 
    const client = await clientPromise;
    let db = client.db("toolioDB");
    const collection = db.collection("users");

    const userDocuments = await collection.find({}).toArray();

    // Convert user documents to user objects using the constructor
    const usersArray = userDocuments.map((userDoc) => {
      return new User(userDoc.name, userDoc.email, userDoc.password, userDoc.isAdmin);
    });

    return usersArray;
}

