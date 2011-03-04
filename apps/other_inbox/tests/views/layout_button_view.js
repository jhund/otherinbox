htmlbody('<style> .sc-static-layout { border: 1px red dotted; } </style>');
htmlbody("<style>.sc-main{display:none}</style>");

var pane = SC.ControlTestPane.design().add("test_layout_button",
	 OI.LayoutButtonView);

pane.show(); // add a test to show the test pane

module('LayoutButtonView',{
  setup:function(){},
  teardown:function(){}
});

test("Check that it is visible", function() {
  ok(pane.view('test_layout_button').get('isVisibleInWindow'),"Should be visible");
});

test("Check that it has proper classes", function() {
  var viewElem=pane.view('test_layout_button').$();
  ok(viewElem.hasClass('segment'),"Should be a segment");
});

test("Check the child view",function(){
  var child=pane.view('test_layout_button').$('span.button-inner');
  ok(child.length>0,'Should have a button-inner');
});