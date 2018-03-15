import React from 'react';
import { Form, Checkbox, Row, Col } from 'antd';
import { is, fromJS } from 'immutable';
const FormItem = Form.Item;
class FieldCheckbox extends React.Component {

    componentDidMount() {
        const { defaultValue, name } = this.props;
        setTimeout(() => {
            this.props.form.setFieldsValue({ [name]: defaultValue });
        });
    }

    componentWillReceiveProps(nextProps) {
        if (!is(fromJS(nextProps.defaultValue), fromJS(this.props.defaultValue))) {
            const { name } = this.props
            setTimeout(() => {
                this.props.form.setFieldsValue({ [name]: nextProps.defaultValue });
            });
        }
    }

    onChange = (e) => {
        let { value, ChangeModalType, changeModal } = e.target || {};
        if (ChangeModalType) {
            typeof changeModal === 'function' && changeModal(value);
        }
    }

    render() {
        const { formItemLayout, label, className, form, name, requires, data, keys } = this.props;
        return (
            <FormItem {...formItemLayout} label={label} className={className}>
                {form.getFieldDecorator(name, requires ? {
                    rules: [{
                        required: true,
                        message: requires[0].message,
                    }]
                } : {})(
                    <Checkbox.Group onChange={this.onChange}>
                        <Row>
                            {
                                data.map((item, index) => {
                                    return <Col key={index} span={24}><Checkbox value={item[keys[0]]}>{item[keys[1]]}</Checkbox></Col>
                                })
                            }
                        </Row>
                    </Checkbox.Group>
                    )}
            </FormItem>
        );
    }
}

export default FieldCheckbox;