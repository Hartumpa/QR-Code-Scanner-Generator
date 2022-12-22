
let wrapper = document.querySelector(".wrapper");
let form = wrapper.querySelector("form");
let fileInp = form.querySelector("input");
let infoText = form.querySelector("p");
let copyBtn = wrapper.querySelector(".copy");
let closeBtn = document.querySelector(".close");

function fetchRequest(formData, file) {
    infoText.innerText = "Scanning QR Code ..."

    // sending post request to qr server api with passing formdata as body and getting response from it

    fetch("https://api.qrserver.com/v1/read-qr-code/", {
        method: "POST",
        body: formData
    }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data;
        // console.log(result)
        infoText.innerText = result ? "Upload QR Code to Scan" : "Couldn't scan the QR code"
        if (!result) return;
        wrapper.querySelector("textarea").innerText = result;
        form.querySelector("img").src = URL.createObjectURL(file)
        wrapper.classList.add("active")
    }).catch(() => {
        infoText.innerText = "Couldn't scan the QR code";
    })
}

fileInp.addEventListener("change", e => {
    let file = e.target.files[0]; // getting user selected file
    if (!file) return;
    let formData = new FormData(); // creating a new formdata object
    formData.append("file", file) // adding selected file to formData
    // console.log(file)
    fetchRequest(formData, file)
});

copyBtn.addEventListener("click", () => {
    let text = wrapper.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text)
})

form.addEventListener("click", () => {
    fileInp.click()
});

closeBtn.addEventListener("click", () => {
    wrapper.classList.remove("active")
})