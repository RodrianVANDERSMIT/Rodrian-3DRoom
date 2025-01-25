// Uniforms
uniform float uTime; // Temps écoulé pour animer les effets
uniform sampler2D uPerlinTexture; // Texture de Perlin utilisée pour le bruit

// Varying
varying vec2 vUv; // Coordonnées UV reçues du vertex shader

void main() {
    // Scale and animate (mise à l'échelle et animation)
    vec2 smokeUv = vUv; // Copie des coordonnées UV
    smokeUv.x *= 0.5; // Réduit la taille horizontale de la texture
    smokeUv.y *= 0.3; // Réduit la taille verticale de la texture
    smokeUv.y -= uTime * 0.05; // Anime la texture verticalement en fonction du temps

    // Smoke (fumée)
    float smoke = texture(uPerlinTexture, smokeUv).r; // Récupère la valeur de la texture Perlin pour la couleur de la fumée

    // Remap (remappage des valeurs)
    smoke = smoothstep(0.4, 1.0, smoke); // Applique un lissage pour créer un effet de transition plus doux

    // Edges (bords)
    smoke *= smoothstep(0.0, 0.1, vUv.x); // Lissage horizontal pour les bords gauche
    smoke *= smoothstep(1.0, 0.9, vUv.x); // Lissage horizontal pour les bords droit
    smoke *= smoothstep(0.0, 0.1, vUv.y); // Lissage vertical pour les bords bas
    smoke *= smoothstep(1.0, 0.4, vUv.y); // Lissage vertical pour les bords haut

    // Final color (couleur finale)
    gl_FragColor = vec4(0.6, 0.3, 0.2, smoke); // Couleur de la fumée avec la composante alpha basée sur l'intensité de la fumée

    #include <tonemapping_fragment> // Inclut le tonemapping
    #include <colorspace_fragment> // Inclut la gestion de l'espace colorimétrique
}