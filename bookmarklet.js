(function(){
  // the minimum version of jQuery we want
  var v = '1.3.2';
  var targetURL = 'http://backbonejs.org';
  console.log('entering bookmarklet');

  // check prior inclusion and version
  if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
    console.log('entering if jQuery');
    var done = false;
    var script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-' + v + '.js';
    script.onload = script.onreadystatechange = function(){
      if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
        done = true;
        console.log('entering nested init');
        initMyBookmarklet();
      }
    };
    document.getElementsByTagName('head')[0].appendChild(script);
  } else {
    initMyBookmarklet();
  }
  
  function initMyBookmarklet() {
    (function() {
      console.log('entering initialization');
        // Code goes here
            var articleTitle = document.title;
            //alert(test);
            // var saveAPI = window.location.origin + '/articles';
            var saveAPI = 'http://localhost:8000/article';
            var saveArticle = function saveArticle(saveAPI, articleTitle) {
              console.log('entering ajax request');
              $.ajax({
                url: saveAPI,
                method: 'POST',
                data: articleTitle
              })
              .done(function(data) {
                console.log('Successfully recorded' + data);
              })
              .fail(function(jqXHR, status, err) {
                console.log('Error:', err);
              });
            };

            saveArticle(saveAPI, articleTitle);
            // popitup(rss_url)
            // function popitup(url) {
            //     newwindow=window.open(url,'name','height=200,width=150');
            //     if (window.focus) {newwindow.focus()}
            //     return false;
            //     }

    })();
  }

})();