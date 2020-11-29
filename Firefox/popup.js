//Print week number 

//source: https://weeknumber.net/how-to/javascript
Date.prototype.getWeek = function() {
    var date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                            - 3 + (week1.getDay() + 6) % 7) / 7);
}

document.getElementById("giga").textContent = new Date().getWeek();


//Attach onclick events to navbar items
document.getElementById("current").addEventListener("click", function() {document.getElementById("thiswk").style.display = "block";document.getElementById("conv").style.display = "none";document.getElementById("current").className = "nav-link active";document.getElementById("convert").className = "nav-link";});
document.getElementById("convert").addEventListener("click", function() {
    document.getElementById("thiswk").style.display = "none";
    document.getElementById("conv").style.display = "block";
    document.getElementById("current").className = "nav-link";
    document.getElementById("convert").className = "nav-link active";
    document.getElementById("weeknum").value = new Date().getWeek();
    document.getElementById("yearinpt").value = new Date().getFullYear();
    document.getElementById("date").value = new Date().toISOString().substr(0, 10);
    runConvert();
    document.getElementById("weeknum").addEventListener("change", runConvert);
    document.getElementById("tfsel").addEventListener("change", swapMode);
    document.getElementById("date").addEventListener("change", toConvert);
});

function swapMode() {
    switch (document.getElementById("tfsel").value) {
        case "from":
            document.getElementById("towk").style.display = "none";
            document.getElementById("fromwk").style.display = "block";
            break;
        case "to":
            document.getElementById("towk").style.display = "block";
            document.getElementById("fromwk").style.display = "none";
            toConvert();
            break;
    }
}

function weekStartDate(weeknum) {
    var date = new Date();
    date.setHours(0, 0, 0, 0);

    //Generate an object for week 1
    var week1 = new Date(date.getFullYear(), 0, 4);

    //Find first day of week 1
    var j4d = week1.getDay();
    if (j4d == 0) j4d = 7;
    week1 = new Date(week1.getTime() - (j4d - 1) * 24 * 60 * 60 * 1000);

    //Add weeks and return
    return new Date(week1.getTime() + 7 * 24 * 60 * 60 * 1000 * (weeknum  - 1));
}

function runConvert() {
    //Grab input and run conversion
    var selweek = document.getElementById("weeknum").value;
    if (selweek > 53) {
        selweek = 53;
        document.getElementById("weeknum").value = 53;
    }
    var weekx = weekStartDate(selweek);

    //Print results
    document.getElementById("startdate").textContent = weekx.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    document.getElementById("enddate").textContent = new Date(weekx.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function toConvert() {
    document.getElementById("convweek").textContent = (isNaN(new Date(document.getElementById("date").value).getWeek()) || new Date(document.getElementById("date").value).getWeek() < 0) ? invalidDate() : validDate();
}

function invalidDate() {
    document.getElementById("convweek").style.fontSize = "24pt";
    return "Invalid date";
}

function validDate() {
    document.getElementById("convweek").style.fontSize = "";
    return new Date(document.getElementById("date").value).getWeek();
}