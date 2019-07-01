import axios from 'axios';

const addCommentForm = document.getElementById("addComment");
const commentList = document.getElementById("commentList");
const commentNumber = document.getElementById("commentNumber");

const sendComment = async (comment) => {
    const videoId = window.location.href.split("/videos/")[1];
    const response = await axios({
        url: `/api/${videoId}/comment`,
        method: "POST",
        data: {
            comment
        }
    });
    console.log(response);
    if(response.status == 200){
        addComment(comment);
    }
};

const handleSubmmit = (event) => {
    event.preventDefault();
    const commentInput = addCommentForm.querySelector("input");
    const comment = commentInput.value;
    sendComment(comment);
    commentInput.value = "";
};

const increaseNumber = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const addComment = (comment) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerHTML = comment;
    li.appendChild(span);
    commentList.prepend(li); // 배열의 제일 앞에 추가해주기
    increaseNumber();
};

function init() {
    addCommentForm.addEventListener("submit", handleSubmmit);
};

if(addCommentForm){
    init();
};