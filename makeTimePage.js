
let getTime = function(day) {
    let msg = "";
    try {
        let ds = day >= 10 ? "d" + day : "d0"+day;
        let {p1,p2,t} = require(`./${ds}/${ds}`);
        msg = t + " ms";
    } catch (error) {
        msg = "---";
    }
    

    return `<p>Day ${day}:    ${msg}</p>`;
}

const makeTimePage = function () {
    let resString = "";
    for (let day = 1 ; day <= 25 ; day ++) {
        resString += getTime(day);
    }
    return `
<html>
<body>
<h1>Advent of Code!</h1>
<p>Times:</p>
${resString}
</body>
</html>`
    
}

module.exports = {
    makeTimePage
};