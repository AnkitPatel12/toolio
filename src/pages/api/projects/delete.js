import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    let formData = JSON.parse(req.body)
    let db = client.db("toolioDB");
    let projectCollection = db.collection("projects");

    let sourceQuery = {
        "email": formData.email
    };
    let userDoc = await projectCollection.findOne(sourceQuery)

    if (!userDoc) {
        res.send({ status: 200, success: false, message: "User does not exist" });
        return;
    }
    //delete from all users if owner is removing
    let project = userDoc.projects.find(project => project.projectID === formData.projectID);

    if (project.users[0] === formData.email) {
        //delete from all users if owner is removing
        let removeProjectQuery = {
            "projects.projectID": formData.projectID
        };

        let removeProjectUpdate = { $pull: { projects: { projectID: formData.projectID } } }

        //if project is deleted, not left, check in all items from project
        let itemCollection = db.collection("items");
        Object.entries(project.items).forEach(([name, quantity]) => {
            let checkInQuery = { "name": name }
            let checkInUpdate = { $inc: { "quantity": quantity } }
            itemCollection.updateOne(checkInQuery, checkInUpdate);
        })

        let removeFromUser = await projectCollection.updateMany(removeProjectQuery, removeProjectUpdate)
        res.send({ status: 200, success: removeFromUser.acknowledged, message: removeFromUser.acknowledged ? "Project deleted successfully" : "Project not deleted" });
        return;
    } else {
        //delete from current user
        let addResponse = await projectCollection.updateOne({ email: formData.email }, { $pull: { projects: { name: formData.name } } });
        res.send({ status: 200, success: addResponse.acknowledged, message: addResponse.acknowledged ? "Project deleted successfully" : "Project not deleted" });
        return;
    }
}