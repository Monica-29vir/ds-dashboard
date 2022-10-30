<script lang="ts" setup>
import { CollapseItem } from '@arco-design/web-vue';

const props = defineProps({
  data: Object,
});
</script>

<template>
  <div style="position: relative">
    <span>
      <pre>{{ JSON.stringify(data, null, 4) }}</pre>
    </span>
  </div>
</template>
