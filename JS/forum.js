 
 // Function to display the user's name in the nav bar and toggle signup/logout
function displayUserName() {
    var storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.firstName) {
        document.getElementById("user-name-display").textContent = `Welcome, ${storedData.firstName}`;
        var signupLink = document.getElementById("signup-link");
        if (signupLink) signupLink.style.display = "none";  // Hide Signup link if logged in
        document.getElementById("logoutButton").style.display = "inline-block";  // Show Logout button if logged in
    } else {
        document.getElementById("user-name-display").textContent = '';
        var signupLink = document.getElementById("signup-link");
        if (signupLink) signupLink.style.display = "inline-block";  // Show Signup link if not logged in
        document.getElementById("logoutButton").style.display = "none";  // Hide Logout button if not logged in
    }
}

// Logout function
function logout() {
    localStorage.removeItem("userData");  // Remove the user's data from localStorage
    displayUserName();
    window.location.href = "Home.html";  // Redirect to home page or login page
}

// Call the function when the page is loaded
window.onload = function() {
    displayUserName();
};
 
 
 
 
 
 // Live search functionality
            const searchInput = document.querySelector('.search input[name="search"]');

            if (searchInput) {
                searchInput.addEventListener('input', function() {
                    const query = this.value.toLowerCase();
                    const posts = document.querySelectorAll('.center-bar .post');
                    posts.forEach(post => {
                        const title = post.querySelector('h4').textContent.toLowerCase();
                        const description = post.querySelector('p').textContent.toLowerCase();
                        if (title.includes(query) || description.includes(query)) {
                            post.style.display = 'block';
                        } else {
                            post.style.display = 'none';
                        }
                    });
                });
            }
            // Toggle visibility of comment section and load comments if visible
function toggleComments(postId) {
  const commentsSection = document.querySelector(`#commentInput${postId}`).parentElement;
  const isVisible = commentsSection.style.display === 'block';
  commentsSection.style.display = isVisible ? 'none' : 'block';
  if (!isVisible) loadComments(postId);
}

// Helper function to handle adding and displaying comments (no delete functionality)
function handleCommentAction(postId, action) {
  const savedComments = JSON.parse(localStorage.getItem(postId)) || [];
  if (action === 'add') {
      const commentText = document.querySelector(`#commentInput${postId}`).value.trim();
      if (commentText) {
          savedComments.push({ text: commentText });
          localStorage.setItem(postId, JSON.stringify(savedComments));
          document.querySelector(`#commentInput${postId}`).value = '';
      }
  }
  loadComments(postId);
  updateMostCommentedPost();
}

// Function to load and display comments (delete button removed)
function loadComments(postId) {
  const commentsSection = document.querySelector(`#commentInput${postId}`).parentElement;
  commentsSection.querySelectorAll('.comment').forEach(comment => comment.remove());
  const savedComments = JSON.parse(localStorage.getItem(postId)) || [];
  savedComments.forEach((comment) => {
      const commentElement = document.createElement('div');
      commentElement.classList.add('comment');
      const commentText = document.createElement('p');
      commentText.textContent = comment.text;
      commentElement.appendChild(commentText);
      commentsSection.appendChild(commentElement);
  });
}

// Consolidate button event listeners to avoid redundancy
document.querySelectorAll('.comment-button').forEach(button => {
  button.addEventListener('click', function() {
      const postId = this.closest('.post').querySelector('textarea').id.replace('commentInput', '');
      toggleComments(postId);
  });
});

document.querySelectorAll('.add-comment').forEach(button => {
  button.addEventListener('click', function() {
      const postId = this.getAttribute('data-post-id');
      handleCommentAction(postId, 'add');
  });
});

// Consolidated like button logic
document.querySelectorAll('.like-button').forEach(button => {
  button.addEventListener('click', function() {
      const likeCountElement = this.querySelector('.like-count');
      let likeCount = parseInt(likeCountElement.textContent);
      likeCount = this.classList.contains('liked') ? likeCount - 1 : likeCount + 1;
      likeCountElement.textContent = likeCount;
      this.classList.toggle('liked');
      updateMostLikedPost();
  });
});

// Show the most liked post in the right bar
function updateMostLikedPost() {
  let posts = document.querySelectorAll('.post');
  let mostLikedPost = null;
  let maxLikes = -Infinity;
  posts.forEach(post => {
      const likeCount = parseInt(post.querySelector('.like-count').textContent);
      if (likeCount > maxLikes) {
          maxLikes = likeCount;
          mostLikedPost = post;
      }
  });
  const mostLikedPostContent = document.getElementById('mostLikedPostContent');
  if (mostLikedPost && mostLikedPostContent) {
      const postTitle = mostLikedPost.querySelector('h4').textContent;
      const postDescription = mostLikedPost.querySelector('p').textContent;
      const postImage = mostLikedPost.querySelector('img').src;
      mostLikedPostContent.innerHTML = `
          <h4 style="font-size: 16px; font-weight: bold; margin: 8px 0 4px 0; color:black">${postTitle}</h4>
          <p style="font-size: 13px; margin-bottom: 8px; color: #555;">${postDescription}</p>
          <img src="${postImage}" alt="Most Liked Post" style="width: 100%; height: auto; border-radius: 5px;">
      `;
  }
}

