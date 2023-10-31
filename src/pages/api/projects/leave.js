import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    let formData = JSON.parse(req.body)
    let db = client.db("toolioDB");
    let projectCollection = db.collection("projects");

    let removeUserQuery = {
        "projects.projectID": formData.projectID
    };
    
    let removeUserUpdate = {
        "$pull": {
            "projects.$.users": formData.userToRemove
        }
    };
    
    let removedProject = await projectCollection.updateMany(removeUserQuery, removeUserUpdate)

    let removeProjectQuery = {
        "email": formData.userToRemove
    };
    
    let removeProjectUpdate = {
        "$pull": {
            "projects": {
                "projectID": formData.projectID
            }
        }
    };
    
    let removeFromUser = await projectCollection.updateOne(removeProjectQuery, removeProjectUpdate)
    if (removeFromUser.matchedCount === 0){
        res.send({ status: 200, success: false, message: "Invalid User ID" });
        return;
    } else {
        res.send({ status: 200, success: true, message: `Successfully left project` });
        return;
    }
}