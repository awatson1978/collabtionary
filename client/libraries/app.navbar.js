Template.navbarHeaderTemplate.events({
    'click .profile-icon':function(){
        if(Meteor.userId()){
            Meteor.Router.to('/myprofile');
        }else{
            Meteor.Router.to('/login');
        }
    },
    'click .navbar-brand': function(){
        Meteor.Router.to('/');

//        if(Session.get('queues_are_visible')){
//            Session.set('queues_are_visible', false);
//        }else{
//            Session.set('queues_are_visible', true);
//        }

        //Meteor.Router.to('/');
//        if(Meteor.userId()){
//            Meteor.Router.to('/search');
//        }else{
//            Meteor.Router.to('/');
//        }
    }
});



//-----------------------------------------------------
// NAVBARS

Template.navbarFooterTemplate.isVisible = function(){
    if(Session.get('currentDataset')){
        return true;
    }else{
        return false;
    }
};


Template.navbarFooterTemplate.isVisible = function(){
    if(Session.get('currentDataset')){
        return true;
    }else{
        return false;
    }
};



//-------------------------------------------------------------
// Footer Queues


Template.queuesList.queuesAreVisible = function(){
    //return Session.get('queues_are_visible');
    return true;
};

Template.queuesList.events({
    'click .dictionary-btn':function(){
        Session.set('show_login_menu', false);
        Session.set('selected_word', '');
        Session.set('active_queue', "");
        Session.set('must_have_image', false);
        Meteor.flush();
    },
    'click .flagged-queue-button':function(){
        Session.set('show_login_menu', false);
        Session.set('selected_word', '');
        Session.set('active_queue', "Flagged");
        Session.set('must_have_image', false);
        Meteor.flush();
    },
    'click .edited-queue-button':function(){
        Session.set('show_login_menu', false);
        Session.set('selected_word', '');
        Session.set('active_queue', "Edited");
        Session.set('must_have_image', false);
        Meteor.flush();
    },
    'click .approved-queue-button':function(){
        Session.set('show_login_menu', false);
        Session.set('selected_word', '');
        Session.set('active_queue', "Approved");
        Session.set('must_have_image', false);
        Meteor.flush();
    },
    'click .deleting-queue-button':function(){
        Session.set('show_login_menu', false);
        Session.set('selected_word', '');
        Session.set('active_queue', "Deleting");
        Session.set('must_have_image', false);
        Meteor.flush();
    },
    'click .visual-queue-button':function(){
        Session.set('show_login_menu', false);
        Session.set('selected_word', '');
        Session.set('active_queue', "");
        Session.set('must_have_image', true);
        Meteor.flush();
    }
});

