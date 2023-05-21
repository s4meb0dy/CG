export default class ImageConverter {

  
    public static BMPtoPPM(readBMP: Buffer) : Buffer {
        const fileSize = readBMP.readUInt32LE(2)
        const pixelOffset = readBMP.readUInt32LE(10)
        const width = readBMP.readUInt32LE(18)
        const height = readBMP.readUInt32LE(22)
        const bitsPerPixel = readBMP.readUInt16LE(28)

        if (bitsPerPixel !== 24) {
            throw new Error("Неподдерживаемый формат BMP")
        }

        const ppmHeader = `P3\n${width} ${height}\n255\n`

        const ppmData = []

        for (let y = height - 1; y >= 0; y--) {
            for (let x = 0; x < width; x++) {
                const myPixelOffset: any = pixelOffset + (y * width + x) * 3
                const r = readBMP.readUInt8(myPixelOffset + 2)
                const g = readBMP.readUInt8(myPixelOffset + 1)
                const b = readBMP.readUInt8(myPixelOffset)
                ppmData.push(`${r} ${g} ${b}`)
            }
        }

        const resultStr = ppmHeader + ppmData.join("\n") 

        return Buffer.from(resultStr, "utf-8")
    }

    public static PPMtoBMP(ppmData: Buffer): Buffer {
        const ppmDataString = ppmData.toString()

        const lines = ppmDataString.trim().split("\n")
        const header = lines[0]
        const dimensions = lines[1].split(" ")
        const width = parseInt(dimensions[0])
        const height = parseInt(dimensions[1])
        const maxColorValue = parseInt(lines[2])
        const pixels = lines.slice(3).join(" ").split(/\s+/).map(Number)

        const bufferSize = 54 + pixels.length * 3
        const buffer = Buffer.alloc(bufferSize)

        buffer.write("BM", 0)
        buffer.writeUInt32LE(bufferSize, 2)
        buffer.writeUInt32LE(54, 10)
        buffer.writeUInt32LE(40, 14)
        buffer.writeUInt32LE(width, 18)
        buffer.writeUInt32LE(height, 22)
        buffer.writeUInt16LE(1, 26)
        buffer.writeUInt16LE(24, 28)
        buffer.writeUInt32LE(0, 30)
        buffer.writeUInt32LE(pixels.length, 34)
        buffer.writeInt32LE(2835, 38)
        buffer.writeInt32LE(2835, 42)
        buffer.writeUInt32LE(0, 46)
        buffer.writeUInt32LE(0, 50)

        let offset = 54
        const rowSize = width * 3
        for (let y = height - 1; y >= 0; y--) {
            for (let x = 0; x < width; x++) {
                const pixelIndex = (y * width + x) * 3
                const r = pixels[pixelIndex]
                const g = pixels[pixelIndex + 1]
                const b = pixels[pixelIndex + 2]
                buffer.writeUInt8(b, offset++)
                buffer.writeUInt8(g, offset++)
                buffer.writeUInt8(r, offset++)
            }

            const paddingBytes = (4 - (rowSize % 4)) % 4
            for (let i = 0; i < paddingBytes; i++) {
                buffer.writeUInt8(0, offset++)
            }
        }

        return buffer
    }
}
