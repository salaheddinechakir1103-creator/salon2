import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { sounds } from '../../utils/soundEffects';

export type EssencePreset = 'rose' | 'ambre' | 'oud' | 'neroli';
export type CameraPreset = 'front' | 'cap' | 'top' | 'isometric';

export interface SceneOptions {
  onLoaded?: () => void;
}

export class PerfumeBottleScene {
  private container: HTMLElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private pmremGenerator: THREE.PMREMGenerator;
  private animationFrameId: number | null = null;
  private clock: THREE.Clock;

  // 3D Objects
  private bottleGroup: THREE.Group;
  private capMesh!: THREE.Mesh;
  private collarMesh!: THREE.Mesh;
  private nozzleMesh!: THREE.Mesh;
  private bodyMesh!: THREE.Mesh;
  private liquidMesh!: THREE.Mesh;
  private dipTubeMesh!: THREE.Mesh;
  private medallionMesh!: THREE.Mesh;
  private pedestalMesh!: THREE.Mesh;
  private particlesMesh!: THREE.Points;
  private shadowPlane!: THREE.Mesh;
  private spotLight!: THREE.SpotLight;

  // Materials
  private glassMaterial!: THREE.MeshPhysicalMaterial;
  private liquidMaterial!: THREE.MeshPhysicalMaterial;
  private goldMaterial!: THREE.MeshStandardMaterial;
  private capMaterial!: THREE.MeshPhysicalMaterial;
  private pedestalMaterial!: THREE.MeshStandardMaterial;

  // Interactive parameters
  public targetRotationY = 0;
  public targetRotationX = 0;
  public explodedValue = 0;
  public isAutoRotating = true;
  private mouse = { x: 0, y: 0 };
  private targetCameraPos = new THREE.Vector3(0, 0.2, 5.2);
  private currentCameraPos = new THREE.Vector3(0, 0.2, 5.2);

  constructor(container: HTMLElement, options?: SceneOptions) {
    this.container = container;
    this.clock = new THREE.Clock();

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x171217, 0.07);

    const width = this.container.clientWidth || 800;
    const height = this.container.clientHeight || 600;
    this.camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    this.camera.position.copy(this.currentCameraPos);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.35;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.container.appendChild(this.renderer.domElement);

    // Studio Environment map using RoomEnvironment
    this.pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    this.pmremGenerator.compileEquirectangularShader();
    const envTexture = this.pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    this.scene.environment = envTexture;

    // Lighting rig
    this.setupLighting();

    // Bottle & Pedestal assembly
    this.bottleGroup = new THREE.Group();
    this.buildBottle();
    this.buildPedestal();
    this.buildParticles();
    this.buildContactShadow();
    this.scene.add(this.bottleGroup);

    this.bottleGroup.position.set(0, -0.4, 0);

    // Apply preset
    this.applyPreset('rose');

    // Event listeners
    this.setupEvents();

    // Animate
    this.animate();

