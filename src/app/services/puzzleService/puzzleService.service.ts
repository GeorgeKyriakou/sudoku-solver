import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PuzzleService{


  constructor (private http:Http){
    console.log('Puzzle service started');
  }


  submitPuzzle(board:any){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:9090/sudoku/solve',JSON.stringify(board), {headers: headers})
      .map(res => res.json());
  }
}
