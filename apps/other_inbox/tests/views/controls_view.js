htmlbody('<style> .sc-static-layout { border: 1px red dotted; } </style>');
htmlbody("<style>.sc-main{display:none}</style>");

var pane = SC.ControlTestPane.design().add("test_controls",
	 OI.ControlsView);

pane.show(); // add a test to show the test pane

module('ControlsView',{
  setup:function(){},
  teardown:function(){}
});

test("Check that it is visible", function() {
  ok(pane.view('test_controls').get('isVisibleInWindow'),"Should be visible");
});
