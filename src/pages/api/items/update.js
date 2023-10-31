import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    let formData = JSON.parse(req.body)
    let db = client.db("toolioDB");

    //update item
    let itemCollection = db.collection("items");
    let item = await itemCollection.findOne({ "name": formData.itemName })
    let projectCollection = db.collection("projects");
    let userDoc = await projectCollection.findOne({ "email": formData.email, "projects.projectID": formData.projectID })
    let project = userDoc.projects.find((project) => project.projectID === formData.projectID);

    if (!project) {
        res.send({ status: 200, success: false, message: "The project does not exist" });
        return;
    }

    if (formData.type === "checkIn") {
        //check if item is in project
        if (!(formData.itemName in project.items)) {
            res.send({ status: 200, success: false, message: "The project does not contain this item" });
            return;
        }

        //check if quantity exceeds project's item quantity
        if (formData.quantity > project.items[formData.itemName]) {
            res.send({ status: 200, success: false, message: "Requested quantity exceeds project's item quantity" });
            return;
        }
    } else {
        //check if quantity exceeds item quantity
        if (formData.quantity > item.quantity) {
            res.send({ status: 200, success: false, message: "Not enough items in store" });
            return;
        }
    }


    let itemQuery = {
        "name": formData.itemName
    };

    let itemUpdate = {
        "$set": {
            "quantity": parseInt(item.quantity) + formData.quantity * (formData.type === "checkOut" ? -1 : 1),
        }
    }; 

    let projectQuery = {
        "projects.projectID": formData.projectID
    };

    let projectUpdate = {};
    let projectItemAmt = formData.itemName in project.items ? project.items[formData.itemName] : 0

    if(projectItemAmt + formData.quantity * (formData.type === "checkOut" ? 1 : -1) === 0){
        projectUpdate = {
            "$unset": {
                ["projects.$.items." + formData.itemName]: "",
            }
        };
    } else {
        projectUpdate = {
            "$set": {
                ["projects.$.items." + formData.itemName]: projectItemAmt  + formData.quantity * (formData.type === "checkOut" ? 1 : -1),
            }
        };
    }
    
    await itemCollection.updateOne(itemQuery, itemUpdate, function (err, res) {
        if (err) {
            res.send({ status: 200, success: false, message: "Error updating item quantity" });
            return;
        }
    });

    //update project
    await projectCollection.updateMany(projectQuery, projectUpdate, function (err, res) {
        console.log()
        if (err) {
            res.send({ status: 200, success: false, message: "Error updating project quantity" });
            return;
        }
    });
    res.send({
        status: 200, success: true, message:
            (formData.type === "checkOut" ? `Checked out ${formData.quantity} from ${formData.itemName} to ${formData.projectName}` : `Successfully checked in ${formData.quantity} of ${formData.itemName} from ${formData.projectName}`)
    });

}