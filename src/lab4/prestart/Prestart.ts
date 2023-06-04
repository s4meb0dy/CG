const prestart = () => {
    const args = process.argv.slice(2)
    args.forEach((arg) => {
        if (arg.includes("--source=")) {
            const inputFile = arg.slice(9)

            // src = `${__dirname}/${inputFile}`.replace(/\\/g, "/")

            console.log()

        } else throw new Error("obj file error")
    })

} 