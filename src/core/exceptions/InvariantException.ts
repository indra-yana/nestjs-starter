import ClientException from "./ClientException";

export default class InvariantException extends ClientException {

    constructor({ message = 'Invariant Exception', error = [], tags = [] }) {
        super(message);
        this.name = 'INVARIANT_ERROR';
        this.error = error;
        this.tags = tags;

        this.saveLog();
    }

}