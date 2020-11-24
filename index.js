function displayResults(responseJson) {
    console.log(responseJson)
    $('#results').empty()
    if (responseJson.total == 0) {
        $('#results').append("<p>No Results Found</p>")
    }
    for (let i = 0; i < responseJson.results.length; i++) {
        $('#results').append(`
    <div>
    ${responseJson.results[i].title}
    <img src="${responseJson.results[i].thumb}"/>
    <a target=_"new" href="http://discogs.com${responseJson.results[i].uri}">link </a>
    </div>
    `)
    }
}
function displayYouTubeResults(responseJson) {
    console.log(responseJson)
    $('#items').empty()
    if (responseJson.total == 0) {
        $('#items').append("<p>No Results Found</p>")
    }
    for (let i = 0; i < responseJson.items.length; i++) {
        $('#items').append(`
        <div>
        ${responseJson.items[i].snippet.title}
        <img src="${responseJson.items[i].snippet.thumbnails.default.url}"/>
        <a target="_new" href="https://www.youtube.com/watch?v=${responseJson.items[i].id.videoId}">link </a>
        </div>
        `)
    }
}
function getData(artist) {
    const url = `https://api.discogs.com/database/search?key=ndloVTshlhFtEIYyFNhU&secret=ZqsEuKrftkjHRRZreaslgqjkPBBURgxK&q=${artist}`
    fetch(url)
        .then(response => response.json())
        .then(responseJson => displayResults(responseJson))
}
function getYouTubeData(artist) {
    const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyD0C-SY2ZwuTufdMCF-8XzBIWZpRWTx1oc&q=${artist}`
    fetch(url)
        .then(response => response.json())
        .then(responseJson => displayYouTubeResults(responseJson))
}
const consumer = "ndloVTshlhFtEIYyFNhU"
const secret = "ZqsEuKrftkjHRRZreaslgqjkPBBURgxK"
function watchForm() {
    $("form").submit(event => {
        event.preventDefault();
        const artist = event.target.searchterm.value
        console.log(artist)
        getYouTubeData(artist)
        getData(artist)
    })
}
$(watchForm)