$(function() {

    window.jasonParser = function(url, conatiner) {

        var urlObj = new URL(url);
        if (window.location.protocol !== urlObj.protocol) {
            url = "cross-protocol-bypass.php?url=" + encodeURIComponent(url);
        }

        conatiner.text("Loading...");

        $.getJSON(url, null )
            .done(fillContainer)
            .fail(function( jqxhr, textStatus, error ) {
                var err = textStatus + ", " + error;
                conatiner.text("Request Failed: " + err);
            });
        
        function fillContainer(jsonData) {
            var content = createJsonEl(jsonData)
            conatiner.html(content);
        }

        function createJsonEl(jsonData) {
            return (function iterateJson (key, jsonNode){
                if (Array.isArray(jsonNode) || (typeof jsonNode === 'object' && jsonNode !== null)) { // if list
                    var listEl = $("<ul>");
                    for(var _key in jsonNode) {
                        listEl.append(iterateJson(_key, jsonNode[_key]));
                    }
                    return createListNodeEl(key, listEl, jsonNode);
                } else {
                    return createEndNodeEl(key, jsonNode);
                }

            })(null, jsonData);
        }

        function createListNodeEl(key, listEl, jsonNode) {
            if (key !== null) {
                return $("<li>")
                    .addClass("list-node")
                    .append(createKeyEl(key)
                        .click(function(e){
                            $(this).parent().toggleClass("closed");
                            $(this).siblings("ul").slideToggle();
                            e.stopPropagation();
                        }))
                    .append(createJsonPreviewEl(jsonNode))
                    .append(listEl);
            } else { // Root Element
                return (listEl);
            }
        }

        function createEndNodeEl(key, jsonNode) {
            return $("<li>")
                .addClass("end-node")
                .append(createKeyEl(key))
                .append(createVarEl(jsonNode));
        }

        function createKeyEl(key) {
            return $("<span>")
                .addClass("key")
                .text(key.toString());
        }

        function createJsonPreviewEl(jsonNode) {
            var n = 100;
            var jsonStr = JSON.stringify(jsonNode);
            jsonStr = (jsonStr.length > n) ? jsonStr.substr(0, n-1) + "…" : jsonStr;
            return $("<span>")
                .addClass("json-preview")
                .text(jsonStr);
        }

        function createVarEl(variable) {
            return $("<span>")
                .addClass("variable")
                .addClass(typeof variable)
                .text(variable.toString());
        }
    }

});