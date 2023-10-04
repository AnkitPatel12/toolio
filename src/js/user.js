class User {
    constructor(username, hashedPassword, isAdmin) {
        this.username = username;
        this.hashedPassword = hashedPassword;
        this.isAdmin = isAdmin;
    }

    getUsername() {
        return this.username;
    }

    setUsername(username) {
        this.username = username;
    }

    getHashedPassword() {
        return this.hashedPassword;
    }

    setHashedPassword(hashedPassword) {
        this.hashedPassword = hashedPassword;
    }

    isAdmin() {
        return this.isAdmin;
    }

    setAdmin(isAdmin) {
        this.isAdmin = isAdmin;
    }

    toString() {
        return `User{ username: '${this.username}', isAdmin: ${this.isAdmin} }`;
    }
}

module.exports = User;
