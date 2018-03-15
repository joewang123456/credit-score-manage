/**
 * 基础配置查询表单
 */
import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'antd';
import FieldSelect from './../../common/components/fieldtypes/fieldselect';
import * as style from './../style/index.scss';

const formItemLayout = {
    labelCol: { md: { span: 8 }, lg: { span: 7 }, xl: { span: 6 } },
    wrapperCol: { md: { span: 12 }, lg: { span: 14 } }
}
class ConfigFilterFormComponent extends Component {
    constructor() {
        super();
        this.allState = [{ id: 0, name: '全部' }, { id: 1, name: '启用' }, { id: 2, name: '停用' }];//状态
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.doSearch(values);
            }
        });
    }

    render() {
        const { ruleTypeList, businessList } = this.props.data;
        const { typeId, state, id } = this.props.defaultValue;
        return (
            <Form onSubmit={this.handleSubmit} className={style.antAdvancedSearchForm}>
                <Row>
                    <Col md={{ span: 7 }} lg={{ span: 6 }}>
                        <FieldSelect name="typeId" label="违规类型" placeholder="请选择" data={ruleTypeList} defaultValue={typeId} keys={['typeId', 'name']} span={6} form={this.props.form} formItemLayout={formItemLayout} className={style.noMarginBottom + " " + style.antFormItem} />
                    </Col>
                    {/*
                        <Col md={{ span: 7 }} lg={{ span: 6 }}>
                        <FieldSelect name="auditTypeId" label="业务类型" placeholder="请选择" data={[{ id: 0, name: '全部' }].concat(businessList)} defaultValue={0} keys={['id', 'name']} span={6} form={this.props.form} formItemLayout={formItemLayout} className={style.noMarginBottom + " " + style.antFormItem} />
                    </Col>
                    */}

                    <Col md={{ span: 7 }} lg={{ span: 6 }} >
                        <FieldSelect name="state" label="当前状态" placeholder="请选择" data={this.allState} defaultValue={state} keys={['id', 'name']} span={6} form={this.props.form} formItemLayout={formItemLayout} className={style.noMarginBottom + " " + style.antFormItem} />
                    </Col>
                    <Col span={1} sm={{ offset: 1 }} xl={{ offset: 0 }}>
                        <Button type="primary" htmlType="submit" style={{ marginTop: '2px' }}>查询</Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}

const ConfigFilterForm = Form.create()(ConfigFilterFormComponent);
export default ConfigFilterForm;