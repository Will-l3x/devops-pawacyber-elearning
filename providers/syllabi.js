let fs = require('fs');
let path = require('path');
//------------syllabi
//---------------JuniorPrimary
//---------------JuniorSecondary
//---------------SeniorSecondary
let basePath = 	path.join(__dirname, '../syllabi');
let getSyllabi = () => {
	console.log(basePath);
	let jpPath = "jp";
	let jsPath = 'js';
	let ssPath = 'ss';
	let obj = {};
	obj.jp = fs.readdirSync(path.join(basePath, jpPath));
	obj.js = fs.readdirSync(path.join(basePath, jsPath));
	obj.ss = fs.readdirSync(path.join(basePath, ssPath));
	return obj;
};
module.exports = getSyllabi;