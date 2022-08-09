'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'abbreviation' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING a
 *  2. STRING b
 */

function abbreviation(a, b) {

    var memory = [a.length, b.length]
    if (canAbbreviate(a, b))
        return "YES";
    else
        return "NO";
}

function canAbbreviate(a, b)
{
    var curResult;

    if (a.length < b.length)
        curResult = false;
    else if (b == "")
    {
        if (a == "")
            curResult = true;
        else
            curResult = !hasAnyUpperCase(a);
    }
    else if (a[0].toUpperCase() == a[0])
    {
        if (a[0] != b[0])
            curResult = false;
        else
            curResult = canAbbreviate(a.substring(1), b.substring(1));
        }
    else if (a[0].toUpperCase() == b[0])
        curResult = canAbbreviate(a.substring(1), b.substring(1)) ||
                    canAbbreviate(a.substring(1), b);
    else
        curResult = canAbbreviate(a.substring(1), b);

    return curResult;
}

function hasAnyUpperCase(a)
{
    for (let i = 0; i < a.length; i++)
    {
        if (a[i].toUpperCase() == a[i])
        return true;
    }
    return false;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const a = readLine();

        const b = readLine();

        const result = abbreviation(a, b);

        ws.write(result + '\n');
    }

    ws.end();
}
