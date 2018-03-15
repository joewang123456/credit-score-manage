import React, { Component } from 'react';
import { connect } from 'react-redux';
import { is } from 'immutable';
import { Button, Modal } from 'antd';
import {
    fetchAllList,
    createRuleType,
    updateRuleContent,
    createBusinessType,
    updateBusinessContent,
    unOrEnabledType,
    getRuleTypeAndPunishment,
    getFilterDataList,
    updateFilter,
    updatePage,
    equal
} from './../action/index';
import { getConfirmConfig, stateMap, basicConfigTableHeader } from './../config';
import utils from './../../common/util';
import RuleTypeForm from './../components/ruleTypeForm';
import BusinessTypeForm from './../components/businessTypeForm';
import RuleContentForm from './../components/ruleContentForm';
import BusinessContentForm from './../components/businessContent';
import ConfigFilterForm from './../components/configFilterForm';
import MyTable from './../../common/components/table/index';
import * as style from './../style/index.scss';

class BasicConfiguration extends Component {
    constructor() {
        super();
        this.state = {
            modal: {
                title: '', //modal标题
                visible: false,
                formComponent: '' //内嵌到modal中的form组件
            }
        }

        //配置table中含有的操作项
        this.renderOpts = {
            action: [
                { text: '编辑', type: 'dialog', show: true, handler: this.showModal.bind(this), params: ['placeHolder_edit'] },
                { text: '暂停', type: 'dialog', show: 1, handler: this.showConfirm, params: ['stop'] },
                { text: '启用', type: 'dialog', show: 2, handler: this.showConfirm, params: ['restart'] }
            ]
        }
    }

    componentDidMount() {
        const { getRuleTypeAndPunishment, fetchAllList } = this.props;
        //获取违规类型和惩罚列表
        getRuleTypeAndPunishment();
        //获取违规内容报表
        fetchAllList();
    }

