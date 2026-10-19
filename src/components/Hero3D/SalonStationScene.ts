import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { sounds } from '../../utils/soundEffects';

export type LightingMode = 'daylight' | 'golden' | 'evening';
export type ChairFinish = 'caramel' | 'ivory' | 'terracotta' | 'noir';
export type StationCameraView = 'overview' | 'mirror' | 'chair';

export interface SceneOptions {
  onLoaded?: () => void;
}

export class SalonStationScene {
  private container: HTMLElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private pmremGenerator: THREE.PMREMGenerator;
  private animationFrameId: number | null = null;
  private clock: THREE.Clock;

  // Station Group
  private stationGroup: THREE.Group;
  private chairGroup: THREE.Group;
  private mirrorHaloMesh!: THREE.Mesh;
  private mirrorGlassMesh!: THREE.Mesh;

  // Materials
  private brassMaterial!: THREE.MeshStandardMaterial;
  private marbleMaterial!: THREE.MeshStandardMaterial;
  private leatherMaterial!: THREE.MeshStandardMaterial;
  private mirrorMaterial!: THREE.MeshStandardMaterial;
  private toolMatGraphite!: THREE.MeshStandardMaterial;
  private haloMaterial!: THREE.MeshBasicMaterial;

  // Lights
  private keyLight!: THREE.DirectionalLight;
  private fillLight!: THREE.DirectionalLight;
  private mirrorSpotLight!: THREE.SpotLight;
  private ambientLight!: THREE.AmbientLight;

  // State
  public isAutoRotating = true;
  private targetRotationY = 0;
  private targetRotationX = 0;
  private mouse = { x: 0, y: 0 };
  private targetCameraPos = new THREE.Vector3(0, 1.4, 4.6);
  private currentCameraPos = new THREE.Vector3(0, 1.4, 4.6);
  private targetLookAt = new THREE.Vector3(0, 1.1, 0);
  private currentLookAt = new THREE.Vector3(0, 1.1, 0);

  constructor(container: HTMLElement, options?: SceneOptions) {
    this.container = container;
    this.clock = new THREE.Clock();

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0xFAF7F2, 0.05);

