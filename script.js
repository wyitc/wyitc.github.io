function random(lower_bound, upper_bound) {
    return Math.round(Math.random() * (upper_bound - lower_bound) + lower_bound);
}

var phrases = [
    "fuzzy sun, get you one by one",
    "it's all downhill from here",
    "i've got reservations about so many things, but not about you",
    "is this thing on?",
    "woof",
    "every song is a comeback",
    "you can come by any time you like",
    "distance has no way of making love understandable",
    "references, references! what are your sexual preferences?",
    "if i am a dog then shake hands",
    "it's yr show",
    "you're history and i'm tapped",
    "But Have You Seen My Records?",
    "hello i am a dog yes",
    "gold star for robot boy",
    "well you better go back to beautiful texas oklahoma kansas georgia tennessee",
    "do you know how i feel?",
    "these are only lyrics now",
    "perfect always takes so long because it don't exist",
    "strange things happen for no reason",
    "hold my breath, i hold my breath, i hold it",
    "tell my mother i'm going home",
    "i'm on a need to know basis",
    "years ago they tried to put me in a payphone",
    "dont look at me!",
    "eep!",
    "You Are On Wyit Dot Dog, The Official Wyit Website",
    "i need to write more quotes. these ones keep repeating",
    "too much is not enough",
    "this is the life",
    "it's time to get away!",
    "this world will give you anything as long as you will want to"
];



window.onload = (function () {
    var quote = document.getElementById("quote");
    quote.innerHTML = phrases[random(0, phrases.length - 1)];
})