import { useTexture, useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';


import coffeeSmokeVertexShader from './shaders/coffeeSmoke/vertex.glsl'
import coffeeSmokeFragmentShader from './shaders/coffeeSmoke/fragment.glsl'

export default function CoffeeCupThree() {

	const coffeeCup = useGLTF('./model/CoffeeCupThree.glb');

	const smokeMaterialRef = useRef();

	const perlinTexture = useTexture('./perlin.png');
	perlinTexture.wrapS = THREE.RepeatWrapping;
	perlinTexture.wrapT = THREE.RepeatWrapping;


	const smokeGeometry = new THREE.PlaneGeometry(1, 1, 16, 64);
	smokeGeometry.scale(0.1, 0.3, 1.5);

	useFrame(({ clock }) => {
		if (smokeMaterialRef.current) {
			smokeMaterialRef.current.uniforms.uTime.value = clock.getElapsedTime();

		}
	});


	return (
		<>
			<mesh geometry={smokeGeometry} position={[-3.65, 1.08, -1.24]}>
				<shaderMaterial
					ref={smokeMaterialRef}
					vertexShader={coffeeSmokeVertexShader}
					fragmentShader={coffeeSmokeFragmentShader}
					uniforms={{
						uTime: { value: 0 },
						uPerlinTexture: { value: perlinTexture },
					}}
					side={THREE.DoubleSide}
					transparent
					depthWrite={false}
				/>
			</mesh>
			<mesh
				geometry={coffeeCup.nodes.CofeeCupThree.geometry}
				material={coffeeCup.nodes.CofeeCupThree.material}
				castShadow
			/>

		</>
	);
}

useGLTF.preload('./model/CoffeeCupThree.glb');