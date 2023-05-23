import InputInformation from "./InputInformation"
import Factory from "./Factory"
const fs = require("fs")
const zlib = require("zlib")

const start = async () => {
    try {
        const inputInformation = new InputInformation()
        const factory = new Factory(
            inputInformation.inputFormat,
            inputInformation.outputFormat
        )

        await factory.loadPlugin()
        if(inputInformation.outputCustomPath && inputInformation.outputCustomPath != '')
            await factory.checkExistenceOutputDir(inputInformation.outputCustomPath)

        const readFile = factory.getReadCallback(inputInformation.inputPath)()
        const resultData = factory.getConvertorCallback(readFile)()
        
        factory.getWriteCallback(inputInformation.outputPath , resultData)()
        console.log('Everything is ok)')
    } catch (error: any) {
        console.log("Error", error?.message)
    }
}

start()

