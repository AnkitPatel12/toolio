import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    let formData = JSON.parse(req.body)
    let db = client.db("toolioDB");
    const userCollection = db.collection("users");

    let query = {
        "email": formData.email,
    };

    let update = {
        "$set": {
            "name": formData.newName,
        }
    };

    let addResponse = await userCollection.updateOne(query, update, function(err, res) {
        if (err) {
            res.send({ status: 200, success: false, message: "User info not updated" });
            return;
        }
    });
    res.send({ status: 200, success: addResponse.acknowledged, message: addResponse.acknowledged ? "User info updated. Changes will be reflected after logging out" : "User info not updated" });
}