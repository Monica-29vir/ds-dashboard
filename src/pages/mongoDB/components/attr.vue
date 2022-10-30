<script lang="ts" setup>
import {
  Form,
  FormItem,
  Input,
  Space,
  Table,
  TableColumn,
  Button,
  Popconfirm,
  Modal,
} from '@arco-design/web-vue';
import { reactive, ref } from 'vue';
import { ATTR_URL } from '@/api/url';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { useAxios } from '@vueuse/integrations/useAxios';
import { instance, ResponseWrap } from '@/api';
import { AttrinformationParams, AttrListData } from '@/api/types';

const pagination = reactive<{ current: number; pageSize: number; total?: number }>({
  current: 1,
  pageSize: 15,
});

const { data} = useAxios<ResponseWrap<AttrListData>>(
  ATTR_URL,
  { method: 'GET', params: { pg: pagination.current, size: pagination.pageSize } },
  instance,
);

const handlePageChange = (page: number) => {
  pagination.current = page;
};

const AttrData = computed(() => {
  return data.value?.data?.data;
});

const AttrVisible = ref(false);

//新建属性
const NewAttrVisible = ref(false);
const NewAttrForm = reactive({
  name: ' ',
});

const NewAttr = () => {
  NewAttrVisible.value = true;
};

const handleNewAttrOk = () => {
  NewAttrVisible.value = false;
};

//删除属性
const handleNewAttrCancel = () => {
  NewAttrVisible.value = false;
};

const handleDeleteAttr = () => {
  DeleteAttrVisible.value = true;
};
const DeleteAttrVisible = ref(false);
</script>

<!--属性-->

<template>
  <Button @click="NewAttr()" type="primary">
    <template #icon>
      <icon-plus />
    </template>
    新建
  </Button>

  <Table :pagination="false" :bordered="false">
    <Table row-key="uuid" :data="AttrData" :bordered="false">
      <template #columns>
        <TableColumn title="uuid" data-index="uuid" />
        <TableColumn title="数据库名" data-index="dbName" />
        <TableColumn title="集合名" data-index="collectionName" />
        <TableColumn title="文档名" data-index="docName" />
        <TableColumn title="操作">
          <template #cell>
            <Popconfirm type="warning" content="确认删除该属性？" @ok="() => handleDeleteAttr()">
              <Button type="text" status="danger">删除</Button>
            </Popconfirm>
          </template>
        </TableColumn>
      </template>
    </Table>
  </Table>
  <!--新建窗口对话框-->
  <Modal
    v-model:visible="NewAttrVisible"
    title="新建属性"
    :draggable="true"
    @cancel="handleNewAttrCancel()"
    @ok="handleNewAttrOk()"
  >
    <Form :model="NewAttrForm">
      <FormItem field="name" label="属性名">
        <Input v-model="NewAttrForm.name" />
      </FormItem>
    </Form>
  </Modal>
</template>
