import { pick } from "lodash";

class User {
    constructor(name, email, password, isAdmin) {
        this.name = name;
        this.password = password;
        this.isAdmin = isAdmin;
        this.email = email;
    }

    getEmail() {
        return this.email;
    }

    setEmail() {
        this.email = email;
    }

    getUsername() {
        return this.name;
    }

    setUsername(name) {
        this.name = name;
    }

    getHashedPassword() {
        return this.password;
    }

    setHashedPassword(password) {
        this.password = password;
    }

    isAdmin() {
        return this.isAdmin;
    }

    setAdmin(isAdmin) {
        this.isAdmin = isAdmin;
    }

    toString() {
        return `User{ username: '${this.name}', isAdmin: ${this.isAdmin} }`;
    }

    toJSON() {
        return pick(this, ["name", "email", "password", "isAdmin"]);
    }

}

module.exports = User;
