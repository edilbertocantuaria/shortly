import { db } from "../database/database.connection.js"
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"

export async function getUsers (req, res){
    try {
        const users = await db.query("SELECT * FROM users");
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
    catch (err){
       res.status(500).send (err.message);
    }
}

export async function signUp(req, res) {
    const { name, email, password, passwordConfirm } = req.body
    try {
        if (password != passwordConfirm) return res.status(400).send({ message: "As senhas não conferem!" })

        const passwordHash = bcrypt.hashSync(user.password, 10);

        await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, [name, email, passwordHash]);
        res.sendStatus(201);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}