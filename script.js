const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const resultsContainer = document.getElementById('results');
const resultsTitle = document.getElementById('results-title');

form.addEventListener('submit', e => {
  e.preventDefault();
  const query = input.value.trim();
  if(query) {
    searchMeals(query);
  }
});

async function searchMeals(query) {
  resultsContainer.innerHTML = 'Loading...';
  resultsTitle.textContent = `Search results for "${query}":`;

  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await res.json();

    if(data.meals) {
      resultsContainer.innerHTML = data.meals.map(meal => `
        <div class="recipe-card">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <div class="info">
            <h3>${meal.strMeal}</h3>
            <span>${meal.strCategory}</span>
          </div>
        </div>
      `).join('');
    } else {
      resultsContainer.innerHTML = '<p>No recipes found.</p>';
    }
  } catch (err) {
    console.error(err);
    resultsContainer.innerHTML = '<p>Failed to fetch recipes. Try again later.</p>';
  }
}
