const confidenceScore = document.getElementById("confidenceScore");
const scamType = document.getElementById("scamType");
const severityLevel = document.getElementById("severityLevel");
const targetType = document.getElementById("targetType");
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
    document.getElementById("progressCircle").style.strokeDashoffset = 503;
    document.getElementById("riskPercent").innerHTML = "0%";

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

    let current = 0;

const counter = setInterval(() => {

    if(current >= score){

        clearInterval(counter);

    }

    document.getElementById("riskPercent").innerHTML = current + "%";

    current++;

},20);
    const progressCircle = document.getElementById("progressCircle");
    if(score >= 80){
    progressCircle.style.stroke = "#c9170e";   // Red
}
    else if(score >= 50) {
    progressCircle.style.stroke = "#ff9500";   // Orange
}
    else{
    progressCircle.style.stroke = "#00ff88";   // Green
}
confidenceScore.innerHTML = Math.min(score + 5, 99) + "%";

if(score >= 80){

    scamType.innerHTML = "Banking Phishing";
    severityLevel.innerHTML = "Critical";
    targetType.innerHTML = "Bank Account";

}
else if(score >= 50){

    scamType.innerHTML = "Suspicious Message";
    severityLevel.innerHTML = "Moderate";
    targetType.innerHTML = "Personal Data";

}
else{

    scamType.innerHTML = "No Threat";
    severityLevel.innerHTML = "Low";
    targetType.innerHTML = "None";

}

// Radius = 80
const circumference = 2 * Math.PI * 80;

// Convert score to stroke offset
const offset = circumference - (score / 100) * circumference;

progressCircle.style.strokeDashoffset = offset;
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

    const result = document.getElementById("resultCard");

    result.style.display = "block";

    result.classList.add("glow");
    setTimeout(()=>{

    result.classList.remove("glow");
    const scanLine = document.querySelector(".scan-line");

scanLine.classList.add("active");

setTimeout(() => {

    scanLine.classList.remove("active");

},1800);

    },1000);

    document.getElementById("resultCard").scrollIntoView({
        behavior:"smooth"
    });

},6000);
});
const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {

    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";

});