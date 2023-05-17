import fs from "fs";

export default class BMPWriter {
    constructor(){

    }

    private static _writeFile(filePath: string, data: Buffer): void {
        fs.writeFileSync(filePath, data);
      }

    public static write(outputPath: string, data: Buffer) {
        this._writeFile(outputPath, data);
    }

} 