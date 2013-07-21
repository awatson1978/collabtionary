//-------------------------------------------------------------
// E. dictionaryIndexTemplate




Template.dictionaryIndexTemplate.editingWord = function(){
    if(Session.get('selected_word')){
        return true;
    }else{
        return false;
    }
};
Template.dictionaryIndexTemplate.imageGrid = function(){
    try{
        return Session.get('must_have_image');
    }catch(error){
        console.error(error);
    }
};

Template.dictionaryIndexTemplate.autoHeight = function(){
    if(Session.get('must_have_image')){
        return "auto-height";
    }
};
Template.dictionaryIndexTemplate.dictionaryList = function(){
    try{
        return Dictionary.find({
            'Word': { $regex: Session.get('dictionary_search'), $options: 'i' }
        },{limit: 20});
    }catch(error){
        console.log(error);
    }
};
Template.dictionaryIndexTemplate.imageList = function(){
    try{
        return Dictionary.find({
            Word: { $regex: Session.get('dictionary_search'), $options: 'i' },
            Image : { $exists : true}
        },{limit: 20});
    }catch(error){
        console.log(error);
    }
};







Template.dictionaryIndexTemplate.events({
    'keyup #dictionarySearchInput': function(evt,tmpl){
        try{
            Session.set('dictionary_search', $('#dictionarySearchInput').val());
            Meteor.flush();
        }catch(err){
            console.log(err);
        }
    },
    'click #dictionarySearchInput':function(){
        Session.set('selected_word', '');
    },
    'click .show-images-btn': function(){
        toggleSession('show_image_column');
    }
});

Session.setDefault('show_image_column', false);
Template.dictionaryItemTemplate.showImageColumn = function(){
    return Session.get('show_image_column');
};

Template.dictionaryItemTemplate.getStatus = function(){
    if(this.Status == "Flagged"){
        return "V";
    }else if(this.Status == "Approved"){
        return "%";
    }else{
        return " ";
    }
};
Template.dictionaryItemTemplate.getImage = function(){
    if(this.Image){
        return this.Image;
    }else{
        return "placeholder-300x400.jpg";
    }
};
Template.dictionaryItemTemplate.getImageStyle = function(){
    if(this.Image){
        return 'style="background-image:url(' + this.Image + ')"';
    }else{
        return 'style="background-image:url(placeholder-300x400.jpg)"';
    }
};


//Template.dictionaryIndexTemplate.events({
//    'click .list-group-item':function(event, template){
//
//    }
//});
Template.dictionaryIndexTemplate.events({
   'click .dictionary-item': function(evt,tmpl){
       Session.set('selected_word', this._id);
       Session.set('current_action','view');
   }
});