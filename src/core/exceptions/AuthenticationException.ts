import ClientException from "./ClientException";

export default class AuthenticationException extends ClientException {

    constructor({ message = 'Unathenticated', error = [], tags = [] }) {
        super(message, 401);
        this.name = 'AUTHENTICATION_ERROR';
        this.error = error;
        this.tags = tags;

        this.saveLog();
    }

}