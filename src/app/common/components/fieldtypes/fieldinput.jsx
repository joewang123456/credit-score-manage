import React from 'react';
import { Form, Input, InputNumber } from 'antd';
const FormItem = Form.Item;
class FieldInput extends React.Component {
    constructor() {
        super();
        this.state = {}
        this.lock = false;//中文输入控制锁
    }

    /**
     * 开始输入中文
     */
    compositionstart = () => {
        this.lock = true;
    }

    /**
     * 中文输入结束
     */
    onCompositionEnd = (e) => {
        const { limit, name } = this.props || 10;
        this.lock = false;
        let value = e.target.value;
        this.props.form.setFieldsValue({ [name]: value.substring(0, limit) });
    }

    /**
     * 输入字符触发事件
     */
    onInput = (e) => {
        let value = e.target.value;
        const { limit, name } = this.props || 10;
        if (!this.lock) {//非中文直接截取
            setTimeout(() => {
                this.props.form.setFieldsValue({ [name]: value.substring(0, limit) });
            });
        } else {//中文不截取，在onCompositionEnd中中文选择完成后截取
            this.props.form.setFieldsValue({ [name]: value });
        }
    }

    componentDidMount() {
        const { defaultValue, name } = this.props;
        this.props.form.setFieldsValue({ [name]: defaultValue });
    }

    componentWillReceiveProps(nextProps) {
        const { name, defaultValue } = nextProps;
        if (defaultValue !== this.props.defaultValue) {
            this.props.form.setFieldsValue({ [name]: defaultValue });
        }
    }

    // onChange = (e) => {
    //     let { value, ChangeModalType, changeModal } = e.target || {};
    //     if (ChangeModalType) {
    //         typeof changeModal === 'function' && changeModal(value);
    //     }
    // }

    render() {
        const { formItemLayout, label, className, form, name, requires, placeholder, rows, inputType, max, min } = this.props;
        return (
            <FormItem className={className}
                {...formItemLayout}
                label={label}
            >
                {form.getFieldDecorator(name, requires ? {
                    rules: [{ required: true, message: requires[0].message }],
                } : {})(
                    rows ?
                        <Input.TextArea placeholder={placeholder} rows={rows} onInput={this.onInput} onCompositionStart={this.compositionstart} onCompositionEnd={this.onCompositionEnd} />
                        :
                        (inputType === 'number' ? <InputNumber style={{ width: '30%' }} min={min} max={max} formatter={(value) => { return value + "  天" }} />
                            : <Input placeholder={placeholder} onInput={this.onInput} onCompositionStart={this.compositionstart} onCompositionEnd={this.onCompositionEnd} />)
                    )}
            </FormItem>
        );
    }
}

export default FieldInput;