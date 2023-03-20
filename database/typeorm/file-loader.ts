import { readdirSync } from "fs";

export async function readMigrationFile(folder: string): Promise<any> {
    const files = readdirSync(folder)
    .map(function(file) {
        return file;
    });

    const migrationFiles = [];
    for (let i = 0; i < files.length; i++) {
        const module = await import(`${folder}/${files[i]}`); 
        const value = module[Object.keys(module)[0]];

        migrationFiles.push(value);
    }
    
    return migrationFiles;
}