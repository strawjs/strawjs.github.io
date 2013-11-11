FA_CDN_URL=http://netdna.bootstrapcdn.com/font-awesome/4.0.3

SWATCH_THEME=flatly

.PHONY: dl-bootswatch-spacelab dl-fontawesome
dl-fontawesome:
	if [ ! -d source/fa ] ; then mkdir source/fa ; fi
	if [ ! -d source/fa/css ] ; then mkdir source/fa/css ; fi
	if [ ! -d source/fa/fonts ] ; then mkdir source/fa/fonts ; fi
	wget -Osource/fa/css/font-awesome.css $(FA_CDN_URL)/css/font-awesome.css
	wget -Osource/fa/fonts/fontawesome-webfont.eot $(FA_CDN_URL)/fonts/fontawesome-webfont.eot
	wget -Osource/fa/fonts/fontawesome-webfont.svg $(FA_CDN_URL)/fonts/fontawesome-webfont.svg
	wget -Osource/fa/fonts/fontawesome-webfont.ttf $(FA_CDN_URL)/fonts/fontawesome-webfont.ttf
	wget -Osource/fa/fonts/fontawesome-webfont.woff $(FA_CDN_URL)/fonts/fontawesome-webfont.woff

dl-bootswatch:
	wget -Osource/stylesheets/bootstrap-bootswatch.min.css http://bootswatch.com/$(SWATCH_THEME)/bootstrap.min.css
