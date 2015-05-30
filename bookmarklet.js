(function(){
  // the minimum version of jQuery we want
  var v = '2.1.4';
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
            var data = {
              title: document.title,
              url: window.location.href
            };
            //alert(test);
            var saveAPI = 'http://localhost:8000/articles';
            var saveArticle = function saveArticle(saveAPI, articleTitle) {
              console.log('entering ajax request with data', data);
              $.ajax({
                url: saveAPI,
                method: 'POST',
                contentType: 'application/json;charset=UTF-8',
                data: JSON.stringify(data)
              })
              .done(function(data) {
                console.log('Successfully recorded' + data);
              })
              .fail(function(jqXHR, status, err) {
                console.log('Error:', err);
              });
            };

            console.log('articleTitle', articleTitle);
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