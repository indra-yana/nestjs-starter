import IAppException from "./interface/IAppException";

export default class ServerException extends Error implements IAppException {

    public code: number;
    public error: any;
    public tags: any;

    constructor(message: string = 'Internal server error', code: number = 500) {
        super(message);
        this.name = 'INTERNAL_SERVER_ERROR';
        this.code = code;
    }

    getMessage(): string {
        return this.message;
    }

    getError() {
        return this.error;
    }

    getTags() {
        return this.tags;
    }

    getName(): string {
        return this.name;
    }

    getCode(): number {
        return this.code;
    }

    async saveLog() {
        console.log(this.name, {
            message: `${this.name} - ${this.message}`,
            error: this.error,
            tags: this.tags,
            stack: this.stack,
        });
    }
}