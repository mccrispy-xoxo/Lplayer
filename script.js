var number = document.getElementById("number");
var currentNumber = 1;
number.addEventListener("wheel", function (event) {
  event.preventDefault();
  if (event.deltaY < 0) {
    currentNumber--;
  } else {
    currentNumber++;
  }
  if (currentNumber < 1) {
    currentNumber = 9;
  }
  if (currentNumber > 9) {
    currentNumber = 1;
  }
  number.innerHTML = currentNumber;
});
