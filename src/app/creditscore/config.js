import { message } from 'antd';
//api url
export const creditScoreListUrl = '/creditScore/getCreditScoreList';//所有主播信用积分查询
export const specifiedViolationUrl = '/creditScore/getSpecifiedViolation';//单个主播违规记录

//所有主播信用积分报表表头
export const creditScoreTableHeader = [
    { title: '主播ID', dataIndex: 'anchorId', key: 'anchorId' },
    { title: '主播昵称', dataIndex: 'nickName', key: 'nickName' },
    { title: '主播等级', dataIndex: 'gradeStr', key: 'gradeStr' },
    { title: '当前信用分', sorter: false, dataIndex: 'score', key: 'score' },
    // { title: '处于申诉期尚未扣除分值', dataIndex: 'x5', key: 'x5' },
    { title: '违规次数', sorter: false, dataIndex: 'count', key: 'count' },
    { title: '操作', key: 'action' }
];

//单个主播信用积分报表明细表头
export const creditScoreDetailTableHeader = [
    { title: '违规单号', dataIndex: 'recordId', key: 'recordId' },
    { title: '记录来源', dataIndex: 'complaintSource', key: 'complaintSource' },
    { title: '违规类型', dataIndex: 'ruleType', key: 'ruleType' },
    { title: '违规内容', dataIndex: 'ruleContent', key: 'ruleContent' },
    { title: '处罚措施', dataIndex: 'punishmentStr', key: 'punishmentStr' },
    { title: '违规下发时间', dataIndex: 'violationCreateTime', key: 'violationCreateTime' },
    { title: '违规审核时间', dataIndex: 'appealAuditTime', key: 'appealAuditTime' },
    { title: '申诉截止时间', dataIndex: 'appealSubmitTime', key: 'appealSubmitTime' },
    { title: '处罚执行时间', dataIndex: 'punishmentTime', key: 'punishmentTime' },
    { title: '操作', key: 'action' }
]