release:
	cd middleman ; bundle exec middleman build ; cp -r build/* ../
	git add .
	git commit -m 'Automated build commit'
