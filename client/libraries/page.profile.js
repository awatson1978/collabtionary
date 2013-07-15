

Template.userProfileTemplate.helpers({
    userProfile: function(){
        try{
            //Session.set('selected_user_object', Meteor.users.findOne(Session.get('selected_user')));
            return Meteor.users.findOne(Session.get('selected_user'));
        }catch(error){
            console.log(error);
        }
    }
});

//-------------------------------------------------------------
// B.  Generate Index

Template.userAccountsListTemplate.userAccountsList = function(){
    try{
        return Meteor.users.find({
            'profile.applicantType': Session.get('applicantType'),
            'username': { $regex: Session.get('profile_username_search'), $options: 'i' },
            'profile.name': { $regex: Session.get('profile_name_search'), $options: 'i' },
            'profile.visibility': { $regex: Session.get('profile_visibility_search'), $options: 'i' },

            'profile.employment': { $regex: Session.get('profile_employment_search'), $options: 'i' },
            'profile.interests': { $regex: Session.get('profile_interests_search'), $options: 'i' }

        });
    }catch(error){
        console.log(error);
    }
};
Template.userAccountCardTemplate.primary_email = function(){
    try{
        return this.emails[0].address;
    }catch(error){
        console.error(error);
    }
};

//-------------------------------------------------------------
// C.  Display Record in Edit Pannel When Clicked

Template.userAccountCardTemplate.events({
    'click .user-account-card':function(event, template){
        if(Session.get('current_page') == "searchProfiles"){
            Session.set('selected_user', this._id);
            Meteor.Router.to('/profile/' + this._id);

        }else if(Session.get('current_page') == "manageProfiles"){
            console.info('selected user: ' + this._id);
            Session.set('selected_user', this._id);
            Session.set('current_task','view');
            //Session.set('global_edit', false);
        }




    }
});



//-------------------------------------------------------------
// D.  Edit Form Helper

Template.userProfileFormTemplate.helpers({
    userProfile: function(){
        try{
            if(Session.get('current_task') == 'new'){
                return {
                    "username":"",
                    "emails[0].address":"",

                    "profile.name":"",
                    "profile.socialsecurity":"",

                    "profile.age":"",
                    "profile.dateofbirth":"",

                    "profile.address":"",
                    "profile.city":"",
                    "profile.county":"",
                    "profile.state":"",
                    "profile.zip":"",

                    "profile.workphone":"",
                    "profile.homephone":"",
                    "profile.mobilephone":"",


                    "profile.applicantType":"",
                    "profile.applicantionStatus":"",

                    "profile.education":"",
                    "profile.employment":"",
                    "profile.interests":"",

                    "profile.sexhistory.injections":"",
                    "profile.sexhistory.hemophilia":"",
                    "profile.sexhistory.prostitution":"",
                    "profile.sexhistory.client":"",
                    "profile.sexhistory.std":"",
                    "profile.sexhistory.bicurious":"",
                    "profile.sexhistory.africa":""


//                    "profile.education.highschool":"",
//                    "profile.education.college":"",
//                    "profile.education.collegeDegree":"",
//                    "profile.education.graduate":"",
//                    "profile.education.graduateDegree":"",
//                    "profile.education.other":"",

//                    "profile.employment.currentlyEmployed":"",
//                    "profile.employment.occupation":"",
//                    "profile.employment.employmentStatus":"",

//                    "profile.maritalStatus":"",
                };
            }else{
                Session.set('selected_user_object', Meteor.users.findOne(Session.get('selected_user')));
                return Meteor.users.findOne(Session.get('selected_user'));
            }
        }catch(error){
            console.log(error);
        }
    }
});


//-------------------------------------------------------------
// E. Active Input When Clicked ot Tapped

setSessionTrue = function(session_name, selectedId){
    if(Meteor.userId() == selectedId){
        Session.set(session_name, true);
        Meteor.flush();
    }else if(isAdmin(Meteor.userId())){
        Session.set(session_name, true);
        Meteor.flush();
    }else{
        Session.set(session_name, false);
    }
    // ifAdmin or if(Session.get('selected_user') == Meteor.userId())
//    Session.set(session_name, true);
//    Meteor.flush();
}

