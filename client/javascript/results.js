
Template.results.onCreated(function(){
  this.subscribe("results");
});

Template.results.helpers({

});

Template.results.events({
  "submit form": function(event){
    console.log("form submitted");
    event.preventDefault();
    console.log(Meteor.call("addResult",{grade: "E"}));
  }
});
