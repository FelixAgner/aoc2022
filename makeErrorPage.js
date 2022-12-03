const makeErrorPage = function (message) {
    return `
<html>
<body>
<h1>Advent of Code!</h1>
<p>${message}</p>
</body>
</html>`
    
}

module.exports = {
    makeErrorPage
};