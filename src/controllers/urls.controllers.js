import { db } from "../database/database.connection.js"
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"
import { nanoid } from "nanoid";

export async function postUrlsShorten(req, res) {
    const userID = res.locals.session.rows[0].userID
    //console.log(userID);

    const { url } = req.body
    try {
        const shortUrl = nanoid();


        const shortenedUrl = await db.query(`INSERT INTO urls ("userID", url, "shortUrl") VALUES ($1, $2, $3) RETURNING id, "shortUrl"`, [userID, url, shortUrl]);

        res.status(201).send(shortenedUrl.rows[0]);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getUrl(req, res) {
    const { id } = req.params;
    try {

        const url = await db.query(`SELECT id, "shortUrl", url FROM urls WHERE id=$1;`, [id]);
        //console.log(url.rows);

        if (url.rows.length === 0) return res.status(404).send("Nenhum url cadastrado");

        res.send(url.rows[0]);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getOriginalUrl(req, res) {
    const { shortUrl } = req.params;
    try {

        const originalUrl = await db.query(`SELECT url FROM urls WHERE "shortUrl"=$1;`, [shortUrl]);
        console.log(originalUrl.rows[0].url);

        if (originalUrl.rows.length === 0) return res.status(404).send("Nenhum url cadastrado");

        res.redirect(originalUrl.rows[0].url);
    }
    catch (err) {
        res.status(500).send(err.message);
    }

}

export async function deleteUrl(req, res) {
    const userID = res.locals.session.rows[0].userID
    const { id } = req.params;
    try {
        const deleteUrl = await db.query(`SELECT * FROM urls WHERE id = $1`, [id]);
        //console.log(deleteUrl.rows[0]);

        if (!deleteUrl.rowCount) return res.status(404).send("Link não encontrado!");

        if (deleteUrl.rows[0].userID != userID) return res.status(401).send("Você não pode apagar uma link que não é seu")

        await db.query(`DELETE  FROM urls WHERE id = $1;`, [id]);

        res.status(201).send("Link excluído com sucesso!")
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

