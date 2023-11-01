import clientPromise from "../../../lib/mongodb";
import User from "../../../lib/user";

export default async function handler(req, res) {
    const client = await clientPromise;
    let formData = JSON.parse(req.body)
    let user = new User(formData.name, formData.email, formData.password, false)
    let db = client.db("toolioDB");
    const collection = db.collection("users");

    //check if user already in db
    let findCursor = await collection.find({email: formData.email})
    let findResponse = await findCursor.toArray()
    if(findResponse.length > 0) {
        res.send({ status: 200, success: false, message: "User already exists"});
        return;
    } else {
        // insert user
        let addResponse = await collection.insertOne(user);

        // create new project collection for user
        let projectCollection = db.collection("projects");
        let project = {
            email: formData.email,
            projects: [{
                name: "Example Project",
                description: "This is an example project!",
                users : [formData.email],
                items: {
                }
            }]
        }
        let addProjectResponse = await projectCollection.insertOne(project);
        res.send({ status: 200, success: addResponse.acknowledged, message: addResponse.acknowledged ? "User added successfully" : "User not added"});
    }
}