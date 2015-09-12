/////////////////////////////////////////
// editable number cell
//
// HTML:
// {{> numberCellInputComponent id=<data> for="field name"}}
//
// Double clicking in a table cell hides the text and shows an input of type = "number"
// when the input loses focus or the enter key is pressed the input value
// updates the id field with the new value. The input is hidden and the
// cell value is updated.
//
/////////////////////////////////////////
var numberCellInputComponent = BlazeComponent.extendComponent({
  template: function(){
    return 'numberCellInputComponent';
  },

  value: function(){
    return this.data().id;
  },

  events: function(){
    return[{
      'dblclick td': this.beginEdit,
      'blur input' : this.endEdit,
      'keydown input': this.changeInput,
    }];
  },

  beginEdit: function (event){
    var input = event.currentTarget.children[0];
    var textSpan = event.currentTarget.children[1];
    input.removeAttribute('hidden');
    textSpan.setAttribute('hidden', true);
    input.select();
  },

  changeInput: function (event){
    if (event.which == 13){
      console.log("enter pressed")
      this.endEdit(event);
    }
  },

  endEdit: function (event){
    Meteor.call('update_'+this.data().for,
      Template.parentData(2)._id,
      Template.parentData(1).grade,
      event.target.value
    );

    event.target.setAttribute('hidden', true);
    event.target.parentNode.children[1].removeAttribute('hidden');

  }

}).register('numberCellInputComponent');
