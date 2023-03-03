import ClientException from "./ClientException";

export default class ValidationException extends ClientException {

    constructor({ message = 'Validation failed', error = [], tags = [] }) {
        super(message, 422);
        this.name = 'VALIDATION_ERROR';
        this.error = error;
        this.tags = tags;

        this.saveLog();
    }

}