import { useEffect } from 'react';
import {
  Mesh, 
  SphereGeometry, 
  ShaderMaterial, 
  TextureLoader, 
  AdditiveBlending, 
  BackSide, 
  Vector3,
  MeshLambertMaterial,
  Color
} from "three";
import { Lensflare, LensflareElement } from "three/examples/jsm/objects/Lensflare";

import SceneHelper from '../libs/SceneHelper';

import globeTexture from "../assets/worldColour.5400x2700.jpg";
import nightGlobeTexture from "../assets/nightmap.jpg";
import lensFlareTexture1 from "../assets/lensflare0.png";
import lensFlareTexture2 from "../assets/lensflare3.png";

import atmosphereVertexShader from "../shaders/atmosphereVertex.glsl";
import atmosphereFragmentShader from "../shaders/atmosphereFragment.glsl";
import earthFragmentShader from "../shaders/earthFragmentShader.glsl";
import earthVertexShader from "../shaders/earthVertexShader.glsl";

function ThreeCanvas(props) {
    useEffect(() => {
      const sceneHelper = new SceneHelper("globeCanvas");
      sceneHelper.initialize();

        const earth = new Mesh(
            new SphereGeometry(5, 50, 50),
            new ShaderMaterial({
                fragmentShader: earthFragmentShader,
                vertexShader: earthVertexShader,
                uniforms: {
                    sunDirection: { value: new Vector3(30, 3, 0) },
                    dayTexture: { value: new TextureLoader().load(globeTexture) },
                    nightTexture: { value: new TextureLoader().load(nightGlobeTexture) }
                  }
            })
        );
        earth.name = "globeMesh";
        earth.rotation.z = -0.3;
        sceneHelper.globeGroup.add(earth);

        const atmosphere = new Mesh(
            new SphereGeometry(5, 50, 50),
            new ShaderMaterial({
              uniforms: {
                viewDir: { value: new Vector3() }
              },
              vertexShader: atmosphereVertexShader,
              fragmentShader: atmosphereFragmentShader,
              blending: AdditiveBlending,
              side: BackSide
            })
          );
        atmosphere.scale.set(1.1, 1.1, 1.1);
        atmosphere.name = "atmosphere";
        sceneHelper.scene.add(atmosphere);

        const sun = new Mesh(
            new SphereGeometry(7, 50, 50),
            new MeshLambertMaterial({
              color: 0xFCE570,
              emissive: 0xFFFFFF
            })
          );
           sun.name = "sun";
           sun.position.y = 3;
           sun.position.x = 30;
  
           const lensFlare = new Lensflare();
           const lensFlareTexture = new TextureLoader().load(lensFlareTexture2);
           lensFlare.addElement(new LensflareElement(new TextureLoader().load(lensFlareTexture1), 2000, 0, new Color(0xFFFFFF)));
           lensFlare.addElement(new LensflareElement(lensFlareTexture, 600, 0.6));
           lensFlare.addElement(new LensflareElement(lensFlareTexture, 700, 0.7));
           lensFlare.addElement(new LensflareElement(lensFlareTexture, 600, 1));
           sun.add(lensFlare);

           sceneHelper.scene.add(sun);

           sceneHelper.animate();
    }, []);

    return (
        <canvas id="globeCanvas" className="hover: cursor-move z-0" onClick={props.onClick} />
    )
}

export default ThreeCanvas;