<template>
  <div id="line"></div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import * as THREE from 'three';

export default defineComponent({
  name: 'Line',
  setup() {
    const line = ref<HTMLDivElement>();

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      500
    );
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    const scene = new THREE.Scene();
    const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
    const geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, 10, 0));
    geometry.vertices.push(new THREE.Vector3(10, 0, 0));

    const line_ = new THREE.Line(geometry, material);
    scene.add(line_);
    renderer.render(scene, camera);
    onMounted(() => {
      line.value?.appendChild(renderer.domElement);
    });

    return {
      line,
    };
  },
});
</script>
