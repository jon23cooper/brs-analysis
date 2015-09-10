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

  addQualification: function(qual){
    var result = Qualifications.insert({
      name: qual.name,
    });
    return name;
  }

});