    /**
     * 如果props没有改变，不需要render
     * @param {*} nextProps 
     */
    shouldComponentUpdate(nextProps) {
        if (equal(['filter', 'filterData', 'page', 'punishmentList', 'ruleTypeList', 'showLoadIcon'], nextProps, this.props, is)) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * 获取业务类和规则类列表
     */
    getbusinessTypes = (businessInfoModelList = []) => {
        let businessTypes = [];
        let ruleTypes = [];
        businessInfoModelList.forEach((item) => {
            if (item.type === 0) {//规则类
                ruleTypes.push(item);
            } else {
                businessTypes.push(item);
            }
        });
        return { ruleTypes, businessTypes }
    }


    /**
     * 判断属于违规类还是业务类
     */
    getType = (typeId) => {
        let result = 0;//业务类为1，规则类为0
        const { businessTypes } = this.getbusinessTypes(this.props.businessList);
        for (let item of businessTypes) {
            if (item.id === typeId) {
                result = item.type;
                break;
            }
        }
        return result;
    }

    /**
     * 动态设置新增/编辑操作 模态框
     */
    showModal = (formType, record) => {
        if (utils.isArray(formType)) {
            formType = formType[0];
        }
        const { ruleTypes, businessTypes } = this.getbusinessTypes(this.props.businessList);
        let modalType = formType.split('_')[0];
        const isAdd = formType.split('_')[1];
        if (modalType === 'placeHolder') {
            if (this.getType(record.auditTypeId) === 1) {//编辑业务类型
                modalType = 'BusinessContent';
            } else {//编辑违规类型
                modalType = 'RuleContent';
            }
        }
        let newModal = { visible: true };
        if (modalType === 'RuleType') {
            Object.assign(newModal, { title: '新建违规类型' }, { formComponent: <RuleTypeForm handleCancel={this.handleCancel} addRuleType={this.addRuleType} /> });
        } else if (modalType === 'BusinessType') {
            Object.assign(newModal, { title: '新建业务类型' }, { formComponent: <BusinessTypeForm handleCancel={this.handleCancel} addBusinessType={this.addBusinessType} /> });
        }
        else if (modalType === 'RuleContent') {
            Object.assign(newModal, { title: isAdd === 'add' ? '新建违规内容' : '编辑违规内容' }, { formComponent: <RuleContentForm editData={isAdd === 'add' ? null : record} data={{ ruleTypes: ruleTypes, ruleTypeList: this.props.ruleTypeList, punishmentList: this.props.punishmentList, library: this.props.library }} handleCancel={this.handleCancel} handleOK={this.updateRuleContent} /> });
        } else if (modalType === 'BusinessContent') {
            Object.assign(newModal, { title: isAdd === 'add' ? '新建业务内容' : '编辑业务内容' }, { formComponent: <BusinessContentForm editData={isAdd === 'add' ? null : record} data={{ businessTypes: businessTypes }} handleCancel={this.handleCancel} handleOK={this.updateBusinessContent} /> });
        }
        this.setState({ modal: Object.assign({}, this.state.modal, newModal) });
    }

    /**
     * 暂停/启动确认弹出框
     */
    showConfirm = (formType, recond) => {
        if (utils.isArray(formType)) {
            formType = formType[0];
        }
        let defaultConfirm = getConfirmConfig(formType);
        let config = Object.assign({}, defaultConfirm, {
            onOk: () => {
                unOrEnabledType(recond.ruleId, recond.state === 1 ? 2 : 1).then((data) => {
                    if (data.success) {
                        utils.openPopup('success', '设置成功');
                        //获取所有数据
                        setTimeout(() => {
                            this.props.fetchAllList();
                        }, 500);
                    } else {
                        utils.openPopup('error', data.errorMsg);
                    }
                }).catch((err) => {
                    utils.openPopup('error', '出错啦！');
                });
            }
        });
        Modal.confirm(config);
    }

    /**
     * 触发搜索
     */
    doSearch = (filter) => {
        const { updatePage, updateFilter } = this.props;
        updateFilter(filter);
        updatePage({ current: 1 });
    }

    /**
     * 处理弹出框消失，在每次弹出框close后，将form表单置空，解决变淡弹出初始化问题
     */
    handleCancel = () => {
        this.setState({ modal: Object.assign({}, this.state.modal, { visible: false }, { formComponent: null }) });
    }

    /**
     * 增加规则类型
     */
    addRuleType = (ruleTypeInfo) => {
        createRuleType(ruleTypeInfo).then((msg) => {
            if (!msg.success) {
                utils.openPopup('error', msg.errorMsg);
            } else {
                utils.openPopup('success', '创建成功！');
                this.handleCancel();
                //重新加载规则类型
                this.props.getRuleTypeAndPunishment();
            }
        }).catch((error) => {
            utils.openPopup('error', '出错啦！');
        })
    }

    /**
     * 增加业务类型
     */
    addBusinessType = (businessInfo) => {
        createBusinessType(businessInfo).then((msg) => {
            if (!msg.success) {
                utils.openPopup('error', msg.errorMsg);
            } else {
                utils.openPopup('success', '创建成功！');
                this.handleCancel();
                //重新加载规则类型
                this.props.getRuleTypeAndPunishment();
            }
        }).catch((error) => {
            utils.openPopup('error', '出错啦！');
        })
    }

    /**
     * 增加/编辑规则内容
     */
    updateRuleContent = (params, type) => {
        updateRuleContent(params, type).then((msg) => {
            if (!msg.success) {
                utils.openPopup('error', msg.errorMsg);
            } else {
                utils.openPopup('success', '操作成功！');
                //重新加载所有数据
                this.props.fetchAllList();
                //隐藏modal
                this.handleCancel();
            }
        }).catch((error) => {
            utils.openPopup('error', '出错啦！');
        })
    }

    /**
     * 增加/更新业务内容
     */
    updateBusinessContent = (params, type) => {
        updateBusinessContent(params, type).then((msg) => {
            if (!msg.success) {
                utils.openPopup('error', msg.errorMsg);
            } else {
                utils.openPopup('success', '操作成功！');
                //重新加载所有数据
                this.props.fetchAllList();
                //隐藏modal
                this.handleCancel();
            }
        }).catch((error) => {
            utils.openPopup('error', '出错啦！');
        })
    }

    /**
     * 更新分页
     */
    loadPage = (pagination) => {
        this.props.updatePage(pagination);
    }

    /**
     * 组件卸载后，如果还有未处理完成的任务，立即结束
     */
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return;
        };
    }

    render() {
        const { punishmentList, ruleTypeList, businessList, showLoadIcon, filterData, filter, page, errorMsg } = this.props;
        let { modal } = this.state;
        return (
            <div className={style.contentWrap}>
                <div className={style.header + " " + style.clearfix}>
                    <div className={style.title}>违规处罚基础配置</div>
                    <div className={style.options}>
                        {/*
                    <Button type="primary" onClick={this.showModal.bind(this, 'BusinessType_add')}>新建业务类型</Button>
                    <Button type="primary" onClick={this.showModal.bind(this, 'BusinessContent_add')}>新建业务内容</Button>
                    */}
                        <Button type="primary" onClick={this.showModal.bind(this, 'RuleType_add')}>新建违规类型</Button>
                        <Button type="primary" onClick={this.showModal.bind(this, 'RuleContent_add')}>新建违规内容</Button>
                    </div>
                </div>
                <div className={style.content}>
                    <div className={style.header + " " + style.clearfix}>
                        <ConfigFilterForm data={{ ruleTypeList: ruleTypeList, businessList: businessList }} defaultValue={filter} doSearch={this.doSearch} />
                    </div>
                    <div className={style.list}>
                        <MyTable rowKey="ruleId" errorMsg={errorMsg} tableHeader={basicConfigTableHeader} loadPage={this.loadPage} loading={showLoadIcon} dataSource={filterData} page={Object.assign({}, page, { totalCount: filterData.length })} pageKeys={['current', 'totalCount']} renderOpts={this.renderOpts} />
                    </div>
                </div>
                {/* 模态框 */}
                <Modal
                    wrapClassName={'wrapModal'}
                    title={modal.title}
                    visible={modal.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    maskClosable={false}
                >
                    {modal.formComponent}
                </Modal>
            </div>
        );
    }
}


//state数据中，根据条件过滤，得到过滤的数据作为表格展示的数据
const mapStateToProps = (state) => {
    const allData = state.tableList;
    const filterData = getFilterDataList(allData, state.filter);
    return Object.assign({}, state, { filterData: filterData });
}

// dispatch actions map to props
const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllList: () => {//获取所有数据
            dispatch(fetchAllList());
        },
        getRuleTypeAndPunishment: () => {//获取惩罚和规则类型数据
            dispatch(getRuleTypeAndPunishment());
        },
        updateFilter: (filter) => {//更新过滤条件
            dispatch(updateFilter(filter));
        },
        updatePage: (page) => {
            dispatch(updatePage(page));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BasicConfiguration);
