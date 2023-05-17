import fs from "fs";

export default class BMPWriter {
    constructor(){

    }

    private static _writeFile(filePath: string, data: string): void {
        fs.writeFileSync(filePath, data);
      }

    public static write(outputPath: string, data: string) {
        this._writeFile(outputPath, data);
    }

} 