var thoughtLib = require("./thoughtLib");
module.exports = {
     ThoughtForTheDay: function(){
        var position = Math.floor(Math.random()* thoughtLib.length );
        return "Thought for the day: " + thoughtLib[position];
    }
    
}

    

