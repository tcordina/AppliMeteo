$(document).ready(function () {
    var ytb_key = keys.YTB_KEY;
    //Récupération de la playlist uploads via apis youtube
    $.get(
        "https://www.googleapis.com/youtube/v3/channels", {
            part: 'contentDetails',
            id: 'UCnBToLuuyq7Qn5j7e5BRhaw',
            key: ytb_key
        },
        function(data) {
            $.each(data.items, function(i, item) { 
                    playlistId = item.contentDetails.relatedPlaylists.uploads;
                    getVids(playlistId);
            })
        }
    );
    //Récupération des vidéos de la playlist
    function getVids(playlistId){
        $.get(
            "https://www.googleapis.com/youtube/v3/playlistItems", {
                part: 'snippet',
                maxResults: 5,
                playlistId: playlistId,
                key: ytb_key
            },
            function(data) {
                $.each(data.items, function(i, item) {
                    videoId = item.snippet.resourceId.videoId;
                    var stats = getStats(videoId);
                });
            }
        );
    }
    //Récupération des statistiques de chaque vidéo
    function getStats(videoId){
        $.ajax({
            type: "GET",
            url: "https://www.googleapis.com/youtube/v3/videos",
            data: {
                part:'snippet,statistics',
                id: videoId,
                key: ytb_key
            },
            dataType: "json",
            success: function (data) {
                var item = data.items[0];
                var output = '';
                var videoTitle = item.snippet.title;
                var videoThumb = item.snippet.thumbnails.medium.url;
                var videoViews = item.statistics.viewCount;
                var videoLikes = item.statistics.likeCount;
                var videoDislikes = item.statistics.dislikeCount;
                var videoComments = item.statistics.commentCount;
                var videoDateTime = item.snippet.publishedAt;
                var date = new Date(videoDateTime);
                var videoDate = date.getDate() + '/' + (+date.getMonth() + +1) + '/' + date.getFullYear();
                var likeRatio = Math.round((videoLikes/(1*videoLikes + 1*videoDislikes))*100);
                output = '<div class="video" data-sort="'+videoDate+'"><img class="center-img" src="'+videoThumb+'" alt=""><a href="https://www.youtube.com/watch?v='+videoId+'" target="_blank"><h4 class="center-text">'+videoTitle+'</h4></a><p>'+videoViews+' vues | '+videoComments+' commentaires</p><p><i>publiée le '+videoDate+'</p></div>';
                $('#vids').append(output);
            },
            async: true
        });
    }
});