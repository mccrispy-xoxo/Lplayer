const sliders = document.querySelectorAll('.slider');
const labels = document.querySelectorAll('.slider-label');
const submitButton = document.querySelector('.submit-button');
let currentSlider = 0;
let isDragging = false;
let startPos = 0;
let currentPos = 0;
let diff = 0;
let password = '';

sliders[currentSlider].querySelector('.slider-thumb').classList.add('active');

for (let i = 0; i < sliders.length; i++) {
  sliders[i].addEventListener('mousedown', startDragging);
  sliders[i].addEventListener('touchstart', startDragging);
  sliders[i].addEventListener('wheel', changeValue);
}

submitButton.addEventListener('click', checkPassword);

function startDragging(e) {
  e.preventDefault();
  if (e.type === 'mousedown') {
    isDragging = true;
    startPos = e.clientX;
  } else {
    isDragging = true;
    startPos = e.touches[0].clientX;
  }
  this.querySelector('.slider-thumb').classList.add('active');
  document.addEventListener('mousemove', drag);
  document.addEventListener('touchmove', drag);
  document.addEventListener('mouseup', stopDragging);
  document.addEventListener('touchend', stopDragging);
}

function drag(e) {
  e.preventDefault();
  if (isDragging) {
    if (e.type === 'mousemove') {
      currentPos = e.clientX;
    } else {
      currentPos = e.touches[0].clientX;
    }
    diff = currentPos - startPos;
    if (diff > 0 && diff < this.offsetWidth - this.querySelector('.slider-thumb').offsetWidth) {
      this.querySelector('.slider-thumb').style.left = diff + 'px';
    }
  }
}

function stopDragging() {
  isDragging = false;
  this.querySelector('.slider-thumb').classList.remove('active');
  if (diff >= this.offsetWidth - this.querySelector('.slider-thumb').offsetWidth) {
    this.querySelector('.slider-thumb').style.left = this.offsetWidth - this.querySelector('.slider-thumb').offsetWidth + 'px';
    password += labels[currentSlider].textContent;
    currentSlider++;
    if (currentSlider < sliders.length) {
      sliders[currentSlider].querySelector('.slider-thumb').classList.add('active');
    } else {
      alert('密码为：' + password);
      password = '';
      currentSlider = 0;
      sliders[currentSlider].querySelector('.slider-thumb').classList.add('active');
      for (let i = 0; i < sliders.length; i++) {
        sliders[i].querySelector('.slider-thumb').style.left = 0;
        labels[i].textContent = '0';
      }
    }
  } else {
    this.querySelector('.slider-thumb').style.left = 0;
    diff = 0;
  }
  document.removeEventListener('mousemove', drag);
  document.removeEventListener('touchmove', drag);
  document.removeEventListener('mouseup', stopDragging);
  document.removeEventListener('touchend', stopDragging);
}

function changeValue(e) {
  e.preventDefault();
  if (e.deltaY > 0) {
    let value = parseInt(this.querySelector('.slider-label').textContent);
    if (value === 9) {
      value = 0;
    } else {
      value++;
    }
    this.querySelector('.slider-label').textContent = value.toString();
  } else if (e.deltaY < 0) {
    let value = parseInt(this.querySelector('.slider-label').textContent);
    if (value === 0) {
      value = 9;
    } else {
      value--;
    }
    this.querySelector('.slider-label').textContent = value.toString();
  }
}

function checkPassword() {
  if (password === '0000') {
    alert('密码正确！');
  } else {
    alert('密码错误！');
  }
}
