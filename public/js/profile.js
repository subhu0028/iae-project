const profilePic = document.querySelector('.profile-pic');
const cameraIcon = document.querySelector('.camera-icon');
const fileInput = document.createElement('input');
const imgProfile = document.getElementById('profileImage123');
fileInput.type = 'file';
fileInput.accept = 'image/*';
fileInput.style.display = 'none';

cameraIcon.addEventListener('click', () => {
  console.log("Clicked")
  fileInput.click();
});

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    profilePic.src = reader.result;
    imgProfile.value = reader.result;
    console.log("The Image  : " + reader.result)
  };
});

const changeButton = document.getElementById('changesButton');

changeButton.addEventListener('submit', () => {
  const userName = document.getElementById('userName').value;
  const educationSelect = document.getElementById('education').value;
  const countryCode = document.getElementById('countryCode').value;
  const phoneNumber = document.getElementById('phone').value;
  const userEmail = document.getElementById('email').value;
  const userIncome = document.getElementById('income').value;
  const currencySelect = document.getElementById('currency').value;
})