const form = document.getElementById('contact-form');
const formData = [];

function showSuccessMessage() {
  const successMessage = document.getElementById('success-message');
  successMessage.innerHTML = 'Thank you for contacting us! We will get back to you soon.';
  successMessage.style.color = 'green';
  successMessage.style.fontWeight = 'bold';
  successMessage.style.marginTop = '20px';
  successMessage.style.marginBottom = '20px';
}


form.addEventListener("submit", () => {

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  console.log(name, email, subject, message);
  showSuccessMessage();
});

