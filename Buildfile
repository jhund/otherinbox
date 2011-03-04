# ==========================================================================
# Project:   OtherInbox -- SproutCore sample application w/ statecharts
# Copyright: ©2009-2011 OtherInbox, Inc.
# License:   Images are copyrighted and/or trademarked. All rights reserved.
#            Code (only) is licensed under an MIT license:
# ==========================================================================

config :otherinbox_theme,
  :required => ['sproutcore/empty_theme'],
  :theme_name => 'oi-theme',
  :test_required  => ['sproutcore/testing'],
  :debug_required => ['sproutcore/debug']

config :all do |c|
  
  # Name any other frameworks your bundles depend upon.  The stylesheets and
  # JavaScript for required bundles will be loaded before your bundle on your
  # page.
  c[:required] = [:sproutcore, :otherinbox_theme]
  
  # This string will be prepended before any URLs that reference JavaScript,
  # CSS or images in your files.
  c[:resources_at] = 'static'
  
  # This string will be prepended before any index.html urls that actually
  # load your clients.  Setting this to an empty string will mount all
  # of your clients at the root URL level.
  c[:index_at] = ''
  
  # If you also need to load external stylesheets not managed by the bundle
  # system, name the URLs you want to reference here.
  # c[:stylesheet_libs] = ['/stylesheets/public.css']
  
  # If you also need to load external javascripts not managed by the bundle
  # system, name the URLs you want to reference here.  These will be loaded
  # automatically.
  # c[:javascript_libs] = ['/javascript/scriptaculous.js']
  
  # This is the preferred language.  When the user visits the root URL of
  # your client, this is the language they will get.  When looking for a
  # resources (such as an image or stylesheet), SproutCore will also try
  # your preferred language .lproj if it cannot find the resource in the
  # current language.
  # c[:preferred_language] = :fr
  
  # If you want to use a default root layout template other than the default
  # provided by SproutCore, you can specifiy the path name to the index.html
  # here.  If you provide a relative path, SproutCore will assume the file
  # is relative to the root of this project.
  c[:layout] = 'lib/index.rhtml'
  
  # This is the fully qualified path to the directory you want all of your
  # static files stored in.  You can place any files not managed by the build
  # system here.  SproutCore will also save its cached resources here.
  # c[:public_root] = File.join(File.dirname(__FILE__), 'public')
  
  # The default build mode.  Normally you can specify this on the command
  # line as well using the -e option, but you can override the default
  # using this config as well.
  # c[:build_mode] = :production
  
  # Name the build modes that you want JavaScript to be minified in.  Normally
  # JavaScript is only minified in production.  This only has effect if you
  # are also building composite javascript in the same mode.
  c[:minify_javascript] = false
  
  # Name the build modes that you want your JavaScript to appear as a 
  # composite file instead of the individual parts.  This can be an array.
  c[:combine_javascript] = :production
  
  # Name the builds modes that you want you CSS to appear as compite files
  # instead of individual parts.  This can be an array.
  c[:combine_stylesheets] = :production
  
  # Name the build modes that should include fixture data.
  c[:include_fixtures] = :development
  
  c[:test_layout] = 'sproutcore:lib/index.rhtml'
  c[:test_required] = ['sproutcore/testing', 'sproutcore/empty_theme', 'sproutcore/foundation', 'OI']
  
  # if set to true then the index.html will build into the global language
  # and target directory.  This can interfere with deploying multiple builds
  # at one but it is more convenient.
  c[:overwrite_current] = true
  
  c[:theme] = :otherinbox_theme
  
end

# Add configurations for specific bundles here as well.  Any options you
# provide here will override the defaults provided by the bundles themselves
# as well as any options you place in the :all category above.
config :core_oi do |c|
	c[:required] = %w(sproutcore/datastore)
end

config :other_inbox do |c|
	c[:required] = %w(sproutcore core_oi)
end

config :store_tester do |c|
	c[:required] = %w(sproutcore core_oi)
end

USERNAME = 'test'
PASSWORD = 'test'

proxy '/refresh', :to => 'my.otherinbox.com', :https => true, :username => USERNAME, :password => PASSWORD
proxy '/batch_update', :to => 'my.otherinbox.com', :https => true, :username => USERNAME, :password => PASSWORD
proxy '/mailboxes', :to => 'my.otherinbox.com', :https => true, :username => USERNAME, :password => PASSWORD
proxy '/messages', :to => 'my.otherinbox.com', :https => true, :username => USERNAME, :password => PASSWORD
