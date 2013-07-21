// if the database is empty on server start, create some sample data.
// we create a separate bootstrap.users.js file
// because we'll be wanting to set up a number of patient-scenario test users



Meteor.startup(function () {
    if (Meteor.users.find().count() === 0) {
        console.info('no users in database!  adding some default users');

        var userId = null;


        // crate our administrator
        userId = Accounts.createUser({
            username: 'admin',
            password: 'admin',
            email: 'admin@test.org',
            profile: {
                name: 'Administrator',
                role: 'Admin',
                avatar: '/icons/Default_user.jpg',

                zip: Math.floor((Math.random()*100000)),
                phone: Math.floor((Math.random()*1000)) + "-555-" + Math.floor((Math.random()*10000)),

                applicantType: "Person",
                notes: ""
            }
        });
        Roles.addUsersToRoles(userId, 'Admin');
        console.info('Account created: ' + userId);
        // crate our administrator
        userId = Accounts.createUser({
            username: 'editor',
            password: 'editor',
            email: 'editor@test.org',
            profile: {
                name: 'Editor ',
                role: 'Editor',
                avatar: '/icons/Default_user.jpg',

                zip: Math.floor((Math.random()*100000)),
                phone: Math.floor((Math.random()*1000)) + "-555-" + Math.floor((Math.random()*10000)),

                applicantType: "Editor",
                notes: ""
            }
        });
        Roles.addUsersToRoles(userId, 'Editor');
        console.info('Account created: ' + userId);
        // crate our administrator
        userId = Accounts.createUser({
            username: 'collaborator',
            password: 'collaborator',
            email: 'collaborator@test.org',
            profile: {
                name: 'Collaborator',
                role: 'Collaborator',
                avatar: '/icons/Default_user.jpg',

                zip: Math.floor((Math.random()*100000)),
                phone: Math.floor((Math.random()*1000)) + "-555-" + Math.floor((Math.random()*10000)),

                applicantType: "Person",
                notes: ""
            }
        });
        Roles.addUsersToRoles(userId, 'Collaborator');
        console.info('Account created: ' + userId);


//        // crate our administrator
//        userId = Accounts.createUser({
//            username: 'ada',
//            password: 'ada',
//            email: 'ada@test.org',
//            profile: {
//                name: 'Ada Lovelace',
//                role: 'Admin',
//                avatar: '/avatars/ada.lovelace.jpg',
//
//                zip: Math.floor((Math.random()*100000)),
//                phone: Math.floor((Math.random()*1000)) + "-555-" + Math.floor((Math.random()*10000)),
//
//                applicantType: "Person",
//                notes: ""
//            }
//        });
//        Roles.addUsersToRoles(userId, 'Admin');
//        console.info('Account created: ' + userId);
//
//        userId = Accounts.createUser({
//            username: 'alan',
//            password: 'alan',
//            email: 'alan@test.org',
//            profile: {
//                name: 'Alan Turing',
//                role: 'Admin',
//                avatar: '/avatars/alan.turing.jpg',
//
//                zip: Math.floor((Math.random()*100000)),
//                phone: Math.floor((Math.random()*1000)) + "-555-" + Math.floor((Math.random()*10000)),
//
//                applicantType: "Person",
//                notes: ""
//            }
//        });
//        Roles.addUsersToRoles(userId, 'Admin');
//        console.info('Account created: ' + userId);
//
//        userId = Accounts.createUser({
//            username: 'alexis',
//            password: 'alexis',
//            email: 'alexis@test.org',
//            profile: {
//                name: 'Alexis Carrel',
//                role: 'Editor',
//                avatar: '/avatars/alexis.carrel.jpg',
//
//                zip: Math.floor((Math.random()*100000)),
//                phone: Math.floor((Math.random()*1000)) + "-555-" + Math.floor((Math.random()*10000)),
//
//                applicantType: "Person",
//                notes: ""
//            }
//        });
//        Roles.addUsersToRoles(userId, 'Editor');
//        console.info('Account created: ' + userId);
//
//        userId = Accounts.createUser({
//            username: 'doisy',
//            password: 'doisy',
//            email: 'doisy@test.org',
//            profile: {
//                name: 'Edward Doisy',
//                role: 'Collaborator',
//                avatar: '/avatars/edward.doisy.jpg',
//
//                zip: Math.floor((Math.random()*100000)),
//                phone: Math.floor((Math.random()*1000)) + "-555-" + Math.floor((Math.random()*10000)),
//
//                applicantType: "Person",
//                notes: ""
//            }
//        });
//        Roles.addUsersToRoles(userId, 'Collaborator');
//        console.info('Account created: ' + userId);
//
//        userId = Accounts.createUser({
//            username: 'tatum',
//            password: 'tatum',
//            email: 'tatum@test.org',
//            profile: {
//                name: 'Edward Tatum',
//                role: 'Collaborator',
//                avatar: '/avatars/edward.tatum.jpg',
//
//                zip: Math.floor((Math.random()*100000)),
//                phone: Math.floor((Math.random()*1000)) + "-555-" + Math.floor((Math.random()*10000)),
//
//                applicantType: "Person",
//                notes: ""
//            }
//        });
//        Roles.addUsersToRoles(userId, 'Collaborator');
//        console.info('Account created: ' + userId);
//
//        userId = Accounts.createUser({
//            username: 'florence',
//            password: 'florence',
//            email: 'florence@test.org',
//            profile: {
//                name: 'Florence Nightingale',
//                role: 'Editor',
//                avatar: '/avatars/florence.nightingale.jpg',
//
//                visibility: 'Hidden',
//
//                zip: Math.floor((Math.random()*100000)),
//                phone: Math.floor((Math.random()*1000)) + "-555-" + Math.floor((Math.random()*10000)),
//
//                applicantType: "Person",
//                notes: ""
//            }
//        });
//        Roles.addUsersToRoles(userId, 'Editor');
//        console.info('Account created: ' + userId);
//
//        userId = Accounts.createUser({
//            username: 'galen',
//            password: 'galen',
//            email: 'galen@test.org',
//            profile: {
//                name: 'Galen',
//                role: 'Collaborator',
//                avatar: '/avatars/galen.jpg',
//
//                visibility: 'Hidden',
//
//                zip: Math.floor((Math.random()*100000)),
//                phone: Math.floor((Math.random()*1000)) + "-555-" + Math.floor((Math.random()*10000)),
//
//                applicantType: "Person",
//                notes: ""
//            }
//        });
//        Roles.addUsersToRoles(userId, 'Collaborator');
//        console.info('Account created: ' + userId);
//
//        userId = Accounts.createUser({
//            username: 'george',
//            password: 'george',
//            email: 'george@test.org',
//            profile: {
//                name: 'George Beadle',
//                role: 'Collaborator',
//                avatar: '/avatars/george.beadle.jpg',
//
//                zip: Math.floor((Math.random()*100000)),
//                phone: Math.floor((Math.random()*1000)) + "-555-" + Math.floor((Math.random()*10000)),
//
//                applicantType: "Person",
//                notes: ""
//            }
//        });
//        Roles.addUsersToRoles(userId, 'Collaborator');
//        console.info('Account created: ' + userId);
//
//        userId = Accounts.createUser({
//            username: 'wald',
//            password: 'wald',
//            email: 'wald@test.org',
//            profile: {
//                name: 'George Wald',
//                role: 'Collaborator',
//                avatar: '/avatars/george.wald.jpg',
//
//                zip: Math.floor((Math.random()*100000)),
//                phone: Math.floor((Math.random()*1000)) + "-555-" + Math.floor((Math.random()*10000)),
//
//                applicantType: "Person",
//                notes: ""
//            }
//        });
//        Roles.addUsersToRoles(userId, 'Collaborator');
//        console.info('Account created: ' + userId);
//
//        userId = Accounts.createUser({
//            username: 'carver',
//            password: 'carver',
//            email: 'carver@test.org',
//            profile: {
//                name: 'George Washington Carver',
//                role: 'Collaborator',
//                avatar: '/avatars/george.washington.carver.jpg',
//
//                zip: Math.floor((Math.random()*100000)),
//                phone: Math.floor((Math.random()*1000)) + "-555-" + Math.floor((Math.random()*10000)),
//
//                applicantType: "Person",
//                notes: ""
//            }
//        });
//        Roles.addUsersToRoles(userId, 'Collaborator');
//        console.info('Account created: ' + userId);
//
//        userId = Accounts.createUser({
//            username: 'hermann',
//            password: 'hermann',
//            email: 'hermann@test.org',
//            profile: {
//                name: 'Hermann Muller',
//                role: 'Collaborator',
//                avatar: '/avatars/hermann.muller.jpg',
//
//                zip: Math.floor((Math.random()*100000)),
//                phone: Math.floor((Math.random()*1000)) + "-555-" + Math.floor((Math.random()*10000)),
//
//                applicantType: "Person",
//                notes: ""
//            }
//        });
//        Roles.addUsersToRoles(userId, 'Collaborator');
//        console.info('Account created: ' + userId);
//
//        userId = Accounts.createUser({
//            username: 'hygea',
//            password: 'hygea',
//            email: 'hygea@test.org',
//            profile: {
//                name: 'Hygea',
//                role: 'Editor',
//                avatar: '/avatars/hygea.jpg',
//
//                zip: Math.floor((Math.random()*100000)),
//                phone: Math.floor((Math.random()*1000)) + "-555-" + Math.floor((Math.random()*10000)),
//
//                applicantType: "Person",
//                notes: ""
//            }
//        });
//        Roles.addUsersToRoles(userId, 'Editor');
//        console.info('Account created: ' + userId);
//
//        userId = Accounts.createUser({
//            username: 'james',
//            password: 'james',
//            email: 'james@test.org',
//            profile: {
//                name: 'James Watson',
//                role: 'Collaborator',
//                avatar: '/avatars/james.watson.jpg',
//
//                zip: Math.floor((Math.random()*100000)),
//                phone: Math.floor((Math.random()*1000)) + "-555-" + Math.floor((Math.random()*10000)),
//
//                applicantType: "Person",
//                notes: ""
//            }
//        });
//        Roles.addUsersToRoles(userId, 'Collaborator');
//        console.info('Account created: ' + userId);
//
//        userId = Accounts.createUser({
//            username: 'eccles',
//            password: 'eccles',
//            email: 'eccles@test.org',
//            profile: {
//                name: 'Sir John Eccles',
//                role: 'Collaborator',
//                avatar: '/avatars/john.eccles.jpg',
//
//                zip: Math.floor((Math.random()*100000)),
//                phone: Math.floor((Math.random()*1000)) + "-555-" + Math.floor((Math.random()*10000)),
//
//                applicantType: "Person",
//                notes: ""
//            }
//        });
//        Roles.addUsersToRoles(userId, 'Collaborator');
//        console.info('Account created: ' + userId);
//
//        userId = Accounts.createUser({
//            username: 'kurt',
//            password: 'kurt',
//            email: 'kurt@test.org',
//            profile: {
//                name: 'Kurt Vonnegut',
//                role: 'Editor',
//                avatar: '/avatars/kurt.vonnegut.jpg',
//
//                zip: Math.floor((Math.random()*100000)),
//                phone: Math.floor((Math.random()*1000)) + "-555-" + Math.floor((Math.random()*10000)),
//
//                applicantType: "Person",
//                notes: ""
//            }
//        });
//        Roles.addUsersToRoles(userId, 'Editor');
//        console.info('Account created: ' + userId);
//
//        userId = Accounts.createUser({
//            username: 'curie',
//            password: 'curie',
//            email: 'curie@test.org',
//            profile: {
//                name: 'Madam Curie',
//                role: 'Collaborator',
//                avatar: '/avatars/madam.curie.jpg',
//
//                zip: Math.floor((Math.random()*100000)),
//                phone: Math.floor((Math.random()*1000)) + "-555-" + Math.floor((Math.random()*10000)),
//
//                applicantType: "Person",
//                notes: ""
//            }
//        });
//        Roles.addUsersToRoles(userId, 'Collaborator');
//        console.info('Account created: ' + userId);
//
//        userId = Accounts.createUser({
//            username: 'mary',
//            password: 'mary',
//            email: 'mary@test.org',
//            profile: {
//                name: 'Mary Shelley',
//                role: 'Editor',
//                avatar: '/avatars/mary.shelley.jpg',
//
//                zip: Math.floor((Math.random()*100000)),
//                phone: Math.floor((Math.random()*1000)) + "-555-" + Math.floor((Math.random()*10000)),
//
//                applicantType: "Person",
//                notes: ""
//            }
//        });
//        Roles.addUsersToRoles(userId, 'Editor');
//        console.info('Account created: ' + userId);
//
//        userId = Accounts.createUser({
//            username: 'teresa',
//            password: 'teresa',
//            email: 'teresa@test.org',
//            profile: {
//                name: 'Mother Teresa',
//                role: 'Collaborator',
//                avatar: '/avatars/mother.teresa.jpg',
//
//                zip: Math.floor((Math.random()*100000)),
//                phone: Math.floor((Math.random()*1000)) + "-555-" + Math.floor((Math.random()*10000)),
//
//                applicantType: "Person",
//                notes: ""
//            }
//        });
//        Roles.addUsersToRoles(userId, 'Collaborator');
//        console.info('Account created: ' + userId);
//
//        userId = Accounts.createUser({
//            username: 'octavia',
//            password: 'octavia',
//            email: 'octavia@test.org',
//            profile: {
//                name: 'Octavia Butler',
//                role: 'Editor',
//                avatar: '/avatars/octavia.butler.jpg',
//
//                zip: Math.floor((Math.random()*100000)),
//                phone: Math.floor((Math.random()*1000)) + "-555-" + Math.floor((Math.random()*10000)),
//
//                applicantType: "Person",
//                notes: ""
//            }
//        });
//        Roles.addUsersToRoles(userId, 'Editor');
//        console.info('Account created: ' + userId);
//
//        userId = Accounts.createUser({
//            username: 'samuel',
//            password: 'samuel',
//            email: 'samuel@test.org',
//            profile: {
//                name: 'Samuel Clemens',
//                role: 'Editor',
//                avatar: '/avatars/samuel.clemens.jpg',
//
//                zip: Math.floor((Math.random()*100000)),
//                phone: Math.floor((Math.random()*1000)) + "-555-" + Math.floor((Math.random()*10000)),
//
//                applicantType: "Person",
//                notes: ""
//            }
//        });
//        Roles.addUsersToRoles(userId, 'Editor');
//        console.info('Account created: ' + userId);
//
//        userId = Accounts.createUser({
//            username: 'rosalind',
//            password: 'rosalind',
//            email: 'rosalind@test.org',
//            profile: {
//                name: 'Rosalind Franklin',
//                role: 'Collaborator',
//                avatar: '/avatars/rosalind.franklin.jpg',
//
//                zip: Math.floor((Math.random()*100000)),
//                phone: Math.floor((Math.random()*1000)) + "-555-" + Math.floor((Math.random()*10000)),
//
//                applicantType: "Person",
//                notes: ""
//            }
//        });
//        Roles.addUsersToRoles(userId, 'Collaborator');
//        console.info('Account created: ' + userId);
//
//
//        userId = Accounts.createUser({
//            username: 'nicola',
//            password: 'nicola',
//            email: 'nicola@test.org',
//            profile: {
//                name: 'Nicola Tesla',
//                role: 'Collaborator',
//                avatar: '/avatars/nicola.tesla.jpg',
//
//                zip: Math.floor((Math.random()*100000)),
//                phone: Math.floor((Math.random()*1000)) + "-555-" + Math.floor((Math.random()*10000)),
//
//                applicantType: "Person",
//                notes: ""
//            }
//        });
//        Roles.addUsersToRoles(userId, 'Collaborator');
//        console.info('Account created: ' + userId);
//
//        userId = Accounts.createUser({
//            username: 'grace',
//            password: 'grace',
//            email: 'grace@test.org',
//            profile: {
//                name: 'Grace Hopper',
//                role: 'Admin',
//                avatar: '/avatars/grace.hopper.jpg',
//
//                zip: Math.floor((Math.random()*100000)),
//                phone: Math.floor((Math.random()*1000)) + "-555-" + Math.floor((Math.random()*10000)),
//
//                applicantType: "Person",
//                notes: ""
//            }
//        });
//        Roles.addUsersToRoles(userId, 'Admin');
//        console.info('Account created: ' + userId);
//
//
//        userId = Accounts.createUser({
//            username: 'carl',
//            password: 'carl',
//            email: 'carl@test.org',
//            profile: {
//                name: 'Carl Gauss',
//                role: 'Collaborator',
//                avatar: '/avatars/carl.gauss.jpg',
//
//                zip: Math.floor((Math.random()*100000)),
//                phone: Math.floor((Math.random()*1000)) + "-555-" + Math.floor((Math.random()*10000)),
//
//                applicantType: "Person",
//                notes: ""
//            }
//        });
//        Roles.addUsersToRoles(userId, 'Collaborator');
//        console.info('Account created: ' + userId);
//
//
//        userId = Accounts.createUser({
//            username: 'claude',
//            password: 'claude',
//            email: 'claude@test.org',
//            profile: {
//                name: 'Claude Shannon',
//                role: 'Collaborator',
//                avatar: '/avatars/claude.shannon.jpg',
//
//                zip: Math.floor((Math.random()*100000)),
//                phone: Math.floor((Math.random()*1000)) + "-555-" + Math.floor((Math.random()*10000)),
//
//                applicantType: "Person",
//                notes: ""
//            }
//        });
//        Roles.addUsersToRoles(userId, 'Collaborator');
//        console.info('Account created: ' + userId);
//
//        userId = Accounts.createUser({
//            username: 'barbara',
//            password: 'barbara',
//            email: 'barbara@test.org',
//            profile: {
//                name: 'Barbara McClintock',
//                role: 'Collaborator',
//                avatar: '/avatars/barbara.mcclintock.jpg',
//
//                zip: Math.floor((Math.random()*100000)),
//                phone: Math.floor((Math.random()*1000)) + "-555-" + Math.floor((Math.random()*10000)),
//
//                applicantType: "Person",
//                notes: ""
//            }
//        });
//        Roles.addUsersToRoles(userId, 'Collaborator');
//        console.info('Account created: ' + userId);
//
//
//        userId = Accounts.createUser({
//            username: 'gertrude',
//            password: 'gertrude',
//            email: 'gertrude@test.org',
//            profile: {
//                name: 'Gertrude Elion',
//                role: 'Collaborator',
//                avatar: '/avatars/gertrude.elion.jpg',
//
//                zip: Math.floor((Math.random()*100000)),
//                phone: Math.floor((Math.random()*1000)) + "-555-" + Math.floor((Math.random()*10000)),
//
//                applicantType: "Person",
//                notes: ""
//            }
//        });
//        Roles.addUsersToRoles(userId, 'Collaborator');
//        console.info('Account created: ' + userId);
//
//        userId = Accounts.createUser({
//            username: 'rachel',
//            password: 'rachel',
//            email: 'rachel@test.org',
//            profile: {
//                name: 'Rachel Carson',
//                role: 'Collaborator',
//                avatar: '/avatars/rachel.carson.jpg',
//
//                zip: Math.floor((Math.random()*100000)),
//                phone: Math.floor((Math.random()*1000)) + "-555-" + Math.floor((Math.random()*10000)),
//
//                applicantType: "Person",
//                notes: ""
//            }
//        });
//        Roles.addUsersToRoles(userId, 'Collaborator');
//        console.info('Account created: ' + userId);
//
//        userId = Accounts.createUser({
//            username: 'maria',
//            password: 'maria',
//            email: 'maria@test.org',
//            profile: {
//                name: 'Maria Mayer',
//                role: 'Collaborator',
//                avatar: '/avatars/maria.mayer.jpg',
//
//                zip: Math.floor((Math.random()*100000)),
//                phone: Math.floor((Math.random()*1000)) + "-555-" + Math.floor((Math.random()*10000)),
//
//                applicantType: "Person",
//                notes: ""
//            }
//        });
//        Roles.addUsersToRoles(userId, 'Collaborator');
//        console.info('Account created: ' + userId);
//
//        userId = Accounts.createUser({
//            username: 'rita',
//            password: 'rita',
//            email: 'rita@test.org',
//            profile: {
//                name: 'Rita Levi-Montalcini',
//                role: 'Collaborator',
//                avatar: '/avatars/rita.levi.montalcini.jpg',
//
//                zip: Math.floor((Math.random()*100000)),
//                phone: Math.floor((Math.random()*1000)) + "-555-" + Math.floor((Math.random()*10000)),
//
//                applicantType: "Person",
//                notes: ""
//            }
//        });
//        Roles.addUsersToRoles(userId, 'Collaborator');
//        console.info('Account created: ' + userId);
//
//        userId = Accounts.createUser({
//            username: 'elizabeth',
//            password: 'elizabeth',
//            email: 'elizabeth@test.org',
//            profile: {
//                name: 'Elizabeth Blackwell',
//                role: 'Collaborator',
//                avatar: '/avatars/elizabeth.blackwell.jpg',
//
//                zip: Math.floor((Math.random()*100000)),
//                phone: Math.floor((Math.random()*1000)) + "-555-" + Math.floor((Math.random()*10000)),
//
//                applicantType: "Person",
//                notes: ""
//            }
//        });
//        Roles.addUsersToRoles(userId, 'Collaborator');
//        console.info('Account created: ' + userId);
    }
});
