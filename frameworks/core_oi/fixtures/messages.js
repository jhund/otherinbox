// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global CoreOI */

sc_require('models/message');

CoreOI.Message.FIXTURES = [
 
  { mailbox: '1', folder: "1", tagList: "Receipt, Coupon", guid: "267", recipient: "producttestpanel", subject: "The surprising fantasy most men have", fromAddress: "Billie@owt.net", dateSent: "2003/03/17 17:21:50 +0000", unread: '1', s3_html_url: "/static/other_inbox/en/current/dummy/267.html", has_attachments: "0" }, 
  { mailbox: '1', folder: "1", tagList: "ShippingNotice, Groups", guid: "216", recipient: "producttestpanel", subject: "Order Rolex Replica //atches 0nline!   ", fromAddress: "LeonorcondensateBlackman@flickr.com", dateSent: "2008/01/11 13:56:28 +0000", unread: '1', s3_html_url: "/static/other_inbox/en/current/dummy/216.html", has_attachments: "0" }, 
  { mailbox: '1', folder: "1", tagList: "", guid: "215", recipient: "producttestpanel", subject: "She will call you Macho", fromAddress: "dsw@bobclements.com", dateSent: "2008/02/23 23:21:39 +0000", unread: '1', s3_html_url: "/static/other_inbox/en/current/dummy/215.html", has_attachments: "1" }, 
  { mailbox: '1', folder: "1", tagList: "Invite, Confirmation, Alert", guid: "300", recipient: "producttestpanel1", subject: "She will call you Macho", fromAddress: "dsw@bobclements.com", dateSent: "2008/02/23 23:21:39 +0000", unread: '1', s3_html_url: "/static/other_inbox/en/current/dummy/300.html", has_attachments: "0" }, 

  { mailbox: '2', folder: "1", tagList: "Newsletter, Other", guid: "210", recipient: "freeslide", subject: "Nominate yourself for a Certificate", fromAddress: "AmeliatesticleCoker@khronos.org", dateSent: "2008/02/24 09:13:19 +0000", unread: '1', s3_html_url: "/static/other_inbox/en/current/dummy/210.html", has_attachments: "0" }, 
  { mailbox: '2', folder: "1", tagList: "Welcome", guid: "209", recipient: "freeslide", subject: "Order Rolex Replica //atches 0nline!   ", fromAddress: "MarshaablazeCartwright@quirkybaby.com", dateSent: "2008/02/24 10:28:17 +0000", unread: '1', s3_html_url: "/static/other_inbox/en/current/dummy/209.html", has_attachments: "0" }, 
  { mailbox: '2', folder: "1", tagList: "Statement", guid: "270", recipient: "freeslide2", subject: "Buy The New Photoshop CS3 pb", fromAddress: "jrodf@emerytelcom.net", dateSent: "2008/02/24 13:48:02 +0000", unread: '1', s3_html_url: "/static/other_inbox/en/current/dummy/270.html", has_attachments: "0" }, 

  { mailbox: '3', folder: "1", tagList: "", guid: "202", recipient: "amazon", subject: "All for your struggle against diseases!", fromAddress: "Shelley@vr-web.de", dateSent: "2008/02/24 15:26:49 +0000", unread: '1', s3_html_url: "/static/other_inbox/en/current/dummy/202.html", has_attachments: "0" }, 
  { mailbox: '3', folder: "1", tagList: "Receipt", guid: "207", recipient: "amazon", subject: "J Cheap Apple Products Jw", fromAddress: "betrex@tiscali.es", dateSent: "2008/02/24 15:41:54 +0000", unread: '1', s3_html_url: "/static/other_inbox/en/current/dummy/207.html", has_attachments: "0" }, 
  { mailbox: '3', folder: "1", tagList: "", guid: "203", recipient: "amazon", subject: "Super medicines for man's Health!", fromAddress: "Latonya@nfz-katowice.pl", dateSent: "2008/02/24 16:03:47 +0000", unread: '1', s3_html_url: "/static/other_inbox/en/current/dummy/203.html", has_attachments: "0" }, 

  { mailbox: '4', folder: "3", tagList: "", guid: "400", recipient: "ebay", subject: "This is notorious spam", fromAddress: "Cookei96@dir-online.com", dateSent: "2008/02/24 17:05:51 +0000", unread: '1', s3_html_url: "/static/other_inbox/en/current/dummy/400.html", has_attachments: "0" },
  { mailbox: '4', folder: "3", tagList: "", guid: "401", recipient: "ebay", subject: "Not a player, I just crush a lot", fromAddress: "Cookei96@dir-online.com", dateSent: "2008/02/24 17:05:51 +0000", unread: '1', s3_html_url: "/static/other_inbox/en/current/dummy/401.html", has_attachments: "0" },
  { mailbox: '4', folder: "3", tagList: "", guid: "402", recipient: "ebay", subject: "V to the A to the D-E-R", fromAddress: "Cookei96@dir-online.com", dateSent: "2008/02/24 17:05:51 +0000", unread: '1', s3_html_url: "/static/other_inbox/en/current/dummy/402.html"}

];