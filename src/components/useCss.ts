import { computed, Ref, ref, unref, watch } from 'vue';

const useCss: (prop: string, target?: HTMLElement) => Ref<string | null> = (
  prop,
  target
) => {
  const variable = ref<string | null>(null);
  const elRef = computed(
    () => unref(target) || window?.document?.documentElement
  );

  watch(
    elRef,
    (el) => {
      if (el && window) {
        variable.value = window.getComputedStyle(el).getPropertyValue(prop);
      }
    },
    {
      immediate: true,
    }
  );

  watch(variable, (val) => {
    if (elRef.value?.style) elRef.value.style.setProperty(prop, val);
  });

  return variable;
};

export default useCss;
