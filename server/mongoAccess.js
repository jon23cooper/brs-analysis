if (Meteor.isServer){

  Meteor.publish("students", function(){
    return Students.find({});
  });

  Meteor.publish("results", function(){
    return Results.find({});
  });

};

Meteor.methods({

  addStudent:function(student){
    var existingRecords = Students.find().count();
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
    Results.insert({
      grade: result.grade,
    }, function(error, result){
      console.log(result);
      return result;
    }
  );
  },
});
