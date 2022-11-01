<script lang="ts" setup>
import {
  Select,
  Option,
  Card,
  Row,
  Col,
  Form,
  FormItem,
  Space,
  Button,
  Divider,
  Input,
  Textarea,
  Popconfirm,
} from '@arco-design/web-vue';
import { useAxios } from '@vueuse/integrations/useAxios';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { instance, ResponseWrap } from '@/api';
import { READ_URL, QUERY_URL } from '@/api/url';
import { ReadListData, ReadListDataItem } from '@/api/types';
import { QueryModel } from './types';
import { reactive } from 'vue';

const emit = defineEmits<{
  (e: 'change-step', idx: number): void;
  (e: 'getChildren', num: object): void;
}>();

const { data, execute, isLoading } = useAxios<ResponseWrap<QueryModel>>(
  QUERY_URL,
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
      ...formSelect,
    },
  }).then(() => {
    formRef.value?.resetFields();
    emit('change-step', 1);
    emit('getChildren', Object(data.value));
  });
};
const formRef = ref<FormInstance>();

//选择框数据动态生成
const formSelect = reactive<{
  uuid: string;
  dbName: string;
  collectionName: string;
}>({
  uuid: '',
  dbName: '',
  collectionName: '',
});

const dbs = ref<ReadListDataItem[]>([]);