    if (options?.onLoaded) {
      options.onLoaded();
    }
  }

  private setupLighting(): void {
    // Dynamic interactive cursor spot light
    this.spotLight = new THREE.SpotLight(0xfff0d6, 3.2, 12, Math.PI / 4, 0.35);
    this.spotLight.position.set(3, 4, 4);
    this.scene.add(this.spotLight);

    // Key Light (Warm champagne)
    const keyLight = new THREE.DirectionalLight(0xffebd2, 2.4);
    keyLight.position.set(4, 5, 4);
    this.scene.add(keyLight);

    // Fill Light (Cool rose / soft sky)
    const fillLight = new THREE.DirectionalLight(0xc78f99, 1.4);
    fillLight.position.set(-4, 2, -2);
    this.scene.add(fillLight);

    // Rim / Back Light (Gleaming gold outline)
    const rimLight = new THREE.DirectionalLight(0xe9d8c3, 3.0);
    rimLight.position.set(0, 4, -4);
    this.scene.add(rimLight);

    // Ambient
    const ambientLight = new THREE.AmbientLight(0x281220, 0.8);
    this.scene.add(ambientLight);
  }

  private buildBottle(): void {
    // 1. Brushed Gold & Brass
    this.goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.95,
      roughness: 0.18,
      envMapIntensity: 1.8,
    });

    // 2. Clear Outer Crystal Flacon Body (Heavy crystal with beveled shoulders)
    this.glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.96,
      opacity: 1,
      transparent: true,
      roughness: 0.03,
      ior: 1.58,
      thickness: 1.4,
      specularIntensity: 1.4,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      depthWrite: false,
    });

    const bodyRadius = 0.95;
    const bodyHeight = 1.75;
    // 12-sided faceted crystal for luxury reflections
    const outerGeo = new THREE.CylinderGeometry(bodyRadius * 0.9, bodyRadius, bodyHeight, 12, 1);
    this.bodyMesh = new THREE.Mesh(outerGeo, this.glassMaterial);
    this.bodyMesh.position.y = bodyHeight / 2;
    this.bottleGroup.add(this.bodyMesh);

    // Shoulder facet ring
    const shoulderGeo = new THREE.CylinderGeometry(0.48, bodyRadius * 0.9, 0.32, 12);
    const shoulderMesh = new THREE.Mesh(shoulderGeo, this.glassMaterial);
    shoulderMesh.position.y = bodyHeight + 0.16;
    this.bottleGroup.add(shoulderMesh);

    // 3. Inner Liquid Chamber
    this.liquidMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xe9d8c3,
      transmission: 0.86,
      roughness: 0.08,
      ior: 1.36,
      attenuationColor: new THREE.Color('#7a1a38'),
      attenuationDistance: 0.55,
      transparent: true,
      depthWrite: false,
    });

    const liquidGeo = new THREE.CylinderGeometry(bodyRadius * 0.78, bodyRadius * 0.85, bodyHeight * 0.86, 12);
    this.liquidMesh = new THREE.Mesh(liquidGeo, this.liquidMaterial);
    this.liquidMesh.position.y = (bodyHeight * 0.86) / 2 + 0.12;
    this.bottleGroup.add(this.liquidMesh);

    // 4. Dip tube
    const tubeGeo = new THREE.CylinderGeometry(0.025, 0.025, bodyHeight * 0.96, 12);
    const tubeMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.9,
      roughness: 0.2,
      transparent: true,
      depthWrite: false,
    });
    this.dipTubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
    this.dipTubeMesh.position.y = bodyHeight / 2 + 0.1;
    this.bottleGroup.add(this.dipTubeMesh);

    // 5. Gold Collar & Knurled Ring at Neck
    const collarGeo = new THREE.CylinderGeometry(0.36, 0.38, 0.28, 24);
    this.collarMesh = new THREE.Mesh(collarGeo, this.goldMaterial);
    this.collarMesh.position.y = bodyHeight + 0.42;
    this.bottleGroup.add(this.collarMesh);

    const ringGeo = new THREE.TorusGeometry(0.38, 0.035, 12, 32);
    const ringMesh = new THREE.Mesh(ringGeo, this.goldMaterial);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = bodyHeight + 0.36;
    this.bottleGroup.add(ringMesh);

    // 6. Gold Spray Nozzle
    const nozzleGeo = new THREE.CylinderGeometry(0.14, 0.15, 0.22, 16);
    this.nozzleMesh = new THREE.Mesh(nozzleGeo, this.goldMaterial);
    this.nozzleMesh.position.y = bodyHeight + 0.62;
    this.bottleGroup.add(this.nozzleMesh);

    // 7. Sculptural Crystal Jewel Stopper / Cap (Faceted Emerald-cut octagon)
    this.capMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfcf8f5,
      transmission: 0.94,
      roughness: 0.04,
      ior: 1.62,
      thickness: 1.6,
      clearcoat: 1.0,
      attenuationColor: new THREE.Color('#d4af37'),
      attenuationDistance: 1.2,
      transparent: true,
      depthWrite: false,
    });

    const capGeo = new THREE.CylinderGeometry(0.56, 0.64, 0.82, 8);
    this.capMesh = new THREE.Mesh(capGeo, this.capMaterial);
    this.capMesh.position.y = bodyHeight + 1.02;
    this.bottleGroup.add(this.capMesh);

    // Cap gold top finial
    const finialGeo = new THREE.CylinderGeometry(0.2, 0.26, 0.09, 16);
    const finialMesh = new THREE.Mesh(finialGeo, this.goldMaterial);
    finialMesh.position.y = 0.45;
    this.capMesh.add(finialMesh);

    // 8. Embossed Gold Medallion on Front Face
    const medalGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.04, 32);
    this.medallionMesh = new THREE.Mesh(medalGeo, this.goldMaterial);
    this.medallionMesh.rotation.x = Math.PI / 2;
    this.medallionMesh.position.set(0, bodyHeight * 0.55, bodyRadius * 0.92);
    this.bottleGroup.add(this.medallionMesh);

    const starGeo = new THREE.OctahedronGeometry(0.15, 0);
    const starMesh = new THREE.Mesh(starGeo, this.goldMaterial);
    starMesh.position.set(0, bodyHeight * 0.55, bodyRadius * 0.96);
    this.bottleGroup.add(starMesh);
  }

  private buildPedestal(): void {
    // Polished dark obsidian / marble pedestal base
    this.pedestalMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1219,
      roughness: 0.18,
      metalness: 0.35,
    });
    const pedestalGeo = new THREE.CylinderGeometry(1.4, 1.5, 0.14, 32);
    this.pedestalMesh = new THREE.Mesh(pedestalGeo, this.pedestalMaterial);
    this.pedestalMesh.position.y = -0.07;
    this.bottleGroup.add(this.pedestalMesh);

    // Gold rim around pedestal
    const rimGeo = new THREE.TorusGeometry(1.46, 0.02, 12, 48);
    const rimMesh = new THREE.Mesh(rimGeo, this.goldMaterial);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.y = 0;
    this.bottleGroup.add(rimMesh);
  }

  private buildParticles(): void {
    const particleCount = 100;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 0.6 + Math.random() * 2.4;
      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = -0.5 + Math.random() * 3.8;
      positions[i * 3 + 2] = Math.sin(theta) * radius;
      scales[i] = 0.5 + Math.random() * 0.8;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(233, 216, 195, 1)');
    grad.addColorStop(0.3, 'rgba(197, 162, 101, 0.8)');
    grad.addColorStop(1, 'rgba(23, 18, 23, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.PointsMaterial({
      size: 0.16,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.75,
    });

    this.particlesMesh = new THREE.Points(geometry, material);
    this.scene.add(this.particlesMesh);
  }

  private buildContactShadow(): void {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 62);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.9)');
    grad.addColorStop(0.4, 'rgba(20, 10, 16, 0.5)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;

    const geo = new THREE.PlaneGeometry(4.2, 4.2);
    const mat = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
    });

    this.shadowPlane = new THREE.Mesh(geo, mat);
    this.shadowPlane.rotation.x = -Math.PI / 2;
    this.shadowPlane.position.y = -0.48;
    this.scene.add(this.shadowPlane);
  }

  public applyPreset(preset: EssencePreset): void {
    sounds.playCrystalChime(850);
    if (preset === 'rose') {
      this.liquidMaterial.color.set('#F4C2C2');
      this.liquidMaterial.attenuationColor.set('#5A1028');
      this.liquidMaterial.attenuationDistance = 0.55;
      this.capMaterial.color.set('#FCE8EB');
      this.capMaterial.attenuationColor.set('#C78F99');
      this.goldMaterial.color.set('#D4AF37');
    } else if (preset === 'ambre') {
      this.liquidMaterial.color.set('#FFD899');
      this.liquidMaterial.attenuationColor.set('#9A4D14');
      this.liquidMaterial.attenuationDistance = 0.48;
      this.capMaterial.color.set('#FFF4E0');
      this.capMaterial.attenuationColor.set('#D9822B');
      this.goldMaterial.color.set('#E5B342');
    } else if (preset === 'oud') {
      this.liquidMaterial.color.set('#7C3A4D');
      this.liquidMaterial.attenuationColor.set('#200612');
      this.liquidMaterial.attenuationDistance = 0.35;
      this.capMaterial.color.set('#D6C0C9');
      this.capMaterial.attenuationColor.set('#3D1428');
      this.goldMaterial.color.set('#C5A265');
    } else if (preset === 'neroli') {
      this.liquidMaterial.color.set('#FFF9EE');
      this.liquidMaterial.attenuationColor.set('#C29547');
      this.liquidMaterial.attenuationDistance = 0.75;
      this.capMaterial.color.set('#FFFFFF');
      this.capMaterial.attenuationColor.set('#E9D8C3');
      this.goldMaterial.color.set('#E8CF8C');
    }
  }

  public setCameraView(view: CameraPreset): void {
    sounds.playCrystalChime(950);
    if (view === 'front') {
      this.targetCameraPos.set(0, 0.2, 5.2);
    } else if (view === 'cap') {
      this.targetCameraPos.set(0, 1.8, 3.2);
    } else if (view === 'top') {
      this.targetCameraPos.set(0, 3.8, 2.5);
    } else if (view === 'isometric') {
      this.targetCameraPos.set(3.2, 2.0, 3.8);
    }
  }

  public setExplodedView(val: number): void {
    this.explodedValue = THREE.MathUtils.clamp(val, 0, 1);
  }

  public toggleAutoRotate(): boolean {
    this.isAutoRotating = !this.isAutoRotating;
    sounds.playCrystalChime(isFinite(this.targetRotationY) ? 750 : 800);
    return this.isAutoRotating;
  }

  private setupEvents(): void {
    const handlePointerMove = (e: MouseEvent) => {
      const rect = this.container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      this.mouse.x = x;
      this.mouse.y = y;

      // Update spot light position based on mouse cursor for glints
      if (this.spotLight) {
        this.spotLight.position.x = x * 4;
        this.spotLight.position.y = y * 3 + 3;
      }

      if (!this.isAutoRotating) {
        this.targetRotationY = x * 0.9;
        this.targetRotationX = -y * 0.4;
      }
    };

    const handleResize = () => {
      if (!this.container) return;
      const width = this.container.clientWidth;
      const height = this.container.clientHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    this.container.addEventListener('mousemove', handlePointerMove);
  }

  private animate = (): void => {
    this.animationFrameId = requestAnimationFrame(this.animate);

    const delta = Math.min(this.clock.getDelta(), 0.1);
    const time = this.clock.getElapsedTime();

    // Smooth camera transition between viewpoints
    this.currentCameraPos.lerp(this.targetCameraPos, delta * 3.5);
    this.camera.position.copy(this.currentCameraPos);
    this.camera.lookAt(0, 0.4, 0);

    // Subtle floating
    const floatY = Math.sin(time * 0.8) * 0.05;
    this.bottleGroup.position.y = THREE.MathUtils.damp(this.bottleGroup.position.y, -0.4 + floatY, 4, delta);

    // Rotation
    if (this.isAutoRotating) {
      this.bottleGroup.rotation.y += delta * 0.4;
      const tiltX = -this.mouse.y * 0.15;
      this.bottleGroup.rotation.x = THREE.MathUtils.damp(this.bottleGroup.rotation.x, tiltX, 4, delta);
    } else {
      this.bottleGroup.rotation.y = THREE.MathUtils.damp(this.bottleGroup.rotation.y, this.targetRotationY, 5, delta);
      this.bottleGroup.rotation.x = THREE.MathUtils.damp(this.bottleGroup.rotation.x, this.targetRotationX, 5, delta);
    }

    // Exploded view
    const bodyHeight = 1.75;
    const capBaseY = bodyHeight + 1.02;
    const collarBaseY = bodyHeight + 0.42;
    const nozzleBaseY = bodyHeight + 0.62;

    const targetCapY = capBaseY + this.explodedValue * 1.1;
    const targetNozzleY = nozzleBaseY + this.explodedValue * 0.65;
    const targetCollarY = collarBaseY + this.explodedValue * 0.3;

    this.capMesh.position.y = THREE.MathUtils.damp(this.capMesh.position.y, targetCapY, 6, delta);
    this.nozzleMesh.position.y = THREE.MathUtils.damp(this.nozzleMesh.position.y, targetNozzleY, 6, delta);
    this.collarMesh.position.y = THREE.MathUtils.damp(this.collarMesh.position.y, targetCollarY, 6, delta);

    // Particles swirl
    if (this.particlesMesh) {
      const positions = this.particlesMesh.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length / 3; i++) {
        positions[i * 3 + 1] += delta * 0.18;
        if (positions[i * 3 + 1] > 3.4) {
          positions[i * 3 + 1] = -0.5;
        }
      }
      this.particlesMesh.geometry.attributes.position.needsUpdate = true;
      this.particlesMesh.rotation.y += delta * 0.06;
    }

    this.renderer.render(this.scene, this.camera);
  };

  public destroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.pmremGenerator.dispose();
    this.renderer.dispose();
    if (this.container && this.renderer.domElement) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}
