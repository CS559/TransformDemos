import { createExample, makeSelect } from "./transformToy.js";

/**
 * Set up the demo
 */

let headingDiv = document.createElement("div");
headingDiv.id = "headingDiv";
document.getElementsByTagName("body")[0].appendChild(headingDiv);

let headerTitle = document.createElement("h1");
headerTitle.innerHTML = "2D Transformation Toy"
headingDiv.appendChild(headerTitle);

let br = document.createElement("br");
document.getElementsByTagName("body")[0].appendChild(br);

let examples = [
    {
        title: "Scale about a 45 degrees Axis",
        transformations:
            [
                ["rotate", 45],
                ["scale", 2, 1],
                ["rotate", -45],
                ["fillRect", -10, -10, 20, 20, "#F0000080"]
            ]
    }, {
        title: "Scale about a 45 degrees Axis (w/original square)",
        transformations:
            [
                ["fillRect", -10, -10, 20, 20, "#800000"],
                ["rotate", 45],
                ["scale", 2, 1],
                ["rotate", -45],
                ["fillRect", -10, -10, 20, 20, "#F0000080"]
            ]
    }, {
        title: "Triangle Test",
        transformations:
            [
                ["triangle", 0, 0, "red"],
                ["translate", 20, 0],
                ["triangle", 0, 0, "blue"],
                ["triangle", 10, 10, "blue"]
            ]
    }, {
        title: "NU Scale and then rotate",
        transformations:
            [
                ["scale", 2, 1],
                ["rotate", 45],
                ["fillRect", -10, -10, 20, 20]
            ]
    }, {
        title: "Rotate then scale NU",
        transformations:
            [
                ["rotate", 45],
                ["scale", 2, 1],
                ["fillRect", -10, -10, 20, 20]
            ]
    }, {
        title: "Bend an arm 45 degrees at Elbow and Wrist",
        transformations:
            [
                ["fillRect", 0, 0, 20, 10, "purple"],
                ["translate", 20, 0],
                ["rotate", 45],
                ["fillRect", 0, 0, 20, 10, "blue"],
                ["translate", 20, 0],
                ["rotate", 45],
                ["fillRect", 0, 0, 10, 10, "green"]
            ]
    }, {
        title: "Rotate about object center",
        transformations:
            [
                ["translate", 30, 30],
                ["rotate", 45],
                ["translate", -30, -30],
                ["fillRect", 20, 20, 40, 40]
            ]
    }, {
        title: "Save and restore",
        transformations:
            [
                ["save"],
                ["translate", 30, 30],
                ["rotate", 45],
                ["fillRect", 0, 0, 30, 30, "red"],
                ["restore"],
                ["translate", -30, -30],
                ["rotate", -45],
                ["fillRect", 0, 0, 30, 30]
            ]
    }, {
        title: "More save and restore",
        transformations:
            [
                ["translate", 20, 20],
                ["fillRect", 0, 0, 20, 20, "yellow"],
                ["save"],
                ["translate", -20, -20],
                ["rotate", 45],
                ["fillRect", 0, 0, 20, 20, "red"],
                ["save"],
                ["rotate", -45],
                ["translate", -40, 20],
                ["fillRect", 0, 0, 20, 20],
                ["restore"],
                ["scale", 1.5, 1.5],
                ["fillRect", -20, -20, 10, 10, "purple"],
                ["restore"],
                ["fillRect", -30, -40, 20, 20, "green"]
            ]
    }, {
        title: "Test bad saves and restores",
        transformations:
            [
                ["restore"],
                ["restore"],
                ["restore"],
                ["save"],
                ["save"],
                ["save"],
                ["fillRect", 0, 0, 20, 20, "green"]
            ]
    }, {
        title: "Your turn to play with it",
    }
];

let titles = ["Please select one example"];
let exampleDivs = [];
examples.forEach(e => {
    exampleDivs.push(createExample(e.title, e.transformations));
    titles.push(e.title);
});

// make a dropdown menu to select examples
let selectExample = makeSelect(titles, headingDiv);
selectExample.id = "exampleSelect";

// switch between different examples
let currentExample;
selectExample.onchange = function () {
    document.getElementById("headingDiv").style.paddingTop = 0;
    if (currentExample) currentExample.style.display = "none";
    let selectedTitle = selectExample.options[selectExample.selectedIndex].text;
    exampleDivs.forEach(ed => {
        if (ed.id == selectedTitle + "-example") {
            currentExample = ed;
        }
    });
    if (currentExample){ 
        currentExample.style.display = "flex";
    }
};
