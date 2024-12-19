const fsPromise = require("fs/promises");
const { text } = require("stream/consumers");

const randomNumbers = [];

(() => {
    for (let _ = 1; _ <= 100; _ += 1) {
        randomNumbers.push(Math.floor(Math.random() * 100) + 1);
    }
})();

console.log(randomNumbers);

// other encoding options include: ascii, base64, hex
async function writeAndReadFile(filePath, dataToWrite, encoding = "utf8") {
    try {
        // fsPromise.writeFile(path, data, options)
        await fsPromise.writeFile(filePath, dataToWrite);
        console.log("Successfully written to file");

        // fsPromise.readFile(path, options)
        // can specify "utf8" as the encoding option to directly receive the file content as a string
        // if options not specified, content will be returned as a Buffer (hexadecimal format)
        const data = await fsPromise.readFile(filePath);
        const strData = data.toString();

        const txtToArr = strData.split("\n");
        txtToArr.forEach((num, i, arr) => {
            arr[i] = Number(num);
        });
        txtToArr.sort((a, b) => (a - b));
        console.log(txtToArr);

        // fsPromise.writeFile(path, data, options)
        // can include optional { encoding: "utf8" } as options
        await fsPromise.writeFile(filePath, txtToArr.join("\n"));
        console.log("Successfully updated file");

    } catch (error) {
        console.error("Error writing to file:", error);
    }
}

writeAndReadFile("file-fspromise.txt", randomNumbers.join("\n"));
