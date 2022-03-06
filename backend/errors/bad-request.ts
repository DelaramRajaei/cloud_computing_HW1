import { ResponsesCode } from "../constants/responses";
import { CustomError } from "./custom-error";

export class BadRequest extends CustomError {
    code: number = ResponsesCode.BAD_REQUEST;
    constructor(msg?: string) {
        super(msg || 'Bad Request');
    }
}