const {
  data: listData,
  isLoading: listLoading,
  execute: listExec,
} = useAxios<ResponseWrap<ReadListData>>(READ_URL, { method: 'POST' }, instance, {
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
    if (formSelect.uuid === '' && dbs.value.length != 0) {
      formSelect.uuid = dbs.value[0].uuid;
    }
    if (formSelect.dbName === '' && dbs.value.length != 0) {
      formSelect.dbName = dbs.value[0].dbName;
    }
    if (formSelect.collectionName === '' && dbs.value.length != 0) {
      formSelect.collectionName = dbs.value[0].collectionName;
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

//字段
const formInput = reactive({
  conditionList: [{ field: '', target: '' }],
  documentsList: [{ json: '' }],
  opList: [{ field: '', type: '', code: '' }],
});

//删除字段
const handleDeleteCondition = (index: number) => {
  formInput.conditionList.splice(index, 1);
};

//添加字段
const handleAddCondition = () => {
  formInput.conditionList.push({
    field: '',
    target: '',
  });
};

//添加json
const handleAddDocuments = () => {
  formInput.documentsList.push({
    json: '',
  });
};

//删除json
const handleDeleteDocuments = (index: number) => {
  formInput.documentsList.splice(index, 1);
};

//添加字段
const handleAddOp = () => {
  formInput.opList.push({
    field: '',
    type: '',
    code: '',
  });
};

//删除字段
const handleDeleteOp = (index: number) => {
  formInput.opList.splice(index, 1);
};
</script>

<template>
  <PageContainer>
    <Space direction="vertical" :size="16">
      <Card class="general-card" :bordered="false">
        <template #title>MongoDB数据操作</template>
        <Form :model="formSelect" ref="formRef">
          <Row :gutter="16" justify="space-around">
            <Col :span="8">
              <FormItem
                field="uuid"
                label="选择实例"
                :rules="[{ required: true, message: '请选择实例' }]"
                :virtual-list-props="{ height: 300 }"
              >
                <Select
                  v-model="formSelect.uuid"
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
            </Col>

            <Col :span="8">
              <FormItem
                field="dbName"
                label="选择数据库"
                :rules="[{ required: true, message: '请选择数据库' }]"
                :virtual-list-props="{ height: 300 }"
              >
                <Select
                  v-model="formSelect.dbName"
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
            </Col>

            <Col :span="8">
              <FormItem
                field="collectionName"
                label="选择集合"
                :rules="[{ required: true, message: '请选择集合' }]"
                :virtual-list-props="{ height: 300 }"
              >
                <Select
                  v-model="formSelect.collectionName"
                  :loading="listLoading"
                  @dropdown-reach-bottom="selectLoadMore"
                  allow-clear
                  allow-search
                >
                  <Option
                    v-for="item in dbs"
                    :key="item.collectionName"
                    :value="item.collectionName"
                  >
                    {{ item.collectionName }}
                  </Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Divider />

        <Form ref="formRef" :model="formInput" @submit="handleSubmit()">
          <Row :gutter="10">
            <Col :span="8">
              <FormItem label="选择操作" :rules="[{ required: true, message: '请选择操作' }]">
                <Select
                  :style="{ width: '160px' }"
                  placeholder="Select"
                  :trigger-props="{ autoFitPopupMinWidth: true }"
                >
                  <Option>添加</Option>
                  <Option>更新</Option>
                  <Option>查询</Option>
                  <Option>删除</Option>
                </Select>
              </FormItem>
            </Col>

            <FormItem
              v-for="(post, index) in formInput.conditionList"
              :field="`conditionList.${index}`"
              :key="index"
              :label="`condition${index + 1}`"
              :content-flex="false"
              :merge-props="false"
            >
              <Row :gutter="10">
                <Col :span="6">
                  <FormItem filed="conditionList.filed" no-style>
                    <Input v-model="post.field" placeholder="请输入filed" allow-clear />
                  </FormItem>
                </Col>
                <Col :span="6">
                  <FormItem filed="conditionList.target" no-style>
                    <Input v-model="post.target" placeholder="请输入target" allow-clear />
                  </FormItem>
                </Col>

                <Col :span="6">
                  <FormItem no-style :rules="[{ required: true }]">
                    <Button @click="handleAddCondition" :style="{ marginLeft: '10px' }">
                      Add Post
                    </Button>

                    <Popconfirm
                      content="请确认是否删除"
                      @ok="() => handleDeleteCondition(index)"
                      type="warning"
                    >
                      <Button :style="{ marginLeft: '10px' }"
                        >Delete</Button
                      >
                    </Popconfirm>
                  </FormItem>
                </Col>
              </Row>
            </FormItem>

            <FormItem
              v-for="(post, index) in formInput.opList"
              :field="`opList.${index}`"
              :key="index"
              :label="`op${index + 1}`"
              :content-flex="false"
              :merge-props="false"
            >
              <Row :gutter="10">
                <Col :span="4">
                  <FormItem filed="op.field" no-style>
                    <Input v-model="post.field" placeholder="请输入field" allow-clear />
                  </FormItem>
                </Col>
                <Col :span="4">
                  <FormItem filed="op.type" no-style>
                    <Select v-model="post.type" allow-clear allow-search>
                      <Option>EQ</Option>
                      <Option>GT</Option>
                      <Option>GET</Option>
                      <Option>LTE</Option>
                      <Option>LT</Option>
                      <Option>NE</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col :span="4">
                  <FormItem filed="op.code" no-style>
                    <Input v-model="post.code" placeholder="请输入opcode" allow-clear />
                  </FormItem>
                </Col>

                <Col :span="6">
                  <FormItem no-style>
                    <Button @click="handleAddOp" :style="{ marginLeft: '10px' }"> Add Post </Button>

                    <Popconfirm
                      content="请确认是否删除"
                      @ok="() => handleDeleteOp(index)"
                      type="warning"
                    >
                      <Button :style="{ marginLeft: '10px' }"
                        >Delete</Button
                      >
                    </Popconfirm>
                  </FormItem>
                </Col>
              </Row>
            </FormItem>

            <FormItem
              v-for="(post, index) of formInput.documentsList"
              :field="`documentsList.${index + 1}.column`"
              :label="`documents${index + 1}`"
              :key="index"
              :content-flex="false"
              :merge-props="false"
              
            >
              <Row :gutter="10">
                <Col :span="12">
                  <FormItem no-style>
                    <Textarea v-model="post.json" placeholder="请输入json"></Textarea>
                  </FormItem>
                </Col>
                <Col :span="4">
                  <FormItem no-style>
                    <Button @click="handleAddDocuments" :style="{ marginLeft: '10px' }">
                      Add Post
                    </Button>
                    <Popconfirm
                      content="请确认是否删除"
                      @ok="() => handleDeleteDocuments(index)"
                      type="warning"
                    >
                      <Button :style="{ marginLeft: '10px' }"
                        >Delete</Button
                      >
                    </Popconfirm>
                  </FormItem>
                </Col>
              </Row>
            </FormItem>

            <FormItem>
              <Button type="primary" html-type="submit">确认</Button>
            </FormItem>
          </Row>
        </Form>
      </Card>
    </Space>
  </PageContainer>
</template>
