htmlbody('<style> .sc-static-layout { border: 1px red dotted; } </style>');
htmlbody("<style>.sc-main{display:none}</style>");

var pane = SC.ControlTestPane.design().add("test_iframe",
	 OI.ActionButtonView.design({
	   layerId: 'test_iframe',
	   layout: { top: 0, bottom: 0, left: 0, width: 72 },
	   title:"Test iframe"
	 }));

pane.show(); // add a test to show the test pane

module('ActionButton',{
  setup:function(){},
  teardown:function(){}
});

test("Check that iframe is visible", function() {
  ok(pane.view('test_iframe').get('isVisibleInWindow'),"Should be visible");
});
