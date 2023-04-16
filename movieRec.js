const API_URL = 'pack.json';
const resultsDiv = document.getElementById("results");
const genreSelect = document.getElementById("genre-select");
const yearSelect = document.getElementById("year-select");
const ratingSelect = document.getElementById("rating-select");
const languageSelect = document.getElementById("language-select");
const searchButton = document.getElementById("search-button");

// Function to build the query string for the API call
function buildQueryString() {
  const genreValue = genreSelect.value;
  const yearValue = yearSelect.value;
  const ratingValue = ratingSelect.value;
  const languageValue = languageSelect.value;

  // Build the query string from the selected values
  let queryString = "?";
  if (genreValue !== "any") {
    queryString += `genres=${encodeURIComponent(genreValue)}&`;
  }
  if (yearValue !== "any") {
    queryString += `year=${encodeURIComponent(yearValue)}&`;
  }
  if (ratingValue !== "any") {
    queryString += `rating=${encodeURIComponent(ratingValue)}&`;
  }
  if (languageValue !== "any") {
    queryString += `original_language=${encodeURIComponent(languageValue)}&`;
  }

  // Remove the trailing "&" if there is one
  if (queryString.endsWith("&")) {
    queryString = queryString.slice(0, -1);
  }

  return queryString;
}

// Handle the search button click event
searchButton.addEventListener("click", () => {
  const queryString = buildQueryString();
  const apiUrl = `${API_URL}${queryString}`;

  // Fetch the movies and display them
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data); // Debugging line

      let filteredData = data;
      
      // Apply genre filter
      const genreValue = genreSelect.value;
      if (genreValue !== "any") {
        filteredData = filteredData.filter(movie => movie.genres.includes(genreValue));
      }
      
      // Apply year filter
      const yearValue = yearSelect.value;
      if (yearValue !== "any") {
        filteredData = filteredData.filter(movie => new Date(movie.release_date).getFullYear() === parseInt(yearValue));
      }
      
      // Apply rating filter
      const ratingValue = ratingSelect.value;
      if (ratingValue !== "any") {
        filteredData = filteredData.filter(movie => movie.certification === ratingValue);
      }
      
      // Apply language filter
      const languageValue = languageSelect.value;
      if (languageValue !== "any") {
        filteredData = filteredData.filter(movie => movie.original_language === languageValue);
      }

      let resultsHtml = "";
      filteredData.forEach(movie => {
        resultsHtml += `
        
        <table>
        <tr>
          <td><img src="https://image.tmdb.org/t/p/w45${movie.poster_path}" alt="${movie.title}"></td>
          <td>
          <p>${movie.title}</p>
            <p>Rating: ${movie.certification}</p>
            <p>Genres: ${movie.genres}</p>
            <p>Runtime: ${movie.runtime+"m"}</p>
          </td>
        </tr>
      </table>
      
        `;
      });
      resultsDiv.innerHTML = resultsHtml;
    })
    .catch(error => {
      console.log(error); // Debugging line
      resultsDiv.innerHTML = "<p>An error occurred while fetching the movies. Please try again later.</p>";
    });
});




// Populate the genre select with options
const genres = [ "Action",
"Adventure",
"Fantasy",
"Science Fiction"];
const genersOptions = genres.map(genre => `<option value="${genre}">${genre}</option>`).join("");
genreSelect.innerHTML = `<option value="any">Any</option>${genersOptions}`;

// Populate the year select with options
for (let i = new Date().getFullYear(); i >= 1900; i--) {
  yearSelect.innerHTML += `<option value="${i}">${i}</option>`;
}


// Populate the year select with options
for (let i = new Date().getFullYear(); i >= 1900; i--) {
  yearSelect.innerHTML += `<option value="${i}">${i}</option>`;
}

// Populate the rating select with options
const ratings = ["G", "PG", "PG-13", "R", "NC-17"];
const ratingOptions = ratings.map(rating => `<option value="${rating}">${rating}</option>`).join("");
ratingSelect.innerHTML = `<option value="any">Any</option>${ratingOptions}`;

// Populate the language select with options
const languages = ["English", "Spanish", "French", "German", "Japanese", "Chinese", "Korean","Cantonese"];
const languageOptions = languages.map(language => `<option value="${language}">${language}</option>`).join("");
languageSelect.innerHTML = `<option value="any">Any</option>${languageOptions}`;
