import User from "@/js/user";
import clientPromise from "@/js/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    let formData = JSON.parse(req.body)
    let user = new User(formData.name, formData.email, formData.password, false)
    let db = client.db("toolioDB");
    const collection = db.collection("users");

    let addResponse = await collection.insertOne(user);
    res.status(200).json({ success: addResponse.success })

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

  