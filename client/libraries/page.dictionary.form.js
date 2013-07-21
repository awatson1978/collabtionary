
//-------------------------------------------------------------
// B.  Helpers


Template.dictionaryFormTemplate.events({
    'click .cancel-btn': function(){
        Session.set('selected_word', '');
        Meteor.flush();
    },
    'click .flag-btn': function(){
        var entry = Dictionary.findOne(Session.get('selected_word'));
        if(entry.Status == "Flagged"){
            Dictionary.update(Session.get('selected_word'), {$set: { 'Status': "" }});
        }else{
            Dictionary.update(Session.get('selected_word'), {$set: { 'Status': "Flagged" }});
        }
        entry = null;
        Meteor.flush();
    },
    'click .approve-btn': function(){
        var entry = Dictionary.findOne(Session.get('selected_word'));
        if(entry.Status == "Approved"){
            Dictionary.update(Session.get('selected_word'), {$set: { 'Status': "Flagged" }});
        }else{
            Dictionary.update(Session.get('selected_word'), {$set: { 'Status': "Approved" }});
        }
        entry = null;
        Meteor.flush();
    },
    'click .entry-image': function(){
        window.open = "https://www.google.com/imghp?hl=en&tab=ni&authuser=0";
    }
});


//-------------------------------------------------------------
// B.  Helpers


Template.dictionaryFormTemplate.getStatus = function(){
    if(this.Status == "Flagged"){
        return "V";
    }else if(this.Status == "Approved"){
        return "%";
    }else{
        return " ";
    }
};
Template.dictionaryFormTemplate.getImage = function(){
    if(this.Image){
        return this.Image;
    }else{
        return "/placeholder-300x400.jpg";
    }
};

Template.dictionaryFormTemplate.isCollaborator = function(){
    if(Meteor.userId()){
        return isCollaborator(Meteor.userId()) || isEditor(Meteor.userId()) || isAdmin(Meteor.userId());
    }else{
        return false;
    }
};
Template.dictionaryFormTemplate.isEditor = function(){
    return isEditor(Meteor.userId()) || isAdmin(Meteor.userId());
};
Template.dictionaryFormTemplate.isAdmin = function(){
    return isAdmin(Meteor.userId());
};

Template.dictionaryFormTemplate.isNewWord = function(){
    try{
        if(Session.get('current_action') == 'new'){
            return true;
        }else{
            return false;
        }
    }catch(error){
        console.log(error);
    }
};
Template.dictionaryFormTemplate.isDeletingWord = function(){
    try{
        if(Session.get('current_action') == 'delete'){
            return true;
        }else{
            return false;
        }
    }catch(error){
        console.log(error);
    }
};


//-------------------------------------------------------------
// B.  Helpers


Template.dictionaryFormTemplate.statusColor = function(){
    console.log(this.Status);
    if(this.Status == "Flagged"){
        return "panel-warning";
    }else if(this.Status == "Approved"){
        return "panel-success";
    }else if(this.Status == "Finalized"){
        return "panel-info";
    }else if(this.Status == ""){
        return "";
    }else{
        return "";
    }
};


Template.dictionaryFormTemplate.helpers({
    word: function(){
        try{
            if(Session.get('current_action') == 'new'){
                return {"Word":"...", Status: ""};
            }else{
                return Dictionary.findOne(Session.get('selected_word'));
            }
        }catch(error){
            console.log(error);
        }
    }
});


//-------------------------------------------------------------
// C. Event Map

Template.dictionaryFormTemplate.events({
    //-------------------------------------------------------------
    // 1. Desktop Clicks - Editing

    'click #dictionaryWordInput':function(){
        if(Meteor.userId()){
            Session.set('editing_word', true);
            Meteor.flush();
        }
    },
    'click #dictionaryDefinitionInput':function(){
        if(Meteor.userId()){
            Session.set('editing_definition', true);
            Meteor.flush();
        }
    },

    'click #pronunciationInput':function(){
        if(Meteor.userId()){
            Session.set('editing_pronunciation', true);
            Meteor.flush();
        }
    },
    'click #grammarInput':function(){
        if(Meteor.userId()){
            Session.set('editing_grammar', true);
            Meteor.flush();
        }
    },
    'click #imageUrlInput':function(){
        if(Meteor.userId()){
            Session.set('editing_image', true);
            Meteor.flush();
        }
    },


    //-------------------------------------------------------------
    // 2. Mobile Tabs - Editing

    'mouseout #dictionaryWordInput':function(){
        if(Meteor.userId()){
            Session.set('editing_word', false);
            Meteor.flush();
        }
    },
    'mouseout #dictionaryDefinitionInput':function(){
        if(Meteor.userId()){
            Session.set('editing_definition', true);
            Meteor.flush();
        }
    },
    'mouseout #pronunciationInput':function(){
        if(Meteor.userId()){
            Session.set('editing_pronunciation', false);
            Meteor.flush();
        }
    },
    'mouseout #grammarInput':function(){
        if(Meteor.userId()){
            Session.set('editing_grammar', false);
            Meteor.flush();
        }
    },
    'mouseout #imageUrlInput':function(){
        if(Meteor.userId()){
            Session.set('editing_image', false);
            Meteor.flush();
        }
    },

    //-------------------------------------------------------------
    // buttons

    'click .new-button':function(){
        Session.set('current_action', 'new');
        Meteor.flush();
    }
})



