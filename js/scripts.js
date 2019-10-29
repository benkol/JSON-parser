$(function() {
    $(".url-form").submit(function(event) {
        event.preventDefault();
        var url = $("#url-input").val();
        try {
            new URL(url);
            
            var conatiner = $(".json-parser");
            window.jasonParser(url, conatiner);
        } catch (err) {
            alert("Invalid URL");  
        }
    });
});