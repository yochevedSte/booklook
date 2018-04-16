$body = $("body");

$(document).on({
    ajaxStart: function () { $body.addClass("loading"); },
    ajaxStop: function () { $body.removeClass("loading"); }
});

var fetch = function (input) {
    $.ajax({
        method: "GET",
        url: 'https://www.googleapis.com/books/v1/volumes?' + input,
        success: function (data) {
            console.log(data);
            displayBooks(data);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
};


$('.search-title-btn').on('click', function () {
    $(".book-results-section").empty();
    var search_input = $(".search-input").val();
    $('.error-input:visible').hide();
    fetch("q=intitle:" + search_input);

});


$('.search-author-btn').on('click', function () {
    $(".book-results-section").empty();
    $('.error-input:visible').hide();
    fetch("q=inauthor:" + $(".search-input").val());
});

$('.search-isbn-btn').on('click', function () {
    $(".book-results-section").empty();
    var search_input = $(".search-input").val();
    if (isNaN(search_input)) {
        $('.error-input:hidden').show();
        $('.error-input').text("Invalid ISBN number");
    }
    else {
        $('.error-input:visible').hide();
        fetch("q=isbn:" + search_input);
    }
});

function displayBooks(data) {
    if (data.totalItems == 0) {
        $(".book-results-section").append("No results found");
    }
    else {
        for (var i = 0; i < data.items.length && i < 20; i++) {
            var book = data.items[i];
            var $book_info = $("<div class=\"book-info\" id=\"" + book.id + "\"></div>");
            $book_info.append("<h1 class=\"title\">" + book.volumeInfo.title + "</h1>");
            $book_info.append();
            $book_info.append("<p>" + (book.volumeInfo.description || "No description") + "</p>");
            if(book.volumeInfo.authors){
            $book_info.append("<h3>Written by: " + (book.volumeInfo.authors.join()) + "</h3>");
            }
            $book_info.append("<img src=" + (book.volumeInfo.imageLinks || {}).smallThumbnail + "></img>")
            $(".book-results-section").append($book_info);
        }
    }
}


$(".book-results-section").on("click", ".book-info", function () {
    display_book_info(this);
});

function display_book_info(current_book) {
    $(".book-results-section").empty();
    $(".book-results-section").append($(current_book));
}


