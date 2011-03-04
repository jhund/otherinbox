htmlbody('<style> .sc-static-layout { border: 1px red dotted; } </style>');
htmlbody("<style>.sc-main{display:none}</style>");

var pane = SC.ControlTestPane.design().add("test_ajax_activity",
	 OI.AjaxActivityView);

pane.show(); // add a test to show the test pane

module('AjaxActivityView',{
  setup:function(){},
  teardown:function(){}
});

test("Check that it is visible", function() {
  ok(pane.view('test_ajax_activity').get('isVisibleInWindow'),"Should be visible");
});

test("Check that it has proper classes", function() {
  var viewElem=pane.view('test_ajax_activity').$();
  ok(viewElem.hasClass('ajax_activity'),"Should be an ajax_activity");
});

test("Check the child view",function(){
  equals(pane.view('test_ajax_activity').$('img').length,1,'Should have an img');
});