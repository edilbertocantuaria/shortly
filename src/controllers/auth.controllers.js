import {db} from "../database/database.js"
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"

export async function signUp (req, res) {

    try{}
    catch (err){
        res.status(500).send(err.message);
    }
}