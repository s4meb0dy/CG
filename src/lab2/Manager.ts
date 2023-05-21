import fs from "fs"
import ImageConverter from "./ImageConverter"
// import BMPReader from "./plugins/bmp/BMPReader"
// import BMPWriter from "./plugins/bmp/BMPWriter"
// import PPMReader from "./plugins/ppm/PPMReader"
// import PPMWriter from "./plugins/ppm/PPMWriter"

export default class Manager {
    private inputFormat = ""
    private outputFormat = ""
    private readPlugin: any
    private writePlugin: any

    constructor(inputFormat: string, outputFormat: string) {
        this.inputFormat = inputFormat
        this.outputFormat = outputFormat

        if (inputFormat === outputFormat) {
            throw new Error("Invalid output format")
        }
    }

    public async loadPlugin() {
        try {
            const readModule = await import(
                `./plugins/${
                    this.inputFormat
                }/${this.inputFormat.toUpperCase()}Reader.ts`
            )
            this.readPlugin = readModule.default

            const writeModule = await import(
                `./plugins/${
                    this.inputFormat
                }/${this.inputFormat.toUpperCase()}Writer.ts`
            )
            this.writePlugin = writeModule.default
        } catch (error) {
            const directoryPath = "D:/projects/kpi/CG/src/lab2/plugins"
            const files: string[] = fs.readdirSync(directoryPath)

            throw new Error(
                `Invalid images format. Supported only [${files.join(
                    ", "
                )}] formats. :)`
            )
        }
        console.log(this.readPlugin)
        console.log(this.writePlugin)
    }

    public getReadCallback(inputPath: string) {
        return () => {
            return this.readPlugin.read(inputPath)
        }
    }

    public getWriteCallback(outputPath: string, data: Buffer) {
        return () => {
            return this.writePlugin.write(outputPath, data)
            
        }
    }

    public getConvertorCallback(readFile: Buffer) {
        switch (`${this.inputFormat} - ${this.outputFormat}`) {
            case "bmp - ppm":
                return () => {
                    if (readFile instanceof Buffer)
                        return ImageConverter.BMPtoPPM(readFile)
                    else throw new Error("Some error")
                }
            case "ppm - bmp":
                return () => {
                    if (typeof readFile === "string")
                        return ImageConverter.PPMtoBMP(readFile)
                    else throw new Error("Some error")
                }
            default:
                return () => {
                    throw new Error("Invalid output format")
                }
        }
    }
}
