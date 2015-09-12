var chosenQual = new ReactiveVar("");

Template.results.onCreated(function(){
  this.subscribe("results");
  this.subscribe("qualifications");
  this.subscribe("subjects");
});

Template.results.onRendered(function(){
  //chosenQual.set(Qualifications.find({}, {fields:{_id: true}})[0]);
//  $("select#qual").change();
})

Template.results.helpers({
  qualificationNames: function(){
    var quals = Qualifications.find({}, {fields:{_id: true}}).fetch() ;
    quals.unshift("");
    return quals;
  },
  qualificationGrades: function(){
    if (chosenQual.get() != ""){
      var quals = Qualifications.findOne({_id: chosenQual.get()});
      return quals.grades.sort(function(a,b){
          return a.order > b.order;
      });
    }
  },
  subjects: function(){
    return Subjects.find({}).fetch().sort()
  },

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
  },

  "change select#qual": function(event){
    console.log("triggered");
    chosenQual.set(event.target.value);
  }
});
