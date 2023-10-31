import clientPromise from "../../../lib/mongodb";
import { compareHash } from "../../../lib/crypto";

export default async function handler(req, res) {
    const client = await clientPromise;
    let formData = JSON.parse(req.body)
    let db = client.db("toolioDB");
    const collection = db.collection("users");

    let findCursor = await collection.findOne({email: formData.email})
    if(findCursor && compareHash(formData.password, findCursor.password)) {
        
        res.send({ status: 200, success: true, message: "User verified", user: {name: findCursor.name, email: findCursor.email, isAdmin: findCursor.isAdmin}});
        return;
    } else {
        res.send({ status: 200, success: false, message: "User not found or password incorrect"});
    }
}