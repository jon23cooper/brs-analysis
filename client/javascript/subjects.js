Template.subjectList.onCreated(function(){
  this.subscribe("subjects");
  this.subscribe("qualifications");
});

Template.subjectList.helpers({
  subjects: function(){
    return _.sortBy(
      Subjects.find({}).fetch(),
      '_id'
    );
  },


});

Template.subjectEntry.helpers({
  qualifications: function(){
    return Qualifications.find({});
  },
})

Template.subjectEntry.events({
  "submit form": function(event){
    event.preventDefault();
    console.log(event.target.name.value)
    Meteor.call(
      "addSubject",
      event.target.name.value,
      event.target.special.value,
      function(error, result){
        if (result){
          event.target.name.value="";
        }
      }
    )
  }
});
