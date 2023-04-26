const users = document.getElementById("users");
let usersArray = [];

getRandomPerson();
getRandomPerson();
getRandomPerson();

async function getRandomPerson() {
  const response = await fetch("https://randomuser.me/api/?inc=name")
  const data = await response.json();

  const firstname = data.results[0].name.first;
  const lastname = data.results[0].name.last;
  const wealth = Math.floor(Math.random() * 1999999);

  usersArray.push([firstname, lastname, wealth])
  addUser(firstname, lastname, wealth);
}

function addUser(firstname, lastname, wealth) {
  ttw.style.visibility = "hidden";
  const person = `
  <div class="row">
    <div class="person">${firstname} ${lastname}</div>
    <div class="wealth">${currencyFormatter(wealth)}</div>
  </div>`
  users.innerHTML += person;
}

function displayUsers() {
  users.innerHTML = "";
  usersArray.forEach(e => addUser(e[0], e[1], e[2]));
}

function doubleMoney() {
  usersArray.map(e => e[2] *= 2);
  displayUsers()
}

function showOnlyMillionaires() {
  usersArray = usersArray.filter(e => e[2] > 1000000)
  displayUsers()
}

function sortByRichest() {
  usersArray.sort((a, b) => b[2] - a[2])
  displayUsers();
}

function calculateEntireWealth() {
  const totalWealth = document.getElementById("totalWealth");
  const ttw = document.getElementById("ttw");
  totalWealth.innerHTML = currencyFormatter(usersArray.reduce((accumulator, e) => (accumulator + e[2]), 0));
  ttw.style.visibility = "visible"
}

function currencyFormatter(num) {
  let formatting_options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }
  return num.toLocaleString("en-US", formatting_options);
}

document.getElementById("addUser").addEventListener("click", getRandomPerson);
document.getElementById("doubleMoney").addEventListener("click", doubleMoney);
document.getElementById("showOnlyMillionaires").addEventListener("click", showOnlyMillionaires);
document.getElementById("sortByRichest").addEventListener("click", sortByRichest);
document.getElementById("calculateEntireWealth").addEventListener("click", calculateEntireWealth);
