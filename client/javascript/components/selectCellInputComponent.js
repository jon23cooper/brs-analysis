var selectCellInputComponent = BlazeComponent.extendComponent({
  template: function(){
    return 'selectCellInputComponent';
  },

  values: function(){
    console.log(this.data());
    return ["1"];
  }


}).register('selectCellInputComponent');
