document.addEventListener("DOMContentLoaded", () => {
  setupPostInteractions();
  setupCommentFunctionality();
  setupCreatePost();
  setupFollowButtons();
});

function setupPostInteractions() {
  const likeButtons = document.querySelectorAll(".like-btn");
  likeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      this.classList.toggle("active");

      const icon = this.querySelector("i");
      icon.classList.add("like-animation");

      if (this.classList.contains("active")) {
        icon.style.color = "#e74c3c";
        this.style.color = "#e74c3c";
      } else {
        icon.style.color = "";
        this.style.color = "";
      }

      const postCard = this.closest(".post-card");
      const likeCount = postCard.querySelector(".likes span");
      let count = parseInt(likeCount.textContent);

      if (this.classList.contains("active")) {
        likeCount.textContent = count + 1;
      } else {
        likeCount.textContent = count - 1;
      }

      setTimeout(() => {
        icon.classList.remove("like-animation");
      }, 500);
    });
  });

  const commentButtons = document.querySelectorAll(".comment-btn");
  commentButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const postCard = this.closest(".post-card");
      const commentsSection = postCard.querySelector(".comments-section");
      commentsSection.classList.toggle("active");

      if (commentsSection.classList.contains("active")) {
        const commentInput = commentsSection.querySelector(".comment-input");
        if (commentInput) {
          commentInput.focus();
        }
      }
    });
  });

  const shareButtons = document.querySelectorAll(".share-btn");
  shareButtons.forEach((button) => {
    button.addEventListener("click", function () {
      alert("Share functionality would open sharing options");

      const postCard = this.closest(".post-card");
      const shareCount = postCard.querySelector(".shares span");
      let count = parseInt(shareCount.textContent);
      shareCount.textContent = count + 1;
    });
  });

  const menuButtons = document.querySelectorAll(".post-menu-btn");
  menuButtons.forEach((button) => {
    button.addEventListener("click", function () {
      alert("Post options: Save, Report, Hide, etc.");
    });
  });
}

function setupCommentFunctionality() {
  const commentInputs = document.querySelectorAll(".comment-input");
  commentInputs.forEach((input) => {
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter" && this.value.trim() !== "") {
        const commentsSection = this.closest(".comments-section");
        const commentsList = commentsSection.querySelector(".comments-list");

        const newComment = createCommentElement(this.value);
        commentsList.prepend(newComment);

        const postCard = this.closest(".post-card");
        const commentCount = postCard.querySelector(".comments span");
        let count = parseInt(commentCount.textContent);
        commentCount.textContent = count + 1;

        this.value = "";
      }
    });
  });

  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("comment-action-btn")) {
      if (e.target.textContent === "Like") {
        e.target.textContent = "Liked";
        e.target.style.color = "#923cdf";

        setTimeout(() => {
          e.target.textContent = "Like";
          e.target.style.color = "";
        }, 2000);
      } else if (e.target.textContent === "Reply") {
        const comment = e.target.closest(".comment");
        const author = comment.querySelector("h5").textContent;

        const commentSection = comment.closest(".comments-section");
        const input = commentSection.querySelector(".comment-input");
        input.value = `@${author} `;
        input.focus();
      }
    }
  });
}

function createCommentElement(text) {
  const comment = document.createElement("div");
  comment.classList.add("comment");
  comment.innerHTML = `
        <img src="images/profiles/profile-sarah.jpg" alt="User" class="comment-user-img">
        <div class="comment-content">
            <div class="comment-header">
                <h5>You</h5>
                <span>Just now</span>
            </div>
            <p>${text}</p>
            <div class="comment-actions">
                <button class="comment-action-btn">Like</button>
                <button class="comment-action-btn">Reply</button>
            </div>
        </div>
    `;

  comment.style.opacity = "0";
  comment.style.transform = "translateY(10px)";

  setTimeout(() => {
    comment.style.transition = "all 0.3s ease";
    comment.style.opacity = "1";
    comment.style.transform = "translateY(0)";
  }, 10);

  return comment;
}

function setupCreatePost() {
  const createPostBtn = document.getElementById("createPostBtn");
  const postInput = document.getElementById("postInput");

  if (createPostBtn && postInput) {
    createPostBtn.addEventListener("click", function () {
      if (postInput.value.trim() !== "") {
        const newPost = createPostElement(postInput.value);

        const postsContainer = document.querySelector(".posts-container");
        postsContainer.prepend(newPost);

        postInput.value = "";

        setupPostInteractions();
      } else {
        postInput.classList.add("pulse-effect");
        setTimeout(() => {
          postInput.classList.remove("pulse-effect");
        }, 1500);
      }
    });

    postInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter" && this.value.trim() !== "") {
        createPostBtn.click();
      }
    });
  }
}

function createPostElement(text) {
  const post = document.createElement("div");
  post.classList.add("post-card");
  post.innerHTML = `
        <div class="post-header">
            <img src="images/profiles/profile-sarah.jpg" alt="User" class="post-user-img">
            <div class="post-info">
                <h4 class="post-author">You</h4>
                <span class="post-time">Just now</span>
            </div>
            <div class="post-menu">
                <button class="post-menu-btn"><i class="uil uil-ellipsis-h"></i></button>
            </div>
        </div>
        <div class="post-content">
            <p>${text}</p>
        </div>
        <div class="post-stats">
            <div class="stat-item likes">
                <i class="uil uil-heart"></i>
                <span>0</span>
            </div>
            <div class="stat-item comments">
                <i class="uil uil-comment"></i>
                <span>0</span>
            </div>
            <div class="stat-item shares">
                <i class="uil uil-share"></i>
                <span>0</span>
            </div>
        </div>
        <div class="post-actions-bottom">
            <button class="post-reaction-btn like-btn">
                <i class="uil uil-heart"></i>
                <span>Like</span>
            </button>
            <button class="post-reaction-btn comment-btn">
                <i class="uil uil-comment"></i>
                <span>Comment</span>
            </button>
            <button class="post-reaction-btn share-btn">
                <i class="uil uil-share"></i>
                <span>Share</span>
            </button>
        </div>
        <div class="comments-section">
            <div class="comment-input-container">
                <img src="images/profiles/profile-sarah.jpg" alt="Profile" class="comment-profile-img">
                <div class="comment-input-wrapper">
                    <input type="text" placeholder="Write a comment..." class="comment-input">
                </div>
            </div>
            <div class="comments-list">
            </div>
        </div>
    `;

  return post;
}

function setupFollowButtons() {
  const followButtons = document.querySelectorAll(".follow-btn");

  followButtons.forEach((button) => {
    button.addEventListener("click", function () {
      this.classList.toggle("following");

      if (this.classList.contains("following")) {
        this.textContent = "Following";
      } else {
        this.textContent = "Follow";
      }
    });
  });
}

function setupRandomInteractions() {
  setInterval(() => {
    const posts = document.querySelectorAll(".post-card");
    if (posts.length > 0) {
      const randomPost = posts[Math.floor(Math.random() * posts.length)];
      const likeCount = randomPost.querySelector(".likes span");
      let count = parseInt(likeCount.textContent);
      likeCount.textContent = count + 1;

      randomPost.style.transition = "background-color 0.5s ease";
      randomPost.style.backgroundColor = "rgba(146, 60, 223, 0.1)";
      setTimeout(() => {
        randomPost.style.backgroundColor = "";
      }, 500);
    }
  }, 30000);
}

setTimeout(setupRandomInteractions, 10000);
