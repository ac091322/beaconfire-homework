document.addEventListener("DOMContentLoaded", () => {
    fetchSongs();
});

function fetchSongs() {
    fetch("/api/songs/all/get")
        .then(response => response.json())
        .then(songs => {
            const songContainer = document.getElementById("song-list");

            songs.forEach(song => {
                const songTag = document.createElement("div");
                songTag.innerText = `${song.title}`;
                songContainer.appendChild(songTag);
            });
        })
        .catch(error => console.error('Error fetching songs:', error));
}
