// ======================
// 🔊 VOZ
// ======================
function falar(texto) {
  const msg = new SpeechSynthesisUtterance(texto);
  msg.lang = "pt-BR";
  msg.rate = 1;
  msg.pitch = 1;
  speechSynthesis.speak(msg);
}

// ======================
// 🌍 THREE.JS HOLOGRAMA
// ======================
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 🌍 globo holográfico
const geometry = new THREE.SphereGeometry(2, 32, 32);

const material = new THREE.MeshBasicMaterial({
  color: 0x00ffff,
  wireframe: true,
  transparent: true,
  opacity: 0.7
});

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// ======================
// 🔄 ANIMAÇÃO
// ======================
function animate() {
  requestAnimationFrame(animate);

  sphere.rotation.y += 0.01;
  sphere.rotation.x += 0.005;

  renderer.render(scene, camera);
}

animate();

// ======================
// 🤖 ENVIAR PARA IA
// ======================
async function enviar() {
  const input = document.getElementById("input").value;

  falar("Processando");

  const res = await fetch("/api/ia", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: input })
  });

  const data = await res.json();

  falar(data.resposta);

  console.log(data.resposta);
}

// ======================
// 📱 RESPONSIVO
// ======================
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