// Show the most commented post in the right bar
function updateMostCommentedPost() {
  let posts = document.querySelectorAll('.post');
  let mostCommentedPost = null;
  let maxComments = -Infinity;
  posts.forEach(post => {
      const addCommentBtn = post.querySelector('.add-comment');
      if (!addCommentBtn) return;
      const postId = addCommentBtn.getAttribute('data-post-id');
      const savedComments = JSON.parse(localStorage.getItem(postId)) || [];
      const commentCount = savedComments.length;
      if (commentCount > maxComments) {
          maxComments = commentCount;
          mostCommentedPost = post;
      }
  });
  const mostCommentedPostContent = document.getElementById('mostCommentedPostContent');
  if (mostCommentedPost && mostCommentedPostContent) {
      const postTitle = mostCommentedPost.querySelector('h4').textContent;
      const postDescription = mostCommentedPost.querySelector('p').textContent;
      const postImage = mostCommentedPost.querySelector('img').src;
      mostCommentedPostContent.innerHTML = `
          <h4 style="font-size: 16px; font-weight: bold; margin: 8px 0 4px 0; color:black">${postTitle}</h4>
          <p style="font-size: 13px; margin-bottom: 8px; color: #555;">${postDescription}</p>
          <img src="${postImage}" alt="Most Commented Post" style="width: 100%; height: auto; border-radius: 5px;">
      `;
  }
}

// Initial call on page load
updateMostLikedPost();
updateMostCommentedPost();

// Modal logic
const createPostModal = document.getElementById('createPostModal');
const closeModalButton = document.querySelector('.close-btn');
const postTitleInput = document.getElementById('postTitle');
const postDescriptionInput = document.getElementById('postDescription');
const postImageInput = document.getElementById('postImage');
const centerBar = document.querySelector('.center-bar');

document.querySelector('.create-button').addEventListener('click', () => {
  createPostModal.style.display = 'block';
});

closeModalButton.addEventListener('click', () => {
  createPostModal.style.display = 'none';
  postTitleInput.value = '';
  postDescriptionInput.value = '';
  postImageInput.value = '';
});

function createPost() {
  const title = postTitleInput.value.trim();
  const description = postDescriptionInput.value.trim();
  const imageFile = postImageInput.files[0];

  // Prevent creating post if title or description is empty
  if (!title || !description) return;

  const newPost = document.createElement('div');
  newPost.classList.add('post');
  newPost.style.position = 'relative';

  const postContent = document.createElement('div');
  postContent.classList.add('post-content');
  postContent.style.position = 'relative';

  // (Removed post delete button as per request)

  const postTitle = document.createElement('h4');
  postTitle.textContent = title;
  const postDescription = document.createElement('p');
  postDescription.textContent = description;
  const postImage = document.createElement('img');
  if (imageFile) {
      const reader = new FileReader();
      reader.onload = function (e) {
          postImage.src = e.target.result;
      };
      reader.readAsDataURL(imageFile);
  } else {
      postImage.style.display = 'none';
  }

  // Like and comment functionality
  const likeButton = document.createElement('button');
  likeButton.classList.add('like-button');
  likeButton.innerHTML = 'Like <span class="like-count">0</span>';
  const commentButton = document.createElement('button');
  commentButton.classList.add('comment-button');
  commentButton.textContent = 'Comment';
  const commentsSection = document.createElement('div');
  commentsSection.classList.add('comments-section');
  commentsSection.style.display = 'none';
  const postId = 'custom' + Date.now() + Math.floor(Math.random() * 10000);
  const commentInput = document.createElement('textarea');
  commentInput.id = `commentInput${postId}`;
  commentInput.placeholder = 'Add a comment...';
  const addCommentBtn = document.createElement('button');
  addCommentBtn.classList.add('add-comment');
  addCommentBtn.setAttribute('data-post-id', postId);
  addCommentBtn.textContent = 'Add Comment';
  commentsSection.appendChild(commentInput);
  commentsSection.appendChild(addCommentBtn);

  // Append content
  postContent.appendChild(postTitle);
  postContent.appendChild(postDescription);
  postContent.appendChild(postImage);
  postContent.appendChild(likeButton);
  postContent.appendChild(commentButton);
  postContent.appendChild(commentsSection);
  newPost.appendChild(postContent);

  centerBar.prepend(newPost);

  // Like button
  likeButton.addEventListener('click', function () {
      const likeCountElement = likeButton.querySelector('.like-count');
      let likeCount = parseInt(likeCountElement.textContent);
      likeCount = likeButton.classList.contains('liked') ? likeCount - 1 : likeCount + 1;
      likeCountElement.textContent = likeCount;
      likeButton.classList.toggle('liked');
      updateMostLikedPost();
  });

  // Comment button
  commentButton.addEventListener('click', function () {
      toggleComments(postId);
  });

  // Add comment
  addCommentBtn.addEventListener('click', function () {
      handleCommentAction(postId, 'add');
  });


  // Reset modal and update right bar
  createPostModal.style.display = 'none';
  postTitleInput.value = '';
  postDescriptionInput.value = '';
  postImageInput.value = '';
  updateMostLikedPost();
  updateMostCommentedPost();
}

// Only add a single event listener for the modal post button
document.querySelector('#createPostModal .modal-content button').onclick = createPost;
