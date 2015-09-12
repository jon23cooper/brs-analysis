if (Meteor.isServer){

  Meteor.publish("students", function(){
    return Students.find({});
  });

  Meteor.publish("results", function(){
    return Results.find({});
  });

  Meteor.publish("qualifications", function(){
    return Qualifications.find({});
  });

};

Meteor.methods({

  addStudent:function(student){
     var result = Students.upsert({_id: student.id},
       {
         $set:{
         firstname: student.firstname,
         lastname: student.lastname,
         yearGroup: student.yearGroup,
         disadvantaged: student.disadvantaged,
         sen: student.sen,
        }
    });
    return result;
  //  return existingRecords - Students.find().count();
  },

  addResult: function(result){
    var result = Results.insert({
      grade: result.grade,
    });
    return result;
  },

  addQualification: function(qualificationName){
    var result = Qualifications.insert({
      _id: qualificationName,
      grades: []
    });
    return result;
  },

  addGradeToQualification: function(qualificationName, grade){
    console.log("inserting into Qualification: " + qualificationName);
    console.log("inserting: " + grade);
    var result = Qualifications.update(
      {_id: qualificationName},
      {$push: {
        grades: {
          $each: [grade],
          $sort: {order: 1}
        }
      }}
    );
    return result;
  },

  update_order: function(qualificationName, grade, newValue){
    var result=Qualifications.update(
      {_id: qualificationName, "grades.grade": grade},
      {$set:{"grades.$.order": newValue}}
    );
  },

  update_points: function(qualificationName, grade, newValue){
    var result=Qualifications.update({"_id":qualificationName, "grades.grade": grade},
    {$set:{"grades.$.points": newValue}});
  }

});
