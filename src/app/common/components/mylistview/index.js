import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { curry } from 'ramda';
import { PullToRefresh, ListView } from 'antd-mobile';
import Loading from './../loading';

//使用高阶组件，将列表渲染前的加载，错误，数据为空逻辑提到新的组件中处理
const widthHandle = curry((HOCName) => (WrapComponent) => class extends WrapComponent {
    static displayName = HOCName;
    render() {
        const { pageNo, list, loading, errorMsg, ErrorMsg, NoData } = this.props;
        if (loading) {//加载中
            return <Loading loading={loading} />
        } else if (errorMsg) {//出错处理
            return <ErrorMsg errorMsg={errorMsg} />
        } else if (pageNo === 1 && (list || []).length == 0) {//没有数据
            return <NoData />
        } else {//正常加载数据
            return super.render();
        }
    }
});

const setState = (context) => (args) => {
    context.setState.call(context, Object.assign(context.state, { ...args }));
}

//此处使用的ES7中装饰器，在webpack需要配置对ES7的支持
@widthHandle('HOCHandle')
class MyListView extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource,
            refreshing: true,
            isLoading: true,
            append: false
        };
    }

    rData = []

    componentDidUpdate() {
        document.body.style.overflow = 'auto';
    }

    componentWillReceiveProps(nextProps) {
        const { list = [], totalCount, errorMsg } = nextProps;
        const { append } = this.state;
        //将新的分页数据放到最后
        if (!errorMsg) {
            if (append) {
                this.rData = [...this.rData, ...list];
            } else {
                this.rData = [...list];
            }
        }
        setState(this)({
            dataSource: this.state.dataSource.cloneWithRows(this.rData),
            refreshing: false,
            isLoading: false,
            append: false,
            hasMore: this.rData.length === totalCount ? true : false
        });
    }

    onRefresh = () => {
        setState(this)({ refreshing: true, isLoading: false });
        this.props.onPageChange(1);
    };

    onEndReached = (event) => {
        const { totalCount, pageSize, pageNo, errorMsg } = this.props;
        //已经没有更多或者正在加载中
        if (this.state.isLoading || this.state.hasMore) {
            return;
        }
        this.setState({ isLoading: true, append: true });
        //此处对于每次下拉加载更多延迟500毫秒，否则下拉过快，导致连续请求
        setTimeout(() => {
            this.props.onPageChange(errorMsg ? pageNo : pageNo + 1);
        }, 500);
    };

    render() {
        const { dataSource, isLoading, hasMore } = this.state;
        const { list, pageSize, pageNo, renderRow, Separator, className, errorMsg } = this.props;
        const footerText = isLoading ? 'Loading...' : (errorMsg ? errorMsg : (hasMore ? (pageNo > 1 ? '没有更多啦~00~' : '') : '上拉查看更多'));
        return (
            <div className={className}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderFooter={() => (<div style={{ textAlign: 'center' }}>
                        {
                            footerText
                        }
                    </div>)}
                    renderRow={renderRow(list)}
                    renderSeparator={Separator}
                    useBodyScroll={true}
                    pullToRefresh={<PullToRefresh
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                    />}
                    initialListSize={pageSize}
                    pageSize={pageSize}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={100}
                />
            </div>
        );
    }
}

export default MyListView;