Template.userProfileFormTemplate.events({
    'click #usernameInput': setSessionTrue('editing_username', this._id),
    'click #primaryEmailInput': setSessionTrue('editing_primary_email', this._id),
    'click #nameInput': setSessionTrue('editing_name', this._id),
    'click #socialSecurityInput': setSessionTrue('editing_social_security', this._id),
    'click #addressInput': setSessionTrue('editing_address', this._id),
    'click #cityInput': setSessionTrue('editing_city', this._id),
    'click #stateInput': setSessionTrue('editing_state', this._id),
    'click #zipInput': setSessionTrue('editing_zip', this._id),
    'click #workPhoneInput': setSessionTrue('editing_workphone', this._id),
    'click #homePhoneInput': setSessionTrue('editing_homephone', this._id),
    'click #mobilePhoneInput': setSessionTrue('editing_mobilephone', this._id),
    'click #applicantTypeInput': setSessionTrue('editing_applicant_type', this._id),
    'click #applicantStatusInput': setSessionTrue('editing_applicant_status', this._id),

    'click #educationInput': setSessionTrue('editing_education', this._id),
    'click #employmentInput': setSessionTrue('editing_employment', this._id),
    'click #interestsInput': setSessionTrue('editing_interests', this._id)
});



//-------------------------------------------------------------
// F. Submit Input to Mongo (Update)


//submitInput = function(elementId, databaseField, sessionVariable){
//    if((Meteor.userId() == this._id || (isAdmin(Meteor.userId())))){
//        okCancelEvents('#usernameInput',
//            {
//                ok: function (value) {
//                    Meteor.users.update(Session.get('selected_user'), {$set: { username: value }});
//                    Session.set('editing_username', false);
//                    Meteor.flush();
//                },
//                cancel: function () {
//                    Session.set('editing_username', false);
//                }
//            }
//        )
//    }
//}


