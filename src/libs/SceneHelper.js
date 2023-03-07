import * as THREE from 'three';
import gsap from "gsap";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";


export default class SceneHelper {
    /**
     *
     * @param { String } canvasId
     */
    constructor(canvasId) {
        this.canvasId = canvasId;

        this.isInitialized = undefined;
        this.scene = undefined;
        this.camera = undefined;
        this.webGLRenderer = undefined;
        this.composer = undefined;
        this.loadingManager = undefined;

        this.controls = undefined;
        this.globeGroup = undefined;

        this.enableSpin = undefined;
        this.isLookingAtCity = undefined;

        this.timeOutFunctionId = undefined;

        this.temp = 5.5;
        this.radius = 200;
    }


    initialize() {
        this.scene = new THREE.Scene();

        const starGeometry = new THREE.SphereGeometry(0.4, 10, 10);

        const starVertices = [];
        for (let i = 0; i < 10000; i++) {
            let x = (Math.random() - 0.5) * 1000;
            let y = (Math.random() - 0.5) * 1000;
            let z = (Math.random() - 0.5) * 1000;

            if (x <= 100) x += 100;
            if (y <= 100) y += 100;
            if (z <= 100) z += 100;
            starVertices.push(x, y, z);
        }

        starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starVertices, 3));

        this.scene.add(new THREE.Points(
            starGeometry,
            new THREE.PointsMaterial({ color: 0xFFFFFF })
        ));

        const canvasContainer = document.getElementById("canvasContainer");

        this.camera = new THREE.PerspectiveCamera(
            75,
            canvasContainer.offsetWidth / canvasContainer.offsetHeight,
            0.1,
            1000
          );
        this.camera.position.z = 15;

        const canvas = document.getElementById(this.canvasId);

        this.webGLRenderer = new THREE.WebGLRenderer({
          canvas,
          antialias: true
        });
        this.webGLRenderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
        this.webGLRenderer.setPixelRatio(devicePixelRatio);

        this.composer = new EffectComposer(this.webGLRenderer);

        this.composer.addPass(new RenderPass(this.scene, this.camera));
        this.composer.addPass(new UnrealBloomPass(new THREE.Vector2(canvasContainer.offsetWidth, canvasContainer.offsetHeight), 2.0, 0.5, 0.99));



        this.controls = new OrbitControls(this.camera, this.webGLRenderer.domElement);
        this.controls.enableDamping = true;
        this.controls.minDistance = 6;
        this.controls.maxDistance = 50;

        this.globeGroup = new THREE.Group();
        this.scene.add(this.globeGroup);

        this.enableSpin = true;
        this.isLookingAtCity = false;

        this.timeOutFunctionId = null;

        window.addEventListener("resize", () => this.onWindowContextResize(), false);
        canvas.addEventListener("mousedown", () => this.onWindowContextMouseDown(), false);
        canvas.addEventListener("mouseup", () => this.onWindowContextMouseUp(), false);
        document.addEventListener("geoLocationRequest", (data) => this.LootAtGeoCoordinates(data), false);

        this.isInitialized = true;
    }


    animate() {
        window.requestAnimationFrame(this.animate.bind(this));

        const globeMesh = this.scene.getObjectByName("globeMesh");
        const atmosphere = this.scene.getObjectByName("atmosphere");
        const sun = this.scene.getObjectByName("sun");

        if (this.enableSpin) globeMesh.rotation.y += 0.001;

        console.log(atmosphere.material.uniforms["viewDir"].value);
        sun.position.x = Math.cos(this.temp) * this.radius;
        sun.position.z = Math.sin(this.temp) * this.radius;
        globeMesh.material.uniforms["sunDirection"].value = sun.position;
        atmosphere.material.uniforms["viewDir"].value = new THREE.Vector3().copy(this.camera.position).negate().normalize();

        this.controls.update();
        this.render();

        this.temp -= 0.0002;
      }


      render() {
        // this.webGLRenderer.render(this.scene, this.camera);
        this.composer.render();
      }

      /**
       *
       * @param { Number } latitude
       * @param { Number } longitude
       * @param { Number } radius
       * @returns { Number[] } Vector3
       */
      static calculateLongLatPosToRadius(latitude, longitude, radius) {
        let calculatedLatitude  = (90 - latitude) * (Math.PI / 180);
        let calculatedLongitude = (longitude + 180) * (Math.PI / 180);

        let x, y, z;
        x = -((radius) * Math.sin(calculatedLatitude) * Math.cos(calculatedLongitude));
        y =  ((radius) * Math.cos(calculatedLatitude));
        z =  ((radius) * Math.sin(calculatedLatitude) * Math.sin(calculatedLongitude));

        return [x, y, z];
      }


      /**
       *
       * @param { Number } x
       * @param { Number } y
       * @returns { Number }
       */
      static getAngle(x, y) {
        if (x == 0 && y == 0) return 0;  // or NaN, if desired

        let rad = Math.atan2(y, x);
        let deg = rad / (Math.PI / 180);
        if (deg < 0) deg += 360;

        return deg;
      }

    onWindowContextResize() {
        const canvasContainer = document.getElementById("canvasContainer");
        this.camera.aspect = canvasContainer.offsetWidth / canvasContainer.offsetHeight;
        this.camera.updateProjectionMatrix();
        this.webGLRenderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
    }

    onWindowContextMouseDown() {
        this.enableSpin = false;
        this.isLookingAtCity = false;
        this.globeGroup.getObjectByName("globeMesh").remove(this.camera);
        if (typeof this.timeOutFunctionId == "number") clearTimeout(this.timeOutFunctionId);
    }

    onWindowContextMouseUp() {
        this.timeOutFunctionId = setTimeout(() => this.enableSpin = true, 5 * 1000);
    }

    LootAtGeoCoordinates(data) {
        let long = confineCoordinateHemispheres(data.detail.longitude);
        let lat = confineCoordinateHemispheres(data.detail.latitude);

        const potentialDuplicate = this.globeGroup.getObjectByName("globeMesh").children.find(object => object.name === `${long}${lat}`);
        if (potentialDuplicate) {
            this.globeGroup.getObjectByName("globeMesh").add(this.camera);

            gsap.to(this.camera.position, {
                x: potentialDuplicate.position.x,
                y: potentialDuplicate.position.y,
                z: potentialDuplicate.position.z
            });
            return;
        };

        let geoPosition = SceneHelper.calculateLongLatPosToRadius(lat, long, 5);

        const geoLocationSphere = new THREE.Mesh(
            new THREE.SphereGeometry(0.025, 20, 20),
            new THREE.MeshBasicMaterial({
                color: getPointColor()
            })
        );

        geoLocationSphere.name = `${long}${lat}`;

        geoLocationSphere.position.set(geoPosition[0], geoPosition[1], geoPosition[2]);

        gsap.to(this.camera.position, {
            x: geoLocationSphere.position.x,
            y: geoLocationSphere.position.y,
            z: geoLocationSphere.position.z
        });


        this.globeGroup.getObjectByName("globeMesh").add(geoLocationSphere).add(this.camera);

        /**
         * @param { String } coordinate 
         */
        function confineCoordinateHemispheres(coordinate) {
            let isNorthFacing = coordinate.indexOf("N") !== -1;
            let isSouthFacing = coordinate.indexOf("S") !== -1;
            let isWestFacing = coordinate.indexOf("W") !== -1;
            let isEastFacing = coordinate.indexOf("E") !== -1;
            
            let coordinateNumber = parseFloat(coordinate.replace(/[^0-9.,]+/g, ''));

            if (isNorthFacing || isEastFacing) return coordinateNumber;
            else if (isSouthFacing || isWestFacing) return -Math.abs(coordinateNumber);
        }

        function getPointColor() {
            let magnitude = data.detail.magnitude;

            if (magnitude <= 2.4) return 0x22c55e;
            else if (magnitude >= 2.5 && magnitude <= 5.4) return 0x15803d;
            else if (magnitude >= 5.5 && magnitude <= 6.0) return 0xfde047;
            else if (magnitude >= 6.1 && magnitude <= 6.9) return 0xfbbf24;
            else if (magnitude >= 7.0 && magnitude <= 7.9) return 0xd97706;
            else if (magnitude > 8.0) return 0x991b1b;
            else return 0x9ca3af;
        }
    }
}