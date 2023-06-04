import Scene from "../lab1/objects/Scene"
import { Sphere } from "../lab1/objects/Sphere"
import Triangle from "../lab1/objects/Triangle"
import Reader from "./Reader"

interface IData {
    scene: (Triangle | Sphere)[]
    output: 'console' | 'file'
}

export const prestart = () => {
    const data: IData = {
        scene: [],
        output: 'console'
    }
    const args = process.argv.slice(2)
    args.forEach((arg) => {
        if (arg.includes("--source=")) {
            const inputFile = arg.slice(9)   
            const src = `${__dirname}/${inputFile}`.replace(/\\/g, "/") 
            data.scene.push(...Reader.readObjFile(src))
        }
        else if(arg.includes("--scene=")){
            const scene = arg.slice(8)
            data.scene.push(...Scene.getScene(scene, __dirname))
        }
        else if(arg.includes("--output=")){
            const outputType = arg.slice(9)
            if(outputType !== 'console' && outputType !== 'file')
                throw new Error("Occurred some error")
            
            data.output = outputType
        }
        else throw new Error("Occurred some error")
    })

    return data

} 