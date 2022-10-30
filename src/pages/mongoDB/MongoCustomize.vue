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
} from '@arco-design/web-vue';
import JsonEdit from './components/JsonEditor.vue';

const form = reactive({
  uuid: '',
  bson: '',
  dbName: '',
});
</script>

<template>
  <PageContainer>
    <Card class="general-card" :bordered="false">
      <template #title>MongoDB自定义操作</template>
      <Row class="grid-demo">
        <Col :span="11">
          <div class="wrap">
            <Form :model="form">
              <FormItem field="uuid" label="uuid">
                <Select :style="{ width: '440px' }" placeholder="Please select ...">
                  <Option>aaaaaaa</Option>
                  <Option>bbbbbbb</Option>
                  <Option>ccccccc</Option>
                  <Option>ddddddd</Option>
                </Select>
              </FormItem>
              <FormItem field="dbName" label="dbName">
                <Select :style="{ width: '440px' }" placeholder="Please select ...">
                  <Option>eeeeeee</Option>
                  <Option>fffffff</Option>
                  <Option>ggggggg</Option>
                  <Option>hhhhhhh</Option>
                </Select>
              </FormItem>
              <FormItem field="bsonStr" label="bsonStr">
                <JsonEdit :style="{ width: '440px', height: '400px' }" />
              </FormItem>
              <FormItem>
                <Button html-type="submit" type="primary" small>提交</Button>
              </FormItem>
            </Form>
          </div>
        </Col>
        <Divider style="height: 700px" direction="vertical" />
        <Col :span="11">
          <div class="pack">
            <Form :model="form">
              <FormItem field="outcome" label="结果">
                <JsonEdit :style="{ width: '440px', height: '505px' }" />
              </FormItem>
            </Form>
          </div>
        </Col>
      </Row>
    </Card>
  </PageContainer>
</template>

<style lang="less" scoped>
.wrap {
  display: flex;
  justify-content: left;
  align-items: left;
  padding: 80px 0;
}
.pack {
  display: flex;
  justify-content: right;
  align-items: right;
  padding: 80px 0;
}
</style>
