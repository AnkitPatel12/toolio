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
        if (findResponse.length == 0) {
            res.send({ status: 200, success: false, message: "Project does not exist" });
            return;
        }

        let query = {
            "email": formData.email,
            "projects.name": formData.name
        };

        let update = {
            "$set": {
                "projects.$.name": formData.newName,
                "projects.$.description": formData.description,
            }
        };

        let addResponse = await projectCollection.updateOne(query, update, function(err, res) {
            if (err) {
                res.send({ status: 200, success: false, message: "Project not updated" });
                return;
            }
        });
        res.send({ status: 200, success: addResponse.acknowledged, message: addResponse.acknowledged ? "Project updated!" : "Project not updated" });
    }
}