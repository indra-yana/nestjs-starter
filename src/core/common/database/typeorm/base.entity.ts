import { nanoid } from "nanoid";
import { BeforeInsert, PrimaryColumn } from "typeorm";

export default class BaseEntity<T> {

    constructor(params: Partial<T>) {
        if (params) {
            Object.assign(this, params);
        }
    }

    @BeforeInsert()
    createId() {
        this['id'] = nanoid(16);
    }
}