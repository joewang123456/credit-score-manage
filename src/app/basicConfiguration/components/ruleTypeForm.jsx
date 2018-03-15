/**
 * 新建违规类型表单
 */
import React, { Component } from 'react';
import { Form, Button } from 'antd';
import FieldInput from './../../common/components/fieldtypes/fieldinput';

const FormItem = Form.Item;
//布局
const formItemLayout = {
  labelCol: { sm: { span: 5 } },
  wrapperCol: { sm: { span: 19 } }
}
class RuleTypeFormComponent extends Component {

  doSumit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.addRuleType(values);
      }
    });
  }

  render() {
    const { handleCancel } = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FieldInput name="name" label='违规类型' placeholder="请填写违规类型名称，请能够保持在5字以内！" requires={[{ type: 'required', message: '必填' }]} limit={5} form={this.props.form} formItemLayout={formItemLayout} />
        <FormItem style={{ textAlign: "center" }}>
          <Button onClick={handleCancel}>取消</Button>
          <Button style={{ marginLeft: 8 }} type="primary" onClick={this.doSumit}>确定</Button>
        </FormItem>
      </Form>
    );
  }
}
const RuleTypeForm = Form.create()(RuleTypeFormComponent);
export default RuleTypeForm;