const fs = require("fs");


const randomNumbers = [];

(() => {
    for (let _ = 1; _ <= 100; _ += 1) {
        randomNumbers.push(Math.floor(Math.random() * 100) + 1);
    }

})();

console.log(randomNumbers);


// fs.writeFile(path, data, cb) --> asynchronous
fs.writeFile("file-fs.txt", randomNumbers.join("\n"), (error) => {
    if (error) {
        console.error("Error writing to file:", error);
    } else {
        console.log("Successfully written to file");

        // fs.writeFileSync(path, data, options) --> synchronous

        // fs.readFile(path, options, cb) --> asynchronous
        // if no options provided, data will be returned as a Buffer (hexadecimal format)
        fs.readFile("file-fs.txt", "utf8", (error, data) => {
            if (error) {
                console.error("Error reading file:", error);
            } else {
                const txtToArr = data.split("\n")

                txtToArr.forEach((num, i, arr) => {
                    arr[i] = Number(num);
                });
                txtToArr.sort((a, b) => (a - b));
                console.log(txtToArr);

                fs.writeFile("file-fs.txt", txtToArr.join("\n"), (error) => {
                    if (error) {
                        console.error("Error updating file:", error);
                    } else console.log("Successfully updated file")
                });
            }
        });
    }
});
