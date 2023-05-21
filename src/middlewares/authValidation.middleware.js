import { db } from "../database/database.connection.js"
import bcrypt from "bcrypt"

export async function validateUserEmail(req, res, next) {
    const { email } = req.body;
    const { id } = req.params
    try {

        const user = await db.query(`SELECT * FROM users WHERE email= $1;`, [email]);
        //console.log(user.rows)

        if (user.rowCount === 0) return next();

        return res.status(409).send("Esse usuário já está cadastrado!")
    }
    catch (err) {
        res.status(500).send(err.message);
    }

}

export async function validateLoginUser(req, res, next) {
    const { email, password } = req.body;

    try {
        const login = await db.query(`SELECT * FROM users WHERE email= $1;`, [email]);
        //console.log(login.rows)

        if (login.rowCount === 0) return res.status(401).send("Email nao cadastrado");

        const isPasswordCorrect = bcrypt.compareSync(password, login.rows[0].password)

        if (!isPasswordCorrect) return res.status(401).send("Senha incorreta");

        next();
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}

export async function authValidation(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) return res.sendStatus(401);
    try {
        const session = await db.query("SELECT * FROM sessions WHERE token=$1;", [token]);

        if (session.rowCount === 0) return res.status(401).send("Token inválido");

        res.locals.session = session;

        next();
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}