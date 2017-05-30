import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http';



import { AppComponent }  from './app.component';
import {PuzzleComponent} from './components/puzzleComponent/puzzleComponent.component'
@NgModule({
  imports:      [ BrowserModule, HttpModule],
  declarations: [ AppComponent, PuzzleComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
