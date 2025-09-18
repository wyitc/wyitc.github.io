// Getting replaced.

window.onload = ( function () {
    console.log("Hello fucker.");

    maps = document.getElementsByClassName("map");
    for (var i = 0; i < maps.length; i++) {
        maps.item(i).onclick = function () {change_mapdesc(this.id);}
    }
})

function change_mapdesc(k) {
    var desc = document.getElementById("description");
    
    if (k in valid_descriptions) {
        desc.innerHTML = valid_descriptions[k];
    }
}  

valid_descriptions = {
    "stupid":
        "My favorite map I've made so far! Finally, finally, finally, something I'm really proud of. Which is surprising, considering it probably took the shortest amount of time to make start -> finish. \
        Maybe I just gotta make the map and not worry so much. <br><br> Whatever, it's a ton of fun. If you're gonna check out any map of mine, let it be this one!",
    
    "september":
        "Fun little alt map. A little odd at places (sacrificing gameplay to make the visuals work), but I'm very pleased with how it turned out. Hopefully I can get it ranked next September.",

    "crescendolls":
        "Silly repetition gimmick set. If Daft Punk could loop the same sample for three minutes for a song, then I can do this, right?",

    "iwishyouwerehere":
        "A little easy map never hurt anybody. <br>(How the fuck do you make sliderart?)",

    "chatblanc":
        "hey do you guys wanna hear my fanzhen impression",
    
    "slinkyjosh":
        "Throwaway map I made for a friend that does not play osu!.",

    "routing":
        "Metro line slider gimmick set. My diff is probably my least favorite out of the 5*+ ones, if I'm being honest. Never liked how it played. <br><br>\
        Set came together very nicely, though! Many props to the GDers, and to blixys for hitsounding. Give all the diffs a whirl.",

    "stars":
        "The first ranked wyit map. Thanks to blixys for telling me to finish this one, as well as bat and squirrelp for their help. Much love to all three of you. \
        Very happy to be putting real music in the Ranked section; gotta get back on that grind soon!",

    "locals":
        "One of my favorite songs from 2023. This diff has found a loving home on quantumvortex's set of this song, which is linked in the description.",

    "movement":
        "A little jank. Fits the vibe. You might hate this song.",

    "fathero":
        "Was going to make a set for this, but gave up. Still pretty fun, though! People seem to enjoy it. Real Music.",

    "copyright":
        "Compliments to Chef Ancelysia for cooking with the hitsounds. My hardest map.",
    
    "freakytimes":
        "Idea dump alt swing map. One of my better ones for sure; might push it later on. Love you, Louis.",
    
    "fived":
        "Short. Includes a blixys diff.",

    "elronzacapa":
        "My \"first\" map. Uploaded a few before I finished this one, but this one was 90% complete for a long, long time. Felt like I owed this upload to people who stuck around. \
        <br>Rather mistimed and weird. You might get some mileage out of it, though.",

    "magi":
        "Jumpy! Still figuring stuff out, but has some cool things peppered here and there. Thanks olc for modding this. My goat.",

    "nintendowfc":
        "The root of all my problems."
}