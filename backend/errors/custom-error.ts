export abstract class CustomError extends Error {
    abstract code: number;

    constructor(msg: string) {
        super(msg);
    }
}