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
    public static PPMtoBMP(ppmData: string): Buffer {
        const lines = ppmData.trim().split("\n");
        const header = lines[0];
        const dimensions = lines[1].split(" ");
        const width = parseInt(dimensions[0]);
        const height = parseInt(dimensions[1]);
        const pixels = lines.slice(2).join(" ").split(/\s+/).map(Number);

        const bufferSize = 54 + pixels.length * 3;
        const buffer = Buffer.alloc(bufferSize);

        // BMP Header
        buffer.write("BM", 0); // Signature
        buffer.writeUInt32LE(bufferSize, 2); // File size
        buffer.writeUInt32LE(54, 10); // Pixel data offset
        buffer.writeUInt32LE(40, 14); // Header size
        buffer.writeUInt32LE(width, 18); // Width
        buffer.writeUInt32LE(height, 22); // Height
        buffer.writeUInt16LE(1, 26); // Planes
        buffer.writeUInt16LE(24, 28); // Bits per pixel
        buffer.writeUInt32LE(0, 30); // Compression method
        buffer.writeUInt32LE(pixels.length, 34); // Image size
        buffer.writeInt32LE(2835, 38); // Horizontal resolution (2835 = 72 dpi)
        buffer.writeInt32LE(2835, 42); // Vertical resolution (2835 = 72 dpi)
        buffer.writeUInt32LE(0, 46); // Number of colors in the palette
        buffer.writeUInt32LE(0, 50); // Important colors

        // Pixel data
        let offset = 54;
        for (let i = 0; i < pixels.length; i += 3) {
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];
            buffer.writeUInt8(b, offset++);
            buffer.writeUInt8(g, offset++);
            buffer.writeUInt8(r, offset++);
        }
        return buffer;
    }
}