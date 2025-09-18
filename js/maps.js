import { descriptions }  from './descriptions.js';



window.onload = ( function () {
    
    const ids = Object.keys(descriptions)

    console.log("Loaded " + ids.length + " epic beatmaps!");

    for (let i = Object.keys(descriptions).length-1; i >= 0; i--) {
        add_map(ids[i]);
    }

    console.log(get_all_rows());

    const rankedbox = document.getElementById("rankedbox");
    const gdbox = document.getElementById("gdbox")

    rankedbox.addEventListener("change", (event) => {
        update_visibility()
    })

    gdbox.addEventListener("change", (event) => {
        update_visibility()
    })

    update_visibility()

    
})

function change_mapdesc(id) {
    var desc = document.getElementById("description");
    
    if (id in descriptions) {
        let id_desc = descriptions[id][1];
        id_desc.replace("\n", "<br>")
        desc.innerHTML = id_desc;
    }
}

function add_map(id) {

    const mapdata = descriptions[id][0];
    const mapdesc = descriptions[id][1];
    
    // this looks like this sucks
    // is this the only way you can do this?
    // Kataryn I know you're reading this please tell me if this sucks

    // create elements

    let maptable = document.getElementById("maptable");
    let new_map = document.createElement("tr");
    let img_frame = document.createElement("td");
    let title_frame = document.createElement("td");
    let img = document.createElement("input");
    let title_link = document.createElement("a");
    let title = document.createElement("p");
    let diffname = document.createElement("p");

    // change element attributes

    new_map.setAttribute("id", id)
    img.setAttribute("class", "map");
    img.setAttribute("type", "image");
    img.setAttribute("src", mapdata[5]);
    title_link.setAttribute("target", "_blank");
    title_link.setAttribute("href", "https://osu.ppy.sh/beatmaps/" + id);
    title.setAttribute("class", "maptitle");
    title.textContent = mapdata[1] + " - " + mapdata[0];
    diffname.textContent = mapdata[2] + " (" + mapdata[4] + "*)";

    img.onclick = function () {change_mapdesc(id)}

    // link 'em up
    
    img_frame.appendChild(img);
    title_frame.appendChild(title_link);
    title_link.appendChild(title);
    title_frame.appendChild(diffname);
    new_map.appendChild(img_frame);
    new_map.appendChild(title_frame);
    maptable.appendChild(new_map);

    if (is_ranked(id)) {
        let rankedtext = document.createElement("p");
        rankedtext.setAttribute("class", "ranked");
        rankedtext.textContent = "Ranked!";
        title_frame.appendChild(rankedtext);
    }
}

function get_all_rows() {
    let maptable = document.getElementById("maptable");
    return maptable.children;
}

function is_ranked(id) {
    return "RankStatus.RANKED|RankStatus.QUALIFIED".match(descriptions[id][0][3]);
}

function is_gd(id) {
    return descriptions[id][0][6];
}

function update_visibility() {

    const showranked = rankedbox.checked;
    const showgds = gdbox.checked
    let rows = get_all_rows();
    
    for (let i = 0; i < rows.length; i++) {

        let row = rows[i];
        
        if ((!is_ranked(row.id) && showranked) | (is_gd(row.id) && !showgds)) {
            row.hidden = true;
        } else {
            row.hidden = false
        }
    }
}