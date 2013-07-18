Session.setDefault('userRoleSearch', 'Collaborator');
//Session.setDefault('applicantAnonymity', 'Any');
Session.set('profile_visibility_search', "");


Template.profileSearchTemplate.adminButtonActive = function(){
    if(Session.get('userRoleSearch') == "Admin"){
        return 'btn-success';
    }else{
        return 'btn-default';
    }
};
Template.profileSearchTemplate.editorButtonActive = function(){
    if(Session.get('userRoleSearch') == "Editor"){
        return 'btn-success';
    }else{
        return 'btn-default';
    }
};
Template.profileSearchTemplate.collaboratorButtonActive = function(){
    if(Session.get('userRoleSearch') == "Collaborator"){
        return 'btn-success';
    }else{
        return 'btn-default';
    }
};


Template.profileSearchTemplate.events({
    'click .admin-donor-button':function(){
        Session.set('userRoleSearch', 'Admin');
        Meteor.flush();
    },
    'click .editor-button':function(){
        Session.set('userRoleSearch', 'Editor');
        Meteor.flush();
    },
    'click .collaborator-button':function(){
        Session.set('userRoleSearch', 'Collaborator');
        Meteor.flush();
    }
});


//Template.profileSearchTemplate.foo = function(){
//    return Session.get('applicantType');
//};

//-------------------------------------------------------------
// A.  Filter Results When User Enters Search Term

Template.profileSearchTemplate.events({
    'keyup #usernameSearchInput': function(evt,tmpl){
        try{
            Session.set('profile_username_search', $('#usernameSearchInput').val());
            Meteor.flush();
        }catch(err){
            console.error(err);
        }
    }
});


//-------------------------------------------------------------
// userProfileFormTemplate

Template.userProfileFormTemplate.anonymousProfileButtonActive = function(){
    try{
        var user = Meteor.users.findOne(Session.get('selected_user'));
        if(user.profile.visibility == "Hidden"){
            return 'btn-success';
        }else{
            return 'btn-default;'
        }
    }catch(err){
        console.error(err);
    }
};
Template.userProfileFormTemplate.publicProfileButtonActive = function(){
    try{
        var user = Meteor.users.findOne(Session.get('selected_user'));
        if(user.profile.visibility == "Public"){
            return 'btn-success';
        }else{
            return 'btn-default;'
        }
    }catch(err){
        console.error(err);
    }
};
Template.userProfileFormTemplate.events({
    'click .profile-anonymous-button':function(){
        try{
            Meteor.users.update(this._id, {$set: { 'profile.visibility': "Hidden" }});
            //Meteor.flush();
        }catch(err){
            console.error(err);
        }
    },
    'click .profile-public-button':function(){
        try{
            Meteor.users.update(this._id, {$set: { 'profile.visibility': "Public" }});
            //Meteor.flush();
        }catch(err){
            console.error(err);
        }
    }
});



//-------------------------------------------------------------
//

Template.profileSearchTemplate.anonymousButtonActive = function(){
    if(Session.get('profile_visibility_search') == "Hidden"){
        return 'btn-success';
    }else{
        return 'btn-default;'
    }
};
Template.profileSearchTemplate.anyButtonActive = function(){
    if(Session.get('profile_visibility_search') == ""){
        return 'btn-success';
    }else{
        return 'btn-default;'
    }
};
Template.profileSearchTemplate.publicButtonActive = function(){
    if(Session.get('profile_visibility_search') == "Public"){
        return 'btn-success';
    }else{
        return 'btn-default;'
    }
};


Template.profileSearchTemplate.events({
    'click .anonymous-button': function(){
        try{
            //Session.set('applicantAnonymity', "Hidden");
            Session.set('profile_visibility_search', "Hidden");
            Meteor.flush();
        }catch(err){
            console.log(err);
        }
    },
    'click .any-button': function(){
        try{
            //Session.set('applicantAnonymity', "Any");
            Session.set('profile_visibility_search', "");
            Meteor.flush();
        }catch(err){
            console.log(err);
        }
    },
    'click .public-button': function(){
        try{
            //Session.set('applicantAnonymity', "Public");
            Session.set('profile_visibility_search', "Public");
            Meteor.flush();
        }catch(err){
            console.log(err);
        }
    }
});