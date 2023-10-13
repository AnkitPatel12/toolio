class Project {
    constructor(name, description, id) {
        this.name = name;
        this.description = description;
        this.id = id; //each project will have unique name
        this.resources = [];
    }

    //constructor for copying an existing project with a new id like in the project doc
    Copyconstructor(project, newId) {
        this.name = project.name;
        this.description = project.description;
        this.id = newId;
        this.resources = [...project.resources];
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getDescription() {
        return this.description;
    }

    setDescription(description) {
        this.description = description;
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getResources() {
        return this.resources;
    }

    addResource(resource) {
        this.resources.push(resource);
    }

    removeResource(resource) {
        const index = this.resources.indexOf(resource);
        if (index > -1) {
            this.resources.splice(index, 1);
        }
    }
}
module.exports = Project;
