import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    let formData = JSON.parse(req.body)
    let db = client.db("toolioDB");
    const collection = db.collection("projects");

    // get projects for user
    let findCursor = await collection.find({email: formData.email})

    let findResponse = await findCursor.toArray()
    if(findResponse.length == 0) {
        res.send({ status: 200, success: false, message: "An unknown error occurred"});
        return;
    } else {
        let projects = findResponse[0].projects
        res.send({ status: 200, success: true, message: projects ? "Projects retrieved" : "User has no projects", projects: projects});
    }
}