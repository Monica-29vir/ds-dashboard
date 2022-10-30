<script lang="ts" setup>
import {
  Card,
  Row,
  Col,
  Form,
  FormItem,
  Input,
  Select,
  Space,
  Option,
  Divider,
  Table,
  TableColumn,
  Button,
  Modal,
  Cascader,
  Tabs,
  TabPane,
  Tree,
  InputSearch,
  Split,
  TypographyParagraph,
} from '@arco-design/web-vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { useAxios } from '@vueuse/integrations/useAxios';
import { instance, ResponseWrap } from '@/api';
import { DBinformationParams, DBListData } from '@/api/types';
import { TreeinformationParams, TreeData } from '@/api/types';
import { reactive, ref, watch, computed } from 'vue';
import { DB_URL } from '@/api/url';
import PageContainer from '@/components/PageContainer.vue';
import comlist from './components/metadata.vue';

const form = ref();

const pagination = reactive<{ current: number; pageSize: number; total?: number }>({
  current: 1,
  pageSize: 15,
});

const { data } = useAxios<ResponseWrap<TreeData>>(
  DB_URL,
  { method: 'GET', params: { pg: pagination.current, size: pagination.pageSize } },
  instance,
);

 /*const { data: treedata } = useAxios<ResponseWrap<TreeData>>(
  DB_URL,
  { method: 'GET', params: { pg: pagination.current, size: pagination.pageSize } },
  instance,
);*/

//搜索按钮
const handleSearch = () => {};

const treeData = computed(() => {
  return data.value?.data?.data;
});

const handlePageChange = (page: number) => {
  pagination.current = page;
};

//树的搜索框
const searchKey = ref('');


</script>

<template>
  <PageContainer>
    <Card class="general-card" :bordered="false">
      <template #title>MongoDB数据库管理</template>
      <Form :model="form">
        <div>
          <Split
            :style="{
              height: '800px',
              width: '100%',
              minWidth: '10px',
              border: '1px solid var(--color-border)',
            }"
            v-model:size="size"
            min="10px"
          >
            <template #first>
              <TypographyParagraph>
                <InputSearch style="margin-bottom: 8px; max-width: 240px" v-model="searchKey" />
                <Tree blockNode :virtual-list-props="{ height: 800 }" :data="treeData">
                </Tree>
              </TypographyParagraph>
            </template>
            <template #second>
              <TypographyParagraph>
                <div class="pack">
                  <Table
                    row-key="uuid"
                    :bordered="false"
                    :pagination="pagination"
                    :data="tableData"
                    @page-change="handlePageChange"
                  >
                    <template #columns>
                      <TableColumn title="实例" data-index="uuid" />
                      <TableColumn title="数据库地址" data-index="ip" />
                      <TableColumn title="数据库运行端口" data-index="port" />
                      <TableColumn title="root用户名" data-index="username" />
                      <TableColumn title="导出器port" data-index="export_port" />
                      <TableColumn title="导出器ip" data-index="export_ip" />
                    </template>
                  </Table>
                </div>
              </TypographyParagraph>
            </template>
          </Split>
        </div>
      </Form>
    </Card>
  </PageContainer>
</template>

<style lang="less" scoped>
.pack {
  width: 1200px;
  height: 600px;
}
</style>
