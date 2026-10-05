

const movieForm = document.querySelector("#movieForm");
const movieInput = document.querySelector("#movieInput");
const movieHub = document.querySelector("#movieHub");


movieForm.addEventListener("submit" , (e) => {
    e.preventDefault();
    let query = movieInput.value.trim()

    if(!query){
        return
    }
    console.log(query);
    searchMovies(query)
})

async function searchMovies(movieName){

    movieHub.innerHTML = `<div class="loader"></div>`


    let response = await fetch(`http://www.omdbapi.com/?apikey=3f18c1ef&s=${encodeURIComponent(movieName)}`);
    let data = await response.json()
    console.log(data);

    if(data.Response === "True"){
        displayMovies(data.Search)
    }else{
        console.log(data.Error);
        movieHub.innerHTML = `<p>${data.Error}</p>`
    }
   
}

function displayMovies(movies){

    movieHub.innerHTML = ""

    movies.forEach((movie) => {
        const div = document.createElement("div")

        div.dataset.imdbID = movie.imdbID
        div.setAttribute("class" , "movie-card")

        const posterMarkup = movie.Poster && movie.Poster !== "N/A"
            ? `<img src="${movie.Poster}" alt="${movie.Title} poster">`
            : `<span class="poster-placeholder">No poster available</span>`

    div.innerHTML = `
    <div class="poster-frame">
    ${posterMarkup}
    </div>

    <div>
    <p>${movie.Title} </p>
    <p>${movie.Year} </p>
    </div>`

    const posterImage = div.querySelector(".poster-frame img")
    if (posterImage) {
        posterImage.addEventListener("error", () => {
            const placeholder = document.createElement("span")
            placeholder.className = "poster-placeholder"
            placeholder.textContent = "No poster available"
            posterImage.replaceWith(placeholder)
        }, { once: true })
    }

    movieHub.append(div)
    })  

}

movieHub.addEventListener("click" , (e) => {
    e.stopPropagation();
    const movieCard = e.target.closest(".movie-card")
    const imdbID = movieCard.dataset.imdbID
    console.log(imdbID);
    location.href = `movie-details.html?id=${imdbID}`
})