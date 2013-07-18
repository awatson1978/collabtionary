Session.set('selected_user', '');
Session.set('selected_word', '');
Session.set('selected_day', '');
Session.set('selected_record', '');

Session.set('global_edit', false);

Session.set('user_search_term', '');
Session.set('account_search_term', '');


Meteor.Router.add({
    '/': function(){
        return 'dictionaryDatasetTemplate';
    },
    '/myprofile': function(){
        if(Meteor.userId()){
            Session.set('selected_user', Meteor.userId());
            Session.set('current_page', 'myProfile');
            return 'myProfileTemplate';
        }else{
            return 'signin';
        }
    },
    '/manage': function(){
        if(Meteor.userId()){
            Session.set('current_page', 'manageProfiles');
            Session.set('show_login_menu', false);
            return 'manageProfilesTemplate';
        }else{
            return 'signin';
        }
    },
    '/search': function(){
        if(Meteor.userId()){
            Session.set('current_page', 'searchProfiles');
            Session.set('show_login_menu', false);
            return 'searchProfilesTemplate';
        }else{
            return 'landingPage';
        }
    },
    '/profile/:id': function(id) {
        if(Meteor.userId()){
            console.log('we are at ' + this.canonicalPath);
            console.log("our parameters: " + this.params);

            // access parameters in order a function args too
            Session.set('current_page', 'userProfile');
            Session.set('selected_user', id);
            Session.set('show_login_menu', false);
            return 'myProfileTemplate';
        }else{
            return 'signin';
        }
    },
    '/notfound': function(){
        return 'notFound';
    },
    '/signin': function(){
        return 'signin';
    },
    '/login': function(){
        return 'signin';
    },
    '/loading': function(){
        return 'loading';
    },
    '/logout': function(){
        return 'logout';
    },
    '*': function(){
        return 'dictionaryDatasetTemplate';
    }
});