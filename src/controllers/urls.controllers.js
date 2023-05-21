import { db } from "../database/database.connection.js"
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"
import { nanoid } from "nanoid";

export async function postUrlsShorten(req, res) {
    const { userId } = res.locals.session;

    const { url } = req.body
    try {
        const shortUrl = nanoid();

        const shortenedUrl = await db.query(`INSERT INTO urls ("userID", url, "shortUrl") VALUES ($1, $2, $3) RETURNING id, "shortUrl"`, [userId, url, shortUrl]);

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

