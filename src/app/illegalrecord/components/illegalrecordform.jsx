import React, { Component } from 'react';
import { Form, Button, Row, Col, DatePicker } from 'antd';
import moment from 'moment';
import FieldSelect from './../../common/components/fieldtypes/fieldselect';
import FieldInput from './../../common/components/fieldtypes/fieldinput';
import FieldDate from './../../common/components/fieldtypes/fielddate';
import utils from './../../common/util';
import { getRuleTypeInfo } from './../action/index';
import * as style from './../style/index.scss';
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: { sm: { span: 0 }, md: {} },
    wrapperCol: { sm: { span: 12 }, md: { span: 12 } }
}
const dateFormItemLayoutLeft = {
    labelCol: { sm: { span: 14 }, md: { span: 12 }, lg: { span: 10 }, xl: { span: 8 } },
    wrapperCol: { sm: { span: 10 }, md: { span: 12 }, lg: { span: 14 }, xl: { span: 16 } }
}
const dateFormItemLayoutRight = {
    wrapperCol: { sm: { span: 10, push: 0 }, md: { span: 12, push: 1 }, lg: { span: 14, push: 1 }, xl: { span: 16, push: 4 } }
}
class IllegalRecordFormComponent extends Component {
    constructor() {
        super();
        this.state = {
            ruleTypeModelList: []
        }
    }

    componentDidMount() {
        //请求违规类型数据
        getRuleTypeInfo().then((data) => {
            if (data.success) {
                this.setState({ ruleTypeModelList: [{ typeId: 0, name: '全部' }].concat(data.ruleTypeModelList || []) });
            } else {
                utils.openPopup('error', '请求规则类型出错');
            }
        }).catch((err) => {
            utils.openPopup('error', err);
        });
    }

    doSearch() {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // 日期格式的转换，将moment转换成YYYY-MM-DD格式
                const waitConvertFields = ['violationBTime', 'violationETime', 'appealBTime', 'appealETime'];
                waitConvertFields.forEach((item) => {
                    if (item === 'violationBTime' || item === 'appealBTime') {
                        values[item] = values[item] ? moment(values[item]).hours(0).minutes(0).seconds(0).toDate().getTime() : '';
                    } else {
                        values[item] = values[item] ? moment(values[item]).hours(23).minutes(59).seconds(59).toDate().getTime() : '';
                    }
                });
                for (let key in values) {
                    values[key] = values[key] === undefined ? '' : values[key];
                }
                //违规类型将选择’全部‘，对应字段设置为’‘
                values['typeId'] = values['typeId'] === 0 ? '' : values['typeId'];
                this.props.doSearch(values);
            }
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.doSearch();
    }

    handleReset = (values) => {
        this.props.form.resetFields();
        this.doSearch();
    }

    exportData = () => {

    }
    render() {
        const { ruleTypeModelList } = this.state;
        const { startDate, endDate } = this.props.defaultValue.initDate;
        return (
            <Form layout="inline" onSubmit={this.handleSubmit} className={style.antAdvancedSearchForm}>
                <Row>
                    <Col span={12}>
                        <Col span={11}>
                            <FieldDate name="violationBTime" label="违规时间" form={this.props.form} formItemLayout={dateFormItemLayoutLeft} className={style.antFormItem} />
                        </Col>
                        {/* <Col span={1}></Col> */}
                        <Col span={11} className={style.marginLeft}>
                            <FieldDate name="violationETime" form={this.props.form} formItemLayout={dateFormItemLayoutRight} className={style.antFormItem} />
                        </Col>
                    </Col>

                    <Col span={6}>
                        <FieldInput span={6} name="recordId" label="违规单号" defaultValue={''} placeholder="请输入" form={this.props.form} formItemLayout={formItemLayout} className={style.antFormItem} />
                    </Col>

                    <Col span={6}>
                        <FieldInput name="anchorId" label="主播ID" defaultValue={''} placeholder="请输入" form={this.props.form} formItemLayout={formItemLayout} className={style.antFormItem} />
                    </Col>


                    <Col span={12}>
                        <Col span={11}>
                            <FieldDate name="appealBTime" label="申诉时间" form={this.props.form} formItemLayout={dateFormItemLayoutLeft} className={style.antFormItem} />
                        </Col>
                        {/* <Col span={1}></Col> */}
                        <Col span={11} className={style.marginLeft}>
                            <FieldDate name="appealETime" form={this.props.form} formItemLayout={dateFormItemLayoutRight} className={style.antFormItem} />
                        </Col>
                    </Col>

                    <Col span={6}>
                        <FieldSelect span={6} name="typeId" label="违规类型" placeholder="请选择" data={ruleTypeModelList} keys={['typeId', 'name']} form={this.props.form} formItemLayout={formItemLayout} className={style.antFormItem} />
                    </Col>

                </Row>
                <Row type="flex" justify="end">
                    <Col>
                        {
                            <FormItem style={{ textAlign: "center", marginBottom: '0px' }}>
                                <Button type="primary" htmlType="submit">查询</Button>
                                <Button style={{ marginLeft: 20 }} onClick={this.handleReset}>重置</Button>

                                {/* <Button style={{ marginLeft: 60 }} onClick={this.exportData} className={style.greenBgBtn}>导出报表</Button> */}
                            </FormItem>
                        }
                    </Col>
                </Row>
            </Form>
        );
    }
}

const IllegalRecordForm = Form.create()(IllegalRecordFormComponent);
export default IllegalRecordForm;