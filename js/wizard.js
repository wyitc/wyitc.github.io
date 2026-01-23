const table_index_placements = [
    1, 12, 0,
    3, 13, 2,
    5, 14, 4,
    7, 15, 6,
    9, 16, 8,
    11, 17, 10
];

let game_state = {
    player_count: 6,
    names: ["", "", "", "", "", ""],
    current_round: [[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0]],
    rounds: [],
    scores: [0, 0, 0, 0, 0, 0]
}

function save_names() {
    const name_fields = Array.from(document.getElementsByClassName('name-field'));
    for (let i = 0; i<6; i++) {
        game_state.names[i] = name_fields[i].value;
    }
    save_game_state();
}

function load_names() {
    const name_fields = Array.from(document.getElementsByClassName('name-field'));
    for (let i = 0; i<6; i++) {
        name_fields[i].value = game_state.names[i];
    }
}

function update_input_numbers_html() {
    const number_texts = Array.from(document.getElementsByClassName('input-number-text'));
    for (let i = 0; i<12; i++) {
        number_texts[i].innerHTML = game_state.current_round[Math.trunc(i/2)][i%2];
    }
}

function change_input_number(player, field, op) {
    game_state.current_round[player][field] += (op == "+") ? 1 : -1
    update_input_numbers_html();
    save_game_state();
}

function update_pcount_radio_buttons() {
    const buttons = Array.from(document.querySelectorAll("input[name='player-count-radio']"));
    buttons[game_state.player_count-3].click();
}

