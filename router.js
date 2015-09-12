
Qualifications = new Mongo.Collection("qualifications");
Results = new Mongo.Collection('results');
Students = new Mongo.Collection('students');
Subjects = new Mongo.Collection("subjects");

Router.route('/', {
  template: 'students'
});

Router.route("/results", {
  template: 'results',
});

Router.route("/qualifications", {
  template: 'qualifications'
})

Router.route("/students",{
  template: 'students'
//  this.layout("ApplicationLayout");
//  this.render("PostHeader", {to: "header"});
//  this.render("PostAside", {to: "aside"});
//  this.render("Post");
//  this.render("PostFooter", {to: "footer"});
});
