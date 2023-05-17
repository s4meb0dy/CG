import ImageConverter from "./ImageConverter";
import BMPReader from "./plugins/bmp/BMPReader";
import PPMWriter from "./plugins/ppm/PPMWriter";

export default class Manager {

    private inputFormat = ''
    private outputFormat = ''

    constructor(inputFormat: string, outputFormat: string){
        this.inputFormat = inputFormat
        this.outputFormat = outputFormat
    }

    public getReadCallback (inputPath: string) {
        switch(this.inputFormat){
            case 'bmp':
                return () => {
                    return BMPReader.read(inputPath)
                }
                
            case 'ppm':
                return () => {
                    return BMPReader.read(inputPath)
                }
            default: 
                return () => {throw new Error('Some error')}
        }
    }

    public getWriteCallback (outputPath: string, ppmData: string) {
        switch(this.outputFormat){
            case 'bmp':
                return () => {
                    return PPMWriter.write(outputPath, ppmData)
                }
            case 'ppm':
                return () => {
                    return PPMWriter.write(outputPath, ppmData)
                }
            default: 
                return () => {throw new Error('Some error')}
        }
    }

    public getConvertorCallback (readFile: Buffer) {
        switch(`${this.inputFormat} - ${this.outputFormat}`){
            case 'bmp - ppm':
                return () => {
                    return ImageConverter.BMPtoPPM(readFile)
                }
            case 'ppm - bmp':
                return () => {
                    return ImageConverter.BMPtoPPM(readFile)
                }
            default: 
                return () => {throw new Error('Some error')}
        }
    }
}