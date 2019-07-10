document.addEventListener("DOMContentLoaded", function(event) {
    var poz_where = 0;
    var poz_where_k = 0;
    var tab = [];
    var tab2 = [];
    var ktab = [];
    var ktab2 = [];
    var n = 9;
    var click = 0;
    for (var i = 0; i < n; i++) {
        tab[i] = [];
        tab2[i] = [];
        for (var ii = 0; ii < n; ii++) {
            tab[i][ii] = 0;
            tab2[i][ii] = [];
        }

    }
    var flag = true;
    var header = document.createElement("div")
    header.id = "div_header";
    document.body.appendChild(header);
    var p_preview = document.createElement("div");
    p_preview.id = "p_preview";
    header.appendChild(p_preview);
    p_preview.innerText = "Następne"
    var p_points = document.createElement("div");
    p_points.id = "p_points";
    header.appendChild(p_points);
    p_points.innerText = "Punkty";
    var finish_game = false;
    var div_finish = document.createElement("div")
    div_finish.id = ("finish_alert");
    document.body.appendChild(div_finish);
    var div = document.createElement("div");
    div.id = "div_main";
    document.body.appendChild(div);
    var table = document.createElement("table");
    div.appendChild(table);
    for (var i = 0; i < n; i++) {
        var tr = document.createElement("tr");
        table.appendChild(tr);
        tr.id = i;
        for (var ii = 0; ii < n; ii++) {
            var td = document.createElement("td");
            tr.appendChild(td);
            td.id = i + "_" + ii;
        }
    }

    var div2 = document.createElement("div")
    div2.id = ("preview");
    header.appendChild(div2);
    var div_description = document.createElement("div")
    div_description.id = ("description");
    document.body.appendChild(div_description);
    div_description.innerText += "Gra polega na układaniu kulek w rzędzie. Gracz układa po pięć (lub więcej) kulek o tym samym kolorze w rzędzie (poziomo, pionowo, bądź po skosie). Gracz może przemieszczać kulki na dowolne pole, do którego może dojść kulka (kulka nie porusza się po skosie).";
    var tab3 = [];
    for (var z = 0; z < 3; z++) {
        var preview_k = document.createElement("div");
        div2.appendChild(preview_k);
        preview_k.style.display = "inline-block";
        preview_k.style.margin = "5px";
        tab3.push(preview_k);
    }
    var count_balls = 0;


    function f_count() {
        count_balls = 0
        for (var iii = 0; iii < n; iii++) {
            for (var iiii = 0; iiii < n; iiii++) {
                if (tab[iii][iiii] != 0) {
                    count_balls += 1;
                }
            }
        }
        if (finish_game == true) {
            div_finish.style.display = "block";
            div_finish.innerText += "KONIEC";
        } else {
            sim();
        }

    }

    var connection = false;
    var div3 = document.createElement("div");
    div3.id = ("points");
    header.appendChild(div3);

    function f_rewrite() {
        for (var i = 0; i < n; i++) {
            for (var ii = 0; ii < n; ii++) {
                var cell_0 = document.getElementById(i + "_" + ii);
                cell_0.innerText = tab[i][ii];
                var colors = document.createElement("div");
                if (tab[i][ii] == 0) {
                    cell_0.innerText = "";
                }
                if (tab[i][ii] == -1) { // ORANGE
                    colors.className = "orange";
                    cell_0.innerText = null;
                    cell_0.appendChild(colors);
                }
                if (tab[i][ii] == -2) { // GREEN
                    colors.className = "green";
                    cell_0.innerText = null;
                    cell_0.appendChild(colors);
                }
                if (tab[i][ii] == -3) { // BLUE
                    colors.className = "blue";
                    cell_0.innerText = null;
                    cell_0.appendChild(colors);
                }
                if (tab[i][ii] == -4) { // RED
                    colors.className = "red";
                    cell_0.innerText = null;
                    cell_0.appendChild(colors);
                }
                if (tab[i][ii] == -5) { // GREY
                    colors.className = "grey";
                    cell_0.innerText = null;
                    cell_0.appendChild(colors);
                }
                if (tab[i][ii] == -6) { // PINK
                    colors.className = "pink";
                    cell_0.innerText = null;
                    cell_0.appendChild(colors);
                }
                if (tab[i][ii] == -7) { // YELLOW
                    colors.className = "yellow";
                    cell_0.innerText = null;
                    cell_0.appendChild(colors);
                }
            }
        }
    }
    var tabkol = []

    function randomx() {
        if (flag == true) {
            for (var e = 0; e < 3; e++) {
                var color = Math.floor((Math.random() * 7) + 1);
                tabkol.push(color)
                flag = false;
            }
        }
        for (var w = 0; w < 3; w++) {
            var a = Math.floor((Math.random() * (n)));
            var b = Math.floor((Math.random() * (n)));
            while (tab[a][b] != 0) {
                var a = Math.floor((Math.random() * (n)));
                var b = Math.floor((Math.random() * (n)));
            }
            tab[a][b] = (tabkol[w] * (-1));
        }
        tabkol.splice(0, 3);
        for (var c = 0; c < 3; c++) {
            var color = Math.floor((Math.random() * 7) + 1);
            tabkol.push(color);
        }
        for (var h = 0; h < 3; h++) {
            if (tabkol[h] == 1) { // ORANGE
                tab3[h].className = "orange";
            }
            if (tabkol[h] == 2) { // GREEN
                tab3[h].className = "green";
            }
            if (tabkol[h] == 3) { // BLUE
                tab3[h].className = "blue";
            }
            if (tabkol[h] == 4) { // RED
                tab3[h].className = "red";
            }
            if (tabkol[h] == 5) { // GREY
                tab3[h].className = "grey";
            }
            if (tabkol[h] == 6) { // PINK
                tab3[h].className = "pink";
            }
            if (tabkol[h] == 7) { // YELLOW
                tab3[h].className = "yellow";
            }
        };

    }
    randomx();
    f_rewrite();
    var spozx = 0;
    var spozy = 0;
    var mpozx = 0;
    var mpozy = 0;
    var kmpozx = 0;
    var kmpozy = 0;
    var actual = 0;
    var tab_t = [];

    function sim() {
        for (var i = 0; i < n; i++) {
            for (var ii = 0; ii < n; ii++) {
                if (tab[i][ii] == 0) {
                    0;
                }

                if (tab[i][ii] != 0) {
                    if (((i == 8 && ii != 0 && ii != 8) && (tab[i - 1][ii] == 0 || tab[i][ii + 1] == 0 || tab[i][ii - 1] == 0)) || ((i == 8 && ii == 8) && (tab[i - 1][ii] == 0 || tab[i][ii - 1] == 0)) || ((i == 8 && ii == 0) && (tab[i - 1][ii] == 0 || tab[i][ii + 1] == 0)) || ((ii == 8 && i != 0 && i != 8) && (tab[i - 1][ii] == 0 || tab[i + 1][ii] == 0 || tab[i][ii - 1] == 0)) || ((ii == 0 && i != 0 && i != 8) && (tab[i - 1][ii] == 0 || tab[i + 1][ii] == 0 || tab[i][ii + 1] == 0)) || ((i == 0 && ii != 0 && ii != 8) && (tab[i + 1][ii] == 0 || tab[i][ii + 1] == 0 || tab[i][ii - 1] == 0)) || ((i == 0 && ii == 8) && (tab[i + 1][ii] == 0 || tab[i][ii - 1] == 0)) || ((i == 0 && ii == 0) && (tab[i + 1][ii] == 0 || tab[i][ii + 1] == 0)) || (i != 0 && i != 8 && ii != 0 && ii != 8) && (tab[i][ii + 1] == 0 || tab[i][ii - 1] == 0 || tab[i + 1][ii] == 0 || tab[i - 1][ii] == 0)) { // zeby nie dalo sie clicknac kulki ktora nie ma mozliwego ruchu

                        var cell_0 = document.getElementById(i + "_" + ii);

                        cell_0.onclick = function() {
                            click++;
                            if (click == 1) {
                                var s = this.id;
                                spozx = (s.split("_", 1));
                                spozy = (s.split("_", 2));
                                actual = this.querySelector("div");
                                actual.style.width = "45px";
                                actual.style.height = "45px";
                                actual.style.marginLeft = "2.5px";
                                tab_t.push(s);

                                var cell_5 = document.getElementById(s)
                                cell_5.onmouseover = function() {
                                    for (var by = 0; by < ktabn.length; by++) {
                                        var cell_6 = document.getElementById(ktabn[by]);
                                        cell_6.style.backgroundColor = "white";
                                    }
                                }

                                for (var s = 0; s < n; s++) {
                                    for (var ss = 0; ss < n; ss++) {
                                        if (tab[s][ss] == 0) {
                                            var cell_1 = document.getElementById(s + "_" + ss);

                                            cell_1.onmouseover = function() {
                                                for (var s = 0; s < n; s++) {
                                                    ktab[s] = tab[s].slice(0);
                                                    ktab2[s] = tab[s].slice(0);
                                                    for (var ss = 0; ss < n; ss++) {
                                                        ktab[s][ss] = tab[s][ss];
                                                        ktab2[s][ss] = tab[s][ss];
                                                    }
                                                }
                                                var g = this.id;
                                                kmpozx = (g.split("_", 1));
                                                kmpozy = (g.split("_", 2));
                                                ktab[kmpozx][kmpozy[1]] = "M";
                                                f_way();
                                            }

                                        }

                                    }
                                }

                                for (var i = 0; i < n; i++) {
                                    for (var ii = 0; ii < n; ii++) {

                                        if (((i == 8 && ii != 0 && ii != 8) && (tab[i - 1][ii] == 0 || tab[i][ii + 1] == 0 || tab[i][ii - 1] == 0)) || ((i == 8 && ii == 8) && (tab[i - 1][ii] == 0 || tab[i][ii - 1] == 0)) || ((i == 8 && ii == 0) && (tab[i - 1][ii] == 0 || tab[i][ii + 1] == 0)) || ((ii == 8 && i != 0 && i != 8) && (tab[i - 1][ii] == 0 || tab[i + 1][ii] == 0 || tab[i][ii - 1] == 0)) || ((ii == 0 && i != 0 && i != 8) && (tab[i - 1][ii] == 0 || tab[i + 1][ii] == 0 || tab[i][ii + 1] == 0)) || ((i == 0 && ii != 0 && ii != 8) && (tab[i + 1][ii] == 0 || tab[i][ii + 1] == 0 || tab[i][ii - 1] == 0)) || ((i == 0 && ii == 8) && (tab[i + 1][ii] == 0 || tab[i][ii - 1] == 0)) || ((i == 0 && ii == 0) && (tab[i + 1][ii] == 0 || tab[i][ii + 1] == 0)) || (i != 0 && i != 8 && ii != 0 && ii != 8) && (tab[i][ii + 1] == 0 || tab[i][ii - 1] == 0 || tab[i + 1][ii] == 0 || tab[i - 1][ii] == 0)) {
                                            var cell_7 = document.getElementById(i + "_" + ii);
                                            cell_7.onclick = function() {

                                                for (var by = 0; by < ktabn.length; by++) {
                                                    var cell_6 = document.getElementById(ktabn[by]);
                                                    cell_6.style.backgroundColor = "white";
                                                }

                                                actual.style.width = "35px";
                                                actual.style.height = "35px";
                                                actual.style.marginLeft = "7.5px";
                                                var g = this.id;

                                                var cell_8 = document.getElementById(g)
                                                cell_8.onmouseover = function() {
                                                    for (var by = 0; by < ktabn.length; by++) {
                                                        var cell_8 = document.getElementById(ktabn[by]);
                                                        cell_8.style.backgroundColor = "white";
                                                    }
                                                }
                                                spozx = (g.split("_", 1));
                                                spozy = (g.split("_", 2));
                                                actual = this.querySelector("div");
                                                actual.style.width = "45px";
                                                actual.style.height = "45px";
                                                actual.style.marginLeft = "2.5px";
                                                tab_t.push(g);

                                                if (tab_t[(tab_t.length) - 1] == tab_t[(tab_t.length) - 2]) {

                                                    var actual_1 = document.getElementById(tab_t[(tab_t.length) - 1]);
                                                    actual_2 = actual_1.querySelector("div");
                                                    actual_2.style.width = "35px";
                                                    actual_2.style.height = "35px";
                                                    actual_2.style.marginLeft = "7.5px";
                                                    spozx = 0;
                                                    spozy = 0;
                                                    click = 0;
                                                    for (var p = 0; p < n; p++) {
                                                        for (var pp = 0; pp < n; pp++) {
                                                            var cell_2 = document.getElementById(p + "_" + pp);
                                                            cell_2.onclick = function() {
                                                                return false;
                                                            }
                                                        }
                                                    }
                                                    for (var s = 0; s < n; s++) {
                                                        for (var ss = 0; ss < n; ss++) {

                                                            var cell_1 = document.getElementById(s + "_" + ss);
                                                            cell_1.onmouseover = function() {
                                                                0;

                                                            }
                                                        }
                                                    };

                                                    f_count();
                                                }

                                            }

                                        }
                                        if (tab[i][ii] == 0) {
                                            var cell_9 = document.getElementById(i + "_" + ii);
                                            cell_9.onclick = function() {
                                                var s = this.id;
                                                mpozx = (s.split("_", 1));
                                                mpozy = (s.split("_", 2));
                                                tab[mpozx][mpozy[1]] = "M";

                                                for (var p = 0; p < n; p++) {
                                                    for (var pp = 0; pp < n; pp++) {
                                                        var cell_9 = document.getElementById(p + "_" + pp);
                                                        cell_9.onclick = function() {
                                                            return false;
                                                        }
                                                    }
                                                }
                                                click = 0;

                                                for (var s = 0; s < n; s++) {
                                                    for (var ss = 0; ss < n; ss++) {

                                                        var cell_1 = document.getElementById(s + "_" + ss);
                                                        cell_1.onmouseover = function() {
                                                            0;

                                                        }
                                                    }
                                                };
                                                f_check();
                                                f_way_do();
                                                f_check();
                                            }

                                        }

                                    }
                                }
                            }
                        }

                    }

                }

            }

        }
    }
    f_count();

    function f_find_way_0() {
        for (var i = 0; i < n; i++) {
            for (var ii = 0; ii < n; ii++) {
                if (tab[i][ii] == "M") {
                    poz_where = (i + "_" + ii);
                }
            }
        }
    }

    function f_find_way() {
        for (var i = 0; i < n; i++) {
            for (var ii = 0; ii < n; ii++) {
                if (ktab[i][ii] == "M") {
                    poz_where_k = (i + "_" + ii);
                }
            }
        }
    }

    var balls_count_0 = 0

    function f_way_do() {
        var tabd = [];
        var tabn = [];
        f_find_way_0();
        balls_count_0++;
        spozx = parseInt(spozx);
        spozy = parseInt(spozy[1]);
        mpozx = parseInt(mpozx);
        mpozy = parseInt(mpozy[1]);
        tabd.push([spozx, spozy])

        if (spozx != 0 && tab[spozx - 1][spozy] == 0) {
            tab[spozx - 1][spozy] = balls_count_0;
            tab2[spozx - 1][spozy] = spozx + "_" + spozy;
            tabd.push([spozx - 1, spozy])
        }
        if (spozx != 0 && tab[spozx - 1][spozy] == "M") {

            tabn = spozx + "_" + spozy + "," + (spozx - 1) + "_" + spozy;
        }
        if (spozx != 8 && tab[spozx + 1][spozy] == 0) {
            tab[spozx + 1][spozy] = balls_count_0;
            tab2[spozx + 1][spozy] = spozx + "_" + spozy;
            tabd.push([spozx + 1, spozy]);
        }
        if (spozx != 8 && tab[spozx + 1][spozy] == "M") {

            tabn = spozx + "_" + spozy + "," + (spozx + 1) + "_" + spozy;
        }
        if (spozy != 0 && tab[spozx][spozy - 1] == 0) {
            tab[spozx][spozy - 1] = balls_count_0;
            tab2[spozx][spozy - 1] = spozx + "_" + spozy;
            tabd.push([spozx, spozy - 1]);
        }
        if (spozy != 0 && tab[spozx][spozy - 1] == "M") {

            tabn = spozx + "_" + spozy + "," + spozx + "_" + (spozy - 1);
        }
        if (spozy != 8 && tab[spozx][spozy + 1] == 0) {
            tab[spozx][spozy + 1] = balls_count_0;
            tab2[spozx][spozy + 1] = spozx + "_" + spozy;
            tabd.push([spozx, spozy + 1]);

        }
        if (spozy != 8 && tab[spozx][spozy + 1] == "M") {

            tabn = spozx + "_" + spozy + "," + spozx + "_" + (spozy + 1);
        }
        if (tabn == 0) {
            for (var l = 0; l < tabd.length; l++) {
                if (tabd[l][0] != 0 && tab[tabd[l][0] - 1][tabd[l][1]] == 0) {
                    tab[tabd[l][0] - 1][tabd[l][1]] = tab[tabd[l][0]][tabd[l][1]] + 1;
                    tab2[tabd[l][0] - 1][tabd[l][1]] = tab2[tabd[l][0]][tabd[l][1]] + "," + (tabd[l][0]) + "_" + tabd[l][1];
                    tabd.push([tabd[l][0] - 1, tabd[l][1]]);
                }
                if (tabd[l][0] != 8 && tab[tabd[l][0] + 1][tabd[l][1]] == 0) {
                    tab[tabd[l][0] + 1][tabd[l][1]] = tab[tabd[l][0]][tabd[l][1]] + 1;
                    tab2[tabd[l][0] + 1][tabd[l][1]] = tab2[tabd[l][0]][tabd[l][1]] + "," + (tabd[l][0]) + "_" + tabd[l][1];
                    tabd.push([tabd[l][0] + 1, tabd[l][1]]);
                }
                if (tabd[l][1] != 8 && tab[tabd[l][0]][tabd[l][1] + 1] == 0) {
                    tab[tabd[l][0]][tabd[l][1] + 1] = tab[tabd[l][0]][tabd[l][1]] + 1;
                    tab2[tabd[l][0]][tabd[l][1] + 1] = tab2[tabd[l][0]][tabd[l][1]] + "," + (tabd[l][0]) + "_" + (tabd[l][1]);
                    tabd.push([tabd[l][0], tabd[l][1] + 1]);
                }
                if (tabd[l][1] != 0 && tab[tabd[l][0]][tabd[l][1] - 1] == 0) {
                    tab[tabd[l][0]][tabd[l][1] - 1] = tab[tabd[l][0]][tabd[l][1]] + 1;
                    tab2[tabd[l][0]][tabd[l][1] - 1] = tab2[tabd[l][0]][tabd[l][1]] + "," + (tabd[l][0]) + "_" + (tabd[l][1]);
                    tabd.push([tabd[l][0], tabd[l][1] - 1]);
                }
                if (tabd[l][0] != 0 && tab[tabd[l][0] - 1][tabd[l][1]] == "M") {

                    tab2[tabd[l][0] - 1][tabd[l][1]] = tab2[tabd[l][0]][tabd[l][1]] + "," + (tabd[l][0]) + "_" + tabd[l][1];
                    tabn = (tab2[tabd[l][0] - 1][tabd[l][1]]) + "," + poz_where;
                    break;

                }
                if (tabd[l][0] != 8 && tab[tabd[l][0] + 1][tabd[l][1]] == "M") {

                    tab2[tabd[l][0] + 1][tabd[l][1]] = tab2[tabd[l][0]][tabd[l][1]] + "," + (tabd[l][0]) + "_" + tabd[l][1];
                    tabn = tab2[tabd[l][0] + 1][tabd[l][1]] + "," + poz_where;
                    break;
                }
                if (tabd[l][1] != 8 && tab[tabd[l][0]][tabd[l][1] + 1] == "M") {

                    tab2[tabd[l][0]][tabd[l][1] + 1] = tab2[tabd[l][0]][tabd[l][1]] + "," + (tabd[l][0]) + "_" + (tabd[l][1]);
                    tabn = tab2[tabd[l][0]][tabd[l][1] + 1] + "," + poz_where;
                    break;
                }
                if (tabd[l][1] != 0 && tab[tabd[l][0]][tabd[l][1] - 1] == "M") {

                    tab2[tabd[l][0]][tabd[l][1] - 1] = tab2[tabd[l][0]][tabd[l][1]] + "," + (tabd[l][0]) + "_" + (tabd[l][1]);
                    tabn = tab2[tabd[l][0]][tabd[l][1] - 1] + "," + poz_where;
                    break;
                }

            }
        }

        if (tabn == 0) {
            actual.style.width = "35px";
            actual.style.height = "35px";
            actual.style.marginLeft = "7.5px";
            tab[mpozx][mpozy] = 0;
            for (var o = 0; o < n; o++) {
                for (var oo = 0; oo < n; oo++) {
                    tab2[o][oo] = [];
                    if (tab[o][oo] > 0) {
                        tab[o][oo] = 0;
                    }
                }
            }
            f_count();
        } else {
            tabn = (tabn.split(","))
            for (var ky = 0; ky < tabn.length; ky++) {
                var cell_3 = document.getElementById(tabn[ky]);
                cell_3.style.backgroundColor = "#fca294";
            }
            setTimeout(function() {
                for (var ky = 0; ky < tabn.length; ky++) {
                    var cell_3 = document.getElementById(tabn[ky]);
                    cell_3.style.backgroundColor = "white";
                }

            }, 700);
            tab[mpozx][mpozy] = tab[spozx][spozy];
            tab[spozx][spozy] = 0;
            for (var o = 0; o < n; o++) {
                for (var oo = 0; oo < n; oo++) {
                    tab2[o][oo] = [];
                    if (tab[o][oo] > 0) {
                        tab[o][oo] = 0;
                    }
                }
            }

            f_rewrite();
            setTimeout(function() {
                if (count_balls >= 78) {
                    finish_game = true;
                    f_count();
                }
                if (finish_game == false) {
                    if (connection == false) {
                        randomx();
                    }
                    f_count();
                    f_rewrite();
                }

            }, 700)
        }

    }
    var b_flag = false;
    var ktabn = [];

    function f_way() {

        if (b_flag == true) {
            for (var by = 0; by < ktabn.length; by++) {
                var cell_6 = document.getElementById(ktabn[by]);
                cell_6.style.backgroundColor = "white";
            }
        }

        b_flag = true;
        var balls_count = 0;
        var ktabd = [];
        ktabn = [];
        f_find_way();
        balls_count++;
        kspozx = parseInt(spozx);
        kspozy = parseInt(spozy[1]);
        kmpozx = parseInt(kmpozx);
        kmpozy = parseInt(kmpozy[1]);
        ktabd.push([kspozx, kspozy])
        if (kspozx != 0 && ktab[kspozx - 1][kspozy] == 0) {
            ktab[kspozx - 1][kspozy] = balls_count;
            ktab2[kspozx - 1][kspozy] = kspozx + "_" + kspozy;
            ktabd.push([kspozx - 1, kspozy])
        }
        if (kspozx != 0 && ktab[kspozx - 1][kspozy] == "M") {
            ktabn = kspozx + "_" + kspozy + "," + (kspozx - 1) + "_" + kspozy;
        }
        if (kspozx != 8 && ktab[kspozx + 1][kspozy] == 0) {
            ktab[kspozx + 1][kspozy] = balls_count;
            ktab2[kspozx + 1][kspozy] = kspozx + "_" + kspozy;
            ktabd.push([kspozx + 1, kspozy]);
        }
        if (kspozx != 8 && ktab[kspozx + 1][kspozy] == "M") {
            ktabn = kspozx + "_" + kspozy + "," + (kspozx + 1) + "_" + kspozy;
        }
        if (kspozy != 0 && ktab[kspozx][kspozy - 1] == 0) {
            ktab[kspozx][kspozy - 1] = balls_count;
            ktab2[kspozx][kspozy - 1] = kspozx + "_" + kspozy;
            ktabd.push([kspozx, kspozy - 1]);
        }
        if (kspozy != 0 && ktab[kspozx][kspozy - 1] == "M") {
            ktabn = kspozx + "_" + kspozy + "," + kspozx + "_" + (kspozy - 1);
        }
        if (kspozy != 8 && ktab[kspozx][kspozy + 1] == 0) {
            ktab[kspozx][kspozy + 1] = balls_count;
            ktab2[kspozx][kspozy + 1] = kspozx + "_" + kspozy;
            ktabd.push([kspozx, kspozy + 1]);

        }
        if (kspozy != 8 && ktab[kspozx][kspozy + 1] == "M") {
            ktabn = kspozx + "_" + kspozy + "," + kspozx + "_" + (kspozy + 1);
        }
        if (ktabn == 0) {
            for (var l = 0; l < ktabd.length; l++) {
                if (ktabd[l][0] != 0 && ktab[ktabd[l][0] - 1][ktabd[l][1]] == 0) {
                    ktab[ktabd[l][0] - 1][ktabd[l][1]] = ktab[ktabd[l][0]][ktabd[l][1]] + 1;
                    ktab2[ktabd[l][0] - 1][ktabd[l][1]] = ktab2[ktabd[l][0]][ktabd[l][1]] + "," + (ktabd[l][0]) + "_" + ktabd[l][1];
                    ktabd.push([ktabd[l][0] - 1, ktabd[l][1]]);
                }
                if (ktabd[l][0] != 8 && ktab[ktabd[l][0] + 1][ktabd[l][1]] == 0) {
                    ktab[ktabd[l][0] + 1][ktabd[l][1]] = ktab[ktabd[l][0]][ktabd[l][1]] + 1;
                    ktab2[ktabd[l][0] + 1][ktabd[l][1]] = ktab2[ktabd[l][0]][ktabd[l][1]] + "," + (ktabd[l][0]) + "_" + ktabd[l][1];
                    ktabd.push([ktabd[l][0] + 1, ktabd[l][1]]);
                }
                if (ktabd[l][1] != 8 && ktab[ktabd[l][0]][ktabd[l][1] + 1] == 0) {
                    ktab[ktabd[l][0]][ktabd[l][1] + 1] = ktab[ktabd[l][0]][ktabd[l][1]] + 1;
                    ktab2[ktabd[l][0]][ktabd[l][1] + 1] = ktab2[ktabd[l][0]][ktabd[l][1]] + "," + (ktabd[l][0]) + "_" + (ktabd[l][1]);
                    ktabd.push([ktabd[l][0], ktabd[l][1] + 1]);
                }
                if (ktabd[l][1] != 0 && ktab[ktabd[l][0]][ktabd[l][1] - 1] == 0) {
                    ktab[ktabd[l][0]][ktabd[l][1] - 1] = ktab[ktabd[l][0]][ktabd[l][1]] + 1;
                    ktab2[ktabd[l][0]][ktabd[l][1] - 1] = ktab2[ktabd[l][0]][ktabd[l][1]] + "," + (ktabd[l][0]) + "_" + (ktabd[l][1]);
                    ktabd.push([ktabd[l][0], ktabd[l][1] - 1]);
                }
                if (ktabd[l][0] != 0 && ktab[ktabd[l][0] - 1][ktabd[l][1]] == "M") {
                    ktab2[ktabd[l][0] - 1][ktabd[l][1]] = ktab2[ktabd[l][0]][ktabd[l][1]] + "," + (ktabd[l][0]) + "_" + ktabd[l][1];
                    ktabn = (ktab2[ktabd[l][0] - 1][ktabd[l][1]]) + "," + poz_where_k;
                    break;

                }
                if (ktabd[l][0] != 8 && ktab[ktabd[l][0] + 1][ktabd[l][1]] == "M") {
                    ktab2[ktabd[l][0] + 1][ktabd[l][1]] = ktab2[ktabd[l][0]][ktabd[l][1]] + "," + (ktabd[l][0]) + "_" + ktabd[l][1];
                    ktabn = (ktab2[ktabd[l][0] + 1][ktabd[l][1]]) + "," + poz_where_k;
                    break;
                }
                if (ktabd[l][1] != 8 && ktab[ktabd[l][0]][ktabd[l][1] + 1] == "M") {
                    ktab2[ktabd[l][0]][ktabd[l][1] + 1] = ktab2[ktabd[l][0]][ktabd[l][1]] + "," + (ktabd[l][0]) + "_" + (ktabd[l][1]);
                    ktabn = ktab2[ktabd[l][0]][ktabd[l][1] + 1] + "," + poz_where_k;
                    break;
                }
                if (ktabd[l][1] != 0 && ktab[ktabd[l][0]][ktabd[l][1] - 1] == "M") {
                    ktab2[ktabd[l][0]][ktabd[l][1] - 1] = ktab2[ktabd[l][0]][ktabd[l][1]] + "," + (ktabd[l][0]) + "_" + (ktabd[l][1]);
                    ktabn = ktab2[ktabd[l][0]][ktabd[l][1] - 1] + "," + poz_where_k;
                    break;
                }
            }

        }
        if (ktabn == 0) {
            0;
        } else {
            ktabn = (ktabn.split(","))
            for (var py = 0; py < ktabn.length; py++) {
                var cell_4 = document.getElementById(ktabn[py]);
                cell_4.style.backgroundColor = "#fca294";
            }
        }
    }
    var points = 0;
    var tp = [];

    function f_check() {

        for (var q = 0; q < n; q++) {
            for (var qq = 0; qq < n; qq++) {
                if (tab[q][qq] != 0 && tab[q][qq] == tab[q][qq + 1] && tab[q][qq] == tab[q][qq + 2] && tab[q][qq] == tab[q][qq + 3] && tab[q][qq] == tab[q][qq + 4] && tab[q][qq] == tab[q][qq + 5] && tab[q][qq] == tab[q][qq + 6] && tab[q][qq] == tab[q][qq + 7] && tab[q][qq] == tab[q][qq + 8]) {
                    tp.push(q + "_" + qq);
                    tp.push(q + "_" + (qq + 1))
                    tp.push(q + "_" + (qq + 2))
                    tp.push(q + "_" + (qq + 3))
                    tp.push(q + "_" + (qq + 4))
                    tp.push(q + "_" + (qq + 5))
                    tp.push(q + "_" + (qq + 6))
                    tp.push(q + "_" + (qq + 7))
                    tp.push(q + "_" + (qq + 8))
                    break;
                }
                if (tab[q][qq] != 0 && tab[q][qq] == tab[q][qq + 1] && tab[q][qq] == tab[q][qq + 2] && tab[q][qq] == tab[q][qq + 3] && tab[q][qq] == tab[q][qq + 4] && tab[q][qq] == tab[q][qq + 5] && tab[q][qq] == tab[q][qq + 6] && tab[q][qq] == tab[q][qq + 7]) {
                    tp.push(q + "_" + qq);
                    tp.push(q + "_" + (qq + 1))
                    tp.push(q + "_" + (qq + 2))
                    tp.push(q + "_" + (qq + 3))
                    tp.push(q + "_" + (qq + 4))
                    tp.push(q + "_" + (qq + 5))
                    tp.push(q + "_" + (qq + 6))
                    tp.push(q + "_" + (qq + 7))
                    break;
                }
                if (tab[q][qq] != 0 && tab[q][qq] == tab[q][qq + 1] && tab[q][qq] == tab[q][qq + 2] && tab[q][qq] == tab[q][qq + 3] && tab[q][qq] == tab[q][qq + 4] && tab[q][qq] == tab[q][qq + 5] && tab[q][qq] == tab[q][qq + 6]) {
                    tp.push(q + "_" + qq);
                    tp.push(q + "_" + (qq + 1))
                    tp.push(q + "_" + (qq + 2))
                    tp.push(q + "_" + (qq + 3))
                    tp.push(q + "_" + (qq + 4))
                    tp.push(q + "_" + (qq + 5))
                    tp.push(q + "_" + (qq + 6))
                    break;
                }
                if (tab[q][qq] != 0 && tab[q][qq] == tab[q][qq + 1] && tab[q][qq] == tab[q][qq + 2] && tab[q][qq] == tab[q][qq + 3] && tab[q][qq] == tab[q][qq + 4] && tab[q][qq] == tab[q][qq + 5]) {
                    tp.push(q + "_" + qq);
                    tp.push(q + "_" + (qq + 1))
                    tp.push(q + "_" + (qq + 2))
                    tp.push(q + "_" + (qq + 3))
                    tp.push(q + "_" + (qq + 4))
                    tp.push(q + "_" + (qq + 5))
                    break;
                }
                if (tab[q][qq] != 0 && tab[q][qq] == tab[q][qq + 1] && tab[q][qq] == tab[q][qq + 2] && tab[q][qq] == tab[q][qq + 3] && tab[q][qq] == tab[q][qq + 4]) {
                    tp.push(q + "_" + qq);
                    tp.push(q + "_" + (qq + 1))
                    tp.push(q + "_" + (qq + 2))
                    tp.push(q + "_" + (qq + 3))
                    tp.push(q + "_" + (qq + 4))
                    break;
                }
            }
        }
        var flag = true;
        for (var qp = 0; qp < n; qp++) {
            for (var qqp = 0; qqp < n; qqp++) {
                if (flag == true && qp == 0 && tab[qp][qqp] != 0 && tab[qp][qqp] == tab[qp + 1][qqp] && tab[qp][qqp] == tab[qp + 2][qqp] && tab[qp][qqp] == tab[qp + 3][qqp] && tab[qp][qqp] == tab[qp + 4][qqp] && tab[qp][qqp] == tab[qp + 5][qqp] && tab[qp][qqp] == tab[qp + 6][qqp] && tab[qp][qqp] == tab[qp + 7][qqp] && tab[qp][qqp] == tab[qp + 8][qqp]) {

                    tp.push(qp + "_" + qqp);
                    tp.push((qp + 1) + "_" + (qqp))
                    tp.push((qp + 2) + "_" + (qqp))
                    tp.push((qp + 3) + "_" + (qqp))
                    tp.push((qp + 4) + "_" + (qqp))
                    tp.push((qp + 5) + "_" + (qqp))
                    tp.push((qp + 6) + "_" + (qqp))
                    tp.push((qp + 7) + "_" + (qqp))
                    tp.push((qp + 8) + "_" + (qqp))
                    flag = false;
                }
                if (flag == true && qp <= 1 && tab[qp][qqp] != 0 && tab[qp][qqp] == tab[qp + 1][qqp] && tab[qp][qqp] == tab[qp + 2][qqp] && tab[qp][qqp] == tab[qp + 3][qqp] && tab[qp][qqp] == tab[qp + 4][qqp] && tab[qp][qqp] == tab[qp + 5][qqp] && tab[qp][qqp] == tab[qp + 6][qqp] && tab[qp][qqp] == tab[qp + 7][qqp]) {

                    tp.push(qp + "_" + qqp);
                    tp.push((qp + 1) + "_" + (qqp))
                    tp.push((qp + 2) + "_" + (qqp))
                    tp.push((qp + 3) + "_" + (qqp))
                    tp.push((qp + 4) + "_" + (qqp))
                    tp.push((qp + 5) + "_" + (qqp))
                    tp.push((qp + 6) + "_" + (qqp))
                    tp.push((qp + 7) + "_" + (qqp))
                    flag = false;
                }
                if (flag == true && qp <= 2 && tab[qp][qqp] != 0 && tab[qp][qqp] == tab[qp + 1][qqp] && tab[qp][qqp] == tab[qp + 2][qqp] && tab[qp][qqp] == tab[qp + 3][qqp] && tab[qp][qqp] == tab[qp + 4][qqp] && tab[qp][qqp] == tab[qp + 5][qqp] && tab[qp][qqp] == tab[qp + 6][qqp]) {

                    tp.push(qp + "_" + qqp);
                    tp.push((qp + 1) + "_" + (qqp))
                    tp.push((qp + 2) + "_" + (qqp))
                    tp.push((qp + 3) + "_" + (qqp))
                    tp.push((qp + 4) + "_" + (qqp))
                    tp.push((qp + 5) + "_" + (qqp))
                    tp.push((qp + 6) + "_" + (qqp))
                    flag = false;
                }
                if (flag == true && qp <= 3 && tab[qp][qqp] != 0 && tab[qp][qqp] == tab[qp + 1][qqp] && tab[qp][qqp] == tab[qp + 2][qqp] && tab[qp][qqp] == tab[qp + 3][qqp] && tab[qp][qqp] == tab[qp + 4][qqp] && tab[qp][qqp] == tab[qp + 5][qqp]) {

                    tp.push(qp + "_" + qqp);
                    tp.push((qp + 1) + "_" + (qqp))
                    tp.push((qp + 2) + "_" + (qqp))
                    tp.push((qp + 3) + "_" + (qqp))
                    tp.push((qp + 4) + "_" + (qqp))
                    tp.push((qp + 5) + "_" + (qqp))
                    flag = false;
                }
                if (flag == true && qp <= 4 && tab[qp][qqp] != 0 && tab[qp][qqp] == tab[qp + 1][qqp] && tab[qp][qqp] == tab[qp + 2][qqp] && tab[qp][qqp] == tab[qp + 3][qqp] && tab[qp][qqp] == tab[qp + 4][qqp]) {

                    tp.push(qp + "_" + qqp);
                    tp.push((qp + 1) + "_" + (qqp))
                    tp.push((qp + 2) + "_" + (qqp))
                    tp.push((qp + 3) + "_" + (qqp))
                    tp.push((qp + 4) + "_" + (qqp))
                    flag = false;
                }

            }

        }
        var flag1 = true;
        for (var q = 0; q < n; q++) {
            for (var qq = 0; qq < n; qq++) {
                if (flag1 == true && q == 0 && tab[q][qq] != 0 && tab[q][qq] == tab[q + 1][qq + 1] && tab[q][qq] == tab[q + 2][qq + 2] && tab[q][qq] == tab[q + 3][qq + 3] && tab[q][qq] == tab[q + 4][qq + 4] && tab[q][qq] == tab[q + 5][qq + 5] && tab[q][qq] == tab[q + 6][qq + 6] && tab[q][qq] == tab[q + 7][qq + 7] && tab[q][qq] == tab[q + 8][qq + 8]) {

                    tp.push(q + "_" + qq);
                    tp.push((q + 1) + "_" + (qq + 1))
                    tp.push((q + 2) + "_" + (qq + 2))
                    tp.push((q + 3) + "_" + (qq + 3))
                    tp.push((q + 4) + "_" + (qq + 4))
                    tp.push((q + 5) + "_" + (qq + 5))
                    tp.push((q + 6) + "_" + (qq + 6))
                    tp.push((q + 7) + "_" + (qq + 7))
                    tp.push((q + 8) + "_" + (qq + 8))
                    flag1 = false;
                }
                if (flag1 == true && q <= 1 && tab[q][qq] != 0 && tab[q][qq] == tab[q + 1][qq + 1] && tab[q][qq] == tab[q + 2][qq + 2] && tab[q][qq] == tab[q + 3][qq + 3] && tab[q][qq] == tab[q + 4][qq + 4] && tab[q][qq] == tab[q + 5][qq + 5] && tab[q][qq] == tab[q + 6][qq + 6] && tab[q][qq] == tab[q + 7][qq + 7]) {

                    tp.push(q + "_" + qq);
                    tp.push((q + 1) + "_" + (qq + 1))
                    tp.push((q + 2) + "_" + (qq + 2))
                    tp.push((q + 3) + "_" + (qq + 3))
                    tp.push((q + 4) + "_" + (qq + 4))
                    tp.push((q + 5) + "_" + (qq + 5))
                    tp.push((q + 6) + "_" + (qq + 6))
                    tp.push((q + 7) + "_" + (qq + 7))
                    flag1 = false;
                }
                if (flag1 == true && q <= 2 && tab[q][qq] != 0 && tab[q][qq] == tab[q + 1][qq + 1] && tab[q][qq] == tab[q + 2][qq + 2] && tab[q][qq] == tab[q + 3][qq + 3] && tab[q][qq] == tab[q + 4][qq + 4] && tab[q][qq] == tab[q + 5][qq + 5] && tab[q][qq] == tab[q + 6][qq + 6]) {

                    tp.push(q + "_" + qq);
                    tp.push((q + 1) + "_" + (qq + 1))
                    tp.push((q + 2) + "_" + (qq + 2))
                    tp.push((q + 3) + "_" + (qq + 3))
                    tp.push((q + 4) + "_" + (qq + 4))
                    tp.push((q + 5) + "_" + (qq + 5))
                    tp.push((q + 6) + "_" + (qq + 6))
                    flag1 = false;
                }
                if (flag1 == true && q <= 3 && tab[q][qq] != 0 && tab[q][qq] == tab[q + 1][qq + 1] && tab[q][qq] == tab[q + 2][qq + 2] && tab[q][qq] == tab[q + 3][qq + 3] && tab[q][qq] == tab[q + 4][qq + 4] && tab[q][qq] == tab[q + 5][qq + 5]) {

                    tp.push(q + "_" + qq);
                    tp.push((q + 1) + "_" + (qq + 1))
                    tp.push((q + 2) + "_" + (qq + 2))
                    tp.push((q + 3) + "_" + (qq + 3))
                    tp.push((q + 4) + "_" + (qq + 4))
                    tp.push((q + 5) + "_" + (qq + 5))
                    flag1 = false;
                }
                if (flag1 == true && q <= 4 && tab[q][qq] != 0 && tab[q][qq] == tab[q + 1][qq + 1] && tab[q][qq] == tab[q + 2][qq + 2] && tab[q][qq] == tab[q + 3][qq + 3] && tab[q][qq] == tab[q + 4][qq + 4]) {

                    tp.push(q + "_" + qq);
                    tp.push((q + 1) + "_" + (qq + 1))
                    tp.push((q + 2) + "_" + (qq + 2))
                    tp.push((q + 3) + "_" + (qq + 3))
                    tp.push((q + 4) + "_" + (qq + 4))
                    flag1 = false;
                }
            }
        }
        var flag2 = true;
        for (var q = 0; q < n; q++) {
            for (var qq = 8; qq >= 0; qq--) {
                if (flag2 == true && q == 0 && tab[q][qq] != 0 && tab[q][qq] == tab[q + 1][qq - 1] && tab[q][qq] == tab[q + 2][qq - 2] && tab[q][qq] == tab[q + 3][qq - 3] && tab[q][qq] == tab[q + 4][qq - 4] && tab[q][qq] == tab[q + 5][qq - 5] && tab[q][qq] == tab[q + 6][qq - 6] && tab[q][qq] == tab[q + 7][qq - 7] && tab[q][qq] == tab[q + 8][qq - 8]) {
                    tp.push(q + "_" + qq);
                    tp.push((q + 1) + "_" + (qq - 1))
                    tp.push((q + 2) + "_" + (qq - 2))
                    tp.push((q + 3) + "_" + (qq - 3))
                    tp.push((q + 4) + "_" + (qq - 4))
                    tp.push((q + 5) + "_" + (qq - 5))
                    tp.push((q + 6) + "_" + (qq - 6))
                    tp.push((q + 7) + "_" + (qq - 7))
                    tp.push((q + 8) + "_" + (qq - 8))
                    flag2 = false;
                }
                if (flag2 == true && q <= 1 && tab[q][qq] != 0 && tab[q][qq] == tab[q + 1][qq - 1] && tab[q][qq] == tab[q + 2][qq - 2] && tab[q][qq] == tab[q + 3][qq - 3] && tab[q][qq] == tab[q + 4][qq - 4] && tab[q][qq] == tab[q + 5][qq - 5] && tab[q][qq] == tab[q + 6][qq - 6] && tab[q][qq] == tab[q + 7][qq - 7]) {

                    tp.push(q + "_" + qq);
                    tp.push((q + 1) + "_" + (qq - 1))
                    tp.push((q + 2) + "_" + (qq - 2))
                    tp.push((q + 3) + "_" + (qq - 3))
                    tp.push((q + 4) + "_" + (qq - 4))
                    tp.push((q + 5) + "_" + (qq - 5))
                    tp.push((q + 6) + "_" + (qq - 6))
                    tp.push((q + 7) + "_" + (qq - 7))
                    flag2 = false;
                }
                if (flag2 == true && q <= 2 && tab[q][qq] != 0 && tab[q][qq] == tab[q + 1][qq - 1] && tab[q][qq] == tab[q + 2][qq - 2] && tab[q][qq] == tab[q + 3][qq - 3] && tab[q][qq] == tab[q + 4][qq - 4] && tab[q][qq] == tab[q + 5][qq - 5] && tab[q][qq] == tab[q + 6][qq - 6]) {

                    tp.push(q + "_" + qq);
                    tp.push((q + 1) + "_" + (qq - 1))
                    tp.push((q + 2) + "_" + (qq - 2))
                    tp.push((q + 3) + "_" + (qq - 3))
                    tp.push((q + 4) + "_" + (qq - 4))
                    tp.push((q + 5) + "_" + (qq - 5))
                    tp.push((q + 6) + "_" + (qq - 6))
                    flag2 = false;
                }
                if (flag2 == true && q <= 3 && tab[q][qq] != 0 && tab[q][qq] == tab[q + 1][qq - 1] && tab[q][qq] == tab[q + 2][qq - 2] && tab[q][qq] == tab[q + 3][qq - 3] && tab[q][qq] == tab[q + 4][qq - 4] && tab[q][qq] == tab[q + 5][qq - 5]) {

                    tp.push(q + "_" + qq);
                    tp.push((q + 1) + "_" + (qq - 1))
                    tp.push((q + 2) + "_" + (qq - 2))
                    tp.push((q + 3) + "_" + (qq - 3))
                    tp.push((q + 4) + "_" + (qq - 4))
                    tp.push((q + 5) + "_" + (qq - 5))
                    flag2 = false;
                }
                if (flag2 == true && q <= 4 && tab[q][qq] != 0 && tab[q][qq] == tab[q + 1][qq - 1] && tab[q][qq] == tab[q + 2][qq - 2] && tab[q][qq] == tab[q + 3][qq - 3] && tab[q][qq] == tab[q + 4][qq - 4]) {

                    tp.push(q + "_" + qq);
                    tp.push((q + 1) + "_" + (qq - 1))
                    tp.push((q + 2) + "_" + (qq - 2))
                    tp.push((q + 3) + "_" + (qq - 3))
                    tp.push((q + 4) + "_" + (qq - 4))
                    flag2 = false;
                }
            }

        }
        div3.innerText = (points);
        connection = false;
        if (tp.length > 0) {
            var a_a = "";
            var counter = 0;
            var max = 1;
            for (var b = 0; b < tp.length; b++) {
                a_a = tp[b];
                for (var bb = 0; bb < tp.length; bb++) {
                    if (tp[bb] == tp[b]) {
                        counter++
                    }

                    if (counter > max) {
                        max = counter;
                    }

                }
                counter = 0;
            }
            points -= (max - 1);
            points += tp.length;
            div3.innerText = (points);
            for (var r = 0; r < tp.length; r++) {
                tp[r] = tp[r].split("_")
                tab[tp[r][0]][tp[r][1]] = 0;
            }
            tp = [];
            connection = true;
        }
    }
    f_check();
});