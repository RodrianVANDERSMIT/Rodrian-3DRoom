// Uniforms
uniform float uTime; // Temps écoulé pour animer les effets
uniform sampler2D uPerlinTexture; // Texture de Perlin utilisée pour ajouter du bruit

// Varying
varying vec2 vUv; // Coordonnées UV transmises au fragment shader

// Fonction pour faire tourner un vecteur 2D autour de l'origine
vec2 rotate2D(vec2 value, float angle) {
    float s = sin(angle); // Sinus de l'angle
    float c = cos(angle); // Cosinus de l'angle
    mat2 m = mat2(c, s, -s, c); // Matrice de rotation 2D
    return m * value; // Application de la rotation
}

void main() {
    vec3 newPosition = position; // Copie des coordonnées de position du vertex

    // Twist
    // Récupère une valeur de la texture Perlin pour la torsion, modifiée par le temps
    float twistPerlin = texture(uPerlinTexture, vec2(0.5, uv.y * 0.2 - uTime * 0.005)).r;
    float angle = twistPerlin * 10.0; // Calcul de l'angle de torsion basé sur la valeur Perlin
    newPosition.xz = rotate2D(newPosition.xz, angle); // Applique la torsion aux coordonnées XZ



    // Calcul de la position finale du vertex
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

    vUv = uv; // Passe les coordonnées UV au fragment shader
}