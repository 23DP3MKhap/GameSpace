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