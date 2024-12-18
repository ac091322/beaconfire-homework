document.getElementById("button-retrieve-api-data")
    .addEventListener("click", (e) => {
        e.preventDefault();

        const idInput = document.getElementById("input-id");

        if (idInput.value.length === 0) {
            alert("Please enter a user ID");
            return;
        } else if (isNaN(idInput.value)) {
            alert("Please enter a number");
            return;
        } else if (!isNaN(idInput.value) && idInput.value <= 0) {
            alert("The number entered must be greater than 0");
            return;
        }

        const userId = idInput.value;

        Promise.all([
            fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, { method: "GET" }),
            fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`, { method: "GET" }),
            fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`, { method: "GET" })
        ])
            .then(responses => Promise.all(responses.map(response => {
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error("User not found, please try another user ID");
                    } else {
                        throw new Error(`Error: ${response.status} ${response.statusText}`);
                    }
                } else return response.json();
            })))
            .then(data => {
                const [user, posts, todos] = data;
                const userDataContainer = document.getElementById("container-api-data");
                userDataContainer.innerHTML = "";

                console.log("All API Data: ", data);
                console.log("User Data:", user);
                console.log("User Posts: ", posts);
                console.log("User Todos: ", todos);

                const userData = [
                    `Name: ${user.name}`,
                    `Username: ${user.username}`,
                    `Email: ${user.email}`,
                    `Address: ${user.address.street}, ${user.address.suite}, ${user.address.city} ${user.address.zipcode}`,
                    `Latitude: ${user.address.geo.lat}`,
                    `Longitude: ${user.address.geo.lng}`,
                    `Phone: ${user.phone}`,
                    `Website: ${user.website}`,
                    `Company: ${user.company.name}`,
                    `Catch Phrase: ${user.company.catchPhrase}`,
                    `BS: ${user.company.bs}`
                ];

                const userParagraphsLabel = document.createElement("p");
                userParagraphsLabel.innerText = "User Data:"
                userParagraphsLabel.setAttribute("class", "title-api-data");
                userDataContainer.appendChild(userParagraphsLabel);

                userData.forEach(userText => {
                    const pTag = document.createElement("p");
                    pTag.textContent = userText;
                    userDataContainer.appendChild(pTag);
                });

                const userPostsLabel = document.createElement("p");
                userPostsLabel.textContent = "User Posts:";
                userPostsLabel.setAttribute("class", "title-api-data");
                userDataContainer.appendChild(userPostsLabel);

                posts.forEach(post => {
                    const titleTag = document.createElement("p");
                    titleTag.textContent = `Post Title: ${post.title}`;

                    const bodyTag = document.createElement("p");
                    bodyTag.textContent = `Post Body: ${post.body}`;

                    userDataContainer.append(titleTag, bodyTag);
                });

                const userTodosLabel = document.createElement("p");
                userTodosLabel.innerText = "User Todos:";
                userTodosLabel.setAttribute("class", "title-api-data");
                userDataContainer.appendChild(userTodosLabel);

                todos.forEach(todo => {
                    const titleTag = document.createElement("p");
                    titleTag.textContent = `Todo Title: ${todo.title}`;

                    const statusTag = document.createElement("p");
                    statusTag.textContent = `Todo Status: ${todo.completed}`;

                    userDataContainer.append(titleTag, statusTag);
                });
            })
            .catch(error => {
                console.error("Fetch Error: ", error);
                alert(error.message);
            });
    });
