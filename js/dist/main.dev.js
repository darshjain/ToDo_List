"use strict";

function getAndUpdate() {
  console.log("Updating List...");
  tit = document.getElementById("title").value;
  desc = document.getElementById("description").value;

  if (localStorage.getItem("itemsJson") == null) {
    itemJsonArray = [];
    itemJsonArray.push([tit, desc]);
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  } else {
    itemJsonArrayStr = localStorage.getItem("itemsJson");
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    itemJsonArray.push([tit, desc]);
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  }

  update();
}

function update() {
  if (localStorage.getItem("itemsJson") == null) {
    itemJsonArray = [];
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  } else {
    itemJsonArrayStr = localStorage.getItem("itemsJson");
    itemJsonArray = JSON.parse(itemJsonArrayStr);
  } // Populate the table


  var tableBody = document.getElementById("tableBody");
  var str = "";
  itemJsonArray.forEach(function (element, index) {
    str += "\n                <tr>\n                <th scope=\"row\">".concat(index + 1, "</th>\n                <td>").concat(element[0], "</td>\n                <td>").concat(element[1], "</td> \n                <td><button class=\"btn btn-sm btn-danger\" onclick=\"deleted(").concat(index, ")\">Delete</button></td> \n                </tr>");
  });
  tableBody.innerHTML = str;
}

add = document.getElementById("add");
add.addEventListener("click", getAndUpdate);
update();

function deleted(itemIndex) {
  console.log("Delete", itemIndex);
  itemJsonArrayStr = localStorage.getItem("itemsJson");
  itemJsonArray = JSON.parse(itemJsonArrayStr); // Delete itemIndex element from the array

  itemJsonArray.splice(itemIndex, 1);
  localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  update();
}

function clearStorage() {
  if (confirm("Do you areally want to clear?")) {
    console.log("Clearing the storage");
    localStorage.clear();
    update();
  }
}