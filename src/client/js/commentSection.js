const { async } = require("regenerator-runtime");

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const textarea = form.querySelector("textarea");
const deleteBtn = document.querySelectorAll(".deleteBtn");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const span2 = document.createElement("span");
  span2.innerText = "❌";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
};

const deleteComment = (event) => {
  const commentContainer = document.querySelector(".video__comments ul");
  const commentList = event.target.parentNode;
  commentContainer.removeChild(commentList);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
    }),
  });

  if (response.status === 201) {
    const { newCommentId } = await response.json();
    textarea.value = "";
    addComment(text, newCommentId);
  }
};

const handleDelete = async (event) => {
  const commentList = event.target.parentNode;
  const commentId = commentList.dataset.id;
  const videoId = videoContainer.dataset.id;
  const response = await fetch(`/api/comment/${commentId}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      videoId,
    }),
  });
  if (response.status === 201) {
    deleteComment(event);
  }
  if (response.status === 403) {
    alert("not your comments");
  }
};

form.addEventListener("submit", handleSubmit);
for (let i = 0; i < deleteBtn.length; i++) {
  deleteBtn[i].addEventListener("click", handleDelete);
}
