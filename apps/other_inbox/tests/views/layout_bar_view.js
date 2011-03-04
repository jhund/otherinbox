htmlbody('<style> .sc-static-layout { border: 1px red dotted; } </style>');
htmlbody("<style>.sc-main{display:none}</style>");

var pane = SC.ControlTestPane.design().add("test_layout_bar",
	 OI.LayoutBarView);

pane.show(); // add a test to show the test pane

module('LayoutBarView',{
  setup:function(){},
  teardown:function(){}
});

test("Check that it is visible", function() {
  ok(pane.view('test_layout_bar').get('isVisibleInWindow'),"Should be visible");
});

test("Check that it has proper classes", function() {
  var viewElem=pane.view('test_layout_bar').$();
  ok(viewElem.hasClass('layoutbar'),"Should be a layoutbar");
});

test("Check the child views",function(){
  var el=pane.view('test_layout_bar');
       
  ok(el.$('a.compose_button').length>0,'Should have a compose button');
  ok(el.$('a.new_mailbox_button').length>0,'Should have a new mailbox button');
  ok(el.$('a.invite_friends_button').length>0,'Should have a invite friends button');
});
