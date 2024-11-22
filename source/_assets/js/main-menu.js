const button1 = document.getElementById("mainmenu-button-1");
const button1text = button1.querySelector(".mainmenu-start-text");

let db_found = false;

$(document).ready(async function () {
  document.addEventListener("dbInitialized", () => {
    const db_found = true;
    if (db_found) {
      enableButtons();
    } else {
      fetch(atob(u) + "cities2_ad_ping", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Authorization: auth,
        }),
      })
        .then(async (response) => {
          if (response.ok && response.status === 200) {
            await getAssetGroupData();
            getAssetTabData();
            getAssetPanelData();
            getAssetData();
            enableButtons();
          } else {
            sendNotification(1);
          }
        })
        .catch((error) => {
          sendNotification(2, error);
        });
    }
  });
  await initDB(true);
});

function enableButtons() {
  button1.classList.remove("disabled-link");
  button1text.innerHTML = "Open Database";
}

function sendNotification(val, error = null) {
  let text = "";
  switch (val) {
    case 1:
      text = "Server Disconnected...";
      console.log("Server Disconnected");
      break;
    case 2:
      text = "Database Offline...";
      break;
    default:
      break;
  }
  if (error) {
    console.error("Error:", error);
  }
  button1text.innerHTML = text;
}
