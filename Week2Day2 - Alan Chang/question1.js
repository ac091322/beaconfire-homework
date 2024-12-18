// GET request using fetch:
fetch("https://jsonplaceholder.typicode.com/users", {
    method: "GET"
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Fetch Error: ", error));


// GET request using XHR:
const XMLHttpRequest = require('xhr2');

const xhr = new XMLHttpRequest();
xhr.open("GET", "https://jsonplaceholder.typicode.com/users");

// optional: track the progress
xhr.onprogress = function (event) {
    console.log(`Received ${event.loaded} bytes`);
};

// handle response when the request is complete
xhr.onload = function () {
    console.log("Received response. xhr =", xhr);

    if (xhr.status != 200) {
        console.log(`Error: ${xhr.status}: ${xhr.statusText}`);
    } else {
        console.log("xhr.response =", xhr.response);
        const res = JSON.parse(xhr.response);
        console.log("JSON.parse(xhr.response) =", res);

        // does not work in Node.js (no document no Node.js), but works in the browser
        // const xhrP = document.getElementById("xhrP");
        // if (xhrP) xhrP.innerText = `Received ${res.length} users. Check the console for full details.`;
    }
};

// optional: handle request failure
xhr.onerror = function () {
    console.log("Request failed");
};

// send the request (must be at the bottom when run in a browser)
xhr.send();
