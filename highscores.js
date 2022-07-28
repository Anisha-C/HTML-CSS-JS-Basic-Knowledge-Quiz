


function displayHS() {
    var storeScores = JSON.parse(localStorage.getItem("highscores")) || []
    var hs = document.getElementById("HS")
    hs.innerHTML = ""
    storeScores.map(score => {
        var ol = document.createElement("li")
        ol.textContent = `Score ${score.score}, Initials ${score.name}`
        hs.appendChild(ol)
    })
}

displayHS()
