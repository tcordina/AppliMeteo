var owm_key = keys.OWM_KEY;
navigator.geolocation.getCurrentPosition(onSuccess, onError);
$('#error').html('Impossible de localiser votre appareil, vérifiez que vous avez activé le GPS.');
function onSuccess(position) {
    $('#error').remove();
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
            var city = response.name.toUpperCase();
            var temp = Math.round(response.main.temp)+' °C';
            var desc = response.weather[0].description;
            var icon = 'http://openweathermap.org/img/w/'+response.weather[0].icon+'.png';
            var main = response.weather[0].main.toLowerCase();
            var dt = new Date(response.dt);
            var last = addZero(dt.getUTCHours()) + ':' + addZero(dt.getUTCMinutes());
            var wind = response.wind.speed;
            var deg = degToCompass(response.wind.deg);
            var woutput='<h2 id="city">'+city+'</h2><p id="temp">'+temp+'</p><img id="icon" src="'+icon+'" alt="icon"/><p id="desc">'+desc+'</p><p id="wind">Vent: '+Math.round(wind*3.6)+' km/h - '+deg+'</p>';
            $('#weather').append(woutput);
            $('.meteo').css({'background': 'url(img/weather/'+main+'.jpg) no-repeat', 'background-size': 'cover'});
            var soutput='<p>Données météo reçues à '+last+'.</p>';
            $('#soutput').append(soutput);
        }
    });
    function degToCompass(i) {
        var val = Math.floor((i / 22.5) + 0.5);
        var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        return arr[(val % 16)];
    }
    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
}