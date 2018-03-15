import React from 'react';
import { Form, Select } from 'antd';
// import { is, fromJs } from 'immutable';
const FormItem = Form.Item;
const Option = Select.Option;
class FieldSelect extends React.Component {

    componentDidMount() {
        const { defaultValue, name } = this.props;
        if (defaultValue !== '') {
            this.props.form.setFieldsValue({ [name]: defaultValue });
        }
    }

    componentWillReceiveProps(nextProps) {
        const { name, defaultValue } = nextProps;
        if (defaultValue !== this.props.defaultValue) {
            this.props.form.setFieldsValue({ [name]: defaultValue });
        }
    }

    onChange = (e) => {
        let { value, ChangeModalType, changeModal } = e.target || {};
        this.props.form.setFieldsValue({ [name]: value });
        if (ChangeModalType) {
            typeof changeModal === 'function' && changeModal(value);
        }
    }

    render() {
        const { formItemLayout, label, className, form, name, requires, data, placeholder, children, keys, disabled, popupContainer } = this.props;
        return (
            <FormItem className={className}
                {...formItemLayout}
                label={label}
                hasFeedback
            >
                {
                    form.getFieldDecorator(name, requires ? {
                        rules: [
                            { required: true, message: requires[0].message },
                        ],
                    } : {})(
                        <Select
                            disabled={disabled}
                            placeholder={placeholder}
                            onChange={this.onChange}
                            getPopupContainer={() => popupContainer ? popupContainer : document.body}
                        >
                            {
                                data.map((item, index) => {
                                    return <Option key={index} value={item[keys[0]]}>{item[keys[1]]}</Option>
                                })
                            }
                        </Select>
                        )
                }
                {
                    children
                }
            </FormItem>
        );
    }
}

export default FieldSelect;