import { message } from 'antd';
//api url
export const getSimpleTypeInfoUrl = '/ruleOperation/getSimpleTypeInfo';//获取规则类型
export const allViolationListUrl = '/creditScore/searchViolationList';//获取违规列表
export const violationDetailUrl = '/creditScore/getViolationDetail';//获取违规详情

/**
 * 违规记录报表表头
 */
export const illegalRecordTableHeader = [
    { title: '违规单号', dataIndex: 'recordId', key: 'recordId' },
    { title: '主播昵称', dataIndex: 'nickName', key: 'nickName' },
    { title: '主播ID', dataIndex: 'anchorId', key: 'anchorId' },
    { title: '违规类型', dataIndex: 'ruleType', key: 'ruleType' },
    { title: '违规下发时间', dataIndex: 'violationCreateTime', key: 'violationCreateTime' },
    { title: '申诉时间', dataIndex: 'appealSubmitTime', key: 'appealSubmitTime' },
    { title: '申诉结果', dataIndex: 'appealResult', key: 'appealResult' },
    { title: '处罚执行时间', dataIndex: 'punishmentTime', key: 'punishmentTime' },
    { title: '操作', key: 'action' }
];