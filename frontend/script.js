const button = document.getElementById("analyzeBtn");
const textarea = document.getElementById("message");
const loadingScreen = document.getElementById("loadingScreen");
const loadingText = document.getElementById("loadingText");
const resultCard = document.getElementById("resultCard");
const riskPercent = document.getElementById("riskPercent");
const riskLevel = document.getElementById("riskLevel");
const findingsList = document.getElementById("findingsList");
const recommendationText = document.getElementById("recommendationText");

button.addEventListener("click", () => {

    const message = textarea.value.trim();

    if(message === ""){
        alert("⚠ Please paste a suspicious message first.");
        return;
    }

    loadingScreen.style.display = "flex";

    const steps = [
        "🤖 Initializing AI...",
        "📨 Reading message...",
        "🔍 Detecting phishing keywords...",
        "🛡 Checking suspicious links...",
        "🧠 Running FraudShield AI...",
        "📊 Calculating Risk Score..."
    ];

    let index = 0;

    loadingText.innerHTML = steps[index];

    const interval = setInterval(() => {

        index++;

        if(index < steps.length){

            loadingText.innerHTML = steps[index];

        }

    },1000);

    setTimeout(() => {

    clearInterval(interval);

    loadingScreen.style.display = "none";

    const text = message.toLowerCase();

    let score = 15;
    let findings = [];

    // Scam keywords
    if(text.includes("otp")){
        score += 25;
        findings.push("OTP request detected");
    }

    if(text.includes("bank")){
        score += 20;
        findings.push("Bank-related keyword detected");
    }

    if(text.includes("urgent")){
        score += 20;
        findings.push("Urgency language detected");
    }

    if(text.includes("verify")){
        score += 15;
        findings.push("Account verification request");
    }

    if(text.includes("click")){
        score += 10;
        findings.push("Suspicious action requested");
    }

    if(text.includes("http")){
        score += 15;
        findings.push("External link detected");
    }

    if(score > 100){
        score = 100;
    }

    let level = "";
    let recommendation = "";

    if(score >= 80){
        level = "🔴 HIGH RISK";
        recommendation =
        "Do not click any links. Block the sender and report this scam immediately.";
    }
    else if(score >= 50){
        level = "🟠 MEDIUM RISK";
        recommendation =
        "Verify the sender before taking any action.";
    }
    else{
        level = "🟢 LOW RISK";
        recommendation =
        "No major scam indicators found, but always stay cautious.";
    }

    document.getElementById("riskPercent").innerHTML = score + "%";
    document.getElementById("riskLevel").innerHTML = level;

    const list = document.getElementById("findingsList");
    list.innerHTML = "";

    if(findings.length === 0){
        findings.push("No suspicious indicators detected");
    }

    findings.forEach(item => {

        const li = document.createElement("li");
        li.innerHTML = "✔ " + item;
        list.appendChild(li);

    });

    document.getElementById("recommendationText").innerHTML = recommendation;

    document.getElementById("resultCard").style.display = "block";

    document.getElementById("resultCard").scrollIntoView({
        behavior:"smooth"
    });

},6000);
});