var privateKey = 'd858d467ba62aae9c14f0122931bfef12c3f2068';
var publicKey = '4ebd10e897955a2f749d92b4ef3ec2a6';


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
    let hash = "2ed2b38fccdd1a15e810ae7edefd095a"
    let name = $('#search-bar').val();
    let limit = 100;
    let response = await fetch(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${name}&ts=${ts}&limit=${limit}&apikey=${publicKey}&hash=${hash}`);
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


