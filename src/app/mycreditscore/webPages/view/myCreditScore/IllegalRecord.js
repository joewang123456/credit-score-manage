import React, { Component } from 'react';
import Tabs from './../../components/tabs/index'; //自定义的tabs组件
import axios from 'axios';
import AreaLabel from './../../components/areaLabel/index';//区域label组件
import ViolationRecord from './../../components/violationRecord/index';

// 初始化tab数据：title:[必填]名称，dot:[选填]是否添加红点，默认不显示，
// 可添加其他自定义属性值，key，代表类别类型，与接口定义保持一致
const initTabData = [
    { title: '全部', key:'0'},
    { title: '待申诉', key:'1', dot: false},
    { title: '申诉中', key:'2'},
    { title: '已仲裁', key:'3'}
]

class IllegalRecord extends Component {
    constructor(props){
        super(props);
        this.state = {
            tabs: initTabData, //设置tab数据
            activeTabKey:'0' //设置tab激活的key
        }
    }

    anchorId = this.props.anchorId;

    /**
     *请求待申述数据，设置tab上的红点
     */
    requestComplain=()=>{
        //补充请求待申述数据的的网络请求
        axios.post('/credit-web/anchorCredit/getViolationList', {
            anchorId: this.anchorId,
            resultType: 1,
            pageNo: 1,
            pageSize: 10
        }).then((res) => {
            if (res.data.success) {
                res.data.violationList.length>0 ? initTabData[1].dot = true:initTabData[1].dot = false;
                this.setState({
                    tabs: initTabData,
                })

            }
        }).catch(() => {

        });
    }

    /**
     * 切换tab页的回调函数
     * @param value 单个tab对象
     * @param key tab的索引
     */
    onTabChange = (value, key) => {
        this.setState({
            activeTabKey: value.key,
        })
        this.requestComplain()
    }


    componentDidMount() {
        this.requestComplain();
    }

    render() {
        return (
            <div>
                <AreaLabel name={'违规记录'}/>
                <div>
                    <Tabs onChange={this.onTabChange}
                          tabs = {this.state.tabs}/>
                    <ViolationRecord anchorId={this.anchorId} activeTabKey={this.state.activeTabKey}/>
                </div>
            </div>
        )
    }
}

export default IllegalRecord;