$(document).ready(function () {
  db_found = initDB(true);
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
      .then((response) => {
        if (response.ok && response.status === 200) {
          getAssetGroupData();
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

function enableButtons() {
  const button = document.getElementById("mainmenu-button-1");
  button.classList.remove("disabled-link");
  const span = button.querySelector(".mainmenu-start-text");
  span.innerHTML = "Open Database";
}

function sendNotification(val, error = null) {
  if (val == 1) {
    console.log("Server Disconnected");
  }
  if (val == 2) {
    console.error("Error:", error);
  }
}
