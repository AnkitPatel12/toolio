import User from "../../../lib/user"
import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    let formData = JSON.parse(req.body)
    let db = client.db("toolioDB");
    const userCollection = db.collection("users");

    let findCursor = await userCollection.findOne({email: formData.email})
    if(findCursor && compareHash(formData.oldPassword, findCursor.password)) {
        //change password
        await userCollection.updateOne({email: formData.email}, {$set: {password: formData.newPassword}})
        res.send({ status: 200, success: true, message: "Password changed successfully"});
        return;
    } else {
        res.send({ status: 200, success: false, message: "User not found or password incorrect"});
        return;
    }
}