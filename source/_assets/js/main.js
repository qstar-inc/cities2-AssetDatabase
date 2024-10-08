// var u = "aHR0cHM6Ly9zay1rbS5jb20uYmQv"; //web
var u = "aHR0cDovL2xvY2FsaG9zdDoxNTAv"; //local
var auth = "ZUJImMyi0d7ycNC9Nnrixku9WM4nbWY9";

function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.u = u;
window.auth = auth;
window.random = random;