//-------------------------------------------------------------
// 3. Submit
// 4. Stop Editing

Template.dictionaryFormTemplate.events(
    okCancelEvents('#dictionaryWordInput',
        {
            ok: function (value) {
                Dictionary.update(Session.get('selected_word'), {$set: { 'Word': value }});
                Session.set('editing_word', false);
                Meteor.flush();
            },
            cancel: function () {
                Session.set('editing_word', false);
            }
        })
);
Template.dictionaryFormTemplate.events(
    okCancelEvents('#dictionaryDefinitionInput',
        {
            ok: function (value) {
                Dictionary.update(Session.get('selected_word'), {$set: { 'Definition': value }});
                Session.set('editing_definition', false);
                Meteor.flush();
            },
            cancel: function () {
                Session.set('editing_definition', false);
            }
        })
);

Template.dictionaryFormTemplate.events(
    okCancelEvents('#pronunciationInput',
        {
            ok: function (value) {
                Dictionary.update(Session.get('selected_word'), {$set: { 'Pronunciation': value }});
                Session.set('editing_pronunciation', false);
                Meteor.flush();
            },
            cancel: function () {
                Session.set('editing_pronunciation', false);
            }
        })
);
Template.dictionaryFormTemplate.events(
    okCancelEvents('#grammarInput',
        {
            ok: function (value) {
                Dictionary.update(Session.get('selected_word'), {$set: { 'Grammar': value }});
                Session.set('editing_grammar', false);
                Meteor.flush();
            },
            cancel: function () {
                Session.set('editing_grammar', false);
            }
        })
);
Template.dictionaryFormTemplate.events(
    okCancelEvents('#imageUrlInput',
        {
            ok: function (value) {
                Dictionary.update(Session.get('selected_word'), {$set: { 'Image': value }});
                Session.set('editing_image', false);
                Meteor.flush();
            },
            cancel: function () {
                Session.set('editing_image', false);
            }
        })
);
//-------------------------------------------------------------
// D. Display Readonly Value

Template.dictionaryFormTemplate.word_enabled = function(){
    if(Session.get('global_edit')){
        return "enabled";
    }else if(Session.get('editing_word')){
        return "enabled";
    }else{
        return "readonly";
    }
};
Template.dictionaryFormTemplate.definition_enabled = function(){
    if(Session.get('global_edit')){
        return "enabled";
    }else if(Session.get('editing_definition')){
        return "enabled";
    }else{
        return "readonly";
    }
};

Template.dictionaryFormTemplate.pronunciation_enabled = function(){
    if(Session.get('global_edit')){
        return "enabled";
    }else if(Session.get('editing_pronunciation')){
        return "enabled";
    }else{
        return "readonly";
    }
};
Template.dictionaryFormTemplate.grammar_enabled = function(){
    if(Session.get('global_edit')){
        return "enabled";
    }else if(Session.get('editing_grammar')){
        return "enabled";
    }else{
        return "readonly";
    }
};
Template.dictionaryFormTemplate.image_enabled = function(){
    if(Session.get('global_edit')){
        return "enabled";
    }else if(Session.get('editing_image')){
        return "enabled";
    }else{
        return "readonly";
    }
};




Template.dictionaryFormTemplate.events({
    'click #newDictionaryWordButton': function(){
        console.log('creating new word...');

        try{

            // TODO:  add validation functions
            if ($('#dictionaryWordInput').val().length) {

                Meteor.call('createNewDictionaryEntry', {
                    Word: $('#dictionaryWordInput').val(),
                    Definition: $('#dictionaryDefinitionInput').val()
                }, function (error, word) {
                    console.log('error: ' + error);
                    console.log('word: ' + word);
                });
            }else {
                Session.set("createError",
                    "Word needs characters, or why bother?");
            }
            evt.target.value = '';
            Session.set('current_action','view');
            Session.set('selected_word', '');
            Meteor.flush();
        }catch(err){
            console.log(err);
        }

        Session.set('current_action','view');
    },
    'click #deleteDictionaryWordButton': function(){
        Dictionary.remove(Session.get('selected_word'));
        Session.set('current_action','view');
        Session.set('selected_word', '');
    },
    'click .cancel-btn ': function(){
        Session.set('current_action','view');
    }
});
