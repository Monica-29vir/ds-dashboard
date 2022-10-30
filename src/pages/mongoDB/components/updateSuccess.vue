<script lang="ts" setup>
import { Result, Space, Button } from '@arco-design/web-vue';

const emit = defineEmits<{
  (e: 'change-step', idx: number): void;
  (e: 'getChildren', num: object): void;
}>();

const router = useRouter();

const handlePre = () => {
  emit('change-step', 0);
  emit('getChildren', Object);
};
</script>

<template>
  <div>
    <Result status="success" title="操作成功">
      <template #extra>
        <Space :size="16">
          <Button type="primary" @click="handlePre">再次操作</Button>
        </Space>
      </template>
    </Result>
  </div>
</template>
