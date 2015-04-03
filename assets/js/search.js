

$(function() {
      
      
      
    getRow = function(article) {
        
        if(article.hasOwnProperty('snippet') === false) {
            return false;
        }
        
        if(article.snippet.hasOwnProperty('title') === false) {
            return false;
        }
        
        if(article.snippet.hasOwnProperty('thumbnails') === false) {
            return false;
        }
        
        var rowArticle   = $('<article/>', { 
            'class': 'row',
            'html' : [
                $('<div/>', { 
                    'class':'col-xs-3 col-md-2 col-lg-1',
                    'html' : [
                        $('<a/>', { 
                            'href' : 'https://www.youtube.com/watch?v='+article.id.videoId,
                            'target' : '_blank',
                            'html' : [
                                $('<img/>', { 'class':'img-thumbnail img-responsive', 'src': article.snippet.thumbnails.medium.url })
                            ]
                        })
                    ]
                }),
                $('<div/>', { 
                    'class':'col-xs-9 col-md-10 col-lg-12 description',
                    'html' : [
                         $('<h4/>',  { 
                            'class':'youtube-headline',    
                            'html':  $('<a/>', { 
                                'href' : 'https://www.youtube.com/watch?v='+article.id.videoId,
                                'target' : '_blank',
                                'html' : article.snippet.title
                            })
                        }), 
                        $('<div/>', { 
                            'class':'youtube-description', 
                            'html': article.snippet.description 
                        })
                    ]
                })
            ]
        }); 
        
        return rowArticle;     
    }   
        
    getUrl = function(value, request) {  
        
        console.log(value);
        
        var url = 'https://www.googleapis.com/youtube/v3/search?';

        if (typeof(value)==='undefined') {
            value = '';
        }
        
        console.log(value);
        
        if (typeof(request)!=='object') {
            var request = {
                'key' : '[key goes here]',
                'part' : 'snippet',
                'order' : 'date',
                'safeSearch' : 'strict',
                'type' : 'video',
                'videoCaption' : 'any',
                'maxResults' : 20
            }        
        }        
        
        for (var key in request) {
            if (request.hasOwnProperty(key)) {
                url = url + key + '=' + request[key] + '&'; 
            }
        }
        
        url = url + 'q='+value;
        return url;
        
    };
    
    
    $( "#btn-search" ).click(function() { 
        
        console.log( "-- SEARCH CLICKED" );
            
        var url = getUrl( $('#search').val() );
        
        console.log('-- URL: ' + url);

        $.ajax({
            url: url,
            dataType: "json",  
            beforeSend: function( xhr ) { 
                console.log('-- REQUESTING YOUTUBE');
            }
        }).done(function(jsonData) {
            
            console.log('-- RECEIVING YOUTUBE DATA');
            console.log(jsonData);
            
            var results = []
            if(jsonData.hasOwnProperty('items')) {
                $.each( jsonData.items, function( key, value ) {
                    results.push( getRow(value) );
                });
                $("#results-inner").empty();
                $("#results-inner").append(results);
            }                        
        });
    });
    
    
});
