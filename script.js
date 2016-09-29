/* examClock: Simple clock, countdown, and message board for taking exams
Copyright (C) 2016 Fabio Correa fabio5@umd.edu

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

// The exam time can be set by clicking it.
var examTimeLeft = 75, examTimeEnabled = false;

function init() {
    renderTime();
    renderExamTimeLeft();
    resizeExam();
    setInterval(renderTime, 1000);
}

function renderTime() {
    var d = new Date();
    document.getElementById("currentTimeCell").innerHTML = d.toLocaleTimeString();
    if(examTimeEnabled && (d.getSeconds() == 0)) {
        --examTimeLeft;
        renderExamTimeLeft();
    }
}

function renderExamTimeLeft() {
    var examTimeCell = document.getElementById("examTimeCell");
    // The following should not be optimized because this function is invoked by setExamTime() at any time.
    if(examTimeEnabled) {
        examTimeCell.innerHTML = "Time left: " + examTimeLeft + " Min";
        if(examTimeLeft <= 10) {
           examTimeCell.style.color = "red";
        } else {
            examTimeCell.style.color = document.body.style.color;
        }
    } else {
        examTimeCell.innerHTML = "Click here for timer";
        examTimeCell.style.color = document.body.style.color;
    }
}

window.onload = init;

function setExamTime() {
    var enteredText = prompt("Enter the new time left in minutes\n(0 to hide):", examTimeLeft);
    if(enteredText.match(/^\d+$/)) {
        examTimeEnabled = (enteredText > 0);
        examTimeLeft = enteredText;
    } else {
        examTimeEnabled = false;
    }
    renderTime();
    renderExamTimeLeft();
}

function resizeExam() {
    document.getElementById("ExamMessages").style.height = (window.innerHeight * 0.8) + "px";
}