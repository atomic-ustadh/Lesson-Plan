//Ask for the User's name and display a welcome message
function authenticate() {
    let userName = prompt("ماسمك يا أستاذ/أستاذة؟");
    if (userName) {
        document.getElementById("user").innerText = userName + "!";
        document.getElementById("user").style.color = "green";
    } else {
        document.getElementById("user").innerText = " غير مسمى! ";
        document.getElementById("user").style.color = "red";
    }
}



//Dynamic buttons data here
const buttonData = [
  { label: " القرآن ", url: "./pages/quran/quran.html" },
  { label: " السيرة ", url: "./pages/seerah/seerah.html" },
  { label: " التوحيد ", url: "./pages/tawheed/tawheed.html" },
  { label: " الفقه ", url: "./pages/fiqh/fiqh.html" },
  { label: " الحديث ", url: "./pages/hadith/hadith.html" },
  { label: " العربية", url: "./pages/arabic/arabic.html" },
  { label: " التجويد ", url: "./pages/tajweed/tajweed.html" },
  { label: " الأذكار ", url: "./pages/adhkar/adhkar.html" },
  { label: " الحروف ", url: "./pages/huroof/huroof.html" }
];

//Get Container
const container = document.getElementById('button-container');

buttonData.forEach(item => {
  const btn = document.createElement('button');
  btn.textContent = item.label;
  btn.onclick = () => window.open(item.url, '_self');
  btn.classList.add("btn-style");
  container.appendChild(btn);
});