
Template.results.onCreated(function(){
  this.subscribe("results");
});

Template.results.helpers({

});

Template.results.events({
  "submit form": function(event){
    event.preventDefault();
    Meteor.call(
      "addResult",
      {grade: "E"},
      function(err, result){
        if (err){
          console.log(err);
        } else {
          if (result){
            console.log(result);
          }
        }
      });
  }
});
