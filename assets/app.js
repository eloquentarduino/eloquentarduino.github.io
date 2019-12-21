jQuery(function() {
    /* add caption to images */
    jQuery('img').each(function(i, img) {
        var alt = img.getAttribute('alt')

        if (!alt) return;

        var description = document.createElement('p');

        description.className = 'image__alt';
        description.innerHTML = alt.replace('@', '<br>');
        img.parentNode.appendChild(description);
    })

    /* search */
    var client = algoliasearch('NL9BINXREY', '7d39fdcf348ffd918d29a7d2d578b90d')
    var index = client.initIndex('wp_searchable_posts');
    var myAutocomplete = autocomplete('#search-input', {hint: false}, [
        {
            source: function(query, callback) {
                autocomplete.sources.hits(index, {hitsPerPage: 5})(query, function(suggestions) {
                    var index = {}

                    suggestions = suggestions.filter(function(suggestion) {
                        if (suggestion.permalink in index)
                            return false

                        return (index[suggestion.permalink] = true)
                    })
                    
                    callback(suggestions)
                })
            },
            displayKey: 'title',
            templates: {
                suggestion: function(suggestion) {
                    return "<span>"+ suggestion._highlightResult.post_title.value +"</span>"
                }
            }
        }
        ])
        .on('autocomplete:selected', function(event, suggestion, dataset) {
            window.location.href = suggestion.permalink.replace('eloquent.blog/', 'eloquentarduino.github.io/')
        });

    /*document.querySelector(".searchbox [type='reset']").addEventListener("click", function() {
        document.querySelector(".aa-input").focus();
        this.classList.add("hide");
        myAutocomplete.autocomplete.setVal("");
    });*/
})