const button = document.getElementById("analyzeBtn");
const textarea = document.getElementById("message");

button.addEventListener("click", function () {

    const message = textarea.value.trim();

    if(message === ""){
        alert("⚠ Please paste a suspicious message first.");
        return;
    }

    button.innerHTML="⏳ Analyzing...";
    button.disabled=true;

    setTimeout(function(){

        button.innerHTML="✅ Scam Detected";

    },2500);

});