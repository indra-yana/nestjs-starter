import IAppException from "./interface/IAppException";

export default class ClientException extends Error implements IAppException {

    public code: number;
    public error: any;
    public tags: any;

    constructor(message: string = 'Bad request', code: number = 400) {
        super(message);
        this.name = 'CLIENT_ERROR';
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