/**
 * 비동기 통신 처리 공통 함수
 * @param method
 * @param url
 * @param param 서버로 전달할 파라미터
 * @param callback callback에서 사용할 파라미터
 * @returns {Promise<unknown>}
 */
const fn_fetch = (method, url, param, callback) => {
    method = method.toUpperCase();

    if (method === "GET" && param) { // GET 방식이면 URL 에 파라미터 붙임
        const searchParams = new URLSearchParams(param);
        url += "?" + searchParams.toString();
    }

    const option = {
        method: method,
        headers: {"Content-Type": "application/json", },
        body: method === "GET" ? null : JSON.stringify(param),
    };

    // promise 리턴해서 호출 함수에서 콜백 처리
    return new Promise((resolve, reject) => {
        fetch(url, option)
            .then(response => response.json())
            .then(data => { resolve(data, callback) }) // (response, callback)
            .catch(e => {
                console.log(e);
                reject(e);
            });
    });
};