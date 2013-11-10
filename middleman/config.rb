# directory index (url without .html)
activate :directory_indexes

# asset dirs
set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'


# sprockets bower settings
set :bower_dir, '../bower_components'



# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  # activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end



# dynamic pages

# index page
proxy "/index.html", "/version.html", locals: data.android.versions.latest, ignore: true

# version pages
data.android.versions.each do |version, data|
   proxy "/#{version}.html", "/version.html", locals: data, ignore: true
end



