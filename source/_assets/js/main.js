var u = "aHR0cHM6Ly9hcGkuc2sta20uY29tLmJkL2FwaS8="; //web
// var u = "aHR0cDovL2xvY2FsaG9zdDoxNTAvYXBpLw=="; //local
var auth = "ZUJImMyi0d7ycNC9Nnrixku9WM4nbWY9";

function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clearCacheAndRedirect() {
  localStorage.clear();
  window.location.href = "/";
}

function checkAspectRatioAndHeight() {
  const overlay = document.getElementById('window-size-error');
  const width = window.innerWidth;
  const height = window.innerHeight;

  const aspectRatio = width / height;
  const isAspectRatioClose = Math.abs(aspectRatio - (16 / 9)) <= 0.5;
  const isHeightValid = height >= 500;
  const isWidthValid = width >= 1000;

  if (isAspectRatioClose && isHeightValid && isWidthValid) {
    overlay.classList.add('display-none');
  } else {
    overlay.classList.remove('display-none');
  }

  const text1 = document.getElementById('inv1');
  const text2 = document.getElementById('inv2');
  const text3 = document.getElementById('inv3');
  if (!isAspectRatioClose) {
    text1.style.color = 'antiquewhite';
  } else {
    text1.style.color = 'unset';
  }
  if (!isWidthValid) {
    text2.style.color = 'antiquewhite';
  } else {
    text2.style.color = 'unset';
  }
  if (!isHeightValid) {
    text3.style.color = 'antiquewhite';
  } else {
    text3.style.color = 'unset';
  }
}

window.addEventListener('load', checkAspectRatioAndHeight);
window.addEventListener('resize', checkAspectRatioAndHeight);

window.u = u;
window.auth = auth;
window.random = random;
window.clearCacheAndRedirect = clearCacheAndRedirect;
