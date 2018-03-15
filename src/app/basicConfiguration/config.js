//api url
export const getSimpleTypeInfoUrl = '/ruleOperation/getSimpleTypeInfo';//获取规则类型

export const createRuleTypeUrl = '/ruleOperation/createRuleType';//创建规则类型
export const createNewRuleUrl = '/ruleOperation/createNewRule';//创建规则内容
export const modifyRuleUrl = '/ruleOperation/modifyRule';//修改规则内容
export const createBusinessTypeUrl = '/ruleOperation/createBusinessType';
export const createBusinessContentUrl = '/ruleOperation/createNewConfig';//创建规则内容
export const modifyBusinessContentUrl = '/ruleOperation/modifyConfig';//创建规则内容


export const unOrEnabledTypeUrl = '/ruleOperation/unOrEnabledType?ruleId=:ruleId&state=:state';//修改规则状态
export const searchRulesUrl = '/ruleOperation/searchRules?typeId=:typeId&state=:state';//搜索规则

/**
 * 违规类型状态映射对象
 */
export const stateMap = {
    0: '全部',
    1: '启用',
    2: '停用'
}

/**
 * 暂停/启用/同步弹出框配置信息
 */
const confirmModalConfig = {
    stop: {
        modelTitle: '暂停违规内容',
        content: '确定要暂停该违规吗？',
    },
    restart: {
        modelTitle: '启用违规内容',
        content: '确定要启用违规吗？',
    },
    sync: {
        modelTitle: '同步新规则',
        content: '同步后，编辑过的新规则将生效哦，确定要同步吗？',
    }
}

/**
 * 获取配置
 * @param {*} formType 
 */
export const getConfirmConfig = (formType) => {
    const modal = confirmModalConfig[formType];
    const config = {
        title: modal.modelTitle,
        content: modal.content,
        okText: "确认",
        cancelText: "取消",
        iconType: 'exclamation-circle',
        onOk() { }
    }
    return config;
};

/**
 * 基础配置内容类型表格头部信息
 */
export const basicConfigTableHeader =
    [
        { title: '违规ID', dataIndex: 'ruleId', key: 'ruleId' },
        // { title: '业务类型', dataIndex: 'auditTypeName', key: 'auditTypeName' },
        { title: '违规类型', dataIndex: 'typeName', key: 'typeName' },
        { title: '违规内容', dataIndex: 'content', key: 'content' },
        { title: '所属库', dataIndex: 'library', key: 'library' },
        // { title: '扣分(减)', dataIndex: 'deductionCount', key: 'deductionCount' },
        { title: '扣分(减)', dataIndex: 'deduction', key: 'deduction' },
        { title: '处罚措施', dataIndex: 'punishmentStr', key: 'punishmentStr' },
        { title: '申诉', dataIndex: 'canAppeal', key: 'canAppeal' },
        // { title: '申诉期权限控制', dataIndex: 'appealPeriodLimitTxt', key: 'appealPeriodLimitTxt' },
        { title: '新建/更新时间', dataIndex: 'updateTimeFormat', key: 'updateTimeFormat' },
        { title: '当前状态', dataIndex: 'stateTxt', key: 'stateTxt' },
        { title: '操作', key: 'action' }
    ]