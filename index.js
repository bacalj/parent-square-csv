const HtmlTableToJson = require('html-table-to-json');
const ObjectsToCsv = require('objects-to-csv');

/* TODO: do this with a scrape or at least bring in a string with fs */
const myhtml = `{{ view source from roster/assign_classes and copy/paste the entire <table> here }}`;

const jsonTables = HtmlTableToJson.parse(myhtml);
 
const mydata = jsonTables.results[0];

//console.log(mydata);
let niceData = [];

mydata.forEach(student => {
    let myobj = {};
    myobj.alpha_name = student['Student Name'].replace('"', '');
    myobj.class = student.Classes;
    niceData.push(myobj);
});

niceData.forEach(student => {
    student.grade = student.class.charAt(0);
    student.first_name = student.alpha_name.replace(',', '').split(' ')[1];
    student.last_name = student.alpha_name.replace(',', '').split(' ')[0];
    student.student_name = student.first_name + ' ' + student.last_name;
    let idable = student.first_name.charAt(0) + student.last_name;
    student.generatedID = idable.toLowerCase();
});

//console.log(niceData);

const csv = new ObjectsToCsv(niceData);

csv.toDisk('studentim.csv');