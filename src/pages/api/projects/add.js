import { hash } from "../../../lib/crypto";
import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    let formData = JSON.parse(req.body)
    let db = client.db("toolioDB");
    const collection = db.collection("projects");

    //check if user already in db
    let findCursor = await collection.find({ email: formData.email })
    if (findCursor == 0) {
        res.send({ status: 200, success: false, message: "User does not exist" });
        return;
    } else {
        // create new project collection for user
        let projectCollection = db.collection("projects");

        //check if project already exists
        let findCursor = await projectCollection.find({ email: formData.email, "projects.name": formData.name })
        let findResponse = await findCursor.toArray()
        if (findResponse.length != 0) {
            res.send({ status: 200, success: false, message: "Project already exists" });
            return;
        }
        let project = {
            name: formData.name,
            projectID: formData.projectID,
            description: formData.description,
            users: [formData.email],
            items: {
            }
        }
        let addResponse = await projectCollection.updateOne({ email: formData.email }, { $push: { projects: project } });
        res.send({ status: 200, success: addResponse.acknowledged, message: addResponse.acknowledged ? "Project added!" : "Project not added" });
    }
}