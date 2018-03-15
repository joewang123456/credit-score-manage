/**
 * 新建违规类型表单
 */
import React, { Component } from 'react';
import { Form, Button } from 'antd';
import FieldInput from './../../common/components/fieldtypes/fieldinput';
import FieldSelect from './../../common/components/fieldtypes/fieldselect';
import * as style from './../style/index.scss';

const FormItem = Form.Item;
//布局
const formItemLayout = {
    labelCol: { sm: { span: 5 } },
    wrapperCol: { sm: { span: 19 } }
}
const attrs = [{ id: 0, name: '规则类' }, { id: 1, name: '业务类' }]
class BusinessTypeFormComponent extends Component {

    businessTypes = [
        { id: 0, name: '规则类' },
        { id: 1, name: '业务类' }
    ]

    doSumit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.addBusinessType(values);
            }
        });
    }

    render() {
        const { handleCancel } = this.props;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FieldInput name="name" label='业务类型' placeholder="请填写业务类型名称" requires={[{ type: 'required', message: '必填' }]} form={this.props.form} formItemLayout={formItemLayout} className={style.setFieldMarginBottom} />
                <FieldSelect name="type" label="属性" placeholder="请选择" data={this.businessTypes} keys={['id', 'name']} span={6} requires={[{ type: 'required', message: '必填' }]} form={this.props.form} formItemLayout={formItemLayout} className={style.setFieldMarginBottom} popupContainer={document.getElementsByClassName('wrapModal')[0]} />
                <FormItem style={{ textAlign: "center" }}>
                    <Button onClick={handleCancel}>取消</Button>
                    <Button style={{ marginLeft: 8 }} type="primary" onClick={this.doSumit}>确定</Button>
                </FormItem>
            </Form>
        );
    }
}
const BusinessTypeForm = Form.create()(BusinessTypeFormComponent);
export default BusinessTypeForm;