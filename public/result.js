var max;
function getDateKey() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();
    return mm+'-'+dd+'-'+yyyy;
}

var dati = getDateKey();
$.get("/logger/day/"+ dati, function (data) {
    document.getElementById("moodi").innerHTML = stringi();
    function stringi() {
        max = Math.max(data.emotion_tone.anger, data.emotion_tone.disgust, data.emotion_tone.fear, data.emotion_tone.sadness, data.emotion_tone.joy);
        if (max == data.emotion_tone.anger) {
            carding("anger");
            return "anger";
        }
        if (max == data.emotion_tone.disgust) {
            carding("disgust");
            return "disgust";
        }
        if (max == data.emotion_tone.fear) {
            carding("fear");
            return "fear";
        }
        if (max == data.emotion_tone.sadness) {
            carding("sadness");
            return "sadness";
        }
        if (max == data.emotion_tone.joy) {
            carding("joy");
            return "joy";
        }
        
    }
    console.log(data.social_tone.openness)
    var chart1 = c3.generate({
        size: {
            width: 220,
            height: 220
        },
        bindto: '#g1',
        data: {
            // iris data from R
            columns: [
                ['data1', 30],
                ['data2', 120],
            ],
            type: 'pie',
            onclick: function (d, i) {
                console.log("onclick", d, i);
            },
            onmouseover: function (d, i) {
                console.log("onmouseover", d, i);
            },
            onmouseout: function (d, i) {
                console.log("onmouseout", d, i);
            }
        }
    });

    setTimeout(function () {
        chart1.load({
            columns: [
                ["anger", data.emotion_tone.anger],
                ["disgust", data.emotion_tone.disgust],
                ["fear", data.emotion_tone.fear],
                ["sadness", data.emotion_tone.sadness],
                ["joy", data.emotion_tone.joy],
            ]
        });
    }, 1500);

    setTimeout(function () {
        chart1.unload({
            ids: 'data1'
        });
        chart1.unload({
            ids: 'data2'
        });
    }, 2500);


    var chart2 = c3.generate({
        bindto: '#g2',
        data: {
            // iris data from R
            columns: [
                ['data1', 30],
                ['data2', 120],
            ],
            type: 'pie',
            onclick: function (d, i) {
                console.log("onclick", d, i);
            },
            onmouseover: function (d, i) {
                console.log("onmouseover", d, i);
            },
            onmouseout: function (d, i) {
                console.log("onmouseout", d, i);
            }
        }
    });

    setTimeout(function () {
        chart2.load({
            columns: [
                ["analytical", data.language_tone.analytical],
                ["confident", data.language_tone.confident],
                ["tentative", data.language_tone.tentative],
            ]
        });
    }, 1500);

    setTimeout(function () {
        chart2.unload({
            ids: 'data1'
        });
        chart2.unload({
            ids: 'data2'
        });
    }, 2500);

    var chart3 = c3.generate({
        size: {
            width: 230,
            height: 230
        },
        bindto: '#g3',
        data: {
            // iris data from R
            columns: [
                ['data1', 30],
                ['data2', 120],
            ],
            type: 'pie',
            onclick: function (d, i) {
                console.log("onclick", d, i);
            },
            onmouseover: function (d, i) {
                console.log("onmouseover", d, i);
            },
            onmouseout: function (d, i) {
                console.log("onmouseout", d, i);
            }
        }
    });

    setTimeout(function () {
        chart3.load({
            columns: [
                ["openness", data.social_tone.openness],
                ["conscientiousness", data.social_tone.conscientiousness],
                ["extraversion", data.social_tone.extraversion],
                ["agreableness", data.social_tone.agreableness],
                ["emotional range", data.social_tone.emotional_range],
            ]
        });
    }, 1500);

    setTimeout(function () {
        chart3.unload({
            ids: 'data1'
        });
        chart3.unload({
            ids: 'data2'
        });
    }, 2500);

    var chart4 = c3.generate({
        bindto: '#gl1',
        data: {
            columns: [
                ['data1', 30, 200, 100, 400, 150, 250],
                ['data2', 130, 100, 140, 200, 150, 50],
                ['data3', 10, 10, 10, 20, 150, 50],

            ],
            type: 'spline'
        }
    });

});

function carding(mood){
    console.log(mood);
    $.get("/recommend/video/" + mood, function(data){
        document.getElementById("link").innerHTML = data;
        documet.getElementById("link").href = data;
    });
    $.get("/recommend/quote/" + mood, function(data){
        document.getElementById("").innerHTML = data;
    })
    $.get("/recommend/activity/" + mood, function(data){
        document.getElementById("").innerHTML = data;
    })
}

