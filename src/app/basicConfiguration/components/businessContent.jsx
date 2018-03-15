/**
 * 新建/编辑 违规内容表单
 */
import React, { Component } from 'react';
import { Form, Button } from 'antd';
import FieldSelect from './../../common/components/fieldtypes/fieldselect';
import FieldInput from './../../common/components/fieldtypes/fieldinput';
import FieldCheckbox from './../../common/components/fieldtypes/fieldcheckbox';
import FieldRadio from './../../common/components/fieldtypes/fieldradio';
import FieldSwitch from './../../common/components/fieldtypes/fieldswitch';
import FieldTip from './../../common/components/fieldtypes/fieldtip';
import { Custom } from './../components/coustom';
import * as style from './../style/index.scss';

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { sm: { span: 5 } },
    wrapperCol: { sm: { span: 19 } }
}
class BusinessContentFormComponent extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const params = Object.assign({}, values);
                const isEdit = !!this.props.editData;
                if (isEdit) {
                    params.ruleId = this.props.editData.ruleId;
                }
                this.props.handleOK(params, isEdit ? 'edit' : 'add');
            }
        });
    }

    render() {
        const businessTypes = this.props.data.businessTypes || [];
        const { editData = null } = this.props
        //处理处罚措施
        return (
            <Form onSubmit={this.handleSubmit}>
                <FieldSelect name="auditTypeId" label="所属业务" defaultValue={editData ? editData.auditTypeId : ''} placeholder="请选择" requires={[{ type: 'required', message: '必填' }]} data={businessTypes} keys={['id', 'name']} span={6} form={this.props.form} formItemLayout={formItemLayout} className={style.setFieldMarginBottom} popupContainer={document.getElementsByClassName('wrapModal')[0]} />
                <FieldInput name="content" label="违规内容" defaultValue={editData ? editData.content : ''} placeholder="请填写违规内容，请保持在30字以内" requires={[{ type: 'required', message: '必填' }]} limit={30} form={this.props.form} formItemLayout={formItemLayout} className={style.setFieldMarginBottom} />
                <FieldInput name="privateLetter" rows={4} label="私信内容" defaultValue={editData ? editData.privateLetter : ''} placeholder="请填写" form={this.props.form} formItemLayout={formItemLayout} className={style.setFieldMarginBottom} />
                <FieldInput name="hint" label="客户端提示语" defaultValue={editData ? editData.hint : ''} placeholder="请填写" form={this.props.form} formItemLayout={formItemLayout} className={style.setFieldMarginBottom} />
                <FieldTip name="tip" text="提示:新建成功后，默认为停用状态，需启用后才可生效" textClass={style.tipText} />
                {
                    <FormItem style={{ textAlign: "center" }}>
                        <Button onClick={this.props.handleCancel}>取消</Button>
                        <Button style={{ marginLeft: 8 }} type="primary" htmlType="submit">确定</Button>
                    </FormItem>}
            </Form>
        );
    }
}

const BusinessContentForm = Form.create()(BusinessContentFormComponent);
export default BusinessContentForm;