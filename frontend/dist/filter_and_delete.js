// file that holds filter and delete logic

var filter = document.getElementsByClassName("filter");
var games = document.getElementsByClassName("game shadowed")

// adding event listeners to all filter buttons
for(var i=0; i<filter.length; i++){
    filter[i].addEventListener("click", function(){
        clickFilter(event.target)
    })
}

// show elements depending on which filter is clicked
function clickFilter(specificFilter){
    var selection = specificFilter.textContent.toLowerCase();
    for(var i=0;i<games.length;i++){
        if(selection === "all"){
            games[i].classList.remove("hidden")
        }else{
            games[i].classList.add("hidden")
            if(games[i].classList.contains(selection)){
                games[i].classList.remove("hidden")
            }
        }
    }
}


var remove = document.getElementsByClassName("delete");

// add event listeners to all delete buttons
for(var i=0; i<remove.length; i++){
    remove[i].addEventListener("click", function(){
        removeGame(event.target);
    })
}

// call the delete route with the specific id of the game to be deleted
function removeGame(removeButtonOnGame){
    var parent = removeButtonOnGame.parentElement;
    var temp = parent.getAttribute("href");
    var id = temp.split("games/")[1];
    $.ajax({
        type: "POST",
        data: id,
        url: "/games/" + id + "/delete",
        success: function(response){
            console.log("success")
        },
        error: function(response){
            console.log("error: " + response);      
        }
    })
}