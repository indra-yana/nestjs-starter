import ClientException from "./ClientException";

export default class ForbidenException extends ClientException {

    constructor({ message = 'Forbiden', error = [], tags = [] }) {
        super(message, 403);
        this.name = 'FORBIDEN_ERROR';
        this.error = error;
        this.tags = tags;

        this.saveLog();
    }

}