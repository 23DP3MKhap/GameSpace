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

