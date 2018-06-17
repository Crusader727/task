let obj = {
    arr: []
}

for (let i = 1; i < 1000; i++) {
    let created = randomDate(new Date(2012, 0, 1), new Date())
    let modified = randomDate(created, new Date())
    let deadline = randomDate(modified, new Date())
    let str = "" + i
    let pad = "0000"
    let ans = pad.substring(0, pad.length - str.length) + str
    obj.arr.push({
        T: Math.floor(Math.random() * 4),
        Ticket: ans,
        Name: Math.random().toString(36).substring(Math.floor(Math.random() * 4 + 1)),
        P: Math.floor(Math.random() * 3),
        Status: Math.random() >= 0.5,
        Decision: Math.random() >= 0.5,
        Created: created,
        Modified: modified,
        Deadline: deadline,
    })
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

let json = JSON.stringify(obj);
let fs = require('fs');
fs.writeFile("./public/js/data.json", json, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});