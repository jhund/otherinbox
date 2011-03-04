htmlbody('<style> .sc-static-layout { border: 1px red dotted; } </style>');
htmlbody("<style>.sc-main{display:none}</style>");

var pane = SC.ControlTestPane.design().add("test_action_button",
	 OI.ActionButtonView.design({
	   layerId: 'test_action_button',
	   layout: { top: 0, bottom: 0, left: 0, width: 72 },
	   title:"Test action button"
	 }));

pane.show(); // add a test to show the test pane

var button=null;

module('ActionButton',{
  setup:function(){
    button=OI.ActionButtonView.create();
  },
  teardown:function(){}
});

test("Check that button is visible", function() {
  ok(pane.view('test_action_button').get('isVisibleInWindow'),"Should be visible");
});

test("Check that button has proper classes", function() {
  var viewElem=pane.view('test_action_button').$();
  ok(viewElem.hasClass('action_button'),"Should be an action_button");
});

test("Check the title",function(){
  var viewElem=pane.view('test_action_button').$('span');
  equals(viewElem.text(), 'Test action button', 'Should have a title');
});

test("mouseDown", function() {
  button.set('isEnabled',false);
  button.mouseDown();
  ok(!button.get('isActive'),"Not enabled, clicking does nothing");

  button.set('isEnabled',true);
  button.mouseDown();
  ok(button.get('isActive'),"Enabled, clicking sets active");
});

test("mouseExited",function(){
       button.set('_isMouseDown',true);
       button.set('isActive',true);
       button.mouseExited();
       ok(!button.get('isActive'),"clears isActive if mouse down");
       
       button.set('_isMouseDown',false);
       button.set('isActive',true);
       button.mouseExited();
       ok(button.get('isActive'),"doesn't clear isActive unless mouse down");       
});

test("mouseEntered",function(){
       button.set('_isMouseDown',true);
       button.set('isActive',false);
       button.mouseEntered();
       ok(button.get('isActive'),"sets isActive to mousedown (true)");
       
       button.set('_isMouseDown',false);
       button.set('isActive',true);
       button.mouseEntered();
       ok(!button.get('isActive'),"sets isActive to mousedown (false)");
});
