// 通过分数获取图标
function getRankIcon(score: number) {
    if (score >= 100) {
        return 'a.png,b.png';
    } else if (score >= 500) {
        return 'c.png,d.png';
    } else if (score >= 1500) {
        return 'e.png,f.png';
    }
}
const icon = getRankIcon(5);
const iconArray = icon.split(',');

export default {}