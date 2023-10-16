import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    let formData = JSON.parse(req.body)
    let db = client.db("toolioDB");
    const collection = db.collection("projects");

    //check if user already in db
    let findCursor = await collection.find({email: formData.email})
    if(findCursor == 0) {
        res.send({ status: 200, success: false, message: "User does not exist"});
        return;
    } else {
        // create new project collection for user
        let projectCollection = db.collection("projects");
        let addResponse = await projectCollection.updateOne({email: formData.email}, {$pull: {projects: {name: formData.name}}});
        res.send({ status: 200, success: addResponse.acknowledged, message: addResponse.acknowledged ? "Project deleted!" : "Project not deleted"});
    }
}