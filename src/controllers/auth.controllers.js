import { db } from "../database/database.connection.js"
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"

export async function getUsers(req, res) {
    try {

        const users = await db.query("SELECT * FROM users;");
        //console.log(users.rows);

        if (users.rows.length === 0) return res.status(404).send("Nenhum usuário cadastrado");

        const formattedUsers = users.rows.map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password
        }));
        //console.log(formattedUsers);

        res.send(formattedUsers);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}

export async function signUp(req, res) {
    const { name, email, password, passwordConfirm } = req.body
    try {

        if (password != passwordConfirm) return res.status(400).send("As senhas não conferem!")

        const passwordHash = bcrypt.hashSync(password, 10);

        await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [name, email, passwordHash]);
        res.sendStatus(201);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}

export async function signIn(req, res) {
    const { email, password } = req.body
    try {
        const user = await db.query(`SELECT * FROM users WHERE users.email=$1;`, [email]);
        //console.log(user.rows[0].id);

        const userId = Number(user.rows[0].id);
        const token = uuid();

        await db.query(`INSERT INTO sessions (token, "userID") VALUES ($1, $2);`, [token, userId]);
        res.status(201).send({ token })
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}