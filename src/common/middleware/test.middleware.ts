import { Req, Res, Next } from "@nestjs/common";

export function checklogs(req,res,next) {
    // console.log(req)
    if(req.path === '/auth/login') return next();
    next()
}