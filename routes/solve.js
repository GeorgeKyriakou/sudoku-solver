/**
*  The checkBox, checkRow, and checkCol functions and the backtracking logic
*  are done with the help, and  permission, of the code written by
*  Carlino Gonzalez --> https://github.com/carlinoo
*  ,and adjusted for the purpose of this assignment by Georgios Kyriakou.
**/

const express=require('express');
const router = express.Router();
var board;


router.post('/solve',(req,res,next)=>{
	this.board = req.body.puzzle;
	let solved= [];
	let tryThis = 1;
	let stack = [];
	let number_of_gaps=0;
	let cur = 0;
	let k=0;
	let start =new Date();
	for(let i=0;i<this.board.length;i++)
	if(this.board[i]==0)
	number_of_gaps +=1;

	while(stack.length!=number_of_gaps){
		k++;
		if(k>1500000){
			return res.json({'error':true,'msg':'Too many cycles ran (>1500000), with no solution.'});
		}
		if (this.board[cur] == 0) {
			if (!checkCol(cur, tryThis, this.board) && !checkRow(cur, tryThis, this.board) && !checkBox(cur, tryThis, this.board)&& tryThis<10){//legal value
				this.board[cur] = tryThis;
				stack.push(cur);
				tryThis = 1;
				cur++;
			} else {
				if(tryThis>9){
					this.board[cur]=0;
					cur = stack.pop();
					tryThis = this.board[cur];
					this.board[cur]=0;
				}
				tryThis++;
			}
		}
		else {
			cur++;
			tryThis = 1;
		}
	}
	let end= new Date();
	let duration = end- start;
	res.json({'error':false,'solution':this.board, 'tries':k, 'time':duration});
});



function checkBox(i, num, board) {
	let toCheck = i;
	let x = (i % 9);
	let y = Math.floor(i / 9);

	i = i - (x % 3);
	i = i - (y % 3)*9;

	for (let k = i; k < i+3; k++) {         //check first row of 3x3 box
		if (board[k] == num && k!=toCheck) {
			return 1;
		}
	}
	for (let k = i+9; k < i+12; k++) {    //check second row of 3x3 box
		if (board[k] == num && k!=toCheck) {
			return 1;
		}
	}
	for (let k = i+18; k < i+21; k++) {   ////check third row of 3x3 box
		if (board[k] == num && k!=toCheck) {
			return 1;
		}
	}
	return 0;
}

function checkRow(i, num, board) {
	let toCheck = i
	i = Math.floor(i/9)*9;

	for (var k = i; k < i+9; k++) {
		if (board[k] == num && k!=toCheck) {
			return 1;
		}
	}
	return 0;
}

function checkCol(i, num, board) {
	let toCheck= i;
	i = (i % 9);
	var m = i;
	for (var k = i; k < i+9; k++) {
		if (board[m] == num && m!=toCheck) {
			return 1;
		}
		m = m + 9;
	}
	return 0;
}

module.exports = router;
