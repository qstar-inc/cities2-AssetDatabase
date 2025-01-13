var u = "aHR0cHM6Ly9hcGkuc2sta20uY29tLmJkL2FwaS8="; //web
// var u = "aHR0cDovL2xvY2FsaG9zdDoxNTAvYXBpLw=="; //local
var auth = "ZUJImMyi0d7ycNC9Nnrixku9WM4nbWY9";
var language = JSON.parse(localStorage.getItem("language")) ?? "enUS";

function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clearCacheAndRedirect() {
  localStorage.clear();
  window.location.href = baseUrl;
}

function checkAspectRatioAndHeight() {
  const overlay = document.getElementById('window-size-error');
  const width = window.innerWidth;
  const height = window.innerHeight;

  const aspectRatio = width / height;
  let isAspectRatioClose = Math.abs(aspectRatio - (16 / 9)) <= 0.5;
  let isHeightValid = height >= 500;
  let isWidthValid = width >= 1000;
  const ignore = document.getElementById('invX');
  ignore.addEventListener('click', () => { 
    overlay.classList.add('display-none');
  });

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

function timeAgo(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    const intervals = [
        { label: 'second', seconds: 1 },
        { label: 'minute', seconds: 60 },
        { label: 'hour', seconds: 3600 },
        { label: 'day', seconds: 86400 },
        { label: 'month', seconds: 2592000 },
        { label: 'year', seconds: 31536000 }
    ];

    for (let i = intervals.length - 1; i >= 0; i--) {
        const interval = intervals[i];
        const intervalValue = Math.floor(diffInSeconds / interval.seconds);

        if (intervalValue > 0) {
            return `${intervalValue} ${interval.label}${intervalValue > 1 ? 's' : ''} ago`;
        }
    }

    return "just now";
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

window.addEventListener('load', checkAspectRatioAndHeight);
window.addEventListener('resize', checkAspectRatioAndHeight);

window.u = u;
window.auth = auth;
window.language = language;
window.random = random;
window.clearCacheAndRedirect = clearCacheAndRedirect;
window.timeAgo = timeAgo;
window.getRandomHexColor = getRandomHexColor;