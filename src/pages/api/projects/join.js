import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    let formData = JSON.parse(req.body)
    let db = client.db("toolioDB");
    let projectCollection = db.collection("projects");

    let projectToCopy;

    let sourceQuery = {
        "projects.projectID": formData.projectID
    };
    
    let userDoc = await projectCollection.findOne(sourceQuery)
    if (userDoc) {
        projectToCopy = userDoc.projects.find(project => project.projectID === formData.projectID);
        if(projectToCopy.users.includes(formData.userToAdd)){
            res.send({ status: 200, success: false, message: "User already joined project" });
            return;
        }
    }
    
    let userUpdateQuery = {
        "projects.projectID": formData.projectID
    };

    let userUpdate = {
        "$push": {
            "projects.$.users": formData.userToAdd
        }
    };

    let updateResponse = await projectCollection.updateOne(userUpdateQuery, userUpdate)
    if (updateResponse.matchedCount === 0){
        res.send({ status: 200, success: false, message: "Invalid Project ID" });
        return;
    } else {
        projectToCopy.users.push(formData.userToAdd);
    }

    let targetQuery = { "email": formData.userToAdd };

    let pushProject = {
        "$push": {
            "projects": projectToCopy
        }
    };

    let addResponse = await projectCollection.updateOne(targetQuery, pushProject)
    if (addResponse.acknowledged) {
        res.send({ status: 200, success: true, message: `Successfully joined ${projectToCopy.name}`});
        return;
    }
    
    res.send({ status: 200, success: false, message: `An error occurred` });
    return;
}