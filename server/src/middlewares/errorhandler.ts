
import { Request,Response } from "express"

const notFound = (req:Request, res:Response ,next: any)=>{

    const error = new Error (`Not found ${req.originalUrl}`);

    next(error)




}

export default notFound