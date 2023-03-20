import { readdirSync } from "fs";

export async function loadClassFile(folder: string): Promise<any> {
    const files = readdirSync(folder)
    .map(function(file) {
        return file;
    });

    const classFiles = [];
    for (let i = 0; i < files.length; i++) {
        const module = await import(`${folder}/${files[i]}`); 
        const value = module[Object.keys(module)[0]];

        classFiles.push(value);
    }
    
    return classFiles;
}