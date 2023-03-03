import ServerException from "./ServerException";

export default class QueryException extends ServerException {

    constructor({ message = 'Failed to excecuted query', error = [], tags = [] }) {
        super(message);
        this.name = 'QUERY_ERROR';
        this.error = error;
        this.tags = tags;

        this.saveLog();
    }
}