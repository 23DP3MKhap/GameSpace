const hideBtn = document.getElementById("hideAside");
const aside = document.getElementById("Aside");

hideBtn.addEventListener("click", function() {
    hideBtn.style.display = "none";
    aside.style.display = "block";
});

aside.addEventListener("click", function() {
    aside.style.display = "none";
    hideBtn.style.display = "inline-block"; 
});


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
    contactFormErrors.innerHTML = errors.map(e => `<div>${e}</div>`).join("");
  }
});

const title = document.getElementById("title");
const author = document.getElementById("author");
const description = document.getElementById("description");
const btncheck = document.getElementById("check");
const searchInput = document.getElementById("searchInput");
const newslink = document.getElementById("newslink");
btncheck.addEventListener("click", function() {
  const query = searchInput.value.trim();

  fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&apiKey=88e2d64467614b4187c41489e6c2454e`)
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
      if (data.articles.length === 0) {
        title.innerText = "Nav atrasts neviens raksts ar šo atslēgvārdu.";
        author.innerText = "";
        description.innerText = "";
        return;
      }
      title.innerText = data.articles[0].title;
      author.innerText = data.articles[0].author;
      description.innerText = data.articles[0].description;
      newslink.innerHTML =`link: ${data.articles[0].url}`;
    })
});