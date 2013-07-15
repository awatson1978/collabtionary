
isAdmin = function(userId) {
    return Roles.userIsInRole(userId, ['admin']);
};

isPatient = function(userId) {
    return Roles.userIsInRole(userId, ['patient']);
};

isPhysician = function(userId) {
    return Roles.userIsInRole(userId, ['physician']);
};

isNurse = function(userId) {
    return Roles.userIsInRole(userId, ['host']);
};

isTechnologist = function(userId) {
    return Roles.userIsInRole(userId, ['broadcaster']);
};

isNurseAid = function(userId) {
    return Roles.userIsInRole(userId, ['viewer']);
};

isFamily = function(userId, docOwner) {
    return userId === docOwner;
};

slugify = function(text) {
    text = text.replace(/[^-a-zA-Z0-9,&\s]+/g, '');
    text = text.replace(/-/g, '_');
    text = text.replace(/\s/g, '-');
    text = text.toLowerCase();
    return text;
};
