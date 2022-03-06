import { Request, NextFunction } from "express";
import { validationResult } from "express-validator";
import { BadRequest } from "./bad-request";

export const validateRequests = (req: Request, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors);
        next(new BadRequest());
    } else {
        next();
    }
}