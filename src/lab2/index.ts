import ImageConverter from "./ImageConverter";
import InputInformation from "./InputInformation";
import Manager from "./Manager";
import BMPReader from "./plugins/bmp/BMPReader";
import PPMWriter from "./plugins/ppm/PPMWriter";

const inputInformation = new InputInformation()

const manager = new Manager(inputInformation.inputFormat, inputInformation.outputFormat)

try{
    const readFile = manager.getReadCallback(inputInformation.inputPath)()
    const resultData = manager.getConvertorCallback(readFile)()

    manager.getWriteCallback(inputInformation.outputPath, resultData)()       
} 
catch(error){
    console.log("Error", error)
}

