export const randomUserContainer = document.getElementById("container-random-user-data");


function delayedRequest(url) {
    setTimeout(() => {
        fetch(url, { method: "GET" })
            .then(response => {
                if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
                return response.json();
            })
            .then(data => {
                console.log(data)

                randomUserContainer.innerHTML = "";

                const userData = [
                    `Name: ${data.name}`,
                    `Username: ${data.dataname}`,
                    `Email: ${data.email}`,
                    `Address: ${data.address.street}, ${data.address.suite}, ${data.address.city} ${data.address.zipcode}`,
                    `Latitude: ${data.address.geo.lat}`,
                    `Longitude: ${data.address.geo.lng}`,
                    `Phone: ${data.phone}`,
                    `Website: ${data.website}`,
                    `Company: ${data.company.name}`,
                    `Catch Phrase: ${data.company.catchPhrase}`,
                    `BS: ${data.company.bs}`
                ]

                userData.forEach(userText => {
                    const pTag = document.createElement("p");
                    pTag.textContent = userText;
                    randomUserContainer.appendChild(pTag);
                });
            })
            .catch(error => console.error("Fetch Error: ", error));
    }, 2_000);
}

document.getElementById("button-retrieve-random-user-data")
    .addEventListener("click", (e) => {
        e.preventDefault();

        randomUserContainer.innerHTML = ""

        let randomNum = Math.floor(Math.random() * 10) + 1;
        delayedRequest(`https://jsonplaceholder.typicode.com/users/${randomNum}`);
    });



export default delayedRequest;
