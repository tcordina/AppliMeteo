var owm_key = keys.OWM_KEY;
navigator.geolocation.getCurrentPosition(onSuccess, onError);
function onSuccess(position) {
    getWeather(position.coords.latitude, position.coords.longitude);
}
function onError(error) {
    alert('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
}
function getWeather(lat, lng) {
    $.ajax({
        type: "GET",
        url: "http://api.openweathermap.org/data/2.5/weather",
        data: {
            lat: lat,
            lon: lng,
            units: 'metric',
            lang: 'fr',
            appid: owm_key
        },
        dataType: "json",
        success: function (response) {
            console.log(response);
            var city = response.name.toUpperCase();
            var temp = Math.round(response.main.temp)+' °C';
            var desc = response.weather[0].description;
            var icon = 'http://openweathermap.org/img/w/'+response.weather[0].icon+'.png';
            var main = response.weather[0].main.toLowerCase();
            var dt = new Date(response.dt);
            var last = addZero(dt.getUTCHours()) + ':' + addZero(dt.getUTCMinutes());
            var woutput='<h2 id="city">'+city+'</h2><p id="temp">'+temp+'</p><img id="icon" src="'+icon+'" alt="icon"/><p id="desc">'+desc+'</p><p id="last">Données actualisées à '+last+'</p>';
            $('#weather').append(woutput);
            $('.meteo').css({'background': 'url(img/weather/'+main+'.jpg) no-repeat', 'background-size': 'cover'});
        }
    });
    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
}