const containerBody = document.querySelector(".container__body");
const form = document.querySelector(".container__form");
const formInput = document.querySelector(".container__form-input");
const formButton = document.querySelector(".container__form-button");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const url = `https://restcountries.com/v3.1/name/${formInput.value}?fullText=true`;

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      return res.json();
    })
    .then((country) => {
      country = country[0];
      containerBody.innerHTML += `
        <div class="container__country-info">
            <header class="container__country-info__header">
                <img class="container__country-info__flag" src="${
                  country.flags.svg
                }" width="200" height="120" alt="" loading="lazy" />
                <h1 class="container__country-info__name">${
                  country.name.common
                }</h1>
            </header>
            <div class="container__country-info__body">
                <ul class="container__country-info__list">
                    <li class="container__country-info__item"><b>Capital:</b> ${
                      country.capital[0]
                    }</li>
                    <li class="container__country-info__item"><b>Continent:</b> ${Object.keys(
                      country.continents
                    )
                      .map((key) => country.continents[key])
                      .join(", ")}</li>
                    <li class="container__country-info__item"><b>Population:</b> ${country.population
                      .toLocaleString("en-US", {
                        style: "decimal",
                        useGrouping: true,
                      })
                      .replace(/,/g, ".")}</li>
                    <li class="container__country-info__item"><b>Currency:</b> ${Object.keys(
                      country.currencies
                    ).join(", ")}</li>
                    <li class="container__country-info__item"><b>Common Languages:</b> ${Object.keys(
                      country.languages
                    ).join(", ")}</li>
                </ul>
            </div>
        </div>
      `;
    })
    .catch((err) => {
      containerBody.innerHTML += `
        <div class="container__country-info">
            <header class="container__country-info__header">
              <h1 class="container__country-info__name">${err.message}</h1>
            </header>
        </div>
      `;
    });
});
