import { db } from "../database/database.connection.js"
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"

export async function signUp(req, res) {
    const { name, email, password, passwordConfirm } = req.body
    try {
        if (password != passwordConfirm) return res.status(400).send({ message: "As senhas não conferem!" })

        const passwordHash = bcrypt.hashSync(user.password, 10);

        await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, [name, email, password]);
        res.sendStatus(201);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}