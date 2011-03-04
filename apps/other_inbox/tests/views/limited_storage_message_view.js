htmlbody('<style> .sc-static-layout { border: 1px red dotted; } </style>');
htmlbody("<style>.sc-main{display:none}</style>");

var pane = SC.ControlTestPane.design().add("test_lsm",
	 OI.LimitedStorageMessageView);

pane.show(); // add a test to show the test pane

module('LimitedStorageMessageView',{
  setup:function(){},
  teardown:function(){}
});

test("Check that it is visible", function() {
  ok(pane.view('test_lsm').get('isVisibleInWindow'),"Should be visible");
});
