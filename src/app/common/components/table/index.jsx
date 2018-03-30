import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Table, Divider } from 'antd';
import ErrorComponent from './../error/index';
class MyTable extends Component {

    constructor() {
        super();
        this.state = {
            tableColumns: null,
            tableHeaderAlready: false
        }
    }

    /**
     * 设置表格中含有的操作项
     */
    setTableOpts = (tableColumns) => {
        let { renderOpts } = this.props;
        if (tableColumns && tableColumns.length > 0) {
            for (let column of tableColumns) {
                let key = column['key'];
                let optItem = renderOpts[key];
                if (optItem) {
                    if (key === 'action') {
                        column.render = (text, record) => (
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {
                                    optItem.map((opt, index) => {
                                        const id = ((opt.url || '').match(/:([^:]*)/) || [])[1];
                                        if (opt.show === record.state || opt.show === true) {
                                            return (
                                                <span key={index} style={{ marginRight: '15px' }}>
                                                    {
                                                        opt.type === 'dialog' ?
                                                            <a href="javascript:;" onClick={opt.handler.bind(this, opt.params, record)}>{opt.text}</a>
                                                            : <a href={(opt.domain || '') + opt.url.replace(new RegExp('(\\/)+\\:' + id), '/' + record[id])}>{opt.text}</a>
                                                    }
                                                    {/* <Divider type="vertical" /> */}
                                                </span>
                                            )
                                        }
                                    })
                                }
                            </div>
                        )
                    } else {
                        const id = ((optItem.url || '').match(/:([^:]*)/) || [])[1];
                        column.render = (text, record) => <Link to={optItem.url.replace('/:' + id, '/' + record[id])}>{text}</Link>
                    }
                }
            }
        }
        this.setState({ tableColumns: tableColumns, tableHeaderAlready: true });
    }

    componentDidMount() {
        const { dataSource, tableHeader } = this.props;
        //设置表头
        this.setTableOpts(tableHeader);
    }

    render() {
        const { loading, dataSource, page, loadPage, rowKey, pageKeys, errorMsg } = this.props;
        const { tableColumns, tableHeaderAlready } = this.state;
        let pagination = {
            pageSize: page.pageSize - 0,
            total: page[pageKeys[1]] - 0
        }
        //对于非异步分页，不用设置current
        if (page[pageKeys[0]]) {
            pagination.current = page[pageKeys[0]] - 0;
        }
        return (
            tableHeaderAlready ? (!errorMsg ?
                <Table className="mytable" rowKey={rowKey} loading={loading} bordered footer={() => '共' + pagination.total + '个'} dataSource={dataSource} columns={tableColumns}
                    onChange={loadPage}
                    pagination={pagination} /> : <ErrorComponent errorMsg={errorMsg} />) : ''
        );
    }
}

export default MyTable;
