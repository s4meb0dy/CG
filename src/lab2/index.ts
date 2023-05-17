import InputInformation from "./InputInformation";
import Manager from "./Manager";


try{
    const inputInformation = new InputInformation()
    const manager = new Manager(inputInformation.inputFormat, inputInformation.outputFormat)

    const readFile = manager.getReadCallback(inputInformation.inputPath)()
    const resultData = manager.getConvertorCallback(readFile)()

    manager.getWriteCallback(inputInformation.outputPath, resultData)()       
} 
catch(error){
    console.log("Error", error)
}

