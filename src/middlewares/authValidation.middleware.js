import { db } from "../database/database.connection.js"

export async function authValidation(req, res, next) {

try{}
catch (err){
    res.status(500).send(err.message);
}

}