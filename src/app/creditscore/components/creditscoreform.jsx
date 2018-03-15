import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'antd';
import FieldInput from './../../common/components/fieldtypes/fieldinput';
import * as style from './../style/index.scss';
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: { xs: { span: 4 }, sm: { span: 8 }, md: { span: 7 }, lg: { span: 6 } },
    wrapperCol: { xs: { span: 12 }, sm: { span: 10 }, md: { span: 12 } }
}

class CreditScoreFormComponent extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.doSearch(values);
            }
        });
    }

    handleReset = () => {
        this.props.form.resetFields();
        this.props.doSearch({ anchorId: '' });
    }

    exportData = () => {

    }
    render() {
        return (
            <Form onSubmit={this.handleSubmit} className={style.antAdvancedSearchForm}>
                <Col xs={{ span: 24 }} sm={{ span: 8 }} lg={{ span: 6 }} >
                    <FieldInput name="anchorId" label="主播ID" placeholder="请填写" form={this.props.form} formItemLayout={formItemLayout} className={style.antFormItem} />
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 16 }} lg={{ span: 18 }}>
                    {
                        <FormItem className={style.antFormItem}>
                            <Button type="primary" htmlType="submit">查询</Button>
                            <Button style={{ marginLeft: 20 }} onClick={this.handleReset}>重置</Button>

                            {/* <Button style={{ marginLeft: 60 }} onClick={this.exportData} className={style.greenBgBtn}>导出报表</Button> */}
                        </FormItem>
                    }
                </Col>
            </Form>
        );
    }
}

const CreditScoreForm = Form.create()(CreditScoreFormComponent);
export default CreditScoreForm;