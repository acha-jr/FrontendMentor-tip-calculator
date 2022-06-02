const inputs = document.querySelectorAll("input");
let bill = inputs[0];
let persons = inputs[2];
const personBox = document.querySelector(".persons");

const tips = document.querySelectorAll(".tip-option h2");
const tipPercent = [...document.querySelectorAll(".percent")];

let custom = document.getElementById("custom");

const tipAmount = document.getElementById("amount");
const totalAmount = document.getElementById("total");

const reset = document.querySelector("button");

// console.log(tipPercent[1].textContent);

tips.forEach((tip) => {
  tip.addEventListener("click", () => {
    for (let i = 0; i < tips.length; i++) {
      tips[i].classList.remove("current-tip");
    }
    tip.classList.add("current-tip");
  });
});

tipPercent.forEach((e) => {
  let box = e.parentElement;

  box.addEventListener("click", () => {
    custom.value = "";
    if (bill.value != "" && persons.value != "" && persons.value > 0) {
      let billNumber = parseFloat(bill.value);

      // Calculates Tip Amount per person
      let currentTipAmount = parseFloat(
        (billNumber * (e.textContent / 100)) / persons.value
      );
      tipAmount.textContent = `$${currentTipAmount.toFixed(2)}`;

      // Calculates Total Amount per person
      totalAmount.textContent = `$${parseFloat(
        currentTipAmount + billNumber / persons.value
      ).toFixed(2)}`;
    }

    setInterval(() => {
      personBox.classList.remove("error");
      if (persons.value < 1) {
        personBox.classList.add("error");
      }
    });
  });
  // Custom Percentage
  setInterval(() => {
    let billNumber = parseFloat(bill.value);
    if (custom.value != "" && persons.value != "") {
      let currentTipAmount = parseFloat(
        (billNumber * (custom.value / 100)) / persons.value
      );
      tipAmount.textContent = `$${currentTipAmount.toFixed(2)}`;
      totalAmount.textContent = `$${parseFloat(
        currentTipAmount + billNumber / persons.value
      ).toFixed(2)}`;
    }
  });
});

setInterval(() => {
  reset.classList.remove("active");
  if (bill.value || persons.value || custom.value) {
    reset.classList.add("active");
  }
});

// Resets The calculator
reset.addEventListener("click", () => {
  tipAmount.textContent = "$0.00";
  totalAmount.textContent = "$0.00";
  tips.forEach((e) => {
    e.classList.remove("current-tip");
  });
  personBox.classList.remove("error");
  bill.value = "";
  persons.value = "";
  custom.value = "";
});

//
custom.addEventListener("focus", () => {
  tips.forEach((e) => {
    e.classList.remove("current-tip");
  });
});
