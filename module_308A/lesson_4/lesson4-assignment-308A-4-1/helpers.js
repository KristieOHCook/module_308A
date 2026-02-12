export function updateProgressBar(event) {
    const progressBar = document.getElementById("progressBar");
    if (event.lengthComputable) {
        const percent = (event.loaded / event.total) * 100;
        progressBar.style.width = `${percent}%`;
    }
}

export function setWorkingCursor(isWorking) {
    document.body.style.cursor = isWorking ? "progress" : "default";
}