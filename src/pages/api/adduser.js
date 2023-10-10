import User from "../../lib/user"
import clientPromise from "../../lib/mongodb";
import { add } from "lodash";

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
        let addResponse = await collection.insertOne(user);
        res.send({ status: 200, success: addResponse.acknowledged, message: addResponse.acknowledged ? "User added successfully" : "User not added"});
    }
}

/*
CRUD
users
    {
        name: 'John Doe',
        id: 1
        projects: [
            project1, project2, ...
        ]
    }

projects
    {
        name: 'project1',
        id: 1
        items: [
            item1: {
                amount: 20,
            },
            item2: {
                amount: 20,
            },
            ...
        ]
    }
*/ 

// getUser - read
// deleteUser - delete
// modifyUser - update
// createUser -create

// getProject - read
// deleteProject - delete
// modifyProject - update
// createProject -create

  