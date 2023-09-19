import { connectDB } from "@/utill/database";



export default async function handler(req,res){
    let db = (await connectDB).db('forum')
    req.body = JSON.parse(req.body)
    await db.collection('post').insertOne(req.body);
    return res.status(200).json('성공')
}