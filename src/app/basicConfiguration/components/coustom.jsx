/**
 * 用于处理第n次违规扣分设置组件
 */
import React from 'react';
import { Input, Row, Col, Form, InputNumber } from 'antd';

const FormItem = Form.Item;
export class Custom extends React.Component {

    //初始化默认值
    initValues(defaultValue) {
        const values = (defaultValue || '').split(';');
        this.props.form.setFieldsValue({ first: values[0] || 0 });
        this.props.form.setFieldsValue({ second: values[1] || 0 });
        this.props.form.setFieldsValue({ third: values[2] || 0 });
    }

    componentDidMount() {
        this.initValues(this.props.defaultValue);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.defaultValue !== this.props.defaultValue) {
            this.initValues(nextProps.defaultValue);
        }
    }

    render() {
        const { label, className, form, requires, textClass } = this.props;
        let formItemLayout1 = { labelCol: { sm: { span: 10, offset: 0 } }, wrapperCol: { sm: { span: 12 } } };
        let formItemLayout2 = { labelCol: { sm: { span: 0, offset: 4 } }, wrapperCol: { sm: { span: 20 } } };
        let formItemLayout3 = { labelCol: { sm: { span: 8, offset: 12 } }, wrapperCol: { sm: { span: 12, offset: 10 } } };
        const values = (this.props.defaultValue || '').split(';');
        return (
            <Row>
                <Row>
                    <Col span={12}>
                        <FormItem className={className}
                            {...formItemLayout1}
                            label={label}
                        >
                            {form.getFieldDecorator('first-text', {
                                rules: [{ required: true, message: '请填写' }],
                                initialValue: '第1次违规'
                            })(
                                <Input disabled={true} />
                                )}
                        </FormItem>
                    </Col>
                    <Col span={11}>
                        <FormItem className={className}
                            {...formItemLayout2} colon={false}
                        >
                            {form.getFieldDecorator('first', {
                                rules: [{ required: true, message: '请填写' }],
                            })(
                                <InputNumber style={{ width: '80%' }} min={0} max={100} />
                                )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <FormItem className={className}
                            {...formItemLayout3}
                            label={''}
                        >
                            {form.getFieldDecorator('second-text', {
                            })(
                                <Input disabled={true} placeholder="第2次违规" />
                                )}
                        </FormItem>
                    </Col>
                    <Col span={11}>
                        <FormItem className={className}
                            {...formItemLayout2} colon={false}>
                            {form.getFieldDecorator('second', {
                                rules: [{ required: true, message: '请填写' }],
                            })(
                                <InputNumber style={{ width: '80%' }} min={0} max={100} />
                                )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <FormItem className={className}
                            {...formItemLayout3}
                            label={''}
                        >
                            {form.getFieldDecorator('third-text', {
                            })(
                                <Input disabled={true} placeholder="3次及以上" />
                                )}
                        </FormItem>
                    </Col>
                    <Col span={11}>
                        <FormItem className={className}
                            {...formItemLayout2} colon={false}>
                            {form.getFieldDecorator('third', {
                                rules: [{ required: true, message: '请填写' }],
                            })(
                                <InputNumber style={{ width: '80%' }} min={0} max={100} />
                                )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col offset={5}>
                        <span className={"ant-form-text " + textClass}>请输入0~100内的分值</span>
                    </Col>
                </Row>
            </Row>
        );
    }
}