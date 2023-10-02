export default function handler(req, res) {
    res.status(200).json({ name: 'USER' })
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

  