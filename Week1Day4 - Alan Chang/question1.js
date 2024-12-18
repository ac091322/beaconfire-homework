function hideCities() {
    const cities = document.getElementsByClassName("city");
    Array.from(cities).forEach(city => {
        city.style.display = "none"
    });
}

function highlightButton(city) {
    const buttons = document.querySelectorAll(".tab button");
    buttons.forEach(button => {
        button.classList.remove("active");
    });

    const highlightButton = document.getElementById(`button-${city}`);
    highlightButton.classList.add("active");
}

function switchCity(city) {
    hideCities();
    document.getElementById(city).style.display = "flex";
}

window.onload = () => {
    hideCities();
    highlightButton("london");
    switchCity("london");
}

document.getElementById("button-london").addEventListener("click", () => {
    highlightButton("london");
    switchCity("london");
});

document.getElementById("button-paris").addEventListener("click", () => {
    highlightButton("paris");
    switchCity("paris");
});

document.getElementById("button-tokyo").addEventListener("click", () => {
    highlightButton("tokyo");
    switchCity("tokyo");
});
