const button = document.getElementsByClassName('faq-page');
const div = document.getElementsByClassName('faq-body');

for (let i = 0; i < button.length; i++) {
  button[i].addEventListener("click", () => {
    button[i].classList.toggle("active");
    div[i].style.display =
      div[i].style.display === "none" ? "block" : "none";
  })
}