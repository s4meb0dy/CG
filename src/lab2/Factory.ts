import fs from "fs"
import ImageConverter from "./ImageConverter"


export default class Factory {
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
                    this.outputFormat
                }/${this.outputFormat.toUpperCase()}Writer.ts`
                )
            this.writePlugin = writeModule.default
        } catch (error) {
            const directoryPath = `${__dirname}/plugins`

            const files: string[] = fs.readdirSync(directoryPath)

            throw new Error(
                `Invalid images format. Supported only [${files.join(
                    ", "
                )}] formats. :)`
            )
        }
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