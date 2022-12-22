let wrapper=document.querySelector(".wrapper");
let qrInput=document.querySelector(".form input");
let generateBtn=document.querySelector(".form button");
let qrImg=document.querySelector(".qr-code img");

generateBtn.addEventListener("click",()=>{
    let qrValue=qrInput.value;
    if(!qrValue) return;
    

    qrImg.src=`https://api.qrserver.com/v1/create-qr-code/?size=230x230&data=${qrValue}`;
    qrImg.addEventListener("load",()=>{
        wrapper.classList.add("active");
        generateBtn.innerTxt="Generating QR Code..."
    });
})

qrInput.addEventListener("keyup",()=>{
    if(!qrInput.value){
        wrapper.classList.remove("active")
    }
})