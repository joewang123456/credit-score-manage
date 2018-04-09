import React, { Component } from 'react';
import * as style from './index.scss';
import axios from "axios/index";

const defaultTabObject = [
    { title: 'tab1', status: 'tab1' },
    { title: 'tab2', status: 'tab2' },
    { title: 'tab3', status: 'tab3' },
    { title: 'tab4', status: 'tab4' }
]

axios.defaults.withCredentials = true;  //带cookie--默认不带

class tabs extends Component {

    state={
        chooseIndex: 1, //设置默认选择的key
        onChangeCallBack: this.props.onChange, //获取改变tab的回调函数
        clickCurrentTab: this.props.clickCurrentTab || false, //是否允许点击当前tab，默认不允许
        offsetLeft: 0, //当前元素距离左侧偏移距离
        currentDomWidth: 60, //当前元素宽度

    }

    /**
     * tabs点击改变触发的事件
     * @param value 传入的tab的对象
     * @param key 被点击tab的位置
     */
    onTabsChange(value, key, event){
        //当改变的tab与当前选中的tab索引相同，且不允许点击当前tab 为false的情况下，直接return
        if(this.state.chooseIndex === key && !this.state.clickCurrentTab)return;

        //修改选中的标签索引、偏移量、dom宽度
        this.setState({
            chooseIndex:key,
            offsetLeft:event.currentTarget.offsetLeft,
            currentDomWidth:event.currentTarget.clientWidth
        });
        //触发回调函数
        let callback = this.state.onChangeCallBack;
        if(typeof callback === "function"){
            callback(value, key);
        }
    }

    render() {

        const { tabs = defaultTabObject } = this.props;

        return (
            <div className={style.zhiBoTabsWrap}>
                <div className={style.zhiBoTabsScroll}>
                    <div className={style.zhiBoTabsNav}>
                        <div className={style.zhiBoTabsInkBar}
                             style={{'transform': 'translate3d('+ this.state.offsetLeft +'px, 0px, 0px)', 'width': + this.state.currentDomWidth +'px'}}></div>

                        {
                            tabs.map((value, index)=>{
                               return (
                                <div key={index}
                                     className={`${style.zhiBoTabsTab} ${ this.state.chooseIndex == index+1? style.zhiBoTabsTabActive:''}`}
                                     onClick={(event)=>this.onTabsChange(value, index+1, event)}>
                                   <span className="ant-badge">{value.title}</span>
                                    {
                                        value.dot?<span className={style.tabsTabDot}></span>:''
                                    }
                                </div>
                               )
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default tabs;