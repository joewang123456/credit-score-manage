/**
 * 新建/编辑 违规内容表单
 */
import React, { Component } from 'react';
import { Form, Button } from 'antd';
import FieldSelect from './../../common/components/fieldtypes/fieldselect';
import FieldInput from './../../common/components/fieldtypes/fieldinput';
import FieldCheckbox from './../../common/components/fieldtypes/fieldcheckbox';
import FieldRadio from './../../common/components/fieldtypes/fieldradio';
import FieldSwitch from './../../common/components/fieldtypes/fieldswitch';
import FieldTip from './../../common/components/fieldtypes/fieldtip';
import FieldText from './../../common/components/fieldtypes/fieldtext';
import { Custom } from './../components/coustom';
import * as style from './../style/index.scss';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { sm: { span: 5 } },
  wrapperCol: { sm: { span: 19 } }
}
class RuleContentFormComponent extends Component {

  constructor() {
    super();
    this.state = {
      canAppeal: '不支持' //是否可以申诉
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //请求API之前，对请求参数处理
        let result = {};
        let paramsKeys = ['hint', 'library', 'content', 'desc', 'first', 'second', 'third', 'punishmentStr', 'appealDays', 'reactionary'];
        if (this.props.editData) {//编辑违规内容字段
          //增加ruleId
          result['ruleId'] = this.props.editData.ruleId;
          paramsKeys.push('ruleId');
        } else {//新增违规内容字段
          paramsKeys.push('typeId');
        }
        for (var key in values) {
          if (paramsKeys.indexOf(key) > -1) {
            result[key] = values[key];
          }
        }
        //处罚措施拼接成字符串，用';'分割
        result['punishmentStr'] = result['punishmentStr'].join(';');
        //处理申诉期权限将true->1,false->0
        // result['shieldAlbum'] = result['shieldAlbum'] ? 1 : 0;
        //如果不支持申诉，将申诉期和申诉期权限都设置为0，否则api会报错
        if (values['canAppeal'] !== '支持') {
          result['appealDays'] = 0;
          // result['shieldAlbum'] = 0;
        }
        this.props.handleOK(result, this.props.editData ? 'edit' : 'add');
      }
    });
  }

  componentDidMount() {
    if (this.props.editData) {
      this.setState({ canAppeal: this.props.editData.canAppeal });
    }
  }

  /**
   * 切换是否申诉
   */
  setAppeal = (value) => {
    this.setState({ canAppeal: value });
  }

  render() {
    let { ruleTypes, ruleTypeList, punishmentList, library } = this.props.data;
    //删除全部选项
    ruleTypeList = ruleTypeList.slice(1);
    const { editData = null } = this.props
    const { canAppeal } = this.state;
    //处理处罚措施
    return (
      <Form onSubmit={this.handleSubmit}>
        {/*
        <FieldSelect name="auditTypeId" label="所属业务" defaultValue={editData ? editData.auditTypeId : ''} placeholder="请选择" requires={[{ type: 'required', message: '必填' }]} data={ruleTypes} keys={['id', 'name']} span={6} form={this.props.form} formItemLayout={formItemLayout} className={style.setFieldMarginBottom} popupContainer={document.getElementsByClassName('wrapModal')[0]} />
        */}
        <FieldSelect name="typeId" label="违规类型" disabled={!!editData} defaultValue={editData ? editData.typeId : ''} placeholder="请选择" requires={[{ type: 'required', message: '必填' }]} data={ruleTypeList} keys={['typeId', 'name']} span={6} form={this.props.form} formItemLayout={formItemLayout} className={style.setFieldMarginBottom} popupContainer={document.getElementsByClassName('wrapModal')[0]} />
        <FieldInput name="content" label="违规内容" defaultValue={editData ? editData.content : ''} placeholder="请填写违规内容，请保持在30字以内" requires={[{ type: 'required', message: '必填' }]} limit={30} form={this.props.form} formItemLayout={formItemLayout} className={style.setFieldMarginBottom} />
        <FieldInput name="desc" rows={4} label="违规说明" defaultValue={editData ? editData.intro : ''} placeholder="请填写违规说明，请保持在200字以内" requires={[{ type: 'required', message: '必填' }]} limit={200} form={this.props.form} formItemLayout={formItemLayout} className={style.setFieldMarginBottom} />
        <FieldSelect name="library" label="所属库" defaultValue={editData ? editData.libraryIndex : ''} placeholder="请选择" data={library} keys={['id', 'name']} span={6} requires={[{ type: 'required', message: '必填' }]} form={this.props.form} formItemLayout={formItemLayout} className={style.setFieldMarginBottom} popupContainer={document.getElementsByClassName('wrapModal')[0]} />
        <Custom name="" label="扣分分值" defaultValue={editData ? editData.deduction : ''} form={this.props.form} className={style.setFieldMarginBottom} textClass={style.tipText} requires={[{ type: 'required', message: '必填' }]} />
        <FieldCheckbox name="punishmentStr" label="处罚措施" defaultValue={editData ? editData.punishmentList.map((item) => item.id) : []} data={punishmentList} keys={['id', 'desc']} form={this.props.form} formItemLayout={formItemLayout} className={style.setFieldMarginBottom} />
        <FieldRadio name="canAppeal" label="能否申诉" defaultValue={editData ? editData.canAppeal : canAppeal} data={[{ id: '支持', label: '支持' }, { id: '不支持', label: '不支持' }]} keys={['id', 'label']} callback={this.setAppeal} requires={[{ type: 'required', message: '请选择' }]} form={this.props.form} formItemLayout={formItemLayout} className={style.setFieldMarginBottom} />
        {//控制是否可以申诉
          canAppeal === '不支持' ? '' : (
            <div>
              <FieldInput name="appealDays" label="申诉期" defaultValue={editData ? editData.appealDays : 0} inputType="number" max={30} min={0} requires={[{ type: 'required', message: '必填' }]} form={this.props.form} formItemLayout={formItemLayout} className={style.setFieldMarginBottom} />
              {/* 
                <FieldSwitch name="shieldAlbum" label="申诉期限制" defaultValue={editData ? !!editData.shieldAlbum : 0} text={'搜索和推荐屏蔽专辑/声音'} form={this.props.form} formItemLayout={formItemLayout} className={style.setFieldMarginBottom} />
              */}
            </div>
          )
        }
        <FieldSwitch name="reactionary" label="是否属反动" defaultValue={editData ? editData.reactionary : false} text={'是'} form={this.props.form} formItemLayout={formItemLayout} className={style.setFieldMarginBottom} />
        <FieldText name="privateLetter" label="私信内容" text="系统生成" textClass={style.tipText} formItemLayout={formItemLayout} className={style.setFieldMarginBottom} />
        <FieldInput name="hint" label="客户端提示语" defaultValue={editData ? editData.hint : ''} placeholder="请填写" form={this.props.form} formItemLayout={formItemLayout} className={style.setFieldMarginBottom} />
        <FieldTip name="tip" text="提示:新建成功后，默认为停用状态，需启用后才可生效" textClass={style.tipText} />
        {
          <FormItem style={{ textAlign: "center" }}>
            <Button onClick={this.props.handleCancel}>取消</Button>
            <Button style={{ marginLeft: 8 }} type="primary" htmlType="submit">确定</Button>
          </FormItem>}
      </Form>
    );
  }
}

const RuleContentForm = Form.create()(RuleContentFormComponent);
export default RuleContentForm;