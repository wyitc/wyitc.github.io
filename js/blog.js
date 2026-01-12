import { blog_metadata }  from './entries.js';

let table = document.getElementById("blog-list");

window.onload = ( function () {

    for (let i = 0; i < blog_metadata.length; i++) {

        var current_metadata = blog_metadata[i];

        add_entry(current_metadata);

    }

})

function add_entry(metadata) {
    
    // get data
    
    let title = metadata['title'];
    let datetime = metadata['datetime'];
    let filename = metadata['filename'];

    // create elements

    let row = document.createElement("tr");
    let title_column = document.createElement("td");
    let title_link = document.createElement("a");
    let datetime_column = document.createElement("td");

    // fill elements

    title_link.innerHTML = title;
    title_link.setAttribute("href", filename)
    datetime_column.innerHTML = datetime;

    // link elements

    title_column.appendChild(title_link)
    row.appendChild(datetime_column);
    row.appendChild(title_column);
    table.appendChild(row);

}