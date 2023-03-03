export default interface IAppException {
    code: number;
    error: any;
    tags: any;
    getError(): any;
    getTags(): any;
    getName(): string;
    getCode(): number;
    getMessage(): string;
    saveLog(): void;
}