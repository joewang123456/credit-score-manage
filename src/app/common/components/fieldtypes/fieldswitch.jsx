import React from 'react';
import { Form, Checkbox } from 'antd';
const FormItem = Form.Item;
class FieldSwitch extends React.Component {

    componentDidMount() {
        const { defaultValue, name } = this.props;
        this.props.form.setFieldsValue({ [name]: defaultValue });
    }

    // componentWillReceiveProps(nextProps) {
    //     const { name } = this.props;
    //     console.log(this.props.form.getFieldValue(name));
    //     if (!!nextProps.defaultValue !== !!this.props.form.getFieldValue(name)) {
    //         setTimeout(() => {
    //             this.props.form.setFieldsValue({ [name]: nextProps.defaultValue });
    //         });
    //     }
    // }

    // onChange = (e) => {
    //     this.props.form.setFieldsValue({ [name]: e.target.value });
    // }

    render() {
        const { formItemLayout, label, className, form, name, text } = this.props;
        return (
            <FormItem {...formItemLayout} label={label} className={className}>
                {form.getFieldDecorator(name, { valuePropName: 'checked' })(
                    <Checkbox onChange={this.onChange}>{text}</Checkbox>
                )}
            </FormItem>
        );
    }
}

export default FieldSwitch;