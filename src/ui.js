class UI {
    constructor(){
        this.post = document.querySelector('#posts');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
        this.forState = 'add';
    }
    // show all posts
    showPosts(posts){
       let output = '';
       posts.forEach((post) => {
        output += `
            <div class="card mb-3">
                <div class="card-body">
                    <h4 class="card-title">${post.title}</h4>
                    <p class="card-text">${post.body}</p>
                    <a href="#" class="edit card-link" data-id="${post.id}"><i class="fa fa-pencil"></i></a>
                    <a href="#" class="delete card-link" data-id="${post.id}"><i class="fa fa-remove"></i></a>
                </div>
            </div>    
        `;
        this.post.innerHTML = output;
       });
    }
    // show alert
    showAlert(message, className) {
        this.clearAlert();
        // Create div
        const div = document.createElement('div');
        // Add class
        div.className = className;
        // Add text
        div.appendChild(document.createTextNode(message));
        // Insert into dom, get parent
        const container = document.querySelector('.postsContainer');
        // Get posts
        const posts = document.querySelector('#posts');
        // Insert alert div
        container.insertBefore(div, posts);
        // Timeout
        setTimeout(()=>{
            this.clearAlert();
        }, 3000);
    }
    // clear alert msg
    clearAlert() {
        const currentAlert = document.querySelector('.alert');
        if(currentAlert) {
            currentAlert.remove();
        }
    }
    // clear all fields
    clearFields() {
        this.titleInput.value = '';
        this.bodyInput.value = '';
    }

    // Fill form to edit
    fillForm(data) {
        this.titleInput.value = data.title;
        this.bodyInput.value = data.body;
        this.idInput.value = data.id; 
    }
}

export const ui = new UI();