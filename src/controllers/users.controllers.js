import { db } from "../database/database.connection.js"


export async function getMe(req, res) {
    const userID = res.locals.session.rows[0].userID
    const { id } = req.params;
    try {
        const user = await db.query(`SELECT * FROM users WHERE id = $1`, [userID]);
        const urls = await db.query(`SELECT * FROM urls WHERE "userID" = $1`, [userID]);

        if (!user.rowCount) return res.status(404).send("Usuário não encontrado");

        const visitCount = urls.rows.reduce((sum, url) => sum + url.visitCount, 0);

        const shortenedUrls = urls.rows.map((url) => ({
            id: url.id,
            shortUrl: url.shortUrl,
            url: url.url,
            visitCount: url.visitCount,
        }));

        const myDatas = {
            id: user.rows[0].id,
            name: user.rows[0].name,
            visitCount: visitCount,
            shortenedUrls: shortenedUrls,
        };

        res.status(200).send(myDatas);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getRank(req, res) {
    try {
        const rank = await db.query(`
        SELECT u.id, u.name, COUNT(url.id) AS linksCount, COALESCE(SUM(url."visitCount"), 0) AS "visitCount"
        FROM users AS u
        LEFT JOIN urls AS url ON u.id = url."userID"
        GROUP BY u.id, u.name
        ORDER BY "visitCount" DESC
        LIMIT 10
    `);
    
    //console.log(rank.rows);

        const rankData = rank.rows.map((infoUser) => ({
            id: infoUser.id,
            name: infoUser.name,
            linksCount: infoUser.linkscount,
            visitCount: infoUser.visitCount,
        }));


        res.status(200).send(rankData);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}





