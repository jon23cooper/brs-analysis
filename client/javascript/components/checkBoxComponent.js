var checkBoxComponent = BlazeComponent.extendComponent({
  template: function(){
    return 'checkBoxComponent';
  },

  value: function(){
    return this.data().id;
  },

  events: function(){
    return[{
      'change input': this.toggleValue
    }];
  },

  toggleValue: function (event){
    console.log("currentValue= " + this.value());
  }
}).register('checkBoxComponent');