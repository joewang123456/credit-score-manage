import axios from 'axios';
const isTestEvn = /test/.test(window.location.href);

export const getPageData = (pageNo, pageSize) => {
    const url = isTestEvn ? './../data.json' : '';
    const promise = new Promise((resolve, reject) => {
        axios({
            url: url,
            method: 'get'
        }).then((res) => {
            if ((res.status >= 200 && res.status <= 300) || res.status === 304) {
                const result = res.data;
                if (result.code === 200) {
                    resolve(result);
                }
            }
        });
    });
}