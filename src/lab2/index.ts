import InputInformation from "./InputInformation"
import Factory from "./Factory"
const fs = require("fs")
const zlib = require("zlib")

const start = async () => {
    try {
        const inputInformation = new InputInformation()
        const manager = new Factory(
            inputInformation.inputFormat,
            inputInformation.outputFormat
        )

        await manager.loadPlugin()

        const readFile = manager.getReadCallback(inputInformation.inputPath)()
        const resultData = manager.getConvertorCallback(readFile)()

        manager.getWriteCallback(inputInformation.outputPath, resultData)()
    } catch (error: any) {
        console.log("Error", error?.message)
    }
}

start()

