import React from 'react';
import { Form, Radio } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
class FieldRadio extends React.Component {

    componentDidMount() {
        const { defaultValue, name } = this.props;
        this.props.form.setFieldsValue({ [name]: defaultValue });
    }

    onChange = (e) => {
        let { value, callback } = e.target || {};
        typeof callback === 'function' && callback(value);
    }

    render() {
        const { formItemLayout, label, className, form, name, requires, data, keys } = this.props;
        return (
            <FormItem {...formItemLayout} label={label} className={className}>
                {form.getFieldDecorator(name, requires ? {
                    rules: [{
                        required: true,
                        message: requires[0].message
                    }]
                } : {})(
                    <RadioGroup onChange={this.onChange}>
                        {
                            data.map((item, index) => {
                                return <Radio key={index} {...this.props} value={item[keys[0]]}>{item[keys[1]]}</Radio>
                            })
                        }
                    </RadioGroup>
                    )}
            </FormItem>
        );
    }
}

export default FieldRadio;