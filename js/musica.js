let songData = {};

fetch('../musica.json')
    .then(response => response.json())
    .then(data => {
        songData = data.Artistas; // Acessa o objeto "Artistas"
        loadSelectedSong();
    })
    .catch(error => console.error('Erro ao carregar JSON:', error));

function loadSelectedSong() {
    const selectedSong = localStorage.getItem("selectedSong");
    let artistFound = null;
    let songDetails = null;

    // Procurar a música em todos os artistas
    for (const [artist, artistData] of Object.entries(songData)) {
        if (artistData.músicas && artistData.músicas[selectedSong]) {
            artistFound = artist;
            songDetails = artistData.músicas[selectedSong];
            break;
        }
    }

    if (artistFound && songDetails) {
        document.getElementById("song-title").innerText = selectedSong;

        // Usa displayName se existir, senão usa a chave do artista
        const artistDisplayName = songData[artistFound].displayName || artistFound;
        document.getElementById("artist-name").innerText = artistDisplayName;

        const artistImageElement = document.getElementById("artist-image");
        if (artistImageElement) {
            artistImageElement.src = songData[artistFound].artistImage;
            artistImageElement.alt = `Foto de ${artistDisplayName}`;
        }

        document.getElementById("song-tabs-content").innerHTML = songDetails.tabs;
        document.getElementById("song-video").src = songDetails.videoUrl + "?autoplay=0";
        document.getElementById("song-video1").src = songDetails.videoUrl + "?autoplay=0";

        // Carrega outras músicas do mesmo artista
        loadOtherSongs(artistFound, selectedSong);
    } else {
        // Tratar música não encontrada
        document.getElementById("song-title").innerText = "Música não encontrada";
        document.getElementById("artist-name").innerText = "";
        document.getElementById("song-tabs-content").innerHTML = "";
        document.getElementById("song-video").style.display = "none";

        const artistImageElement = document.getElementById("artist-image");
        if (artistImageElement) {
            artistImageElement.src = "";
            artistImageElement.alt = "";
        }
    }
}

function loadOtherSongs(artist, currentSong) {
    const otherSongsList = document.querySelector('.sidebar ul');
    otherSongsList.innerHTML = ''; // Limpa a lista atual

    // Verifica se o artista tem músicas
    if (songData[artist] && songData[artist].músicas) {
        const songs = Object.keys(songData[artist].músicas);
        
        // Filtra a música atual e cria itens para as outras
        songs.filter(song => song !== currentSong).forEach(song => {
            const listItem = document.createElement('li');
            listItem.textContent = song;
            listItem.innerHTML += ' <span class="music-icons">🎵</span>';
            
            // Adiciona evento de clique para carregar a música selecionada
            listItem.addEventListener('click', () => {
                localStorage.setItem("selectedSong", song);
                loadSelectedSong();
            });
            
            otherSongsList.appendChild(listItem);
        });
    }
    
    // Se não houver outras músicas ou se for o único
    if (otherSongsList.children.length === 0) {
        const listItem = document.createElement('li');
        listItem.textContent = "Nenhuma outra música disponível";
        otherSongsList.appendChild(listItem);
    }
}