import React from 'react';
import { Form, DatePicker } from 'antd';
const FormItem = Form.Item;
// const RangePicker = DatePicker.RangePicker;

class FieldDate extends React.Component {

    componentDidMount() {
        const { defaultValue, name } = this.props;
        this.props.form.setFieldsValue({ [name]: defaultValue });
    }

    render() {
        const { formItemLayout, label, className, form, name, requires, span } = this.props;
        return (
            <FormItem span={span} className={className}
                {...formItemLayout}
                label={label}
            >
                {form.getFieldDecorator(name)(
                    <DatePicker format="YYYY-MM-DD" />
                )}
            </FormItem>
        );
    }
}

export default FieldDate;