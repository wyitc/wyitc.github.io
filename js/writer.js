// use localStorage to store data


// reload data

window.onload = ( function () {
    this.document.getElementById("post-title").value = this.localStorage.getItem("post-title");
    this.document.getElementById("post-author").value = this.localStorage.getItem("post-author");
    this.document.getElementById("post-content").value = this.localStorage.getItem("post-content");
    this.document.getElementById("image-url").value = this.localStorage.getItem("image-url");
})

function save_data() {
    let blog_content = document.getElementById("post-content").value;
    let image_url = document.getElementById("image-url").value;
    let post_title = document.getElementById("post-title").value;
    let author = document.getElementById("post-author").value;
    let datetime = new Date().toLocaleString();

    localStorage.setItem("post-content", blog_content);
    localStorage.setItem("image-url", image_url);
    localStorage.setItem("post-title", post_title);
    localStorage.setItem("post-author", author);
    localStorage.setItem("datetime", datetime);
}

function view_page() {
    save_data();
    window.location.replace("template.html");
}

document.getElementById("save-button").addEventListener("click", save_data);
document.getElementById("view-button").addEventListener("click", view_page);