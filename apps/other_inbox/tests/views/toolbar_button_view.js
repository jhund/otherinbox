htmlbody('<style> .sc-static-layout { border: 1px red dotted; } </style>');
htmlbody("<style>.sc-main{display:none}</style>");

pane = SC.ControlTestPane.design().add("test_toolbar_button",
	 OI.ToolbarButtonView.design({
	   layerId: 'test_toolbar_button',
	   layout: { top: 0, bottom: 0, left: 0, width: 72 },
	   value: sc_static('blank'),
	   action: '',
	   title:"Test toolbar button"
	 }));

pane.show(); // add a test to show the test pane

module('ToolbarButton',{
  setup:function(){

  },
  teardown:function(){

  }
});

test("Check that button is visible", function() {
  ok(pane.view('test_toolbar_button').get('isVisibleInWindow'),"Should be visible");
});

test("Check that button has proper classes", function() {
  var viewElem=pane.view('test_toolbar_button').$();
  ok(viewElem.hasClass('action_button'),"Should be an action_button");
  ok(viewElem.hasClass('toolbar_control'),"Should be a toolbar_control");
});

test("Check the title",function(){
  var viewElem=pane.view('test_toolbar_button').$('span');
  equals(viewElem.text(), 'Test toolbar button', 'Should have a title');
});