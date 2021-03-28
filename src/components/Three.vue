<template>
  <h5>{{ props.msg }}</h5>
  <div ref="id"></div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import * as Three from "three";

export default defineComponent({
  name: "Three",
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  setup: (props) => {
    const id = ref<HTMLDivElement>();

    const scene = new Three.Scene();
    const camera = new Three.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new Three.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new Three.BoxGeometry(1, 1, 1);
    const material = new Three.MeshBasicMaterial({ color: 12091209 });
    const cube = new Three.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    onMounted(() => {
      id.value?.appendChild(renderer.domElement);
      animate();
    });
    return {
      props,
      id,
    };
  },
});
</script>
