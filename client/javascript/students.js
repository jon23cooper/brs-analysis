
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
    console.log("submitted");
    event.preventDefault();
    var myForm= event.target;
    var student={
      id: myForm.admission_number.value,
      firstname: myForm.firstname.value,
      lastname: myForm.lastname.value,
      yearGroup: myForm.yearGroup.value,
      disadvantaged: myForm.disadvantaged.attribute('data-value') == 'true',
      sen: myForm.sen.attr('data-value') == 'true',
    };
    console.log(student);
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
