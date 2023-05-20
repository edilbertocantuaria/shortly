import { db } from "../database/database.connection.js"

export async function validateUserEmail(req, res, next) {
    const { email } = req.body;
    try {
        const user = await db.query(`SELECT * FROM users WHERE email= $s1`, [email]);

        if (!user) return res.status(409).send({ message: "Este e-mail já está cadastrado!" });

        return next();
    }
    catch (err) {
        res.status(500).send(err.message);
    }

}