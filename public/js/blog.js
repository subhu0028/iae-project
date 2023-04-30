const submitButton = document.getElementById('contact-submit');
const submitForm = document.getElementById('comment_upload')

submitForm.addEventListener("submit", () => {
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  console.log(title, " Content : ",content);

  if(!title || !content){
    alert("Field can't be empty")
    console.log("Field can't be empty");
  }
  else{
    console.log("Values Sent")
  }
})