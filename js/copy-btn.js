const copyBtn = document.querySelector("#copy-btn")

const copyContent = async () => {
    try {
        let text = document.querySelector("#user-input").textContent
        await navigator.clipboard.writeText(text);
        console.log('Contenido copiado al portapapeles');
    } catch (err) {
        console.error('Error al copiar: ', err);
    }
}

copyBtn.addEventListener("click", copyContent)