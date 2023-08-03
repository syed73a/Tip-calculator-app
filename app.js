"use strict";

// ELEMENTS
const tipPercent = document.querySelectorAll(".js-tip__percent");
const tipCustom = document.querySelector(".js-tip__custom");
const billValue = document.querySelector(".bill__input");
const noOfPpl = document.querySelector(".people__input");
const resetBtn = document.querySelector(".result__cta");
const tipPerPerson = document.querySelector(".tip-amount__value");
const billPerPerson = document.querySelector(".bill-amount__value");
const message = document.querySelector(".error-message");

// VARIABLE

let inputValue = "";
let person = "";

// FUNCTIONS

const resetCond = function () {
  tipPerPerson.innerText = "$ 0.00";
  billPerPerson.innerText = "$ 0.00";
  tipCustom.value = "";
};

const removeSelected = function () {
  tipPercent.forEach(function (prevButton) {
    prevButton.classList.remove("selected");
  });
};

const calculateTip = function (tip) {
  if (inputValue > 0 && person > 0) {
    const tipValuePerPerson = (tip / person).toFixed(2);
    const billValuePerPerson = ((inputValue + tip) / person).toFixed(2);
    tipPerPerson.innerText = `$ ${tipValuePerPerson}`;
    billPerPerson.innerText = `$ ${billValuePerPerson}`;
  } else if (inputValue > 0 && (isNaN(person) || person <= 0)) {
    noOfPpl.classList.add("error");
    message.classList.add("display");
    tipCustom.value = "";
    removeSelected();
  } else {
    resetCond();
    removeSelected();
  }
};

// EVENT HANDLER

// /// Note how to get input value from input box
billValue.addEventListener("input", function (event) {
  inputValue = Number(event.target.value);
  billValue.classList.add("active");
});

noOfPpl.addEventListener("input", function (e) {
  person = Number(e.target.value);
  message.classList.remove("display");
  noOfPpl.classList.remove("error");
  noOfPpl.classList.add("active");
});

tipPercent.forEach(function (button) {
  button.addEventListener("click", function () {
    removeSelected();
    tipCustom.value = "";
    button.classList.add("selected");
    const buttonValue = this.innerText.trim();
    const tip = (parseFloat(buttonValue.replace("%", "")) / 100) * inputValue;
    calculateTip(tip);
  });
});

tipCustom.addEventListener("input", function (e) {
  removeSelected();
  const tip = (Number(e.target.value) * inputValue) / 100;
  calculateTip(tip);
});

resetBtn.addEventListener("click", function () {
  resetCond();
  removeSelected();
  noOfPpl.value = "";
  billValue.value = "";
  inputValue = "";
  person = "";
  message.classList.remove("display");
  noOfPpl.classList.remove("error");
  billValue.classList.remove("active");
  noOfPpl.classList.remove("active");
});
