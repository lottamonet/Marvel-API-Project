var privateKey = '118c720a466dd26e1abbb3cb4b779b477a6353a8';
var publicKey = 'cc5b4472ce8ff9ce63367faba0beb981';


async function marvelAPICall(e){ 
    e.preventDefault();
    $('#content').css("visibility", "visible");
    $('#heading').css("color", "red");
    let mq = window.matchMedia( "(min-width: 767px)" );
    if (mq.matches) {
      $('#content').css("margin-bottom", "4em")
    }
else {
   $('#content').css("margin-bottom", "2em")
}
    let ts = 1;
    let hash = "57bf92a2ad590993fd98a7befc1c9a2a"
    let name = $('#search-bar').val();
    let limit = 100;
    let response = await fetch(`https://gateway.marvel.com:80/v1/public/characters?nameStartsWith=${name}&ts=${ts}&limit=${limit}&apikey=${publicKey}&hash=${hash}`);
    let data = await response.json();
    console.log(data);
    let resultsArray = data.data.results;
    resultsArray.forEach((result) => {
        if (result.description ===""){
            $('#content').append(`<div class="characterCard"><img src='${result.thumbnail.path}.${result.thumbnail.extension}'><h2 class="charHeading">${result.name}</h2><p class="charDescription"> No description available.</p></div>`).css("display", "flex")
        } else if (result%2===0){
            $('.characterCard').css('align-self', 'end')
        } else {
            $('#content').append(`<div class="characterCard"><img src='${result.thumbnail.path}.${result.thumbnail.extension}'><h2 class="charHeading">${result.name}</h2><p class="charDescription"> ${result.description}</p></div>`).css("display", "flex")
        }
        
})
}

function thanosSnap(){
    $("input:text").val("");
    $('#content').empty().css("visibility", "hidden");
}



   

$('#form').submit( function(e){
    marvelAPICall(e);
});
 
$('.snap').on("click", function(){
    thanosSnap();
});

$('.infinity').on("click", function(){
    thanosSnap();
});


