function calculateAge(birthDate) {
    var today = new Date();
    var age = today.getFullYear() - birthDate.getFullYear();
    var monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// Birthdates for all members (used by the index table)
var memberBirthdays = {
    "Bang Chan": "October 3, 1997",
    "Lee Know": "October 25, 1998",
    "Changbin": "August 11, 1999",
    "Hyunjin": "March 20, 2000",
    "Han": "September 14, 2000",
    "Felix": "September 15, 2000",
    "Seungmin": "September 22, 2000",
    "I.N": "February 8, 2001"
};

document.addEventListener("DOMContentLoaded", function () {
    // Member profile pages: find Birthday li, calculate age, update Age li
    var listItems = document.querySelectorAll("ul li");
    var birthdayText = null;
    var ageLi = null;

    listItems.forEach(function (li) {
        var text = li.textContent;
        if (text.indexOf("Birthday:") !== -1) {
            birthdayText = text.replace("Birthday:", "").trim();
        }
        if (text.indexOf("Age:") !== -1) {
            ageLi = li;
        }
    });

    if (birthdayText && ageLi) {
        var birthDate = new Date(birthdayText);
        if (!isNaN(birthDate.getTime())) {
            ageLi.innerHTML = "<b>Age:</b> " + calculateAge(birthDate);
        }
    }

    // Index page: update age column in the table
    var rows = document.querySelectorAll("tbody tr");
    rows.forEach(function (row) {
        var cells = row.querySelectorAll("td");
        if (cells.length >= 2) {
            var name = cells[0].textContent.trim();
            if (memberBirthdays[name]) {
                var birthDate = new Date(memberBirthdays[name]);
                if (!isNaN(birthDate.getTime())) {
                    cells[1].textContent = calculateAge(birthDate);
                }
            }
        }
    });
});
