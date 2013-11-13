`http://strawjs.github.io/` source code, based on middleman framework.

Bump targets
------------

exmaple:

patch update straw-android, patch update android bundle, save new version file:

```shell
make bump-straw-android-s bump-bundle-android-s fix-android-latest
git add .
git commit -m 'Bump to vK.L.M'
cd ../
make
git push origin HEAD
```
