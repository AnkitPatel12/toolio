import bcrypt from 'bcryptjs'

export function hashPassword(pass) {
    var salt = bcrypt.genSaltSync(10);
    return pass = bcrypt.hashSync(pass, salt);
}

export function comparePass(pass, hash) {
    return bcrypt.compareSync(pass, hash); // true
}