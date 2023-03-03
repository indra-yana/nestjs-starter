import ClientException from "./ClientException";

export default class AuthorizationException extends ClientException {

    constructor({ message = 'Unauthorized', error = [], tags = [] }) {
        super(message, 403);
        this.name = 'AUTHORIZATION_ERROR';
        this.error = error;
        this.tags = tags;

        this.saveLog();
    }

}