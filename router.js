
Qualifications = new Mongo.Collection("qualifications");
Results = new Mongo.Collection('results');
Students = new Mongo.Collection('students');
Subjects = new Mongo.Collection("subjects");

Router.route('/', {
  template: 'index', 
  name: 'index'
});

Router.route("/qualifications", {
  template: 'qualifications'
});

Router.route("/results", {
  template: 'results',
});

Router.route("/students",{
  template: 'students'
});

Router.route("/subjects", {
  template: 'subjects'
});