function get_round_bid_actual(round_number=null) {
    if (round_number === null) {round_number = game_state.rounds.length-1}
    if (round_number+1 > game_state.rounds.length) { return null; }
    
    let current_round = structuredClone(game_state.rounds[round_number]);
    if (!current_round) {
        return [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
    }
    for (let i = 0; i<6; i++) {
        current_round[i].pop()
    }

    return current_round;
}

function update_scores_game_state() {
    if (game_state.rounds.length == 0) {
        game_state.scores = [0, 0, 0, 0, 0, 0];
        return;
    }
    const last_round_scores = game_state.rounds.at(-1);
    for (let i = 0; i < 6; i++) {
        game_state.scores[i] = last_round_scores[i][2];
    }
}


function assign_button_functions() {
    const input_buttons = Array.from(document.getElementsByClassName('input-button'));
    for (let i = 0; i<6; i++) {
        input_buttons[i * 4].setAttribute("onclick", "change_input_number("+i+",0,\"-\")");
        input_buttons[i*4+1].setAttribute("onclick", "change_input_number("+i+",0,\"+\")");
        input_buttons[i*4+2].setAttribute("onclick", "change_input_number("+i+",1,\"-\")");
        input_buttons[i*4+3].setAttribute("onclick", "change_input_number("+i+",1,\"+\")");
    }
}

function calc_score(bid, actual, score=0) {
    let change = 0;
    if (bid == actual)  { change = 20 + 10 * bid; }
    else                { change = -10 * Math.abs(bid-actual); }
    return score + change;
}

function update_player_count(player_count) {
    const input_table_row = document.getElementById('input-table-row');
    const player_inputs = input_table_row.children;
    const score_tables = Array.from(document.getElementById('score-tables').children);
    
    // update player inputs

    for (let i = 0; i<6; i++) {
        if (i < player_count) {
            player_inputs[i].removeAttribute("hidden");
        } else {
            player_inputs[i].setAttribute("hidden", "true");
        }
    }

    // update score tables
    let current_tds = null;
    score_tables.forEach((table) => {
        current_tds = Array.from(table.querySelectorAll('td'));
        for (let i = 0; i<6; i++) {
            if (i < player_count) {
                current_tds[2*i].removeAttribute('hidden');
                current_tds[2*i+1].removeAttribute('hidden');
                current_tds[12+i].removeAttribute('hidden');
            } else {
                current_tds[2*i].setAttribute('hidden', 'true');
                current_tds[2*i+1].setAttribute('hidden', 'true');
                current_tds[12+i].setAttribute('hidden', 'true');
            }
        }
    });

    
    game_state.player_count = player_count;
    save_game_state();
}

function add_one_round(round_scores) {
    let score_table_div = document.getElementById('score-tables');
    let last_table = Array.from(score_table_div.children).at(-1);
    score_table_div.appendChild(last_table.cloneNode(true));

    last_table.removeAttribute('hidden');

    const last_table_cells = Array.from(last_table.querySelectorAll('td'));
    let scores = [];
    round_scores.forEach((r) => scores.push(r[2]));
    const winning_score = Math.max(...scores);

    for (let i = 0; i < 18; i++) {
        last_table_cells[table_index_placements[i]].innerHTML = round_scores[Math.trunc(i/3)][i%3];
    }

    for (let i=0; i<6; i++) {
        if (round_scores[i][2] == winning_score) {
            last_table_cells[i*2].setAttribute('style', 'background-color:palegoldenrod;');
        }
        if (round_scores[i][0] != round_scores[i][1]) {
            last_table_cells[i*2].setAttribute('style', 'color:firebrick;');
        }
    }
}

function force_update_score_tables() {
    // delete rows
    
    let score_table_div = document.getElementById('score-tables');
    let all_tables = Array.from(score_table_div.children);
    let last_table = all_tables.at(-1);
    const len = score_table_div.children.length-1;
    
    for (let i = 0; i < len; i++) {
        all_tables[i].remove();
    }

    // re-add rows

    game_state.rounds.forEach((round) => {
        add_one_round(round);
    });
}

function submit_round() {
    
    // handle game_state
    let round = structuredClone(game_state.current_round);
    let current_bid = null;
    let current_score = null;
    
    for (let i = 0; i < 6; i++) { // replace 6 with player_count?
        current_bid = round[i];
        current_score = (i<game_state.player_count) ?
            calc_score(current_bid[0], current_bid[1], game_state.scores[i]) : 0;
        round[i].push(current_score);
        game_state.scores[i] = current_score;
    }
    game_state.rounds.push(round);

    // reset input numbers to zeroes
    game_state.current_round = [[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0]];
    update_input_numbers_html();

    save_game_state();

    // create next table element
    let last_round = structuredClone(game_state.rounds.at(-1));
    add_one_round(last_round);

    console.log("Submitted round");
}


// returns [Bid, Actual, Score]
function score_cell_at(round,player) {
    const row_cells = Array.from(document.getElementById('score-tables').children)[round].querySelectorAll('td');
    const returned_cells = [row_cells[player*2+1], 
                            row_cells[player+12],
                            row_cells[player*2]];
    return returned_cells;
}

function undo_round() {
    const deleted_round = game_state.rounds.length-1;
    let score_table_div = document.getElementById('score-tables');
    let all_tables = Array.from(score_table_div.children);
    all_tables[deleted_round].remove();
    game_state.rounds.pop();

    game_state.current_round = get_round_bid_actual();
    update_input_numbers_html();
    update_scores_game_state();
    save_game_state();
}

function clear_game() {
    // handle game_state
    game_state = {
        player_count: 6,
        names: ["", "", "", "", "", ""],
        current_round: [[0, 0],[0, 0],[0, 0],[0, 0],[0, 0],[0, 0]],
        rounds: [],
        scores: [0, 0, 0, 0, 0, 0]
    }
    save_game_state();
    load_game_state();

    console.log("Cleared");
}

function save_game_state() {
    localStorage.setItem("game-state", JSON.stringify(game_state));
}

function load_game_state() {
    game_state = JSON.parse(localStorage.getItem("game-state"));
    update_pcount_radio_buttons();
    load_names();
    update_player_count(game_state.player_count, false);
    update_input_numbers_html();
    force_update_score_tables();
}

window.onload = function () {
    load_game_state();
    assign_button_functions();
}