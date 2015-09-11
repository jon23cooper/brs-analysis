var currentQual =  new ReactiveVar("");

Template.qualifications.onCreated(function(){
  this.subscribe("qualifications");
});

Template.qualifications.helpers({
  currentQualification: function(){
    return currentQual.get();
  },
  qualifications: function(){
    return Qualifications.find({});
  },

});

Template.qualifications.events({
  "submit form#qualName": function(event){
    console.log("Qualification name submitted");
    event.preventDefault();
    Meteor.call("addQualification",
                event.target.name.value,
               function(error, result){
      if (error){
        conole.log("error");
      } else {
        currentQual.set(result);
        event.target.name.value="";
        console.log(result);
      }
    });
  },

  "submit form#qualGrade":function(event){
    event.preventDefault();
    Meteor.call("addGradeToQualification",
                currentQual.get(),
               {
                grade: event.target.grade.value,
                points: event.target.points.value,
                order: event.target.order.value
               },
               function(error, result){
      if (error){
        console.log("Error!!");
        console.log(error);
      } else {
        console.log(result);
      }
    })
  },

  "click button#addGrade": function(event){
    var qualId = event.target.dataset.qual;
    var qualificationToEdit = this;
    currentQual.set(this._id);
    $(".modal").modal('show');
    console.log(this._id);
  }


});

Template.qualification.helpers({
    sortedGrades: function(){
    var qual = Qualifications.findOne({_id: this._id});
    var sorted = qual.grades.sort(function(q1, q2){
      return q1.order > q2.order ;
    });
      return sorted;
  },
});

Template.qualification.events({
  "click table": function(event){
    currentQual.set(this._id);
  }
})

Template.order.events({
  "dblclick td": function(event){
    var input = event.currentTarget.children[0];
    var text = event.currentTarget.children[1];
    console.log(input);
    console.log(text);
    input.removeAttribute("hidden");
    text.setAttribute("hidden", true);
    console.log(input);
    console.log(text);
    // delay seems to be needed otherwise focus prevents input being shown
    setTimeout (function(){
      input.focus();
      input.select();
    }, 50)

  },

  "blur input": function(event){
    console.log(this.grade);
    console.log(event.target.value);
    Meteor.call(
      "updateQualificationGradeOrder",
      currentQual.get(),
      this.grade,
      event.target.value
    );
    event.target.setAttribute("hidden",true);
    event.target.parentNode.children[1].removeAttribute("hidden");
  }
});

Template.popupGradeEntry.onCreated(function(){
  this.subscribe("qualifications");
});

Template.popupGradeEntry.helpers({
  qualificationName: function(){
    return currentQual.get();
  }
});
