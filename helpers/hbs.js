const moment = require('moment')

module.exports = {
    formatDate: function (date, format) {
        return moment(date).format(format)
    },
    //takes in string and length and cuts it to a specific length we want (shorten and even out all cards)
    truncate: function (str,len) {  //we are passing a string and controlling the length; length defined in index.hbs on {{body}}
        if(str.length > len && str.length > 0) {
            let new_str = str + ' '
            new_str = str.substr(0, len)
            new_str = str.substr(0, new_str.lastIndexOf(' '))
            new_str = new_str.length > 0 ? new_str : str.substr(0, len)
            return new_str + '...'  //adds the ... at the end to let user know text continues
        }
        return str
    },
    stripTags: function (input) {  //this is taking out the <p> or any html tags that show up on our stories Text
        return input.replace(/<(?:.|\n)*?>/gm, '') //regex saying replace all this stuff with '' (nothing)
    },
    editIcon: function (storyUser, loggedUser, storyId, floating = true) {
        if (storyUser._id.toString() == loggedUser._id.toString()) { //if story user id is same as person logged in
            if(floating) { //the font awesome icon of Edit should show if true
                return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`
            }else {
                return `<a href="/stories/edit/${storyId}"><i class="fas fa-edit"></i></a>`
            }
        } else {
            return ''
        }
    },
}

