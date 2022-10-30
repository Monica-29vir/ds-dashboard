<script lang="ts" setup>
import { Card, Divider, Space, Button, Descriptions } from '@arco-design/web-vue';
import PageContainer from '@/components/PageContainer.vue';
import { ref, watch } from 'vue';
import Form from './components/MongoOperation.vue';
import Success from './components/updateSuccess.vue';
import MongoJson from './components/MongoJson.vue';
let route = useRoute();
const router = useRouter();

const uuid = route.query.uuid as string;
const dbName = route.query.dbName as string;
const collectionName = route.query.collectionName as string;

const json = ref();
const getJson = (num: Object) => {
  json.value = num;
};
const step = ref(0);
const changeStep = (idx: number) => {
  step.value = idx;
};
</script>

<template>
  <PageContainer>
    <div>
      <Card class="general-card" :bordered="false">
        <div class="wrap">
          <KeepAlive>
            <Form
              v-if="step === 0"
              :uuid="uuid"
              :dbName="dbName"
              :username="collectionName"
              @change-step="changeStep"
              @getChildren="getJson"
            />
            <Success v-else-if="step === 1" @change-step="changeStep" @get-children="getJson" />
          </KeepAlive>
        </div>
      </Card>
      <Divider direction="horizontal" type="dashed" margin="10px" />
      <Card
        class="general-card"
        :bordered="false"
        :style="{ height: '280px' }"
        :headStyle="{ color: '#0785fd' }"
        :bodyStyle="{ padding: '0' }"
      >
        <template #title>MongoDB基本操作结果</template>
        <MongoJson :data="json" />
      </Card>
    </div>
  </PageContainer>
</template>

<style lang="less" scoped>
.wrap {
  display: center;
  justify-content: left;
  align-items: center;
  padding-top: 24px;
}
</style>
