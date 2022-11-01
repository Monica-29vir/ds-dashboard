<script lang="ts" setup>
import PageContainer from '@/components/PageContainer.vue';
import { reactive } from 'vue';
import {
  Card,
  FormItem,
  Input,
  Form,
  Button,
  Select,
  Option,
  Col,
  Row,
  Divider,
  Textarea,
} from '@arco-design/web-vue';
import { useAxios } from '@vueuse/integrations/useAxios';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { instance, ResponseWrap } from '@/api';
import { BSON_URL } from '@/api/url';
import { BsonListData, BsonListDataItem } from '@/api/types';
import { CustomizeModel } from './types';

//选择框数据动态生成
const form = reactive<{
  uuid: string;
  dbName: string;
}>({
  uuid: '',
  dbName: '',
});

const dbs = ref<BsonListDataItem[]>([]);

const {
  data: listData,
  isLoading: listLoading,
  execute: listExec,
} = useAxios<ResponseWrap<BsonListData>>(BSON_URL, { method: 'POST' }, instance, {
  immediate: false,
});

watch(
  () => listData.value?.data?.data,
  newVal => {
    const tmp = new Set(dbs.value);
    newVal?.forEach(item => {
      tmp.add(item);
    });

    dbs.value = Array.from(tmp);
    if (form.uuid === '' && dbs.value.length != 0) {
      form.uuid = dbs.value[0].uuid;
    }
    if (form.dbName === '' && dbs.value.length != 0) {
      form.dbName = dbs.value[0].dbName;
    }
  },
);

onMounted(() => {
  listExec();
});

const selectLoadMore = () => {
  listExec({
    params: {
      size: 50,
    },
  });
};

const emit = defineEmits<{
  (e: 'change-step', idx: number): void;
  (e: 'getChildren', num: object): void;
}>();

const { data, execute, isLoading } = useAxios<ResponseWrap<CustomizeModel>>(
  BSON_URL,
  { method: 'POST' },
  instance,
  {
    immediate: false,
  },
);

const handleSubmit = async () => {
  const res = await formRef.value?.validate();
  if (res) {
    return;
  }
  execute({
    data: {
      ...form,
    },
  }).then(() => {
    formRef.value?.resetFields();
    emit('change-step', 1);
    emit('getChildren', Object(data.value));
  });
};
const formRef = ref<FormInstance>();
</script>

<template>
  <Card :bordered="false">
    <template #title>MongoDB自定义操作</template>
    <Row>
      <Col :span="11">
        <div class="wrap">
          <Form :model="form" ref="formRef" @submit="handleSubmit()">
            <FormItem
              field="uuid"
              label="选择实例"
              :virtual-list-props="{ height: 300 }"
              :rules="[{ required: true, message: '请选择实例' }]"
              help="请选择实例"
              feedback
            >
              <Select
                :style="{ width: '455px' }"
                placeholder="Please select ..."
                v-model="form.uuid"
                :loading="listLoading"
                @dropdown-reach-bottom="selectLoadMore"
                allow-clear
                allow-search
              >
                <Option v-for="item in dbs" :key="item.uuid" :value="item.uuid">
                  {{ item.uuid }}
                </Option>
              </Select>
            </FormItem>

            <FormItem
              field="dbName"
              label="选择数据库"
              :virtual-list-props="{ height: 300 }"
              :rules="[{ required: true, message: '请选择数据库' }]"
              help="请选择数据库"
              feedback
            >
              <Select
                :style="{ width: '455px' }"
                placeholder="Please select ..."
                v-model="form.dbName"
                :loading="listLoading"
                @dropdown-reach-bottom="selectLoadMore"
                allow-clear
                allow-search
              >
                <Option v-for="item in dbs" :key="item.dbName" :value="item.dbName">
                  {{ item.dbName }}
                </Option>
              </Select>
            </FormItem>

            <FormItem
              field="bsonStr"
              label="输入json"
              help="请输入正确格式的json"
              feedback
            >
              <Col :span="19">
                <Textarea placeholder="Please enter something" allow-clear></Textarea>
              </Col>
            </FormItem>
            <FormItem>
              <Button type="primary" html-type="submit">确认</Button>
            </FormItem>
          </Form>
        </div>
      </Col>
    </Row>
  </Card>
</template>

<style lang="less" scoped>
.wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
}
</style>
