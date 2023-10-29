import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/Addons.js";
import second from "./assets/fonts/The Jamsil 3 Regular_Regular.json";
window.addEventListener("load", () => {
  init();
});

function init() {
  const renderer = new THREE.WebGLRenderer({
    // alpha: true,
    antialias: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    500
  );

  camera.position.z = 5;

  /** Font */
  const fontLoader = new FontLoader();

  // fontLoader.load(
  //   "./src/assets/fonts/The Jamsil 3 Regular_Regular.json",
  //   (font: unknown) => {
  //     console.log(font);
  //   },
  //   (event: unknown) => {
  //     console.log(event, " progress");
  //   },
  //   (error: unknown) => {
  //     console.log(error, "error");
  //   }
  // );
  const font = fontLoader.parse(second);
  console.log(font, "<<font");

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);

  scene.add(directionalLight);

  render();

  function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.render(scene, camera);
  }

  window.addEventListener("resize", handleResize);
}