    const width = this.container.clientWidth || 800;
    const height = this.container.clientHeight || 600;
    this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    this.camera.position.copy(this.currentCameraPos);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);

    // Studio Environment map using RoomEnvironment
    this.pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    this.pmremGenerator.compileEquirectangularShader();
    const envTexture = this.pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    this.scene.environment = envTexture;

    // Lighting
    this.setupLighting();

    // Assemble the Realistic 3D Salon Station
    this.stationGroup = new THREE.Group();
    this.chairGroup = new THREE.Group();

    this.buildMaterials();
    this.buildPlinthAndWall();
    this.buildArchedMirror();
    this.buildMarbleCounter();
    this.buildStylingChair();
    this.buildSalonTools();
    this.buildContactShadow();

    this.stationGroup.add(this.chairGroup);
    const isPortrait = width < 640 || width < height;
    if (isPortrait) {
      this.stationGroup.position.set(0, -0.78, 0);
      this.targetCameraPos.set(0, 1.45, 5.0);
      this.currentCameraPos.set(0, 1.45, 5.0);
      this.targetLookAt.set(0, 0.95, 0);
      this.currentLookAt.set(0, 0.95, 0);
    } else {
      this.stationGroup.position.set(0, -0.6, 0);
      this.targetCameraPos.set(0, 1.4, 4.6);
      this.currentCameraPos.set(0, 1.4, 4.6);
      this.targetLookAt.set(0, 1.1, 0);
      this.currentLookAt.set(0, 1.1, 0);
    }

    // Initial settings
    this.setLightingMode('daylight');
    this.setChairFinish('caramel');

    // Events
    this.setupEvents();

    // Start loop
    this.animate();

    if (options?.onLoaded) {
      options.onLoaded();
    }
  }

  private setupLighting(): void {
    this.keyLight = new THREE.DirectionalLight(0xfff7ea, 2.5);
    this.keyLight.position.set(4, 6, 4);
    this.keyLight.castShadow = true;
    this.keyLight.shadow.mapSize.width = 1024;
    this.keyLight.shadow.mapSize.height = 1024;
    this.keyLight.shadow.bias = -0.0005;
    this.scene.add(this.keyLight);

    this.fillLight = new THREE.DirectionalLight(0xebe2d5, 1.2);
    this.fillLight.position.set(-4, 4, 2);
    this.scene.add(this.fillLight);

    // Mirror halo back-light spotlight
    this.mirrorSpotLight = new THREE.SpotLight(0xffdfa8, 3.5, 6, Math.PI / 3, 0.4);
    this.mirrorSpotLight.position.set(0, 2.2, 0.2);
    this.mirrorSpotLight.target.position.set(0, 1.2, 0.8);
    this.scene.add(this.mirrorSpotLight);
    this.scene.add(this.mirrorSpotLight.target);

    this.ambientLight = new THREE.AmbientLight(0xf5ede1, 1.0);
    this.scene.add(this.ambientLight);
  }

  private buildMaterials(): void {
    // Brushed Champagne Brass
    this.brassMaterial = new THREE.MeshStandardMaterial({
      color: 0xc49d5c,
      metalness: 0.9,
      roughness: 0.22,
      envMapIntensity: 1.6,
    });

    // White Calacatta Gold Marble Counter
    this.marbleMaterial = new THREE.MeshStandardMaterial({
      color: 0xfaf8f5,
      roughness: 0.15,
      metalness: 0.05,
      envMapIntensity: 1.2,
    });

    // Salon Chair Leather
    this.leatherMaterial = new THREE.MeshStandardMaterial({
      color: 0x9e6236,
      roughness: 0.55,
      metalness: 0.08,
    });

    // Real Reflective Mirror Glass
    this.mirrorMaterial = new THREE.MeshStandardMaterial({
      color: 0xeeeeee,
      roughness: 0.02,
      metalness: 0.98,
      envMapIntensity: 2.0,
    });

    // Matte graphite hair tool
    this.toolMatGraphite = new THREE.MeshStandardMaterial({
      color: 0x242224,
      roughness: 0.35,
      metalness: 0.25,
    });

    // Mirror LED Halo light
    this.haloMaterial = new THREE.MeshBasicMaterial({
      color: 0xffdfa4,
      transparent: true,
      opacity: 0.85,
    });
  }

  private buildPlinthAndWall(): void {
    // 1. Travertine Floor Base Plinth
    const plinthGeo = new THREE.CylinderGeometry(2.2, 2.3, 0.1, 48);
    const plinthMat = new THREE.MeshStandardMaterial({
      color: 0xede4d6,
      roughness: 0.45,
      metalness: 0.02,
    });
    const plinth = new THREE.Mesh(plinthGeo, plinthMat);
    plinth.position.y = 0.05;
    plinth.receiveShadow = true;
    this.stationGroup.add(plinth);

    // Brass inlay rim around floor plinth
    const rimGeo = new THREE.TorusGeometry(2.25, 0.015, 12, 48);
    const rim = new THREE.Mesh(rimGeo, this.brassMaterial);
    rim.rotation.x = Math.PI / 2;
    rim.position.y = 0.1;
    this.stationGroup.add(rim);

    // 2. Minimalist Arched Wall Panel behind mirror
    const wallGeo = new THREE.BoxGeometry(2.6, 3.2, 0.1);
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0xf5eee4,
      roughness: 0.8,
    });
    const wall = new THREE.Mesh(wallGeo, wallMat);
    wall.position.set(0, 1.6, -0.6);
    wall.receiveShadow = true;
    this.stationGroup.add(wall);
  }

  private buildArchedMirror(): void {
    const mirrorWidth = 1.3;
    const mirrorHeight = 2.0;

    // Arched Mirror Frame: Box lower + Cylinder top arch
    const frameGroup = new THREE.Group();

    // Mirror frame brass border
    const frameRectGeo = new THREE.BoxGeometry(mirrorWidth + 0.06, mirrorHeight * 0.7, 0.04);
    const frameRect = new THREE.Mesh(frameRectGeo, this.brassMaterial);
    frameRect.position.set(0, 1.4, -0.48);
    frameGroup.add(frameRect);

    // Arch top curve
    const archTopGeo = new THREE.CylinderGeometry(
      (mirrorWidth + 0.06) / 2,
      (mirrorWidth + 0.06) / 2,
      0.04,
      32,
      1,
      false,
      0,
      Math.PI
    );
    const archTop = new THREE.Mesh(archTopGeo, this.brassMaterial);
    archTop.rotation.z = Math.PI / 2;
    archTop.rotation.y = Math.PI / 2;
    archTop.position.set(0, 1.4 + (mirrorHeight * 0.7) / 2, -0.48);
    frameGroup.add(archTop);

    // Mirror Glass Surface
    const glassRectGeo = new THREE.PlaneGeometry(mirrorWidth, mirrorHeight * 0.7);
    this.mirrorGlassMesh = new THREE.Mesh(glassRectGeo, this.mirrorMaterial);
    this.mirrorGlassMesh.position.set(0, 1.4, -0.45);
    frameGroup.add(this.mirrorGlassMesh);

    // Glass Arch Top
    const glassArchGeo = new THREE.CircleGeometry(mirrorWidth / 2, 32, 0, Math.PI);
    const glassArch = new THREE.Mesh(glassArchGeo, this.mirrorMaterial);
    glassArch.position.set(0, 1.4 + (mirrorHeight * 0.7) / 2, -0.45);
    frameGroup.add(glassArch);

    // Glowing LED Halo Ring behind the mirror frame
    const haloArchGeo = new THREE.TorusGeometry(mirrorWidth / 2 + 0.04, 0.02, 12, 32, Math.PI);
    this.mirrorHaloMesh = new THREE.Mesh(haloArchGeo, this.haloMaterial);
    this.mirrorHaloMesh.position.set(0, 1.4 + (mirrorHeight * 0.7) / 2, -0.5);
    frameGroup.add(this.mirrorHaloMesh);

    this.stationGroup.add(frameGroup);
  }

  private buildMarbleCounter(): void {
    // White marble vanity slab
    const counterWidth = 1.7;
    const counterDepth = 0.48;
    const counterHeight = 0.08;

    const slabGeo = new THREE.BoxGeometry(counterWidth, counterHeight, counterDepth);
    const counter = new THREE.Mesh(slabGeo, this.marbleMaterial);
    counter.position.set(0, 0.95, -0.28);
    counter.castShadow = true;
    counter.receiveShadow = true;
    this.stationGroup.add(counter);

    // Brass wall bracket supports underneath
    const bracketGeo = new THREE.BoxGeometry(0.04, 0.35, 0.35);
    const b1 = new THREE.Mesh(bracketGeo, this.brassMaterial);
    b1.position.set(-0.6, 0.76, -0.32);
    const b2 = new THREE.Mesh(bracketGeo, this.brassMaterial);
    b2.position.set(0.6, 0.76, -0.32);
    this.stationGroup.add(b1);
    this.stationGroup.add(b2);
  }

  private buildStylingChair(): void {
    // Circular heavy brass pedestal base
    const baseGeo = new THREE.CylinderGeometry(0.42, 0.44, 0.05, 32);
    const base = new THREE.Mesh(baseGeo, this.brassMaterial);
    base.position.y = 0.12;
    base.castShadow = true;
    this.chairGroup.add(base);

    // Chrome/Brass hydraulic central pillar
    const pillarGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.45, 24);
    const pillar = new THREE.Mesh(pillarGeo, this.brassMaterial);
    pillar.position.y = 0.35;
    this.chairGroup.add(pillar);

    // Foot pump pedal
    const pedalGeo = new THREE.BoxGeometry(0.24, 0.02, 0.14);
    const pedal = new THREE.Mesh(pedalGeo, this.brassMaterial);
    pedal.position.set(0, 0.22, 0.28);
    this.chairGroup.add(pedal);

    // Seat cushion (curved circular disc with bevel)
    const seatGeo = new THREE.CylinderGeometry(0.44, 0.42, 0.12, 32);
    const seat = new THREE.Mesh(seatGeo, this.leatherMaterial);
    seat.position.y = 0.62;
    seat.castShadow = true;
    this.chairGroup.add(seat);

    // Ergonomic curved wrap-around backrest
    const backGeo = new THREE.CylinderGeometry(0.46, 0.46, 0.38, 24, 1, true, -Math.PI * 0.45, Math.PI * 0.9);
    const back = new THREE.Mesh(backGeo, this.leatherMaterial);
    back.position.set(0, 0.85, 0);
    back.rotation.y = Math.PI;
    back.castShadow = true;
    this.chairGroup.add(back);

    // Brass back support spine
    const spineGeo = new THREE.BoxGeometry(0.06, 0.35, 0.04);
    const spine = new THREE.Mesh(spineGeo, this.brassMaterial);
    spine.position.set(0, 0.74, -0.46);
    this.chairGroup.add(spine);

    // Place chair in front of the vanity counter
    this.chairGroup.position.set(0, 0, 0.45);
  }

  private buildSalonTools(): void {
    const toolsGroup = new THREE.Group();

    // 1. Professional Ionic Hair Dryer (lying on the marble counter)
    const dryerBodyGeo = new THREE.CylinderGeometry(0.045, 0.048, 0.18, 16);
    const dryerBody = new THREE.Mesh(dryerBodyGeo, this.toolMatGraphite);
    dryerBody.rotation.x = Math.PI / 2;
    dryerBody.position.set(-0.45, 1.04, -0.25);

    // Dryer rose gold nozzle ring
    const ringGeo = new THREE.TorusGeometry(0.046, 0.008, 12, 24);
    const dryerRing = new THREE.Mesh(ringGeo, this.brassMaterial);
    dryerRing.position.set(-0.45, 1.04, -0.16);

    // Dryer handle
    const handleGeo = new THREE.CylinderGeometry(0.022, 0.022, 0.16, 12);
    const handle = new THREE.Mesh(handleGeo, this.toolMatGraphite);
    handle.rotation.z = Math.PI / 3;
    handle.position.set(-0.49, 0.98, -0.25);

    toolsGroup.add(dryerBody);
    toolsGroup.add(dryerRing);
    toolsGroup.add(handle);

    // 2. Amber Glass Moroccan Argan Oil Bottle with Dropper
    const bottleGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.11, 16);
    const bottleMat = new THREE.MeshPhysicalMaterial({
      color: 0x995511,
      transmission: 0.85,
      roughness: 0.1,
      transparent: true,
    });
    const bottle = new THREE.Mesh(bottleGeo, bottleMat);
    bottle.position.set(0.48, 1.05, -0.28);

    // Gold bottle dropper cap
    const capGeo = new THREE.CylinderGeometry(0.016, 0.02, 0.04, 12);
    const cap = new THREE.Mesh(capGeo, this.brassMaterial);
    cap.position.set(0.48, 1.12, -0.28);

    toolsGroup.add(bottle);
    toolsGroup.add(cap);

    // 3. Gold Hairdressing Scissors on leather mat
    const matGeo = new THREE.BoxGeometry(0.24, 0.005, 0.14);
    const toolMat = new THREE.MeshStandardMaterial({ color: 0x3d281a, roughness: 0.8 });
    const mat = new THREE.Mesh(matGeo, toolMat);
    mat.position.set(0.15, 1.0, -0.26);

    const bladeGeo = new THREE.BoxGeometry(0.012, 0.004, 0.12);
    const scissors = new THREE.Mesh(bladeGeo, this.brassMaterial);
    scissors.rotation.y = 0.3;
    scissors.position.set(0.15, 1.01, -0.26);

    toolsGroup.add(mat);
    toolsGroup.add(scissors);

    this.stationGroup.add(toolsGroup);
  }

  private buildContactShadow(): void {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 60);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.35)');
    grad.addColorStop(0.5, 'rgba(80, 60, 40, 0.12)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;

    const geo = new THREE.PlaneGeometry(4.8, 4.8);
    const mat = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
    });

    const shadowPlane = new THREE.Mesh(geo, mat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = 0.01;
    this.stationGroup.add(shadowPlane);
  }

  public setLightingMode(mode: LightingMode): void {
    sounds.playCrystalChime(850);
    if (mode === 'daylight') {
      // Crisp Moroccan Mediterranean Sunlight
      this.keyLight.color.set(0xfff7ea);
      this.keyLight.intensity = 2.8;
      this.fillLight.color.set(0xe8e2d8);
      this.fillLight.intensity = 1.4;
      this.mirrorSpotLight.intensity = 1.5;
      this.ambientLight.intensity = 1.1;
      this.haloMaterial.opacity = 0.4;
      this.scene.fog = new THREE.FogExp2(0xFAF7F2, 0.04);
    } else if (mode === 'golden') {
      // Haute Coiffure Golden Hour / Backlit Studio
      this.keyLight.color.set(0xffdfb0);
      this.keyLight.intensity = 2.2;
      this.fillLight.color.set(0xe6be8a);
      this.fillLight.intensity = 1.2;
      this.mirrorSpotLight.intensity = 4.0;
      this.ambientLight.intensity = 0.85;
      this.haloMaterial.opacity = 0.95;
      this.scene.fog = new THREE.FogExp2(0xF5EBDC, 0.05);
    } else if (mode === 'evening') {
      // Intimate Moroccan Spa Evening
      this.keyLight.color.set(0xdfa068);
      this.keyLight.intensity = 1.2;
      this.fillLight.color.set(0x9a6538);
      this.fillLight.intensity = 0.6;
      this.mirrorSpotLight.intensity = 4.5;
      this.ambientLight.intensity = 0.45;
      this.haloMaterial.opacity = 1.0;
      this.scene.fog = new THREE.FogExp2(0x282024, 0.08);
    }
  }

  public setChairFinish(finish: ChairFinish): void {
    sounds.playCrystalChime(920);
    if (finish === 'caramel') {
      this.leatherMaterial.color.set(0x9e6236);
      this.leatherMaterial.roughness = 0.55;
    } else if (finish === 'ivory') {
      this.leatherMaterial.color.set(0xede6dc);
      this.leatherMaterial.roughness = 0.75; // Bouclé feel
    } else if (finish === 'terracotta') {
      this.leatherMaterial.color.set(0x8d4a3d);
      this.leatherMaterial.roughness = 0.65;
    } else if (finish === 'noir') {
      this.leatherMaterial.color.set(0x242223);
      this.leatherMaterial.roughness = 0.45;
    }
  }

  public setCameraView(view: StationCameraView): void {
    sounds.playCrystalChime(1000);
    if (view === 'overview') {
      this.targetCameraPos.set(0, 1.4, 4.6);
      this.targetLookAt.set(0, 1.1, 0);
    } else if (view === 'mirror') {
      this.targetCameraPos.set(0.1, 1.35, 1.9);
      this.targetLookAt.set(0, 1.3, -0.4);
    } else if (view === 'chair') {
      this.targetCameraPos.set(1.4, 1.1, 2.2);
      this.targetLookAt.set(0, 0.7, 0.4);
    }
  }

  public toggleAutoRotate(): boolean {
    this.isAutoRotating = !this.isAutoRotating;
    sounds.playCrystalChime(750);
    return this.isAutoRotating;
  }

  private setupEvents(): void {
    const handlePointerMove = (e: MouseEvent) => {
      const rect = this.container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      this.mouse.x = x;
      this.mouse.y = y;

      if (!this.isAutoRotating) {
        this.targetRotationY = x * 0.7;
        this.targetRotationX = -y * 0.25;
      }
    };

    const handleResize = () => {
      if (!this.container) return;
      const width = this.container.clientWidth;
      const height = this.container.clientHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);

      const isPortrait = width < 640 || width < height;
      if (isPortrait) {
        this.stationGroup.position.set(0, -0.78, 0);
        this.targetCameraPos.set(0, 1.45, 5.0);
        this.targetLookAt.set(0, 0.95, 0);
      } else {
        this.stationGroup.position.set(0, -0.6, 0);
        this.targetCameraPos.set(0, 1.4, 4.6);
        this.targetLookAt.set(0, 1.1, 0);
      }
    };

    window.addEventListener('resize', handleResize);
    this.container.addEventListener('mousemove', handlePointerMove);
  }

  private animate = (): void => {
    this.animationFrameId = requestAnimationFrame(this.animate);

    const delta = Math.min(this.clock.getDelta(), 0.1);
    const time = this.clock.getElapsedTime();

    // Camera damping
    this.currentCameraPos.lerp(this.targetCameraPos, delta * 3.5);
    this.currentLookAt.lerp(this.targetLookAt, delta * 3.5);
    this.camera.position.copy(this.currentCameraPos);
    this.camera.lookAt(this.currentLookAt);

    // Subtle gentle floating/breathing
    const gentleBreathe = Math.sin(time * 0.7) * 0.015;
    this.chairGroup.position.y = gentleBreathe;

    // Station rotation
    if (this.isAutoRotating) {
      this.stationGroup.rotation.y = Math.sin(time * 0.35) * 0.35;
      const tiltX = -this.mouse.y * 0.08;
      this.stationGroup.rotation.x = THREE.MathUtils.damp(this.stationGroup.rotation.x, tiltX, 4, delta);
    } else {
      this.stationGroup.rotation.y = THREE.MathUtils.damp(this.stationGroup.rotation.y, this.targetRotationY, 5, delta);
      this.stationGroup.rotation.x = THREE.MathUtils.damp(this.stationGroup.rotation.x, this.targetRotationX, 5, delta);
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
