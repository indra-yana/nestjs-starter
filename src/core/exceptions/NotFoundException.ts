import ClientException from "./ClientException";

export default class NotFoundException extends ClientException {

    constructor({ message = 'The data or resource can\'t be found', error = [], tags = [] }) {
        super(message, 404);
        this.name = 'NOTFOUND_ERROR';
        this.error = error;
        this.tags = tags;

        this.saveLog();
    }
}