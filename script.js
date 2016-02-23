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

Contains code from a DYclassroom project:
"HTML5 | How to create a simple Clock using JavaScript," downloaded 2016-02-23 from:
https://www.dyclassroom.com/web-project/html5-how-to-create-a-simple-clock-using-javascript
*/

var d,h,m,s,animate;

// Set the exam time in minutes here. This clock should be loaded at the exact minute of the start of the exam.
// Example: a 10-minute exam starting at 9:30AM sharp will show 0 at 9:40 AM sharp.

// Load this clock within 9:28AM
var examTimeLeft = 77;

function init(){
    d=new Date();
    h=d.getHours();
    m=d.getMinutes();
    s=d.getSeconds();
    renderTime('hr',h);
    renderTime('min',m);
    renderExamTimeLeft();
    clockSeconds();
    // clockMinutes();
};

function clockSeconds() {
    renderTime("sec",s);
    animate = setTimeout(stepClockSeconds,1000);
}

function stepClockSeconds() {
    s++;
    if(s == 60){
        s = 0;
        stepClockMinutesBase();
    }
    renderTime("sec", s);
    animate = setTimeout(stepClockSeconds, 1000);
};

function clockMinutes() {
    element = document.getElementById("secseparator");
    element.parentNode.removeChild(element);
    element = document.getElementById("sec");
    element.parentNode.removeChild(element);
    animate=setTimeout(stepClockMinutes, 1000 * (60 - s));
}

function stepClockMinutes() {
    stepClockMinutesBase();
    animate = setTimeout(stepClockSeconds, 60000);
}

function stepClockMinutesBase() {
    m++;
    examTimeLeft--;
    if(m == 60) {
        m = 0;
        h++;
        if(h == 24) {
            h = 0;
        }
        renderTime("hr", h);
    }
    renderTime("min", m);
    renderExamTimeLeft();
}

function renderTime(id,val) {
    if(val < 10) {
        val='0' + val;
    }
    document.getElementById(id).innerHTML=val;
};

function renderExamTimeLeft() {
    var examTimeLabel = document.getElementById("examTimeLeft");
    examTimeLabel.innerHTML=examTimeLeft;
    if(examTimeLeft == 3) {
        examTimeLabel.style.color = "red";
        document.getElementById("examTimeLeftMin").style.color = "red";
    }
}

window.onload=init;
