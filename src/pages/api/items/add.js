import Item from "../../../lib/item";
import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    let formData = JSON.parse(req.body)
    let item = new Item(formData.name, formData.price, formData.quantity, formData.unit, formData.details, formData.capacity);
    let db = client.db("toolioDB");
    const collection = db.collection("items");

    //check if item already in db
    let findCursor = await collection.find({ name: formData.name })
    let findResponse = await findCursor.toArray()
    if(findResponse.length > 0) {
        res.send({ status: 200, success: false, message: "Item already exists"});
        return;
    } else {
        // insert item
        let addResponse = await collection.insertOne(item);

        res.send({ status: 200, success: addResponse.acknowledged, message: addResponse.acknowledged ? "Item added successfully" : "Item not added"});
    }
}