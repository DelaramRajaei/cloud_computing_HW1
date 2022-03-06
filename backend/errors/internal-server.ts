import { ResponsesCode } from "../constants/responses";
import { CustomError } from "./custom-error";

export class InternalServer extends CustomError {
    code: number = ResponsesCode.SERVER_ERROR;
    constructor(msg?: string) {
        super(msg || 'Internal Server Error');
    }
}