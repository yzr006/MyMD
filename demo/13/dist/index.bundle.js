(function (axios) {
    'use strict';

    axios = axios && axios.hasOwnProperty('default') ? axios['default'] : axios;

    function test1() {
        alert('test1');
        console.log(axios);
    }

    test1();

}(axios));
