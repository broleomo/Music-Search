let searchButton = document.querySelector("button");
let results = document.querySelector(".results");
let searchContent = document.querySelector(".searchBar");
let audio = document.querySelector('audio');

let api = "https://itunes.apple.com/search?media=music&term=";

searchButton.addEventListener("click", musicSearch);
searchContent.addEventListener("keypress", function(event){
  if (event.keyCode === 13) {
    musicSearch();
  }
});
  function musicSearch(){
    let artist = searchContent.value;
    let url = `${api}${artist}`;
    fetch(url).then(function (response) {
      response.json().then(artistEntry)
    });

  function artistEntry(data) {
    results.innerHTML = "";
    for (var i = 0; i < 25; i++) {
      let snippet = data.results[i].previewUrl;
      let artist = data.results[i].artistName;
      let song = data.results[i].trackName;
      let album = data.results[i].collectionName;
      let div = document.createElement('div');
      div.setAttribute("class", "result");
      div.innerHTML = `
                    <p class="artistName">${artist}</p>
                    <img src=${data.results[i].artworkUrl100} alt="album cover">
                    <p class="artistSong">${song}</p>
                    <p class="artistAlbum">${album}</p>
                    `;

      div.addEventListener("click", playSong);
      function playSong() {
        audio.setAttribute("src", snippet);
        audio.play();
      }
      results.appendChild(div);
    }
  }
}
