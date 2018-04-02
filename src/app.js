import { http } from './http';
import { ui } from './ui';

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);

// Listen for cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit);

// Listen for delete
document.querySelector('#posts').addEventListener('click',deletePost);

// Get posts
function getPosts() {
    http.get('https://fake-api-json.herokuapp.com/posts')
        .then(data => ui.showPosts(data))
        .catch(err => console.log(err));
}

// Submit post
function submitPost() {
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;
    const id = document.querySelector('#id').value;

    const data = {
        title,
        body
    }

    // validate input
    if(title === '' || body === ''){
        ui.showAlert('Please fill in all fields', 'alert alert-danger')
    } else {
        // Check for ID
        if(id === '') {
        // Create Post
            http.post('https://fake-api-json.herokuapp.com/posts', data)
                .then(data => {
                    ui.showAlert('Post added', 'alert alert-success');
                    ui.clearFields();
                    getPosts();
                })
                .catch(err => console.log(err))            
        } else {
            // Update Post
            http.put(`https://fake-api-json.herokuapp.com/posts/${id}`, data)
                .then(data => {
                    ui.showAlert('Post updated', 'alert alert-success');
                    ui.changeFormState('add');
                    getPosts();
                })
                .catch(err => console.log(err))              
        }
    }
}

// Enable Edit State
function enableEdit(e){
    if(e.target.parentElement.classList.contains('edit')){
        const id = e.target.parentElement.dataset.id;
        const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        const body = e.target.parentElement.previousElementSibling.textContent;
        
        const data = {
            id,
            title,
            body
        }
        // Fill form with current post
        ui.fillForm(data);
    }
    
    

    e.preventDefault();
};

// Delete posts
function deletePost(e){
    if(e.target.parentElement.classList.contains('delete')){
    const id = e.target.parentElement.dataset.id;
    console.log(id);
    http.delete(`https://fake-api-json.herokuapp.com/posts/${id}`)
    .then( message => {
    ui.showAlert(message,'alert alert-danger');
    getPosts();
    })
    .catch(err => console.log(err));
    }
}
   
// Cancel edit state
function cancelEdit(e) {
    if(e.target.classList.contains('post-cancel')){
        ui.changeFormState('add');
    }
    e.preventDefault();
}