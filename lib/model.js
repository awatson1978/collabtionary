
Meteor.users.allow({
    insert: function (userId, doc) {
        // the user must be logged in, and the document must be owned by the user
        //return (userId && doc.owner === userId);
        return true;
    },
    update: function (userId, doc, fields, modifier) {
        // can only change your own documents
        //return doc.owner === userId;
        return true;
    },
    remove: function (userId, doc) {
        // can only remove your own documents
        //return doc.owner === userId;
        return true;
    }
});


//
//if(isAdmin(userId)){
//    return Meteor.users.find({}, {fields: {
//        '_id': true,
//        'username': true,
//        'profile': true,
//        'profile.name': true,
//        'profile.avatar': true,
//        'profile.dropbox': true,
//        'profile.activeCollaborator': true,
//        'profile.role': true,
//
//        'profile.visibility': true,
//        'profile.age': true,
//        'profile.state': true,
//        'profile.applicantType': true,
//
//        'profile.education': true,
//        'profile.employment': true,
//        'profile.interests': true,
//
//        'emails': true,
//        'emails[0].address': true,
//        'emails.address': true
//    }});
//}else{
//
//}