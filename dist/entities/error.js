export class LinttierError extends Error {
    name;
    message;
    cause;
    constructor({ name, message, cause }) {
        super();
        this.name = name;
        this.message = message;
        this.cause = cause;
    }
}