Template.userProfileFormTemplate.events(
    okCancelEvents('#usernameInput',
        {
            ok: function (value) {
                Meteor.users.update(Session.get('selected_user'), {$set: { username: value }});
                Session.set('editing_username', false);
                Meteor.flush();
            },
            cancel: function () {
                Session.set('editing_username', false);
            }
        }
    )
);
Template.userProfileFormTemplate.events(
    okCancelEvents('#primaryEmailInput',
        {
            ok: function (value) {
                Meteor.users.update(Session.get('selected_user'), {$set: { 'emails[0].address': value }});
                Session.set('editing_primary_email', false);
                Meteor.flush();
            },
            cancel: function () {
                Session.set('editing_primary_email', false);
            }
        }
    )
);
Template.userProfileFormTemplate.events(
    okCancelEvents('#nameInput',
        {
            ok: function (value) {
                Meteor.users.update(Session.get('selected_user'), {$set: { 'profile.name': value }});
                Session.set('editing_name', false);
                Meteor.flush();
            },
            cancel: function () {
                Session.set('editing_name', false);
            }
        }
    )
);
Template.userProfileFormTemplate.events(
    okCancelEvents('#socialSecurityInput',
        {
            ok: function (value) {
                Meteor.users.update(Session.get('selected_user'), {$set: { 'profile.socialsecurity': value }});
                Session.set('editing_social_security', false);
                Meteor.flush();
            },
            cancel: function () {
                Session.set('editing_social_security', false);
            }
        }
    )
);
Template.userProfileFormTemplate.events(
    okCancelEvents('#addressInput',
        {
            ok: function (value) {
                Meteor.users.update(Session.get('selected_user'), {$set: { 'profile.address': value }});
                Session.set('editing_address', false);
                Meteor.flush();
            },
            cancel: function () {
                Session.set('editing_address', false);
            }
        }
    )
);
Template.userProfileFormTemplate.events(
    okCancelEvents('#cityInput',
        {
            ok: function (value) {
                Meteor.users.update(Session.get('selected_user'), {$set: { 'profile.city': value }});
                Session.set('editing_city', false);
                Meteor.flush();
            },
            cancel: function () {
                Session.set('editing_city', false);
            }
        }
    )
);
Template.userProfileFormTemplate.events(
    okCancelEvents('#stateInput',
        {
            ok: function (value) {
                Meteor.users.update(Session.get('selected_user'), {$set: { 'profile.state': value }});
                Session.set('editing_state', false);
                Meteor.flush();
            },
            cancel: function () {
                Session.set('editing_state', false);
            }
        }
    )
);
Template.userProfileFormTemplate.events(
    okCancelEvents('#zipInput',
        {
            ok: function (value) {
                Meteor.users.update(Session.get('selected_user'), {$set: { 'profile.zip': value }});
                Session.set('editing_zip', false);
                Meteor.flush();
            },
            cancel: function () {
                Session.set('editing_zip', false);
            }
        }
    )
);
Template.userProfileFormTemplate.events(
    okCancelEvents('#workPhoneInput',
        {
            ok: function (value) {
                Meteor.users.update(Session.get('selected_user'), {$set: { 'profile.workphone': value }});
                Session.set('editing_workphone', false);
                Meteor.flush();
            },
            cancel: function () {
                Session.set('editing_workphone', false);
            }
        }
    )
);
Template.userProfileFormTemplate.events(
    okCancelEvents('#homePhoneInput',
        {
            ok: function (value) {
                Meteor.users.update(Session.get('selected_user'), {$set: { 'profile.homephone': value }});
                Session.set('editing_homephone', false);
                Meteor.flush();
            },
            cancel: function () {
                Session.set('editing_homephone', false);
            }
        }
    )
);
Template.userProfileFormTemplate.events(
    okCancelEvents('#mobilePhoneInput',
        {
            ok: function (value) {
                Meteor.users.update(Session.get('selected_user'), {$set: { 'profile.mobilephone': value }});
                Session.set('editing_mobilephone', false);
                Meteor.flush();
            },
            cancel: function () {
                Session.set('editing_mobilephone', false);
            }
        }
    )
);
Template.userProfileFormTemplate.events(
    okCancelEvents('#applicantTypeInput',
        {
            ok: function (value) {
                Meteor.users.update(Session.get('selected_user'), {$set: { 'profile.applicantType': value }});
                Session.set('editing_applicant_type', false);
                Meteor.flush();
            },
            cancel: function () {
                Session.set('editing_applicant_type', false);
            }
        }
    )
);
Template.userProfileFormTemplate.events(
    okCancelEvents('#applicantStatusInput',
        {
            ok: function (value) {
                Meteor.users.update(Session.get('selected_user'), {$set: { 'profile.applicantStatus': value }});
                Session.set('editing_applicant_status', false);
                Meteor.flush();
            },
            cancel: function () {
                Session.set('editing_applicant_status', false);
            }
        }
    )
);
Template.userProfileFormTemplate.events(
    okCancelEvents('#educationInput',
        {
            ok: function (value) {
                Meteor.users.update(Session.get('selected_user'), {$set: { 'profile.education': $('#educationInput').val() }});
                Session.set('editing_education', false);
                Meteor.flush();
            },
            cancel: function () {
                Session.set('editing_education', false);
            }
        }
    )
);
Template.userProfileFormTemplate.events(
    okCancelEvents('#employmentInput',
        {
            ok: function (value) {
                Meteor.users.update(Session.get('selected_user'), {$set: { 'profile.employment': $('#employmentInput').val() }});
                Session.set('editing_employment', false);
                Meteor.flush();
            },
            cancel: function () {
                Session.set('editing_employment', false);
            }
        }
    )
);
Template.userProfileFormTemplate.events(
    okCancelEvents('#interestsInput',
        {
            ok: function (value) {
                Meteor.users.update(Session.get('selected_user'), {$set: { 'profile.interests': $('#interestsInput').val() }});
                Session.set('editing_interests', false);
                Meteor.flush();
            },
            cancel: function () {
                Session.set('editing_interests', false);
            }
        }
    )
);

