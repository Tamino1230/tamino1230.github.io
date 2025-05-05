document.addEventListener('DOMContentLoaded', () => {
    const textboxes = document.querySelectorAll('textarea, input[type="text"]');

    textboxes.forEach(textbox => {
        textbox.addEventListener('keydown', (event) => {
            if (event.key === 'Tab') {
                event.preventDefault();
                const start = textbox.selectionStart;
                const end = textbox.selectionEnd;

                textbox.value = textbox.value.substring(0, start) + '    ' + textbox.value.substring(end);

                textbox.selectionStart = textbox.selectionEnd = start + 4;
            }
        });
    });
});

const htmlInput = document.getElementById("htmlInput");
const cssInput = document.getElementById("cssInput");
const preview = document.getElementById("preview");

function updatePreview() {
    const html = htmlInput.value;
    const css = `<style>${cssInput.value}</style>`;
    const content = css + html;
    preview.style.height = "550px";
    preview.srcdoc = content;
}

htmlInput.addEventListener("input", updatePreview);
cssInput.addEventListener("input", updatePreview);

updatePreview();

const downloadBtn = document.getElementById("downloadBtn");

downloadBtn.addEventListener("click", () => {
    const html = htmlInput.value;
    const css = cssInput.value;

    console.log("HTML content:", html);
    console.log("CSS content:", css);

    const zip = new JSZip();
    zip.file("index.html", html);
    zip.file("styles.css", css);

    console.log("Files added to zip.");

    zip.generateAsync({ type: "blob" }).then((content) => {
        console.log("Zip file generated.");
        const a = document.createElement("a");
        a.href = URL.createObjectURL(content);
        a.download = "project.zip";
        a.click();
        console.log("Download initiated.");
        URL.revokeObjectURL(a.href);
    }).catch((error) => {
        console.error("Error generating zip file:", error);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const savedHtml = localStorage.getItem('htmlInput');
    const savedCss = localStorage.getItem('cssInput');
    if (savedHtml) {
    document.getElementById('htmlInput').value = savedHtml;
    updatePreview();
    }
    if (savedCss) {
    document.getElementById('cssInput').value = savedCss;
    updatePreview();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 's') {
    event.preventDefault();
    const htmlInput = document.getElementById('htmlInput').value;
    const cssInput = document.getElementById('cssInput').value;
    localStorage.setItem('htmlInput', htmlInput);
    localStorage.setItem('cssInput', cssInput);
    alert('Inputs saved to local storage!');
    }
});



document.getElementById('saveBtn').addEventListener('click', function() {
    const htmlInput = document.getElementById('htmlInput').value;
    const cssInput = document.getElementById('cssInput').value;
    localStorage.setItem('htmlInput', htmlInput);
    localStorage.setItem('cssInput', cssInput);
    alert('Inputs saved to local storage!');
});

document.getElementById('clearBtn').addEventListener('click', function() {
    localStorage.clear();
    alert('Local storage cleared!');
});

