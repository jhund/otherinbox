// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global CoreOI */

// eventually we'll revive this, need a way to load a variety of objects from fixtures

// function() {
//   var sites = ['amazon', 'apple_store', 'bestbuy', 'buystore', 'circuitcity', 'cnet', 'continental', 'walmart', 'dell', 'facebook', 'extremelylongfellowrealty100characterclub', 'evite'];
//   var bodyIds = ['1227','1433','1272','1425','1233','1436'];
//   var bodyLength = bodyIds.length;
//   var ret = [];
//   var siteIdx,url;
//   var siteLength = sites.length;
//   
//   var fromAddresses = ['sales@example.com','receipts@ebay.com','info@amazon.com','deals@bestbuy.com','offers@staples.com','jobs@linkedin.com','inquiries@audible.com','news@twitter.com','no-reply@ipodcontest.com','notice@moveon.org'];
//   var fromAddressLength = fromAddresses.length;
// 
//   var folderIdx,messageIdx,messagesLength,unreadCount,messageId,dateSent,recipient,subject;
//   
//   var subjects = ["Casting Doubt on DTC Ads; Starbucks Rolls Out Breakfast Menu; LPGA Defends Policy; GOP Ad Execs Pleased by Palin", "In Surprise Move, Unilever Names Polman CEO", "VIDEO: Outdoor Video-Ad Networks Seek Metrics Credibility", "Pepsi Gets Interactive with MTV; Dobrow on the new '90210'; A Dining Room for Dexter?; It's Ad Age's MediaWorks", "Madison+Vine: 'Entourage' Plays Wingman; Fans Go Viral for 'Fringe'; Dining With 'Dexter'", "Nike's 'Grapple in the Apple'; Crest's Unconventional Push; McGuire Leaves Sears; Fueling CrowdFire", "A P&G Product Launch With Little Media Spending; Marketers Reducing Ad Budgets; Saving Newspapers; It's Ad Age's MediaWorks","Gates and Seinfeld Shop for Shoes; 'Entourage' Plays Wingman; Kellogg's Digital ROI; Domino's New CMO", "NYT Online Revenue Skids; Parents Group Attacks '90210'; CNN Feeds Convention Crowds; It's Ad Age's MediaWorks", "Creativity E-mail: 'Porno' Poster Pulled"];
//   
//   var dates = [];
//   
//   for (idx=2;idx<7;idx++) {
//     dates.push(new Date(2008,9,idx,idx,13,14));
//   }
// 
//   var datesLength = dates.length;
//   var urlMask = "http://s3.amazonaws.com/testing-messages/%@.html";
//   
//   OI.Mailbox.FIXTURES = [];
//   OI.Message.FIXTURES = [];
//   
//   for (folderIdx=1;folderIdx<=3;folderIdx++) {
//     for (siteIdx=0;siteIdx<siteLength;siteIdx++) {
//       var mailboxId = '%@%@'.fmt(folderIdx,siteIdx);
//       messagesLength = Math.floor(Math.random()*12)+1;
//       unreadCount = 0;
//       
//       for (messageIdx=0;messageIdx<messagesLength;messageIdx++) {
//         messageId = '%@%@%@'.fmt(folderIdx,siteIdx,messageIdx);
//         dateSent = dates[Math.floor(Math.random()*datesLength)].utcFormat();
//         recipient = sites[siteIdx].toLowerCase();
//         
//         subject = "%@-%@".fmt(messageId,subjects[Math.floor(Math.random()*5)]);
//         url = urlMask.fmt(bodyIds[Math.floor(Math.random()*bodyLength)]);
//         
//         OI.Message.FIXTURES.push({ guid: messageId, 
//                                    recipient: recipient + messageIdx, mailbox: mailboxId, 
//                                    fromAddress: fromAddresses[Math.floor(Math.random()*fromAddressLength)],
//                                    subject: subject, 
//                                    unread: true, 
//                                    dateSent: dateSent, 
//                                    folder: folderIdx, 
//                                    url: url });
//         
//         unreadCount++;
//       }
//       
//       OI.Mailbox.FIXTURES.push({ guid: mailboxId, 
//                                  name: sites[siteIdx], 
//                                  feed: "feed%@".fmt(mailboxId), 
//                                  unreadCount: unreadCount, 
//                                  folder: folderIdx, 
//                                  priority: 2 });
//     }
//   }
//   
// }();