//-------------------------------------------------------------
// D. Display Readonly Value

//enableInput = function(sessionVaribale){
//    if(Session.get('global_edit')){
//        return "enabled";
//    }else if(Session.get(sessionVariable)){
//        return "enabled";
//    }else{
//        return "readonly";
//    }
//}

enableInput = function(sessionVariable){
    console.log('Session.get(selected_user): ' + Session.get('selected_user'));
    console.log('Meteor.userId(): ' + Meteor.userId());

    if(Meteor.userId() === Session.get('selected_user')){
        return "enabled";
    }else{
        return "readonly";
    }
}



Template.userProfileFormTemplate.username_enabled = function(){
    if((Meteor.userId() === Session.get('selected_user') || (isAdmin(Meteor.userId())))){ return "enabled"; }else{ return "readonly";}
}

Template.userProfileFormTemplate.primary_email_enabled = function(){
    if((Meteor.userId() === Session.get('selected_user') || (isAdmin(Meteor.userId())))){ return "enabled"; }else{ return "readonly";}
}
Template.userProfileFormTemplate.profile_name_enabled = function(){
    if((Meteor.userId() === Session.get('selected_user') || (isAdmin(Meteor.userId())))){ return "enabled"; }else{ return "readonly";}
}
Template.userProfileFormTemplate.profile_socialsecurity_enabled = function(){
    if((Meteor.userId() === Session.get('selected_user') || (isAdmin(Meteor.userId())))){ return "enabled"; }else{ return "readonly";}
}
Template.userProfileFormTemplate.profile_address_enabled = function(){
    if((Meteor.userId() === Session.get('selected_user') || (isAdmin(Meteor.userId())))){ return "enabled"; }else{ return "readonly";}
}
Template.userProfileFormTemplate.profile_city_enabled = function(){
    if((Meteor.userId() === Session.get('selected_user') || (isAdmin(Meteor.userId())))){ return "enabled"; }else{ return "readonly";}
}
Template.userProfileFormTemplate.profile_state_enabled = function(){
    if((Meteor.userId() === Session.get('selected_user') || (isAdmin(Meteor.userId())))){ return "enabled"; }else{ return "readonly";}
}
Template.userProfileFormTemplate.profile_zip_enabled = function(){
    if((Meteor.userId() === Session.get('selected_user') || (isAdmin(Meteor.userId())))){ return "enabled"; }else{ return "readonly";}
}
Template.userProfileFormTemplate.profile_workphone_enabled = function(){
    if((Meteor.userId() === Session.get('selected_user') || (isAdmin(Meteor.userId())))){ return "enabled"; }else{ return "readonly";}
}
Template.userProfileFormTemplate.profile_homephone_enabled = function(){
    if((Meteor.userId() === Session.get('selected_user') || (isAdmin(Meteor.userId())))){ return "enabled"; }else{ return "readonly";}
}
Template.userProfileFormTemplate.profile_mobilephone_enabled = function(){
    if((Meteor.userId() === Session.get('selected_user') || (isAdmin(Meteor.userId())))){ return "enabled"; }else{ return "readonly";}
}
Template.userProfileFormTemplate.profile_applicant_type_enabled = function(){
    if((Meteor.userId() === Session.get('selected_user') || (isAdmin(Meteor.userId())))){ return "enabled"; }else{ return "readonly";}
}
Template.userProfileFormTemplate.profile_applicant_status_enabled = function(){
    if((Meteor.userId() === Session.get('selected_user') || (isAdmin(Meteor.userId())))){ return "enabled"; }else{ return "readonly";}
}

