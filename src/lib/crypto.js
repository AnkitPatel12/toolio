import bcrypt from 'bcryptjs'

export function hash(pass) {
    var salt = bcrypt.genSaltSync(10);
    return pass = bcrypt.hashSync(pass, salt);
}

export function compareHash(pass, hash) {
    return bcrypt.compareSync(pass, hash); // true
}
