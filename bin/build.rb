#!/usr/local/bin/ruby

require 'fileutils'
require 'md5'
require 'rubygems'
require 'erb'

cwd = File.dirname(__FILE__)
root = "#{cwd}/.."
build_root = "#{root}/tmp/"

puts "Removing old build"
FileUtils.rm_rf(build_root)

puts "Generating new build"
fail "Build failed" unless system("#{root}/../erich-buildtools/bin/sc-build other_inbox -r --mode=production")

# build_num = MD5.hexdigest(IO.read("#{build_root}/other_inbox/index.html"))
# 
# puts "Setting build version to #{build_num}"
# fail $? unless system("replace OI_DEV_VERSION #{build_num} -- #{build_root}/other_inbox/en/javascript.js")
# File.open("#{build_root}/RELEASE",'w') { |f| f.puts build_num }