import ImageConverter from "../../lab2/ImageConverter";
import BMPWriter from "../../lab2/plugins/bmp/BMPWriter";
import PPMWriter from "../../lab2/plugins/ppm/PPMWriter";

export default class Writer {
    private imageData: number[][];
    constructor(imageData: number[][]) {
        this.imageData = imageData;
    }

    write(type: "console" | "file", path?: string, format: string = "ppm") {
        if (type === "console") {
            this.imageData.map((row) => {
                row.map((v) => process.stdout.write(charFromScalarProduct(v)));
                process.stdout.write("\n");
            });
        } else if (type === "file") {
            const header = `P3\n${this.imageData[0].length} ${this.imageData.length}\n255\n`;
            const body = this.imageData
                .map((row) =>
                    row
                        .map(
                            (v) =>
                                `${Math.round(255 * v)} ${Math.round(
                                    255 * v
                                )} ${Math.round(255 * v)}`
                        )
                        .join(" ")
                )
                .join("\n");

            const fileData = `${header}${body}`;

            if (format === "ppm" && path) {
                PPMWriter.write(path, fileData);
            } else if (format === "bmp" && path){
                // PPMWriter.write(path, fileData);
                BMPWriter.write(path, ImageConverter.PPMtoBMP(Buffer.from(fileData, 'utf8')))
            }
            else console.log("You forgot add output path");
        }

        function charFromScalarProduct(scalarProduct: number): string {
            if (scalarProduct < 0) {
                return " ";
            } else if (scalarProduct < 0.2) {
                return ".";
            } else if (scalarProduct < 0.5) {
                return "*";
            } else if (scalarProduct < 0.8) {
                return "O";
            } else {
                return "#";
            }
        }
    }
}
