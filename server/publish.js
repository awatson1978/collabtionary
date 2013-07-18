
// Publish users directory and user profile
Meteor.publish("usersDirectory", function (userId) {
    try{
        return Meteor.users.find({}, {fields: {
            '_id': true,
            'username': true,
            'profile': true,
            'profile.name': true,
            'profile.avatar': true,
            'profile.dropbox': true,
            'profile.activeCollaborator': true,
            'profile.role': true,

            'profile.visibility': true,
            'profile.age': true,
            'profile.state': true,
            'profile.applicantType': true,

            'profile.education': true,
            'profile.employment': true,
            'profile.interests': true,

            'emails': true,
            'emails[0].address': true,
            'emails.address': true
        }});
    }catch(error){
        console.log(error);
    }
});
Meteor.publish('userProfile', function (userId) {
    try{
        return Meteor.users.find({_id: this.userId}, {fields: {
            '_id': true,
            'username': true,
            'profile': true,
            'profile.name': true,
            'profile.avatar': true,
            'profile.collaborators': true,
            'profile.currentPage': true,
            'profile.pushRecipients': true,
            'profile.activeCollaborator': true,
            'profile.dropbox': true,
            'profile.role': true,

            'profile.visibility': true,
            'profile.socialsecurity': true,
            'profile.age': true,
            'profile.dateofbirth': true,
            'profile.zip': true,
            'profile.workphone': true,
            'profile.homephone': true,
            'profile.mobilephone': true,
            'profile.applicantType': true,

            'emails': true,
            'emails[0].address': true
        }});

    }catch(error){
        console.log(error);
    }
});
