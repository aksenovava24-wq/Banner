function setStatus(message, isError) {
    const status = document.getElementById("status-message");
    if (!status) {
        return;
    }

    status.textContent = message;
    status.style.color = isError ? "#b3261e" : "#2b5a2a";
}

function normalizeWords(rawText) {
    return rawText
        .split(/[,\s]+/)
        .map((item) => item.trim())
        .filter(Boolean);
}

function fillWordLayer(words) {
    const wordLayer = document.getElementById("word-layer");
    if (!wordLayer) {
        return;
    }

    wordLayer.innerHTML = "";

    if (words.length === 0) {
        return;
    }

    const totalWords = 24;
    for (let i = 0; i < totalWords; i += 1) {
        const wordElement = document.createElement("span");
        wordElement.className = "bg-word";
        wordElement.textContent = words[i % words.length];
        wordLayer.appendChild(wordElement);
    }
}

function applyBackgroundImage(url) {
    const banner = document.getElementById("banner");
    if (!banner) {
        return;
    }

    if (!url) {
        banner.style.backgroundImage = "";
        setStatus("Фон-картинка очищена. Оставлены только слова.", false);
        return;
    }

    const image = new Image();
    image.onload = function onLoad() {
        banner.style.backgroundImage = `url("${url}")`;
        setStatus("Фон обновлён: слова + изображение.", false);
    };
    image.onerror = function onError() {
        banner.style.backgroundImage = "";
        setStatus("Не удалось загрузить изображение по ссылке.", true);
    };
    image.src = url;
}

function updateBackground() {
    const backgroundWordInput = document.getElementById("background-word");
    const imageUrlInput = document.getElementById("image-url");

    const rawWords = backgroundWordInput ? backgroundWordInput.value : "";
    const imageUrl = imageUrlInput ? imageUrlInput.value.trim() : "";

    const words = normalizeWords(rawWords);
    fillWordLayer(words);
    applyBackgroundImage(imageUrl);

    if (!imageUrl) {
        if (words.length > 0) {
            setStatus("Фон обновлён: добавлены слова.", false);
        } else {
            setStatus("Добавьте слова или ссылку на изображение.", true);
        }
    }
}

window.updateBackground = updateBackground;
