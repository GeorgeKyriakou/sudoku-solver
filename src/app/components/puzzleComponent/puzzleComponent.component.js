"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var puzzleService_service_1 = require("../../services/puzzleService/puzzleService.service");
var PuzzleComponent = (function () {
    function PuzzleComponent(pzlService) {
        this.pzlService = pzlService;
    }
    PuzzleComponent.prototype.ngOnInit = function () {
        this.board;
        this.fragmented = [];
    };
    PuzzleComponent.prototype.changeListener = function (event) {
        var _this = this;
        var tar = event.target;
        var file = tar.files[0];
        var myReader = new FileReader();
        var brd = [];
        myReader.readAsText(file);
        myReader.onloadend = function (e) {
            for (var i = 0; brd.length != 81; i++) {
                if (myReader.result.charAt(i) == '\n')
                    continue;
                else {
                    if (myReader.result.charAt(i) == '.') {
                        brd.push(0);
                        continue;
                    }
                    brd.push(parseInt(myReader.result.charAt(i)));
                }
            }
            _this.board = brd;
            _this.fragmented = _this.fragmentArr(_this.board, 9);
            console.log(_this.fragmented);
        };
    };
    PuzzleComponent.prototype.fragmentArr = function (arr, chunk) {
        var toReturn = [];
        var temporray;
        var n = 0;
        for (var i = 0, j = arr.length; i < j; i += chunk) {
            temporray = arr.slice(i, i + chunk);
            toReturn[n] = temporray;
            n++;
        }
        return toReturn;
    };
    PuzzleComponent.prototype.solvePuzzle = function () {
        var _this = this;
        if (this.fragmented.length == [])
            alert('Please select a Sudoku puzzle from a local text file');
        else {
            var toSubmit = { 'puzzle': this.board };
            this.pzlService.submitPuzzle(toSubmit).subscribe(function (res) {
                if (res.error) {
                    _this.error = res.msg;
                    _this.difficulty = "Could not solve :(";
                    _this.tries = 'NaN';
                    _this.time = 'NaN';
                }
                else {
                    _this.solved = res.solution;
                    _this.tries = res.tries;
                    _this.time = res.time;
                    _this.solved = _this.fragmentArr(_this.solved, 9);
                    _this.error = '';
                    _this.assessDiff();
                }
            });
        }
    };
    PuzzleComponent.prototype.assessDiff = function () {
        if (this.tries < 60000)
            this.difficulty = "Easy";
        if (this.tries > 60000 && this.tries < 150000)
            this.difficulty = "Medium";
        if (this.tries > 150000 && this.tries < 700000)
            this.difficulty = "Hard";
        if (this.tries > 700000)
            this.difficulty = "Samurai";
    };
    return PuzzleComponent;
}());
PuzzleComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'rFile',
        templateUrl: 'puzzleComponent.component.html',
        styleUrls: ['puzzleComponent.component.css'],
        providers: [puzzleService_service_1.PuzzleService]
    }),
    __metadata("design:paramtypes", [puzzleService_service_1.PuzzleService])
], PuzzleComponent);
exports.PuzzleComponent = PuzzleComponent;
//# sourceMappingURL=puzzleComponent.component.js.map