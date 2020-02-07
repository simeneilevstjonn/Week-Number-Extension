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
    runConvert();
    document.getElementById("weeknum").addEventListener("change", runConvert);
});

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
    document.getElementById("startdate").textContent = "Monday " + weekx.toLocaleDateString();
    document.getElementById("enddate").textContent = "Sunday " + new Date(weekx.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString();
}