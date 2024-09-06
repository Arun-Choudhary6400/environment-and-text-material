import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { degToRad } from "three/src/math/MathUtils.js";
import GUI from "lil-gui"
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js"

// Canvas
const canvas = document.querySelector("canvas.webgl");
const cameraPosition = {
  x: 0,
  y: 0
}
canvas.addEventListener("mousemove", e => {
  cameraPosition.x = e.clientX / sizes.width - 0.5;
  cameraPosition.y = -1 * (e.clientY / sizes.height - 0.5);
})

// Scene
const scene = new THREE.Scene();

// const ambientLight = new THREE.AmbientLight(0xfff, 1)
// scene.add(ambientLight)
// const pointLight = new THREE.PointLight(0xfff, 50)
// pointLight.position.set(2, 3, 4)
// scene.add(pointLight)


const rgbeLoader = new RGBELoader()
rgbeLoader.load("/textures/environmentMap/2k.hdr", (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping
  scene.background = environmentMap
  scene.environment = environmentMap
})

/**
 * Textures
 */

const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load("/textures/door/color.jpg")
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg")
const doorAmbientOcclusionTexture = textureLoader.load("/textures/door/ambientOcclusion.jpg")
// const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg")
// const doorHeightTexture = textureLoader.load("/textures/door/height.jpg")
// const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg")
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg")
doorColorTexture.colorSpace = THREE.SRGBColorSpace
doorColorTexture.minFilter = THREE.NearestFilter
doorColorTexture.magFilter = THREE.NearestFilter


/**
 * New Objects
 */
const material = new THREE.MeshStandardMaterial({
  map: doorColorTexture,
  alphaMap: doorAlphaTexture,
  aoMap: doorAmbientOcclusionTexture,
  // transparent: true,
  // displacementMap: doorNormalTexture,
  // displacementScale: 0.05,
  normalMap: doorNormalTexture,
  // roughnessMap: doorRoughnessTexture,
  // metalnessMap: doorMetalnessTexture,
  metalness: 0.3,
  roughness: 0.5,
})

const planeMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1, 100, 100),
  new THREE.MeshStandardMaterial(
    {
      map: doorColorTexture,
      alphaMap: doorAlphaTexture,
      aoMap: doorAmbientOcclusionTexture,
      transparent: true,
      // displacementMap: doorNormalTexture,
      // displacementScale: 0.05,
      normalMap: doorNormalTexture,
      // roughnessMap: doorRoughnessTexture,
      // metalnessMap: doorMetalnessTexture,
      metalness: 0.3,
      roughness: 0.5,
    }
  )
)
planeMesh.material.side = THREE.DoubleSide
// planeMesh.material.transparent = true

const sphereMesh = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 64, 64),
  material
)
sphereMesh.position.x = -1.5

const torusMesh = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 64),
  material
)
torusMesh.position.x = 1.5

scene.add(planeMesh)
scene.add(sphereMesh)
scene.add(torusMesh)

/**
 * Objects
 */
//BUFFER GEOMETRY
// const count = 500;
// const geometry = new THREE.BufferGeometry();
// const vertexArray = new Float32Array(count * 9)
// const vertexArray = new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0, 0])
// for (let i = 0; i < count * 9; i++) {
//   vertexArray[i] = (Math.random() - 0.5) * 4
// }
// const positionAttribute = new THREE.BufferAttribute(vertexArray, 3)
// geometry.setAttribute("position", positionAttribute)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
// const mesh = new THREE.Mesh(geometry, material);


/**
 * GUI Debugger
 */

// const guiProps = {}
// const gui = new GUI({
//   width: 400,
//   title: "Debugger UI"
// });
// const folder = gui.addFolder("Positions");

// window.addEventListener("keydown", (e) => {
//   if(e.key == "h") {
//     gui.show(gui._hidden)
//   }
// })

// box2.material.wireframe = true
// guiProps.color = "#ff0000"
// guiProps.spin = () => {
//   gsap.to(box2.rotation, {
//     duration: 2,
//     y: box2.rotation.y + Math.PI * 2
//   })
// }
// guiProps.segment = 2  
// guiProps.width = 1  
// guiProps.height = 1  
// folder.add(box2.position, "y").min(-3).max(3).step(0.001).name("Y")
// folder.add(box2.position, "x").min(-3).max(3).step(0.001).name("X")
// folder.add(guiProps, "width").min(1).max(10).step(0.0001).name("Width").onChange(() => {
//   box2.geometry.dispose();
//   box2.geometry = new THREE.BoxGeometry(guiProps.width, 1, 1, guiProps.segment, guiProps.segment, guiProps.segment)
// })
// folder.add(guiProps, "height").min(1).max(10).step(0.0001).name("Height").onChange(() => {
//   box2.geometry.dispose();
//   box2.geometry = new THREE.BoxGeometry(guiProps.width, guiProps.height, 1, guiProps.segment, guiProps.segment, guiProps.segment)
// })
// folder.add(guiProps, "segment").min(1).max(10).step(1).name("Segments").onChange(() => {
//   box2.geometry.dispose();
//   box2.geometry = new THREE.BoxGeometry(1, 1, 1, guiProps.segment, guiProps.segment, guiProps.segment)
// })
// gui.add(box2.material, "wireframe")
// gui.addColor(box2.material, "color").onChange(() => {
//   // box2.material.color = guiProps.color
// })
// gui.add(guiProps, "spin")

/**
 * GUI Debugger
 */

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 100);
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100) 
camera.position.z = 3;
// camera.position.x = cameraPosition.x;
// camera.position.y = cameraPosition.y;
// camera.lookAt(box2.position)
scene.add(camera);
// gsap.to(box2.position, {x: 2, duration: 1, delay: 1})
// camera.lookAt(mesh.position)


//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


//Resizing

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix(sizes.width, sizes.height)
  renderer.setSize(sizes.width, sizes.height);
})

//Fullscreen 

window.addEventListener("dblclick", () => {
  const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;
  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen()
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen()
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  }

})


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


let clock = new THREE.Clock();
// let time = Date.now();

const tick = () => {
  // let currentTime = Date.now()
  // let delta = currentTime - time;
  const elapsedTime = clock.getElapsedTime()
  planeMesh.rotation.x = elapsedTime * 0.5
  planeMesh.rotation.y = elapsedTime * 0.5
  sphereMesh.rotation.x = elapsedTime * 0.5
  sphereMesh.rotation.y = elapsedTime * 0.5
  torusMesh.rotation.x = elapsedTime * 0.5
  torusMesh.rotation.y = elapsedTime * 0.5
  // console.log(delta);

  // console.log("tick");
  // box2.position.y += 0.01 * delta
  // camera.position.y = Math.sin(elapsedTime)
  // camera.position.x = Math.cos(elapsedTime)
  // camera.lookAt(box2.position)
  // box2.rotation.y = elapsedTime
  // box2.rotation.y += 0.09 * degToRad(10)
  // box2.rotation.x += 0.09 * degToRad(10 + 0.5)
  // camera.position.x = cameraPosition.x * 5;
  // camera.position.y = cameraPosition.y * 5;
  // camera.lookAt(box2.position)
  controls.update()
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick)
}
tick()