const button1 = document.getElementById("mainmenu-button-1");
const button1text = button1.querySelector(".mainmenu-start-text");

let db_found = false;
let is_button_enabled = false;

$(document).ready(async function () {
  document.addEventListener("dbInitialized", () => {
    document.addEventListener("translationsLoaded", () => {
      db_found = true;
      triggerStartUp();
    });
  });
  await initDB(true);
  const checkInterval = setInterval(checkAndTrigger, 3000);
  function checkAndTrigger() {
    if (button1text.dataset.lang !== "open_db") {
      triggerStartUp();
    } else {
      clearInterval(checkInterval);
    }
  }
});

async function triggerStartUp() {
  if (db_found) {
    enableButtons();
  } else {
    fetch(atob(u) + "cities2_ad_ping", {
      method: "POST",
      headers: {
        "Accept-Encoding": "gzip",
        "Content-Type": "application/json",
        "Authorization": auth,
      },
    })
      .then(async (response) => {
        if (response.ok && response.status === 200) {
          await getAssetData();
          enableButtons();
        } else {
          console.error("Error:", response);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

async function enableButtons() {
  button1.classList.remove("disabled-link");
  button1text.dataset.lang = "open_db";
  button1text.innerHTML = getTranslation("open_db");
  await updateLangGame();
}