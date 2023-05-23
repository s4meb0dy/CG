export default class InputInformation {
  public fileName: string = "";
  public inputFormat: string = "";
  public outputFormat: string = "";
  public outputPath: string = "";
  public outputCustomPath: string | null = null;

  public inputPath: string = "";

  constructor() {
    const args = process.argv.slice(2);
    args.forEach((arg) => {
      if (arg.includes("--source=")) {
        const inputFile = arg.slice(9);
        const dotIndex = inputFile.indexOf(".");
        this.fileName = inputFile.slice(0, dotIndex);
        this.inputFormat = inputFile.slice(dotIndex + 1);
      } else if (arg.includes("--goal-format=")) {
        this.outputFormat = arg.slice(14);
      } else if (arg.includes("--output=")) {
        this.outputPath =
          arg.slice(9) + this.fileName + "." + this.outputFormat;
          this.outputCustomPath = arg.slice(9)
      }
    });
    
    if (this.outputPath === "") {
      this.outputPath =
        process.argv[1].slice(0, -8) + this.fileName + "." + this.outputFormat;
    }
    
    this.inputPath =
      process.argv[1].slice(0, -8) + this.fileName + "." + this.inputFormat;
  }
}
