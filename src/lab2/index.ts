import ImageConverter from "./ImageConverter";
import Loader from "./Loader";
import BMPReader from "./plugins/bmp/BMPReader";
import PPMWriter from "./plugins/ppm/PPMWriter";

const loader = new Loader()


const fileBmp = BMPReader.read(loader.inputPath)
try{
    const ppmData = ImageConverter.BMPtoPPM(fileBmp)
    PPMWriter.write(loader.outputPath, ppmData)
} 
catch(error){
    console.log("Error", error)
}

