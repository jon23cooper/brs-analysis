
Template.students.onCreated(function(){
  this.subscribe("students");
});


Template.students.helpers({
  students: function(){
    return Students.find();
  },

  isDisadvantaged: function(){
    return null;
  },

  isSen: function(){
    return true;
  }

});

Template.students.events({
  "click [data-toggle]": function(event){
    event.target.dataset.value = event.target.dataset.value == "true"?"false":"true";
    event.target.textContent = event.target.dataset.value == "true"?"True":"False";
  },

  "submit form": function(event){
    event.preventDefault();
    var student={
      id: $("#exam_number")[0].value,
      firstname: $("#firstname")[0].value,
      lastname: $("#lastname")[0].value,
      yearGroup: $( "#yearGroup" ).val(),
      disadvantaged: $("#disadvantaged").attr('data-value') == 'true',
      sen: $("#sen").attr('data-value') == 'true',
    };
    Meteor.call('addStudent', student, function(err, result){
      if (err){
        console.log(err);
      } else {
        if (result){
          if (result.insertedId){
            console.log(result.numberAffected + " new pupil added");
          } else {
            console.log(result.numberAffected + " pupil updated");
          }
        }
        console.log(result);
      }
    });
  }



});