Template.userProfileFormTemplate.profile_education_enabled = function(){
    if((Meteor.userId() === Session.get('selected_user') || (isAdmin(Meteor.userId())))){ return "enabled"; }else{ return "readonly";}
}
Template.userProfileFormTemplate.profile_employment_enabled = function(){
    if((Meteor.userId() === Session.get('selected_user') || (isAdmin(Meteor.userId())))){ return "enabled"; }else{ return "readonly";}
}
Template.userProfileFormTemplate.profile_interests_enabled = function(){
    if((Meteor.userId() === Session.get('selected_user') || (isAdmin(Meteor.userId())))){ return "enabled"; }else{ return "readonly";}
}


//-------------------------------------------------------------
//

Session.setDefault('is_selecting_profile_type', false);

Template.userProfileFormTemplate.isPublic = function(){
    try{
        //var user = Meteor.users.findOne(Session.get('selected_user'));
        return true;
//        if(user.profile.visibility == "Public"){
//            return true;
//        }else{
//            return false;
//        }
    }catch(error){
        console.error(error);
    }
};
Template.userProfileFormTemplate.isSelectingProfileType = function(){
    return Session.get('is_selecting_profile_type');
};

Template.userProfileFormTemplate.events({
    'click .profile-image': function(){
        toggleSession('is_selecting_profile_type', true);
    },
    'click .sperm-icon-btn': function(){
        Meteor.users.update(Session.get('selected_user'),{ $set: { 'profile.applicantType': 'Sperm Donor'}});
        toggleSession('is_selecting_profile_type', true);
    },
    'click .zygote-icon-btn': function(){
        Meteor.users.update(Session.get('selected_user'),{ $set: { 'profile.applicantType': 'Egg Donor'}});
        toggleSession('is_selecting_profile_type', true);
    },
    'click .pregnant-icon-btn': function(){
        Meteor.users.update(Session.get('selected_user'),{ $set: { 'profile.applicantType': 'Surrogate'}});
        toggleSession('is_selecting_profile_type', true);
    },
    'click .female-icon-btn': function(){
        Meteor.users.update(Session.get('selected_user'),{ $set: { 'profile.applicantType': 'Egg Donor'}});
        toggleSession('is_selecting_profile_type', true);
    },
    'click .male-icon-btn': function(){
        Meteor.users.update(Session.get('selected_user'),{ $set: { 'profile.applicantType': 'Sperm Donor'}});
        toggleSession('is_selecting_profile_type', true);
    },
    'click .conception-icon-btn': function(){
        toggleSession('is_selecting_profile_type', true);
    }
});

Template.userProfileFormTemplate.avatar_for_account_type = function(){
    try{
        if(this.profile){
            if(this.profile.applicantType == "Egg Donor"){
                return "/images/icons/Zygote.png";
            }else if (this.profile.applicantType == "Sperm Donor"){
                return "/images/icons/Sperm.png";
            }else if(this.profile.applicantType == "Surrogate"){
                return "/images/icons/Pregnant.png";
            }else{
                return "/images/icons/Conception.png";
            }
        }else{
            return "/images/icons/Default_User.jpg";
        }
    }catch(error){
        console.error(error);
    }
};


Template.userAccountCardTemplate.isPublic = function(){
    try{
        if(this.profile.visibility == "Public"){
            return true;
        }else{
            return false;
        }
    }catch(error){
        console.error(error);
    }
};
Template.userAccountCardTemplate.userlist_avatar_for_account_type = function(){
    try{
        if(this.profile.applicantType == "Egg Donor"){
            return "images/icons/Zygote.png";
        }else if (this.profile.applicantType == "Sperm Donor"){
            return "images/icons/Sperm.png";
        }else if(this.profile.applicantType == "Surrogate"){
            return "images/icons/Pregnant.png";
        }else{
            return "images/icons/Conception.png";
        }
    }catch(error){
        console.error(error);
    }
};


//-----------------------------------------------

Template.profileSearchTemplate.isAdmin = function(){
    return isAdmin(Meteor.userId());
};
Template.userProfileFormTemplate.isAdmin = function(){
    return isAdmin(Meteor.userId());
};
Template.userProfileFormTemplate.canEdit = function(){
    if(Meteor.userId() == this._id){
        return true;
    }else{
        return isAdmin(Meteor.userId());
    }
};