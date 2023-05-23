import PPMWriter from "../../lab2/plugins/ppm/PPMWriter";

export default class Writer {
  private imageData: number[][];
  constructor(imageData: number[][]) {
    this.imageData = imageData;
  }

  write(type: "console" | "file", path?: string ) {
    if (type === "console") {
      this.imageData.map((row) => {
        row.map((v) => process.stdout.write(charFromScalarProduct(v)));
        process.stdout.write("\n");
      });
    } else if (type === "file") {
      this.imageData;
      const header = `P3\n${this.imageData[0].length} ${this.imageData.length}\n255\n`;
      const body = this.imageData
        .map((row) =>
          row
            .map(
              (v) =>
                `${Math.round(255 * v)} ${Math.round(255 * v)} ${Math.round(
                  255 * v
                )}`
            )
            .join(" ")
        )
        .join("\n");

      const fileData = `${header}${body}`;
      if(path)
        PPMWriter.write(path, fileData)
      else console.log('You forgot add output path')
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
