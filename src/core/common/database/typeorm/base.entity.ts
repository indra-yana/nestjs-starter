import { BeforeInsert } from "typeorm";
import { nanoid } from "nanoid";

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