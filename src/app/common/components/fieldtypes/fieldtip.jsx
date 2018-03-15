import React from 'react';
import { Form } from 'antd';
const FormItem = Form.Item;
const FieldTip = (props) => {
    const { textClass, text, className } = props;
    return <FormItem className={className}
        {...{ wrapperCol: { sm: { offset: 2, span: 20 } } }}
    >
        <span className={"ant-form-text " + textClass}>{text}</span>
    </FormItem>
}

export default FieldTip;