import fs from "fs";

export default class PPMReader {

    private static _readFile(filePath: string): string {
        return fs.readFileSync(filePath, 'utf8');
    }

    public static read(filePath: string){
        return this._readFile(filePath);
    } 

} 