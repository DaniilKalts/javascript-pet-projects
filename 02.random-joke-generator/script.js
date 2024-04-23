const jokeEmoji = document.querySelector(".container__emoji");
const jokeParagraph = document.querySelector(".container__joke > p");
const jokeButton = document.querySelector(".container__button");

/* prettier-ignore */
const url = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=sexist,explicit&type=single";

jokeButton.addEventListener("click", () => {
  jokeButton.disabled = true;
  jokeButton.textContent = "Loading...";

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      return res.json();
    })
    .then((item) => {
      jokeParagraph.textContent = item.joke;
      jokeEmoji.classList.add("container__emoji--laugh");
      jokeParagraph.classList.add("container__joke--fade");
    })
    .catch((err) => {
      jokeParagraph.textContent = err.message;
    })
    .finally(() => {
      setTimeout(() => {
        jokeButton.disabled = false;
        jokeButton.textContent = "Get Random Joke";
        jokeParagraph.classList.remove("container__joke--fade");
        jokeEmoji.classList.remove("container__emoji--laugh");
      }, 1000);
    });
});
