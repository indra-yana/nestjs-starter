import * as crypto from 'crypto';
import * as path from 'path';
import * as fs from 'fs';
import { nanoid } from 'nanoid';

export function joiValidationFormat(errors: any): any {
    const errorKey = {};
    errors.map((error: any) => {
        // const field = error.path.join('_');
        const field = [error.path[0]].join('_');

        if (!errorKey.hasOwnProperty(field)) {
            errorKey[field] = [error.message];
        } else {
            errorKey[field].push(error.message);
        }

        return errorKey;
    });

    return errorKey;
}

export function toTitleCase(str: string) {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        },
    )
}

export function toCamelCase(name: string) {
    if (typeof name !== 'string') {
        return name;
    }

    return name.replace(/-(\w)/gi, (word, letter) => {
        return letter.toUpperCase();
    });
}

export function ucfirst(str: string) {
    return str.charAt(0).toUpperCase() + str.substr(1);
}

export function lcfirst(str: string) {
    return str.charAt(0).toLowerCase() + str.substr(1);
}

export function isObject(item: any) {
    return item && typeof item === 'object' && !Array.isArray(item);
}

export function isEmpty(data: any) {
    return Array.isArray(data) ? data.length === 0 : Object.keys(data || {}).length === 0;
}

export function chunkArray(arr: Array<any>, chunk: number) {
    let i: number;
    let j: number;
    const tmp = [];

    for (i = 0, j = arr.length; i < j; i += chunk) {
        tmp.push(arr.slice(i, i + chunk));
    }

    return tmp;
}

export function createToken(...data: any) {
    const delimiter = ':';
    return crypto
        .createHash('sha256')
        .update(process.env.ACCESS_TOKEN_KEY + delimiter + data.join(delimiter))
        .digest('hex');
}

export function deleteDir(dirPath: string) {
    if (fs.existsSync(dirPath)) {
        fs.readdirSync(dirPath).forEach(function (entry) {
            const entryPath = path.join(dirPath, entry);
            if (fs.lstatSync(entryPath).isDirectory()) {
                this.deleteDir(entryPath);
            } else {
                fs.unlinkSync(entryPath);
            }
        });

        fs.rmdirSync(dirPath);
    }
}

export function isFileExists(filePath: string) {
    try {
        fs.statSync(filePath);
    } catch (err) {
        if (err.code === 'ENOENT') return false;
    }

    return true;
}

export function isFile(filePath: string) {
    let filestat: any;

    try {
        filestat = fs.statSync(filePath);
    } catch (err) {
        if (err.code === 'ENOENT') return false;
    }
    if (!filestat) return false;

    return filestat.isFile();
}

export function roleFormat(role: string) {
    return role.toLowerCase().replace(/\s+/g, "_");
}

export function randomName(prefix = '') {
    return `${prefix}${nanoid(8)}`;
}

export function randomUserName() {
    return `user${nanoid(8)}`;
}

export function randomPassword() {
    return nanoid(12);
}
