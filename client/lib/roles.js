
isAdmin = function(userId) {
    return Roles.userIsInRole(userId, ['Admin']);
};

isEditor = function(userId) {
    return Roles.userIsInRole(userId, ['Editor']);
};

isCollaborator = function(userId) {
    return Roles.userIsInRole(userId, ['Collaborator']);
};


setRole = function(userId, role) {
    if (Roles.userIsInRole(userId, 'Admin')) {
        Roles.removeUsersFromRoles(userId, 'Admin');
    }
    if (Roles.userIsInRole(userId, 'Editor')) {
        Roles.removeUsersFromRoles(userId, 'Editor');
    }
    if (Roles.userIsInRole(userId, 'Collaborator')) {
        Roles.removeUsersFromRoles(userId, 'Collaborator');
    }
    return Roles.addUsersToRoles(userId, role);
};


slugify = function(text) {
    text = text.replace(/[^-a-zA-Z0-9,&\s]+/g, '');
    text = text.replace(/-/g, '_');
    text = text.replace(/\s/g, '-');
    text = text.toLowerCase();
    return text;
};
