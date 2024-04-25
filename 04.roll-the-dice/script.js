const rollButton = document.querySelector(".container__button");
const rollTotal = document.querySelector(".container__total");
const firstDice = document.querySelectorAll(".container__dice")[0];
const secondDice = document.querySelectorAll(".container__dice")[1];

rollButton.addEventListener("click", () => {
  rollButton.disabled = true;
  firstDice.classList.add("container__dice--rolling");
  secondDice.classList.add("container__dice--rolling");

  setTimeout(() => {
    const firstDiceRandomValue = Math.floor(Math.random() * 6) + 1;
    const secondDiceRandomValue = Math.floor(Math.random() * 6) + 1;

    firstDice.setAttribute("src", `./images/side_${firstDiceRandomValue}.png`);
    secondDice.setAttribute(
      "src",
      `./images/side_${secondDiceRandomValue}.png`
    );

    rollTotal.textContent = `Your roll is ${
      firstDiceRandomValue + secondDiceRandomValue
    }`;

    rollButton.disabled = false;
    firstDice.classList.remove("container__dice--rolling");
    secondDice.classList.remove("container__dice--rolling");
  }, 1000);
});
