import { db } from "../database/database.connection.js"

export async function validateUserEmail(req, res, next) {
    const { email } = req.body;
    try {

        const user = await db.query(`SELECT * FROM users WHERE email= $1`, [email]);

        if (user.rowCount === 0) return next();
        if (user.rowCount > 0 && user.rows[0].id === Number(id)) return next();

        return res.staus(409).send({ message: "Esse usuário já está cadastrado!" });
    }
    catch (err) {
        res.status(500).send(err.message);
    }

}