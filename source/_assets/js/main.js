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

window.u = u;
window.auth = auth;
window.random = random;
window.clearCacheAndRedirect = clearCacheAndRedirect;
