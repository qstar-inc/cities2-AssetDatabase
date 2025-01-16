async function processTime() {
  setTimeout(async () => {
    const time = await getTimeSince('assetData');
    const last_updated = await fetchTimeTrack();
    const last_updated_obj = new Date(last_updated);
    if (last_updated_obj.getTime() > time) {
        chirpUserGender = Math.round(Math.random());
        if (chirpUserGender == 0) {
            firstName = await getLangDataRandomly("Assets.CITIZEN_NAME_MALE") || "StarQ";
            lastName = await getLangDataRandomly("Assets.CITIZEN_SURNAME_MALE") || "";
        } else {
            firstName = await getLangDataRandomly("Assets.CITIZEN_NAME_FEMALE") || "StarQ";
            lastName = await getLangDataRandomly("Assets.CITIZEN_SURNAME_FEMALE") || "";
        }
        chirpUserName = `${firstName} ${lastName}`.trim();
        const t = getTranslation;
        text = `${t("new_content")}<br/>${t("go_to")} ${t("options")} > ${t("reload_db")}.`;
        triggerChirp(chirpUserName, timeAgo(last_updated_obj), text)
    }
  }, 3000);
}

function triggerChirp(header, time, text, persist = true) {
    const chirper = document.querySelector(".chirper");
    chirper.style.opacity = 0.9;
    chirper.style.animation = "shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both";
    const chirp = document.querySelector(".chirp");
    const chirpAvatar = document.querySelector(".chirp-avatar");
    const chirpUser = document.querySelector(".chirp-user");
    const chirpTime = document.querySelector(".chirp-time");
    const chirpText = document.querySelector(".chirp-text");
    const chirpLike = document.querySelector(".chirp-like");
    // const chirpArrow = document.querySelector(".chirp-arrow");
    
    chirpUser.innerHTML = header;
    chirpTime.innerHTML = time;
    chirpText.innerHTML = text;
    chirpText.style.textWrap = "wrap";
    chirpLike.innerHTML = Math.floor(Math.random() * 1000);
    chirpLike.style.display = "block";
    chirpAvatar.style.display = "flex";
    chirpAvatar.style.backgroundColor = getRandomHexColor();
    chirp.style.display = "flex";
    setTimeout(() => {
        chirp.style.width = "unset";
        chirp.style.padding = "2vh";
        chirp.style.opacity = "1";
    }, 200);
    if (!persist) {
        const progressBar = document.createElement("div");
        progressBar.style.position = "absolute";
        progressBar.style.bottom = "0";
        progressBar.style.left = "0";
        progressBar.style.height = "4px";
        progressBar.style.width = "100%";
        progressBar.style.backgroundColor = getRandomHexColor();
        progressBar.style.transition = "width 10s linear";
        chirp.appendChild(progressBar);

        setTimeout(() => {
            progressBar.style.width = "0%";
        }, 0);
        setTimeout(() => {
            chirpText.style.textWrap = "nowrap";
            chirp.style.width = "0vw";
            chirp.style.padding = "0vh";
            chirp.style.opacity = "0";
            setTimeout(() => {
                chirp.style.display = "none";
            }, 200);
        }, 10000);
    }
}

window.processTime = processTime;