const mentorForm = document.getElementById('comment_upload')

mentorForm.addEventListener('submit', ()=> {
    const title = document.getElementById('mentorBlogId').value;
    const content = document.getElementById('mentorContent').value;

    if(!title || !content){
        alert("Field Can't be Empty")
    }
})