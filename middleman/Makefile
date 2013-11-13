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

bump:
	./bump.js --platform $(PLATFORM) $(TARGET) $(RANGE) $(FIX)

bump-android:
	@$(MAKE) bump PLATFORM=android


bump-bundle-android:
	@$(MAKE) bump-android TARGET='-b'

bump-bundle-android-s:
	@$(MAKE) bump-bundle-android RANGE='-s'

bump-bundle-android-m:
	@$(MAKE) bump-bundle-android RANGE='-m'

bump-bundle-android-l:
	@$(MAKE) bump-bundle-android RANGE='-l'


bump-straw-android:
	@$(MAKE) bump-android TARGET='--name straw-android'

bump-straw-android-s:
	@$(MAKE) bump-straw-android RANGE='-s'

bump-straw-android-m:
	@$(MAKE) bump-straw-android RANGE='-m'

bump-straw-android-l:
	@$(MAKE) bump-straw-android RANGE='-l'


bump-straw-android-plugin:
	@$(MAKE) bump-android TARGET='--name straw-android-plugin'

bump-straw-android-plugin-s:
	@$(MAKE) bump-straw-android-plugin RANGE='-s'

bump-straw-android-plugin-m:
	@$(MAKE) bump-straw-android-plugin RANGE='-m'

bump-straw-android-plugin-l:
	@$(MAKE) bump-straw-android-plugin RANGE='-l'


bump-straw-android.js:
	@$(MAKE) bump-android TARGET='--name straw-android.js'

bump-straw-android.js-s:
	@$(MAKE) bump-straw-android.js RANGE='-s'

bump-straw-android.js-m:
	@$(MAKE) bump-straw-android.js RANGE='-m'

bump-straw-android.js-l:
	@$(MAKE) bump-straw-android.js RANGE='-l'


bump-straw-android-plugin.js:
	@$(MAKE) bump-android TARGET='--name straw-android-plugin.js'

bump-straw-android-plugin.js-s:
	@$(MAKE) bump-straw-android-plugin.js RANGE='-s'

bump-straw-android-plugin.js-m:
	@$(MAKE) bump-straw-android-plugin.js RANGE='-m'

bump-straw-android-plugin.js-l:
	@$(MAKE) bump-straw-android-plugin.js RANGE='-l'


fix-android-latest:
	@$(MAKE) bump PLATFORM=android FIX='-f'
