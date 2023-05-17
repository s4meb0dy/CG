export default class ImageConverter {

    public static BMPtoPPM (readBMP: Buffer ) {

        const fileSize = readBMP.readUInt32LE(2);
        const pixelOffset = readBMP.readUInt32LE(10);
        const width = readBMP.readUInt32LE(18);
        const height = readBMP.readUInt32LE(22);
        const bitsPerPixel = readBMP.readUInt16LE(28);
        
        if (bitsPerPixel !== 24) {
            throw new Error("Неподдерживаемый формат BMP")
        }
    
        const ppmHeader = `P3\n${width} ${height}\n255\n`;

        const ppmData = [];

        for (let y = height - 1; y >= 0; y--) {
            for (let x = 0; x < width; x++) {
                const myPixelOffset: any = pixelOffset + (y * width + x) * 3;
                const r = readBMP.readUInt8(myPixelOffset + 2);
                const g = readBMP.readUInt8(myPixelOffset + 1);
                const b = readBMP.readUInt8(myPixelOffset);
                ppmData.push(`${r} ${g} ${b}`);
            }
        }
        return ppmHeader + ppmData.join("\n")
    }

}