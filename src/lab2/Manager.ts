import fs from "fs";
import ImageConverter from "./ImageConverter";
import BMPReader from "./plugins/bmp/BMPReader";
import BMPWriter from "./plugins/bmp/BMPWriter";
import PPMReader from "./plugins/ppm/PPMReader";
import PPMWriter from "./plugins/ppm/PPMWriter";
import { error } from "console";

export default class Manager {

    private inputFormat = ''
    private outputFormat = ''

    constructor(inputFormat: string, outputFormat: string){
        if (fs.existsSync(inputFormat)){
            throw new Error('Invalid input format');
            
        }
        if (fs.existsSync(outputFormat)){
            throw new Error('Invalid output format');
            
        }
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
                    return PPMReader.read(inputPath)
                }
            default: 
                return () => {throw new Error('Invalid input format')}
        }
    }

    public getWriteCallback (outputPath: string, data: string | Buffer) {
        switch(this.outputFormat){
            case 'bmp':
                return () => {
                    if(data instanceof Buffer)
                        return BMPWriter.write(outputPath, data)
                    else () => {throw new Error('Some error')}
                }
            case 'ppm':
                return () => {
                    if(typeof data === 'string')
                        return PPMWriter.write(outputPath, data)
                    else () => {throw new Error('Some error')}
                }
            default: 
                return () => {throw new Error('Some error')}
        }
    }

    public getConvertorCallback (readFile: Buffer | string) {
        switch(`${this.inputFormat} - ${this.outputFormat}`){
            case 'bmp - ppm':
                return () => {
                    if(readFile instanceof Buffer)
                        return ImageConverter.BMPtoPPM(readFile)
                    else throw new Error('Some error')
                }
            case 'ppm - bmp':
                return () => {
                    if(typeof readFile === 'string')
                        return ImageConverter.PPMtoBMP(readFile)
                    else throw new Error('Some error')
                }
            default: 
                return () => {throw new Error('Invalid output format')}
        }
        
    }
    
}