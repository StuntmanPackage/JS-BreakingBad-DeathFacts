/**
 * Gebruikte tutorials:
 * 1) CSS Transitions (pagina characters): https://www.youtube.com/watch?v=8kK-cA99SA0
 * 2) 'Undefined' error in jQuery/JS fixen: https://www.daniweb.com/programming/web-development/threads/438340/json-value-undefined-in-jquery-ajax-request-to-php
 * 3) CSS Sticky footer (richtlijnen bekeken): https://css-tricks.com/couple-takes-sticky-footer/
 * 4) Loading-GIF idee: Tom Offringa Blackboard Collaborate opname ;-)
 * 5) Een image kunnen inladen vanuit een API: https://stackoverflow.com/questions/29354460/how-to-use-ajax-to-set-the-src-of-an-image
 * 
 */

/**
 * jQuery Documentatie hier: https://api.jquery.com/
 * jQuery Ajax Documentatie hier: https://api.jquery.com/category/ajax/
 */

/**
 * Korte uitleg over Ajax, ook al hoeft dit niet beschreven te worden, het is handig om aan korte 'samenvatting' te hebben, dus hieronder volgt de uitleg:
 * Url: de endpoint waar de data wordt weggehaald, deze kan verschillend zijn, bekijk https://breakingbadapi.com/documentation voor meer informatie.
 * dataType: hiermee vertel je jQuery wat voor soort response er wordt verwacht. Hier kan je JSON, XML of HTML neerzetten. Voor de opdracht is het noodzakelijk om JSON te gebruiken.
 * Success: als er geen fouten op de pagina zijn gevonden, voert ajax de functie: 'success' uit met de bijbehorende functie.
 * Error: als er fouten op de pagina gevonden zijn of er zijn te veel requests per 24 uur gedaan, komt er een foutmelding op beeld. Deze foutmelding heb ik alleen gedeclareerd bij eerste Ajax-call om herhaling in de code te voorkomen.
 */

$.ajax({
    url: "https://www.breakingbadapi.com/api/random-death",
    dataType: "JSON",
    success: randomDeath,
    error: showError,
});

//Deze functie laat een error-message zien wanneer te veel aanvragen zijn gedaan binnen 24 uur
function showError() {
    alert('ERROR 429: Too many requests, try again later... (10.000 request limit per 24 hours)');
};

/** 
 * Haalt data op vanuit de API van Breaking Bad
 * Endpoint /api/random-death is hier gebruikt
 * Bekijk https://breakingbadapi.com/documentation voor meer informatie
 * 
 * @param {*} response Haalt alle data op om een random death fact te kunnen tonen
 */
function randomDeath(response) {
    var deathName = response.death + " " + "(" + response.nickname + ")";
    var deathCause = response.cause;
    var deathRespon = response.responsible;
    var deathSeason = response.season;
    var deathEpisode = response.episode;
    var deathLastWords = response.last_words;
    var imgUrl = response.img;

    $("#deathName").html(deathName);
    $("#deathCause").html("Cause: " + `<br>` + deathCause);
    $("#deathRespon").html("Responsible: " + `<br>` + deathRespon);
    $("#deathSeason").html("Dead in season: " + deathSeason);
    $("#deathEpisode").html("Dead in episode: " + deathEpisode);
    $("#deathLastWords").html("Last Words: " + `<br>` + `"` + deathLastWords + `"`);
    $("#deathImg").attr("src", imgUrl);
};

/** 
 * Deze functie herlaad de pagina, om een nieuwe fact op te kunnen halen vanuit de API
 * Bekijk https://developer.mozilla.org/en-US/docs/Web/API/Location/reload voor meer informatie
 */
function refreshPage() {
    window.location.reload();
}

$.ajax({
    url: "https://www.breakingbadapi.com/api/characters",
    dataType: "JSON",
    success: countCharacters,
    error: showError,
});

/** 
 * Haalt data op vanuit de API van Breaking Bad
 * Endpoint /api/characters is hier gebruikt
 * Bekijk https://breakingbadapi.com/documentation voor meer informatie
 * 
 * @param {*} response Haalt het aantal characters van de serie Breaking Bad op
 */
function countCharacters(response) {
    var countCharacters = response.length;
    $("#counterChar").html("Characters: " + countCharacters);
}

$.ajax({
    url: "https://www.breakingbadapi.com/api/episodes",
    dataType: "JSON",
    success: countEpisodes,
    error: showError,
});

/** 
 * Haalt data op vanuit de API van Breaking Bad
 * Endpoint /api/episodes is hier gebruikt
 * Bekijk https://breakingbadapi.com/documentation voor meer informatie
 * 
 * @param {*} response Haalt het aantal episodes van de serie Breaking Bad op
 */
function countEpisodes(response) {
    $('.loading').hide();
    var countEpisodes = response.length;
    $("#counterEpi").html("Episodes: " + countEpisodes);
}

$.ajax({
    url: "https://www.breakingbadapi.com/api/quotes",
    dataType: "JSON",
    success: countQuotes,
    error: showError,
});

/** 
 * Haalt data op vanuit de API van Breaking Bad
 * Endpoint /api/quotes is hier gebruikt
 * Bekijk https://breakingbadapi.com/documentation voor meer informatie
 * 
 * @param {*} response Haalt het aantal quotes van de serie Breaking Bad op
 */
