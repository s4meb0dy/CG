import Reader from "./Reader"

const start = async () => {
    let src = ''

    try {
        const args = process.argv.slice(2)
        args.forEach((arg) => {
            if (arg.includes("--source=")) {
                const inputFile = arg.slice(9)
                
                src = `${__dirname}/${inputFile}`.replace(/\\/g, "/")

                const triangles = Reader.readObjFile(src);
                console.log(triangles)
            } 
            else throw new Error('obj file error')
        })
    } catch (error: any) {
        console.log("Error", error?.message)
    }
}

start()

