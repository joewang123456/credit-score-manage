import React from 'react';
import { Form } from 'antd';
const FormItem = Form.Item;
const FieldText = (props) => {
    const { formItemLayout, label, textClass, text, className } = props;
    return <FormItem className={className} {...formItemLayout} label={label ? label : ''}>
        <span className={"ant-form-text " + textClass}>{text}</span>
    </FormItem>
}
export default FieldText;