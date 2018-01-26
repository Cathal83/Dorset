require 'compass/import-once/activate'
# Require any additional compass plugins here.

# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "css"
sass_dir = "scss"
images_dir = "images"
javascripts_dir = "scripts"
fonts_dir = "fonts"

output_style = :expanded

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

line_comments = false
color_output = false

preferred_syntax = :scss

# Require any additional compass plugins installed on your system.
require 'sass-globbing'
require 'breakpoint'
require 'compass-normalize'
require 'singularitygs'

css_dir = "css" # by Compass.app
sass_dir = "scss" # by Compass.app
images_dir = "images" # by Compass.app
output_style = :compressed # by Compass.app
relative_assets = false # by Compass.app
line_comments = false # by Compass.app
sass_options = {:debug_info=>false} # by Compass.app 
