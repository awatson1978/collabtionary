**dataset-dictionary** is a Meteorite package that provides a the Webster Unabridged English Dictionary.

------------------------
### Installation

First, install the dataset-dictionary package from the command line, like so:

````
mrt add dataset-dictionary
````

Alternatively, if you'd like to bypass Atmosphere, and install directly from GitHub, you could update your application's smart.json file, like so:

````
{
  "meteor": {
    "branch": "master"
  },
  "packages": {
    "dataset-dictionary": {
      "git": "https://github.com/awatson1978/dataset-dictionary.git"
    }
  }
}

````

------------------------
### Data/Document Model for Reading Data from Collection

Once done, you'll want to display data from the collection by adding the following templates into your document model.  The class names come from Bootstrap v3.

````html
<template name="dictionaryIndexTemplate">
    <div class="padded">
        <div class="panel panel-info">
            <div class="panel-heading">
                <input id="dictionarySearchInput" type="text" placeholder="Filter..." value="life"></input>
            </div>
            <ul class="list-group">
                {{#each dictionaryList}}
                {{> dictionaryItemTemplate }}
                {{/each}}
            </ul>
        </div>
    </div>
</template>
<template name="dictionaryItemTemplate">
    <li class="list-group-item"><span class="bold">{{ Word }}</span>  {{Definition}}</li>
</template>


````

------------------------
### Controller for Reading Data from Collection

To dislay data, you'll also need to add the controllers, like so:

````js

//-------------------------------------------------------------
// A.  Generate Wordlist

Template.dictionaryIndexTemplate.dictionaryList = function(){
    try{
        return Dictionary.find({
                'Word': { $regex: Session.get('dictionary_search'), $options: 'i' }
        },{limit: 20});
    }catch(error){
        console.log(error);
    }
};


//-------------------------------------------------------------
// B.  Display Word in Edit Pannel When Clicked

Template.dictionaryIndexTemplate.events({
    'click .list-group-item':function(event, template){
        Session.set('selected_word', this._id);
        Session.set('current_action','view');
    }
});


//-------------------------------------------------------------
// C.  Filter Results When User Enters Search Term

Template.dictionaryIndexTemplate.events({
    'keyup #dictionarySearchInput': function(evt,tmpl){
        try{
            Session.set('dictionary_search', $('#dictionarySearchInput').val());
            Meteor.flush();
        }catch(err){
            console.log(err);
        }
    }
});

````


------------------------
### CRUD Forms Data/Document Model

Once those peices are in place, you're ready to implement the rest of the CRUD pattern, by adding a form and buttons for Create, Update, and Delete functions.

````html
<template name="dictionaryFormTemplate">
    <div class="padded">
        {{#if word}}
            {{#with word}}
                <div class="panel panel-info">
                    <div class="panel-heading padded">
                        <bold>Dictionary Entry ID:</bold> {{_id}}
                    </div>
                    <div class="dictionary-form">
                        <div class="col col-lg-3">
                            <input id="dictionaryWordInput" type="text" placeholder="spelling..." value="{{Word}}" {{word_enabled}}></input>
                            <label class="smallgray" for="dictionaryWordInput">Word</label>
                        </div>
                        <div class="col col-lg-9">
                            <input id="dictionaryDefinitionInput" type="text" placeholder="spelling..." value="{{Definition}}" {{definition_enabled}}></input>
                            <label class="smallgray" for="dictionaryDefinitionInput">Definition</label>
                        </div>
                    </div>

                    {{#if isNewWord}}
                        <div class="spacer row"></div>
                        <div class="container">
                            <div class="col col-lg-12">
                                <button id="newDictionaryWordButton" type="button" class="fullwidth btn btn-info" width="100%">Create New Word!</button>
                            </div>
                        </div>
                    {{/if}}

                    {{#if isDeletingWord}}
                        <div class="padded container">
                            <div class="alert alert-danger">
                                <h4 class="centered">Are you sure you want to delete this record?</h4>
                                <div class="container">
                                    <div class="col col-lg-6">
                                        <button id="deleteDictionaryWordButton" type="button" class="fullwidth btn btn-danger">Delete</button>
                                    </div>
                                    <div class="col col-lg-6">
                                        <button id="cancelDeleteDictionaryWordButton" type="button" class="fullwidth btn btn-danger">Cancel</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    {{/if}}
                </div>
            {{/with}}
        {{else}}
        <div class="panel panel-info">
            <div class="panel-heading padded">
                <bold>Dictionary Entry ID:</bold> ...
            </div>
            <div class="centered dictionary-form">
                <h4>Select a dictionary entry to edit.</h4>
            </div>
            <!--<div class="dictionary-form">-->
                <!--<input type="text" placeholder="Select a word." value="Select a word."></input>-->
            <!--</div>-->
        </div>
        {{/if}}
    </div>
</template>
````

------------------------
### CRUD Forms Controller

And when that's in place, you're ready for the final step in implementing the pattern, with the following.

````js


//-------------------------------------------------------------
// D.  Edit Form Helper 

Template.dictionaryFormTemplate.helpers({
    word: function(){
        try{
            if(Session.get('current_action') == 'new'){
                return {"Word":""};
            }else{
                return Dictionary.findOne(Session.get('selected_word'));
            }
        }catch(error){
            console.log(error);
        }
    }
});


//-------------------------------------------------------------
// E. Active Input When Clicked ot Tapped

Template.dictionaryFormTemplate.events({
    //-------------------------------------------------------------
    // 1. Desktop Clicks - Editing

    'click #dictionaryWordInput':function(){
        Session.set('editing_word', true);
        Meteor.flush();
    },
    'click #dictionaryDefinitionInput':function(){
        Session.set('editing_definition', true);
        Meteor.flush();
    },

    //-------------------------------------------------------------
    // 2. Mobile Tabs - Editing

    'mouseout #dictionaryWordInput':function(){
        Session.set('editing_word', false);
        Meteor.flush();
    },
    'mouseout #dictionaryDefinitionInput':function(){
        Session.set('editing_definition', true);
        Meteor.flush();
    }
})


//-------------------------------------------------------------
// F. Submit Input to Mongo (Update)

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


//-------------------------------------------------------------
// G. Determine if Input should be Readonly 

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



//-------------------------------------------------------------
// H. Determine if Buttons Should be Displayed

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
// I. Call Server Side New Word Method (New, Delete)

Template.dictionaryFormTemplate.events({
    'click #newDictionaryWordButton': function(){
        console.log('creating new word...');

        try{

            // TODO:  add validation functions
            if ($('#wordInput').val().length) {

                Meteor.call('createNewDictionaryEntry', {
                    Word: $('#dictionaryWordInput').val(),
                    Definition: $('#dictionaryDefinitionInput').val()
                }, function (error, word) {
                    console.log('error: ' + error);
                    console.log('word: ' + word);
                });
            } else {
                Session.set("createError",
                    "Word needs characters, or why bother?");
            }
            evt.target.value = '';
            Meteor.flush();
        }catch(err){
            console.log(err);
        }

        Session.set('current_action','view');
    },
    'click #deleteDictionaryWordButton': function(){
        WordList.remove(Session.get('selected_word'));
        Session.set('current_action','view');
    },
    'click #cancelDeleteDictionaryWordButton': function(){
        Session.set('current_action','view');
    }
});


````







------------------------
### Licensing

MIT License. Use as you wish, including for commercial purposes.
See license.mit.txt for full details.



English Language Dictionary
================================

This repository houses the contents of Webster's Unabridged English Dictionary.

The dictionary can be found in plain text form [here](http://www.gutenberg.org/ebooks/29765)

You'll also find some julia files that were used to parse the text and organize it into the nice
json you see here.

# Contents
- dictionary.json: This is the raw data scraped from the dictionary. Unsurprisingly, it's in the format
of a dictionary, i.e. ```{ "Word": "Definition" }```
- graph.json: This is a graph representation of the dictionary. Each word is paired with a list of the
words that define it
- dictionary.txt: This is the plain text file (I converted it from ISO-8859-1 to UTF-8)

# License
Creative Commons Attribution-NonCommerical 3.0 Unported

![](http://i.creativecommons.org/l/by-nc/3.0/88x31.png)

[Creative Commons Attribution-NonCommercial 3.0 Unported Licencse](http://creativecommons.org/licenses/by-nc/3.0/deed.en_US)
