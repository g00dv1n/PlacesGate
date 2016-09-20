/**
 * Created by g00dv1n on 20.09.16.
 */

let path = require('path');

let a = '%programfiles%\\test dir\\aaa.exe';
let b = '%programfiles%\\bbb.exe';

function getDir(path) {
    let arr = path.split('\\');
    if(arr.length < 2) return null;
    arr.splice(arr.length-1,1);
    return arr.join('\\');
}

console.log(getDir(a));
console.log(getDir(b));