function countQuotes(response) {
    var countQuotes = response.length;
    $("#counterQuotes").html("Quotes: " + countQuotes);
}

$.ajax({
    url: "https://www.breakingbadapi.com/api/death-count",
    dataType: "JSON",
    success: countDeaths,
    error: showError,
});

/** 
 * Haalt data op vanuit de API van Breaking Bad
 * Endpoint /api/death-count is hier gebruikt
 * Hier is een speciale endpoint voor gemaakt, in tegenstelling tot de bovenste drie endpoints
 * Bekijk https://breakingbadapi.com/documentation voor meer informatie
 * 
 * @param {*} response Haalt het aantal vermoorden personen in de serie Breaking Bad op
 */
function countDeaths(response) {
    var countDeaths = response[0].deathCount;
    // console.log(countDeaths);
    $("#counterDeaths").html("Deaths: " + countDeaths);
}

//Character Page
$.ajax({
    url: "https://www.breakingbadapi.com/api/characters",
    dataType: "JSON",
    success: characterInfo,
    error: showError,
});

/** 
 * Haalt data op vanuit de API van Breaking Bad
 * Endpoint /api/characters is hier gebruikt
 * Bekijk https://breakingbadapi.com/documentation voor meer informatie
 * 
 * @param {*} response.name Haalt de naam van de character op
 * @param {*} response.nickname Haalt de bijnaam van de character op
 * @param {*} response.appearance Laat zien in welke seizoenen het character te zien is
 * @param {*} response.status Laat zien of het character in leven is aan het einde van de serie
 * @param {*} response.portrayed Haalt de naam van de acteur op
 * @param {*} response.img Haalt een foto van het character op en geeft deze weer
 */
function characterInfo(response) {
    $("#name1").html(response[0].name);
    $("#nick1").html(`"` + response[0].nickname + `"`);
    $("#season1").html("Seasons: " + response[0].appearance);
    $("#status1").html("Status: " + response[0].status);
    $("#actor1").html("Actor: " + response[0].portrayed);
    $("#charImg1").attr("src", response[0].img);

    $("#name2").html(response[2].name);
    $("#nick2").html(`"` + response[2].nickname + `"`);
    $("#season2").html("Seasons: " + response[2].appearance);
    $("#status2").html("Status: " + response[2].status);
    $("#actor2").html("Actor: " + response[2].portrayed);
    $("#charImg2").attr("src", response[2].img);

    $("#name3").html(response[1].name);
    $("#nick3").html(`"` + response[1].nickname + `"`);
    $("#season3").html("Seasons: " + response[1].appearance);
    $("#status3").html("Status: " + response[1].status);
    $("#actor3").html("Actor: " + response[1].portrayed);
    $("#charImg3").attr("src", response[1].img);

    $("#name4").html(response[4].name);
    $("#nick4").html(`"` + response[4].nickname + `"`);
    $("#season4").html("Seasons: " + response[4].appearance);
    $("#status4").html("Status: " + response[4].status);
    $("#actor4").html("Actor: " + response[4].portrayed);
    $("#charImg4").attr("src", response[4].img);

    $("#name5").html(response[6].name);
    $("#nick5").html(`"` + response[6].nickname + `"`);
    $("#season5").html("Seasons: " + response[6].appearance);
    $("#status5").html("Status: " + response[6].status);
    $("#actor5").html("Actor: " + response[6].portrayed);
    $("#charImg5").attr("src", response[6].img);

    $("#name6").html(response[7].name);
    $("#nick6").html(`"` + response[7].nickname + `"`);
    $("#season6").html("Seasons: " + response[7].appearance);
    $("#status6").html("Status: " + response[7].status);
    $("#actor6").html("Actor: " + response[7].portrayed);
    $("#charImg6").attr("src", response[7].img);

    $("#name7").html(response[8].name);
    $("#nick7").html(`"` + response[8].nickname + `"`);
    $("#season7").html("Seasons: " + response[8].appearance);
    $("#status7").html("Status: " + response[8].status);
    $("#actor7").html("Actor: " + response[8].portrayed);
    $("#charImg7").attr("src", response[8].img);

    $("#name8").html(response[11].name);
    $("#nick8").html(`"` + response[11].nickname + `"`);
    $("#season8").html("Seasons: " + response[11].appearance);
    $("#status8").html("Status: " + response[11].status);
    $("#actor8").html("Actor: " + response[11].portrayed);
    $("#charImg8").attr("src", response[11].img);
}

$.ajax({
    url: "https://www.breakingbadapi.com/api/quote/random",
    dataType: "JSON",
    success: randomQuote,
    error: showError,
});

/** 
 * Haalt data op vanuit de API van Breaking Bad
 * Endpoint /api/quote/random is hier gebruikt
 * Bekijk https://breakingbadapi.com/documentation voor meer informatie
 * 
 * @param {*} response Haalt een random quote en het character die de quote heeft uitgesproken op
 */
function randomQuote(response) {
    $('.loading').hide();
    var quote = response[0].quote;
    var quoteAuthor = response[0].author;

    // console.log(response);
    $("#quote").html(`"` + quote + `"`);
    $("#quoteAuthor").html(`-` + quoteAuthor);
};