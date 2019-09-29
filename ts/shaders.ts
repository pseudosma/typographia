import { ShaderMaterial } from "@babylonjs/core/Materials/shaderMaterial";
import { Effect } from "@babylonjs/core/Materials/effect";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math";

export class ShaderBuilder {
    constructor(thisScene: Scene) {
        Effect.ShadersStore["customVertexShader"] =
        "precision highp float;\n" +
        "attribute vec3 position;\n" +
        "attribute vec3 normal; \n" +
        "attribute vec2 uv;\n" +
        "\n" +
        "#include<instancesDeclaration>\n" +
        "uniform mat4 viewProjection;\n" +
        "\n" +
        "void main() {\n" +
        "#include<instancesVertex>\n" +
        "vec4 p = vec4( position, 1.0 );\n" +
        "gl_Position = viewProjection * finalWorld * p;\n" +
        "}\n";
    
        Effect.ShadersStore["customPixelShader"] =
        "void main(void) {\n" +
        "gl_FragColor=vec4(1.0,1.0,1.0,1.0);\n" +
        "}";

        // Compile
        var shaderMaterial = new ShaderMaterial("shader", thisScene, {
            vertex: "custom",
            fragment: "custom",
        },
            {
                attributes: ["position", "normal", "uv", "world0", "world1", "world2", "world3"],
                uniforms: ["viewProjection"],
            });

        shaderMaterial.setFloat("time", 0);
        shaderMaterial.setVector3("cameraPosition", Vector3.Zero());
        shaderMaterial.backFaceCulling = true;
    }
}