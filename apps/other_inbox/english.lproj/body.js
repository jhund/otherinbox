// ==========================================================================
// Project:   OtherInbox -- SproutCore sample application w/ statecharts
// Copyright: ©2009-2011 OtherInbox, Inc.
// License:   Images are copyrighted and/or trademarked. All rights reserved.
//            Code (only) is licensed under an MIT license.
// ==========================================================================
/*global OI */

sc_require('views/flash');
sc_require('views/branding_button');
sc_require('views/anchor_button');
sc_require('views/toolbar_button');
sc_require('views/greeting');
sc_require('views/controls');
sc_require('views/mailbox_source');
sc_require('views/message_list_item');
sc_require('views/tag_button');
sc_require('views/message_detail');
sc_require('views/message_iframe');
sc_require('views/attachment_iframe');

OI.bodyPage = SC.Page.design({
  
  pageName: 'OI.bodyPage', // required for serialization
  
  // outlets to commonly-needed views
  folderList: SC.outlet('mainPane.wrapper.content.mainSplit.topLeftView.contentView'),
  mailboxList: SC.outlet('mainPane.wrapper.content.mainSplit.bottomRightView.split.topLeftView.contentView'),
  messageList: SC.outlet('mainPane.wrapper.content.mainSplit.bottomRightView.split.bottomRightView.split.topLeftView.messages.contentView'),
  
  // 0.9 compatibility outlets: SC.page.get('wrapper');
  wrapper: SC.outlet('mainPane.wrapper'),
  
  mainPane: SC.MainPane.design({
    defaultResponder: OI,
    childViews: 'wrapper'.w(),
    
    wrapper: SC.View.design({
      layerId: 'wrapper',
      classNames: 'wrapper'.w(),
      layout: { top: -36, bottom: 0, left: 0, right: 0 },
      
      childViews: 'flash toolbar content'.w(),
      
      flash: OI.FlashView.design({
        layerId: 'flash',
        layout: { top: 0, height: 36, left: 0, right: 0 }
      }),
      
      toolbar: SC.View.design({
        layerId: 'toolbar',
        layout: { top: 36, height: 72, left: 0, right: 0 },
        classNames: 'toolbar'.w(),
        
        // // 0.9 compatibility outlets
        greeting: SC.outlet('nav.utilities.greeting'),
        admin: SC.outlet('nav.utilities.adminUI.admin'),
        signOut: SC.outlet('nav.utilities.adminUI.signOut'),
        messsagesButton: SC.outlet('nav.messages'),
        receiptsButton: SC.outlet('nav.receipts'),
        couponsButton: SC.outlet('nav.coupons'),
        calendarButton: SC.outlet('nav.calendar'),
        helpButton: SC.outlet('nav.help'),
        settingsButton: SC.outlet('nav.settings'),
        
        childViews: 'brandingImage nav'.w(),
        
        brandingImage: OI.BrandingButtonView.design({
          layerId: 'branding',
          layout: { top: 8, height: 54, left: 36, width: 172 }
        }),
        
        nav: SC.View.design({
          layerId: 'nav',
          classNames: 'nav',
          layout: { top: 0, right: 18, width: 432, height: 72 },
          
          childViews: 'utilities messages receipts coupons calendar help settings'.w(),
          
          utilities: SC.View.design({
            layerId: 'utilities',
            layout: { top: 24, bottom: 0, right: 450, width: 360 },
            
            childViews: [OI.GreetingView, OI.ControlsView]
          }),
          
          messages: OI.ToolbarButtonView.design({
            layerId: 'messages_button',
            layout: { top: 0, bottom: 0, left: 0, width: 72 },
            isSelected: YES,
            title: "Messages",
            action: 'openMessages'
          }),
          
          receipts: OI.ToolbarButtonView.design({
            layerId: 'receipts_button',
            layout: { top: 0, bottom: 0, left: 72, width: 72 },
            title: "Receipts",
            action: 'openReceipts'
          }),
          
          coupons: OI.ToolbarButtonView.design({
            layerId: 'coupons_button',
            layout: { top: 0, bottom: 0, left: 144, width: 72 },
            title: "Coupons",
            action: 'makeComingSoonFlash'
          }),
          
          calendar: OI.ToolbarButtonView.design({
            layerId: 'calendar_button',
            layout: { top: 0, bottom: 0, left: 216, width: 72 },
            title: "Calendar",
            action: 'openCalendar'
          }),
          
          help: OI.ToolbarButtonView.design({
            layerId: 'help_button',
            layout: { top: 0, bottom: 0, left: 288, width: 72 },
            title: "Help",
            action: 'openHelp'
          }),
          
          settings: OI.ToolbarButtonView.design({
            layerId: 'settings_button',
            layout: { top: 0, bottom: 0, left: 360, width: 72 },
            title: "Settings",
            action: 'openSettings'
          })
        })
      }),
      
      content: SC.View.design({
        layerId: 'content',
        layout: { top: 108, bottom: 0, left: 0, right: 0 },
        classNames: 'content'.w(),
        
        childViews: 'mainSplit layoutBar'.w(),
        
        mainSplit: SC.SplitView.design({
          layerId: 'main_split',
          classNames: 'main_split'.w(),
          layout: { left: 0, top: 0, right: 0, bottom: 36 },
          
          layoutDirection: SC.LAYOUT_HORIZONTAL,
          defaultThickness: 125,
          
          topLeftMinThickness: 125,
          // topLeftMaxThickness: 300, // For some reason this makes default thickness not work; I've asked Erich.
          autoresizeBehavior: SC.RESIZE_BOTTOM_RIGHT,
          dividerThickness: 0,
          
          // TODO why do we even have a scroll view here?
          topLeftView: SC.ScrollView.design({
            layerId: 'folder_source_list_scroller',
            classNames: 'folder_source_list_scroller'.w(),
            
            hasHorizontalScroller: NO,
            hasVerticalScroller: NO,
            contentView: SC.SourceListView.design({
              layerId: 'folder-list',
              rowHeight: 36,
              contentValueKey: 'name',
              hasContentIcon: YES,
              contentIconKey:  'icon',
              contentUnreadCountKey: 'count',
              contentBinding: SC.Binding.multiple('OI.foldersController.arrangedObjects').oneWay(),
              selectionBinding: 'OI.foldersController.selection',
              selectOnMouseDown: YES,
              delegate: OI,
              acceptsFirstResponder: NO,
              exampleView: SC.ListItemView.design({
                layoutStyle: function() {
                  var layout = this.layout ;
                  var oldHeight = layout.height ;
                  layout.height = oldHeight - 2 ;
                  var res = sc_super() ;
                  layout.height = oldHeight ;
                  return res ;
                }.property().cacheable()
              })
            })
          }),
          
          dividerView: SC.View,
          
          // TODO why isn't the split view below the bottomRightView?
          bottomRightView: SC.View.design({
            layerId:'content-split-right',
            childViews: 'thumb split'.w(),
            
            thumb: SC.ThumbView.design({
              layout: { top:0, bottom:0, width:10, left:0 }
            }),
            
            split: SC.SplitView.design({
              layerId: 'main',
              classNames: 'main'.w(),
              layout: { left: 0, top: 0, right: 0, bottom: 0 },
              layoutDirection: SC.LAYOUT_HORIZONTAL,
              defaultThickness: 180,
              canCollapseViews: false,
              
              topLeftMinThickness: 125,
              bottomRightMinThickness: 600,
              
              autoresizeBehavior: SC.RESIZE_BOTTOM_RIGHT,
              dividerThickness: 0,
              
              topLeftView: SC.ScrollView.design({
                layerId: 'mailbox_scroll',
                classNames: 'mailbox_scroll'.w(),
                hasHorizontalScroller: NO,
                hasVerticalScroller: YES,
                autohideVerticalScroller:NO,
                
                contentView: OI.MailboxSourceView.design({
                  layerId: 'mailbox-list',
                  classNames: 'mailbox-list'.w(),
                  // delegate: 'OI*mailboxesController',
                  contentValueKey: 'name',
                  contentUnreadCountKey: 'unreadCount',
                  contentBinding: 'OI*mailboxesController.arrangedObjects',
                  selectionBinding: 'OI*mailboxesController.selection',
                  selectOnMouseDown: YES,
                  acceptsFirstResponder: YES,
                  delegate: OI,
                  didBecomeFirstResponder: function() {
                    OI.didBecomeFirstResponder(this) ;
                  },
                  willLoseFirstResponder: function() {
                    OI.willLoseFirstResponder(this) ;
                  },
                  moveLeft: function(sender, evt) {
                    return OI.moveLeft(sender, evt) ;
                  },
                  moveRight: function(sender, evt) {
                    return OI.moveRight(sender, evt) ;
                  },
                  exampleView: SC.ListItemView.design({
                    layoutStyle: function() {
                      var layout = this.layout ;
                      var oldHeight = layout.height ;
                      layout.height = oldHeight - 2 ;
                      var res = sc_super() ;
                      layout.height = oldHeight ;
                      return res ;
                    }.property().cacheable()
                  })
                })
              }),
              
              dividerView: SC.View,
              
              bottomRightView: SC.View.design({
                childViews: 'divider split'.w(),
                layerId:'mailbox-split-right',
                
                divider: SC.ThumbView.design({
                  layout: { left: 0, top: 0, bottom: 0, width: 10 }
                }),
                
                split: SC.SplitView.design({
                  layerId: 'messages',
                  c1assNames: 'messages'.w(),
                  layout: { left: 0, top: 0, right: 0, bottom: 0 },
                  layoutDirection: SC.LAYOUT_VERTICAL,
                  
                  canCollapseViews: NO,
                  topLeftMinThickness: 137, // smallest before scroll bars start looking bad
                  bottomRightMinThickness: 36, // so we can still access the thumb to pull it back up
                  autoresizeBehavior: SC.RESIZE_BOTTOM_RIGHT,
                  dividerThickness: 0,
                  defaultThickness: 177,
                  
                  topLeftView: SC.View.design({
                    layerId: 'messages_top',
                    classNames: 'messages_top'.w(),
                    childViews: 'buttons messages'.w(),
                    
                    buttons: SC.View.design({
                      layerId: 'mailbox_buttons',
                      classNames: 'action_bar mailbox_buttons'.w(),
                      childViews: 'markAllAsRead markAllAsUnread deleteAll blockAll unblockAll undo'.w(),
                      
                      markAllAsRead: OI.ActionButtonView.design({
                        layerId: 'mark_read_button',
                        classNames: 'mark_read_button'.w(),
                        useStaticLayout: YES,
                        layout: { width: 143, height: 36 },
                        title: "Mark All As Read",
                        target: OI, action: 'markAllAsRead',
                        isEnabledBinding: SC.Binding.bool('OI*messagesController.length').oneWay(),
                        isVisibleBinding: SC.Binding.bool('OI.mailboxController.unreadCount').oneWay()
                      }),
                      markAllAsUnread: OI.ActionButtonView.design({
                        layerId: 'mark_unread_button',
                        classNames: 'mark_unread_button',
                        useStaticLayout: YES,
                        layout: { width: 160, height: 36 },
                        title: "Mark All As Unread",
                        target: OI, action: 'markAllAsUnread',
                        isEnabledBinding: SC.Binding.bool('OI*messagesController.length').oneWay(),
                        isVisibleBinding: SC.Binding.not('OI.mailboxController.unreadCount').oneWay()
                      }),
                      deleteAll: OI.ActionButtonView.design({
                        layerId: 'delete_all_button',
                        classNames: 'delete_all_button'.w(),
                        useStaticLayout: YES,
                        layout: { width: 97, height: 36 },
                        title: "Delete All",
                        target: OI, action: 'deleteAll',
                        isVisibleBinding: SC.Binding.bool('OI.folderController.isDeleteable').oneWay(),
                        isEnabledBinding: SC.Binding.bool('OI*messagesController.length').oneWay()
                      }),
                      blockAll: OI.ActionButtonView.design({
                        layerId: 'block_all_button',
                        classNames: 'block_all_button'.w(),
                        useStaticLayout: YES,
                        layout: { width: 122, height: 36 },
                        title: "Block Mailbox",
                        target: OI, action: 'blockAll',
                        isVisibleBinding: SC.Binding.bool('OI.folderController.isBlockable').oneWay(),
                        isEnabledBinding: SC.Binding.bool('OI*messagesController.length').oneWay()
                      }),
                      unblockAll: OI.ActionButtonView.design({
                        layerId: 'unblock_all_button',
                        classNames: 'unblock_all_button'.w(),
                        useStaticLayout: YES,
                        layout: { width: 139, height: 36 },
                        title: "Unblock Mailbox",
                        target: OI, action: 'unblockAll',
                        isVisible: NO,
                        // isVisibleBinding: SC.Binding.not('OI.folderController.isBlockable').oneWay(),
                        isEnabledBinding: SC.Binding.bool('OI*messagesController.length').oneWay()
                      }),
                      undo: OI.ActionButtonView.design({
                        layerId: 'undo_button',
                        classNames: 'undo_button'.w(),
                        useStaticLayout: YES,
                        layout: { width: 72, height: 36 },
                        title: "Undo",
                        target: OI, action: 'undo',
                        isVisible: NO,
                        isEnabled: NO // TODO get undo manager working again, preferably use the built-in manager not our custom one
                      })
                    }),
                    
                    messages: SC.ScrollView.design({
                      layerId: 'message_scroll',
                      classNames: 'message_scroll'.w(),
                      hasHorizontalScroller: NO,
                      hasVerticalScroller: YES,
                      autohidesVerticalScroller: NO,
                      
                      layout: { top:37, left:0, right:0, bottom:0 },
                      contentView: SC.ListView.design({
                        layerId: 'message-list',
                        exampleView: OI.MessageListItemView,
                        contentBinding: SC.Binding.multiple('OI*messagesController.arrangedObjects').oneWay(),
                        selectionBinding: SC.Binding.multiple('OI*messagesController.selection'),
                        rowHeight: 20,
                        acceptsFirstResponder: YES,
                        delegate: OI,
                        moveLeft: function(sender, evt) {
                          return OI.moveLeft(sender, evt) ;
                        },
                        moveRight: function(sender, evt) {
                          return OI.moveRight(sender, evt) ;
                        },
                        didBecomeFirstResponder: function() {
                          OI.didBecomeFirstResponder(this) ;
                        },
                        willLoseFirstResponder: function() {
                          OI.willLoseFirstResponder(this) ;
                        }
                      })
                    })
                  }),
                  
                  dividerView: SC.View,
                  
                  bottomRightView: SC.View.design({
                    layerId: 'messages_bottom',
                    classNames: 'messages_bottom'.w(),
                    childViews: 'toolbar message thumb'.w(),
                    
                    toolbar: SC.View.design({
                      layerId: 'messages_toolbar',
                      classNames: 'messages_toolbar action_bar'.w(),
                      childViews: 'buttons'.w(),
                      
                      buttons: SC.View.design({
                        layerId: 'message_buttons',
                        classNames: 'action_bar message_buttons'.w(),
                        childViews: 'save reply forward deleteButton markAsRead markAsUnread moveToInbox print plain thumb'.w(),
                        
                        save: OI.ActionButtonView.design({
                          layerId: 'save_button',
                          classNames: 'save_button',
                          useStaticLayout: YES,
                          layout: { width: 68, height: 36 },
                          title: 'Save',
                          target: OI, action: 'saveSelected',
                          useStaticLayout: YES,
                          isEnabledBinding: SC.Binding.bool('OI.folderController.isSaveable').oneWay()
                        }),
                        
                        reply: OI.ActionButtonView.design({
                          layerId: 'reply_button',
                          classNames: 'reply_button',
                          useStaticLayout: YES,
                          layout: { width: 73, height: 36 },
                          title: 'Reply',
                          target: OI, action: 'reply',
                          isEnabledBinding: SC.Binding.bool('OI*messagesController.hasSingleSelection').oneWay()
                        }),
                        
                        forward: OI.ActionButtonView.design({
                          layerId: 'forward_button',
                          classNames: 'forward_button',
                          useStaticLayout: YES,
                          layout: { width: 86, height: 36 },
                          title: 'Forward',
                          target: OI, action: 'forward',
                          isEnabledBinding: SC.Binding.bool('OI*messagesController.hasSingleSelection').oneWay()
                        }),
                        
                        // delete is a reserved word
                        deleteButton: OI.ActionButtonView.design({
                          layerId: 'delete_button',
                          classNames: 'delete_button',
                          useStaticLayout: YES,
                          layout: { width: 77, height: 36 },
                          title: 'Delete',
                          target: OI, action: 'deleteSelected',
                          isEnabledBinding: SC.Binding.bool('OI.folderController.isDeleteable').oneWay()
                        }),
                        
                        markAsRead: OI.ActionButtonView.design({
                          layerId: 'mark_sel_read_button',
                          classNames: 'mark_sel_read_button',
                          useStaticLayout: YES,
                          layout: { width: 121, height: 36 },
                          title: 'Mark As Read',
                          target: OI, action: 'markSelectedAsRead',
                          isEnabledBinding: SC.Binding.bool('OI*messagesController.hasSelection').oneWay(),
                          isVisibleBinding: SC.Binding.bool('OI*messagesController.someSelectedUnread').oneWay()
                        }),
                        
                        markAsUnread: OI.ActionButtonView.design({
                          layerId: 'mark_sel_unread_button',
                          classNames: 'mark_sel_unread_button',
                          useStaticLayout: YES,
                          layout: { width: 134, height: 36 },
                          title: 'Mark As Unread',
                          target: OI, action: 'markSelectedAsUnread',
                          isEnabledBinding: SC.Binding.bool('OI*messagesController.hasSelection').oneWay(),
                          isVisibleBinding: SC.Binding.bool('OI*messagesController.noneSelectedUnread').oneWay()
                        }),
                        
                        moveToInbox: OI.ActionButtonView.design({
                          layerId: 'move_to_inbox_button',
                          classNames: 'move_to_inbox_button',
                          useStaticLayout: YES,
                          layout: { width: 123, height: 36 },
                          title: 'Move to Inbox',
                          target: OI, action: 'moveToInbox',
                          isEnabledBinding: SC.Binding.bool('OI*messagesController.hasSelection').oneWay(),
                          isVisibleBinding: SC.Binding.bool('OI.folderController.isInboxable').oneWay()
                        }),
                        
                        print: OI.ActionButtonView.design({
                          layerId: 'print_button',
                          classNames: 'print_button',
                          useStaticLayout: YES,
                          layout: { width: 67, height: 36 },
                          title: 'Print',
                          target: OI, action: 'openMessage',
                          isEnabledBinding: SC.Binding.bool('OI*messagesController.hasSingleSelection').oneWay()
                        }),
                        
                        plain: OI.ActionButtonView.design({
                          layerId: 'plain_button',
                          classNames: 'plain_button',
                          useStaticLayout: YES,
                          layout: { width: 151, height: 36 },
                          title: 'View Raw Message',
                          target: OI, action: 'viewAsPlainText',
                          isEnabledBinding: SC.Binding.bool('OI*messagesController.hasSingleSelection').oneWay()
                        }),
                        
                        thumb: SC.ThumbView.design( SC.StaticLayout, {
                          useStaticLayout: YES,
                          layout: { width: 'auto', height: 36, right: 0 }
                        })
                      })
                      
                    }),
                    
                    message: SC.ScrollView.design({
                      layout: { top:38, bottom:0, left:0, right:0 },
                      
                      hasHorizontalScroller: YES,
                      hasVerticalScroller: YES,
                      autohidesHorizontalScroller: YES,
                      autohidesVerticalScroller: YES,
                      
                      contentView: SC.View.design({
                        childViews: 'tags detail iframe attachment'.w(),
                        
                        isVisibleBinding: SC.Binding.single('OI*messagesController.selection').notEmpty().transform(function(value) {
                          return (value !== SC.EMPTY_PLACEHOLDER && value !== SC.MULTIPLE_PLACEHOLDER) ? YES : NO ;
                        }).oneWay(),
                        
                        layoutDidChangeFor: function(childView) {
                          if (this.getPath('tags.isVisible')) {
                            this.get('detail').adjust({ top:31 }) ;
                            this.get('iframe').adjust({ top:100 }) ;
                          } else {
                            this.get('detail').adjust({ top:0 }) ;
                            this.get('iframe').adjust({ top:69 }) ;
                          }
                          this.get('parentView').layoutDidChangeFor(this) ;
                          sc_super() ;
                        },
                        
                        tags: (function() {
                          var TAG_NAMES = "Receipt ShippingNotice Coupon Newsletter Welcome Statement Groups Alert Other Invite Confirmation".w();
                          var CHILD_TAGS = [];
                          
                          for (var k=0;k<TAG_NAMES.length;k++){
                            CHILD_TAGS.push(OI.TagButtonView.design({
                              action: 'tag',
                              isEnabledBinding: SC.Binding.bool('OI*messagesController.hasSelection').oneWay(),
                              tagsBinding: SC.Binding.single('OI*messagesController.activeTags').oneWay(),
                              value: TAG_NAMES[k]
                            }));
                          }
                          
                          return SC.View.design({
                            layerId: 'message_tags',
                            classNames: 'action_bar message_tags'.w(),
                            layout: { top:0, height:25, left:0, right:0 },
                            extraStylesheetHeight: 6,
                            isVisible: NO,
                            isVisibleBinding: SC.Binding.single('OI*messagesController.selection').notEmpty().transform(function(value) {
                              if (!OI.userController.get('canTag')) return NO ;
                              else return (value !== SC.EMPTY_PLACEHOLDER && value !== SC.MULTIPLE_PLACEHOLDER) ? YES : NO ;
                            }).oneWay(),
                            
                            childViews: CHILD_TAGS
                          });
                        })(),
                        
                        detail: OI.MessageDetailView.design({
                          layerId: 'message_detail',
                          layout: { top:0, height:50, left:0, right:0 },
                          extraStylesheetHeight: 19,
                          isVisible: NO,
                          isVisibleBinding: SC.Binding.bool('OI*messagesController.hasSingleSelection'),
                          contentBinding: SC.Binding.single('OI*messagesController.selection').notEmpty().oneWay()
                        }),
                        
                        iframe: OI.MessageIframeView.design({
                          layout: { top:69, bottom:0, left:0, right:0 },
                          isVisible: NO,
                          isVisibleBinding: SC.Binding.bool('OI*messagesController.hasSingleSelection'),
                          contentBinding: SC.Binding.single('OI*messagesController.selection').notEmpty().oneWay()
                        }),
                        
                        attachment: OI.AttachmentIframeView.design({
                          layout: { height:69, bottom:0, left:0, right:0 },
                          contentBinding: SC.Binding.single('OI*messagesController.selection').notEmpty().oneWay(),
                          isVisible: NO,
                          isVisibleBinding: SC.Binding.bool('OI.messageDetailController.hasAttachments').oneWay()
                        })
                      })
                    }),
                    
                    thumb: SC.ThumbView.design({
                      layerId: 'messages_top_bottom_thumb',
                      layout: { top:-5, left:0, right:0, height: 10 }
                    })
                  })
                })
              })
            })
          })
        }),
        
        layoutBar: SC.View.design({
          layerId: 'layoutbar',
          layout: { height: 36, bottom: 0, left: 0, right: 0 },
          classNames: 'layoutbar',
          childViews: 'composeButton newMailbox inviteFriends'.w(),
          
          composeButton: SC.ButtonView.design({
            layerId: 'compose-button',
            classNames: 'compose-button',
            layout: { left:8, bottom:6, height:24, width:130 },
            title: "New message",
            target: 'OI',
            action: 'compose'
          }),
          
          newMailbox: SC.ButtonView.design({
            layerId: 'new-mailbox',
            classNames: 'new-mailbox',
            layout: { left:136, bottom:6, height:24, width:130 },
            title: "New mailbox",
            target: 'OI',
            action: 'newMailbox'
          }),
          
          inviteFriends: SC.ButtonView.design({
            layerId: 'invite-friends',
            classNames: 'invite-friends',
            layout: { right:28, bottom:7, height:18, width:114 },
            title: "Invite Friends",
            target: 'OI',
            action: 'makeNewInvitation'
          })
        })
      })
    })
  })
});
