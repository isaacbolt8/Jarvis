// ==========================
// 📷 CAMERA + MIC
// ==========================
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
.then(stream => {
const video = document.getElementById("camera");
if (video) video.srcObject = stream;
})
.catch(err => console.log("Erro câmera/mic:", err));

// ==========================
// 🎤 RECONHECIMENTO DE VOZ
// ==========================
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition;

if (SpeechRecognition) {
recognition = new SpeechRecognition();
recognition.lang = "pt-BR";
recognition.continuous = true;

recognition.onresult = async (event) => {
    let text = event.results[event.results.length - 1][0].transcript.toLowerCase();
    processCommand(text);
};

recognition.onerror = (err) => {
    console.log("Erro voz:", err);
};

recognition.start();

} else {
console.log("Reconhecimento de voz não suportado");
}

// ==========================
// 🔊 FALA (TEXT TO SPEECH)
// ==========================
function speak(text) {
const msg = new SpeechSynthesisUtterance(text);
msg.lang = "pt-BR";
speechSynthesis.speak(msg);
}

// ==========================
// 🧠 CONEXÃO COM BACKEND
// ==========================
async function askAI(prompt) {
try {
const res = await fetch("http://localhost:3000/jarvis", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({ message: prompt })
});

    const data = await res.json();
    return data.reply;

} catch (e) {
    return "Erro ao conectar com o servidor.";
}

}

// ==========================
// 🧠 COMANDOS
// ==========================
async function processCommand(cmd) {

let response = "";

if (cmd.includes("jarvis")) {
    response = "Estou online.";
}
else if (cmd.includes("hora")) {
    response = new Date().toLocaleTimeString();
}
else if (cmd.includes("abrir youtube")) {
    window.open("https://youtube.com");
    response = "Abrindo YouTube.";
}
else {
    response = await askAI(cmd);
}

document.getElementById("response").innerText = response;
speak(response);

}

// ==========================
// 🌍 HOLOGRAMA 3D (THREE.JS)
// ==========================
const scene = new THREE.Scene();

const camera3D = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// GLOBO
const geometry = new THREE.SphereGeometry(2, 32, 32);

const material = new THREE.MeshBasicMaterial({
color: 0x00ffff,
wireframe: true
});

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

camera3D.position.z = 5;

// ANIMAÇÃO
function animate() {
requestAnimationFrame(animate);

sphere.rotation.y += 0.01;
sphere.rotation.x += 0.005;

renderer.render(scene, camera3D);

}

animate();

// ==========================
// 🔄 RESPONSIVIDADE
// ==========================
window.addEventListener("resize", () => {
renderer.setSize(window.innerWidth, window.innerHeight);
camera3D.aspect = window.innerWidth / window.innerHeight;
camera3D.updateProjectionMatrix();
})
