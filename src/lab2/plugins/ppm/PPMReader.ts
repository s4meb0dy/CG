import fs from "fs";

export default class PPMReader {

    constructor () {

    }

    private static _readFile(filePath: string): Buffer {
        return fs.readFileSync(filePath);
    }

    public static read(filePath: string){
        return this._readFile(filePath);
    } 

} 