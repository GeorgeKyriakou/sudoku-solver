import { Component, OnInit } from '@angular/core';
import {PuzzleService} from '../../services/puzzleService/puzzleService.service';


@Component({
  moduleId:module.id,
  selector: 'rFile',
  templateUrl: 'puzzleComponent.component.html',
  styleUrls: ['puzzleComponent.component.css'],
  providers: [PuzzleService]
})
export class PuzzleComponent implements OnInit  {
   board:number[];
   fragmented:any;
   solved:any;
   tries:any;
   time:any;
   difficulty:string;
   error:string;
  constructor(private pzlService:PuzzleService){ }
  ngOnInit(){
    this.board;
    this.fragmented=[];
  }

  changeListener(event:any) : void {
    let tar = event.target;
    let file = tar.files[0];
    let myReader = new FileReader();
    let brd : number[]=[];
    myReader.readAsText(file);
      myReader.onloadend = e =>{
        for(let i=0;brd.length!=81;i++){
          if(myReader.result.charAt(i)=='\n')
            continue;
          else{
            if(myReader.result.charAt(i)=='.'){
              brd.push(0);
              continue;
            }
            brd.push(parseInt(myReader.result.charAt(i)));
          }

          }
          this.board = brd;
          this.fragmented = this.fragmentArr(this.board,9);
          console.log(this.fragmented)
    }
  }

  fragmentArr(arr:number[],chunk:number){
    let toReturn = [];
    let temporray;
    let n =0;
    for (let i=0,j=arr.length; i<j; i+=chunk) {
      temporray = arr.slice(i,i+chunk);
      toReturn[n]= temporray;
      n++;
    }
    return toReturn;
  }

  solvePuzzle(){
  if(this.fragmented.length== [] )
    alert('Please select a Sudoku puzzle from a local text file');
  else {
    let toSubmit = { 'puzzle':this.board}
    this.pzlService.submitPuzzle(toSubmit).subscribe(res=>{
      if(res.error){
        this.error = res.msg;
        this.difficulty = "Could not solve :("
        this.tries = 'NaN';
        this.time = 'NaN';
      }else{
        this.solved = res.solution;
        this.tries = res.tries;
        this.time = res.time;
        this.solved = this.fragmentArr(this.solved,9);
        this.error ='';
        this.assessDiff();
      }
    });
    }
  }
  assessDiff(){
    if(this.tries<60000)
    this.difficulty="Easy";
    if(this.tries>60000 && this.tries<150000)
    this.difficulty="Medium";
    if(this.tries>150000 && this.tries<700000)
    this.difficulty="Hard";
    if(this.tries>700000 )
    this.difficulty="Samurai";
  }

}
