function prinHistory() {
  const newsHistory = document.getElementById("history");
  let newsSearchHistory = JSON.parse(localStorage.getItem("newsSearchHistory")) || [];
  newsHistory.innerHTML = `Meklēšanas vēsture: ${newsSearchHistory.join(", ")}`;
}
prinHistory();

const modal1 = document.getElementById("modal1");
const modal2 = document.getElementById("modal2");
const modal3 = document.getElementById("modal3");

document.getElementById("btn1").onclick = () => modal1.style.display = "flex";
document.getElementById("btn2").onclick = () => modal2.style.display = "flex";
document.getElementById("btn3").onclick = () => modal3.style.display = "flex";


document.querySelectorAll(".close").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.closest(".modal").style.display = "none";
  });
});

const btn = document.getElementById('theme-btn');
const link = document.getElementById('theme-link');

btn.onclick = function() {
  if (link.getAttribute('href') === 'light.css') {
    link.setAttribute('href', 'dark.css');}
  else {link.setAttribute('href', 'light.css');}
};


const contactForm = document.getElementById("contact-form");
const vardsInput = document.getElementById("vards-input");
const emailInput = document.getElementById("email-input");
const zinojumsInput = document.getElementById("zinojums-input");
const atsusitButton = document.getElementById("atsusit-button");
const contactFormErrors = document.getElementById("contactForms-errors");

contactForm.addEventListener("submit", (submit) => {
  contactFormErrors.innerHTML = "";
  const errors = [];

  if (vardsInput.value.length < 2) {
  errors.push("Vārdam jābūt vismaz 2 simboli");
  } 
  
  else if (!/^[a-zA-Z]+$/.test(vardsInput.value)) {
  errors.push("Vārda laukā drīkst būt tikai burti");
  }
  
  else if (vardsInput.value.length > 50) {
  errors.push("Vārds nedrīkst būt garāks par 50 simboliem.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
    errors.push("Lūdzu, ievadiet derīgu e-pasta adresi");
  }

  if (zinojumsInput.value.length < 1) {
    errors.push("Ziņojuma lauks nedrīkst būt tukšs.");
}

  if (errors.length > 0) {
    submit.preventDefault();
    contactFormErrors.innerHTML = errors.map(e => `<div style="color:red;">${e}</div>`).join("");
  }

  else {
    submit.preventDefault();
    contactFormErrors.innerHTML = `<p style="color:green">Forma ir veiksmīgi iesniegta</p>`;
    contactForm.reset();
  }
});


const searchBar = document.getElementById('search-bar');
const cards = document.querySelectorAll(".card-block");

searchBar.addEventListener("input", ()  => {
  const input = searchBar.value.toLowerCase().trim();
  
  cards.forEach((card) => {
    const tag = card.getAttribute("data-tag");
    if (tag.includes(input) || input === "" ) {
      card.style.display = "flex";
    }
    else {
      card.style.display = "none";
    }
  });
  });
 
const title = document.getElementById("title");
const author = document.getElementById("author");
const description = document.getElementById("description");
const btncheck = document.getElementById("check");
const searchInput = document.getElementById("searchInput");
const newsHistory = document.getElementById("history");
const newslink = document.getElementById("newslink");
let newsSearchHistory = JSON.parse(localStorage.getItem("newsSearchHistory")) || [];
btncheck.addEventListener("click", function() {
  const query = searchInput.value.trim();

    if (!newsSearchHistory.includes(query) && query) {
      if (newsSearchHistory.length >= 5) {newsSearchHistory.shift()}
      newsSearchHistory.push(query);
    } 

  localStorage.setItem("newsSearchHistory", JSON.stringify(newsSearchHistory));

  fetch(`https://newsdata.io/api/1/news?apikey=pub_6ea6cf23445843c289a6f1c3c068e84f&q=${encodeURIComponent(query)}&language=en`)
    .then(response => {
      if (!response.ok) {
        title.innerText = "Nav atrasts neviens raksts ar šo atslēgvārdu.";
        author.innerText = "";
        description.innerText = "";
        throw "api error";
      }
      return response.json();
    })
    .then(data => {
      if (data.results.length === 0) {
        title.innerText = "Nav atrasts neviens raksts ar šo atslēgvārdu.";
        author.innerText = "";
        description.innerText = "";
        return;
      }
      newsHistory.innerHTML = `Meklēšanas vēsture: ${newsSearchHistory.join(", ")}`;
      title.innerText = data.results[0].title;
      author.innerText = data.results[0].creator;
      description.innerText = data.results[0].description;
      newslink.innerHTML =`link: ${data.results[0].link}`;
    })
});