"use strict";
exports.__esModule = true;
// 通过分数获取图标
function getRankIcon(score) {
    if (score >= 100) {
        return 'a.png,b.png';
    }
    else if (score >= 500) {
        return 'c.png,d.png';
    }
    else if (score >= 1500) {
        return 'e.png,f.png';
    }
}
var icon = getRankIcon(5);
var iconArray = icon.split(',');
exports["default"] = {};
