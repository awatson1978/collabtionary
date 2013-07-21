Session.setDefault('selected_word', 'life');
Session.setDefault('active_queue', '');
Session.setDefault('queues_are_visible', false);



Template.queuesList.isCollaborator = function(){
    if(Meteor.userId()){
        return isCollaborator(Meteor.userId()) || isEditor(Meteor.userId()) || isAdmin(Meteor.userId());
    }else{
        return false;
    }
};
Template.queuesList.isEditor = function(){
    return isEditor(Meteor.userId()) || isAdmin(Meteor.userId());
};
Template.queuesList.isAdmin = function(){
    return isAdmin(Meteor.userId());
};



//-------------------------------------------------------------
// dictionaryDatasetTemplate

Template.dictionaryDatasetTemplate.notEditingWord = function(){
    if(Session.get('selected_word')){
        return false;
    }else{
        return true;
    }
};




//-------------------------------------------------------------
// aboutPanel

Template.aboutPanel.events({
    'click .get-the-code-button': function(){
        window.open = "https://github.com/awatson1978/collabtionary";
    },
    'click .about-the-author-button': function(){
        window.open = "https://coderwall.com/awatson1978";
    }
});

