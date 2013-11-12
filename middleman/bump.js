#! /usr/bin/env node

var program = require('commander');
var fs = require('fs');


var Version = (function () {
    'use strict';

    var exports = function (l, m, s) {
        this.l = l;
        this.m = m;
        this.s = s;
    };

    var versionPt = exports.prototype;

    versionPt.bumpSmall = function () {
        this.s ++;
    };

    versionPt.bumpMedium = function () {
        this.m ++;
        this.s = 0;
    };

    versionPt.bumpLarge = function () {
        this.l ++;
        this.m = 0;
        this.s = 0;
    };

    versionPt.toString = function () {
        return 'v' + this.l + '.' + this.m + '.' + this.s;
    };

    exports.fromString = function (version) {
        var vars = /v(\d+)\.(\d+)\.(\d+)/.exec(version);

        return new exports(vars[1], vars[2], vars[3]);
    };

    return exports;

}());

var LibVersion = (function () {
    'use strict';

    var exports = function (name, version, type) {
        this.name = name;
        this.version = version;
        this.type = type;
    };

    var libVersionPt = exports.prototype;

    libVersionPt.bumpSmall = function () {
        this.version.bumpSmall();
    };

    libVersionPt.bumpMedium = function () {
        this.version.bumpMedium();
    };

    libVersionPt.bumpLarge = function () {
        this.version.bumpLarge();
    };

    libVersionPt.toObject = function () {
        return {
            name: this.name,
            version: this.version.toString(),
            type: this.type
        };
    };

    libVersionPt.hasName = function (name) {
        return this.name === name;
    };

    exports.fromObject = function (obj) {
        return new exports(obj.name, Version.fromString(obj.version), obj.type);
    };

    return exports;

}());

var BundleVersion = (function () {
    'use strict';

    var exports = function (platform, name, version, time, libVersions) {
        this.platform = platform;
        this.name = name;
        this.version = version;
        this.time = time;
        this.libVersions = libVersions;
    };

    var bundleVersionPt = exports.prototype = new LibVersion();

    bundleVersionPt.find = function (name) {
        if (this.hasName(name)) {
            return this;
        }

        var found = this.libVersions.filter(function (libVersion) {
            return libVersion.hasName(name);
        });

        if (found.length > 0) {
            return found[0];
        }

        return null;
    };

    bundleVersionPt.update = function () {
        this.time = Math.floor(new Date() / 1000);
    };

    bundleVersionPt.getVersionLabel = function () {
        return this.version.toString();
    };

    bundleVersionPt.toObject = function () {
        return {
            platform: this.platform,
            name: this.name,
            version: this.version.toString(),
            time: this.time,
            libs: this.libVersions.map(function (lib) { return lib.toObject(); })
        };
    };

    bundleVersionPt.prettyJson = function () {
        return JSON.stringify(this.toObject(), null, 4);
    };

    bundleVersionPt.saveAsLatest = function () {
        fs.writeFileSync(exports.getLatestVersionPath(this.platform), this.prettyJson());
    };

    bundleVersionPt.save = function () {
        fs.writeFileSync(exports.getVersionPath(this.platform, this.version.toString()), this.prettyJson());
    };

    exports.createFromLatestForPlatform = function (platform) {
        return this.fromObject(require(this.getLatestVersionPath(platform)));
    };

    exports.getLatestVersionPath = function (platform) {
        return './data/' + platform + '/versions/latest.json';
    };

    exports.getVersionPath = function (platform, version) {
        return './data/' + platform + '/versions/' + version + '.json';
    };

    exports.fromObject = function (obj) {
        return new this(
            obj.platform,
            obj.name,
            Version.fromString(obj.version),
            obj.time,
            obj.libs.map(function (obj) { return new LibVersion.fromObject(obj); })
        );
    };

    return exports;

}());


var CLI = (function () {
    'use strict';

    var exports = function (program) {
        this.program = program;
    };

    var cliPt = exports.prototype;


    exports.main = function () {
        program
            .version('0.0.1')
            .usage('-p [platform] [-name <lib name>|-b] [-l|-m|-s] [-f]')
            .option('-p, --platform [platform]', 'target platform [android|ios]')
            .option('-n, --name [name]', 'target lib [required]')
            .option('-b, --bundle', 'bump bundle itself')
            .option('-l, --large', 'large (1.0.0) bump')
            .option('-m, --medium', 'medium (0.1.0) bump')
            .option('-s, --small', 'small (0.0.1) bump')
            .option('-f, --fix', 'fix version (save as data/platform/versions/version.json)')
            .parse(process.argv);

        var cli = new this(program);

        cli.main();

    };

    cliPt.main = function () {

        this.getBundleVersion();

        this.setTargetLib();

        if (this.anyBump()) {

            this.bump();

            this.update();

        } else {
            console.log('no bump specified, did nothing.');
        }

    };

    cliPt.getPlatform = function () {
        return this.program.platform;
    };

    cliPt.getBundleVersion = function () {
        this.bundleVersion = null;

        try {
            this.bundleVersion = BundleVersion.createFromLatestForPlatform(program.platform);

        } catch (e) {
            console.log('no such platform: ' + program.platform);
            process.exit(1);

        }
    };

    cliPt.isBundleUpdate = function () {
        return this.program.bundle;
    };

    cliPt.setTargetLib = function () {
        if (this.isBundleUpdate()) {
            this.target = this.bundleVersion;

        } else {
            this.target = this.bundleVersion.find(this.getTargetName());

        }
    };

    cliPt.getTargetName = function () {
        return this.program.name;
    };

    cliPt.update = function () {
        this.bundleVersion.update();

        this.bundleVersion.saveAsLatest();
    };

    cliPt.bump = function () {

        if (this.smallBump()) {
            this.target.bumpSmall();
        }

        if (this.mediumBump()) {
            this.target.bumpMedium();
        }

        if (this.largeBump()) {
            this.target.bumpLarge();
        }

    };

    cliPt.smallBump = function () {
        return this.program.small;
    };

    cliPt.mediumBump = function () {
        return this.program.medium;
    };

    cliPt.largeBump = function () {
        return this.program.large;
    };

    cliPt.anyBump = function () {
        return this.smallBump() || this.mediumBump() || this.largeBump();
    };

    return exports;

}());

CLI.main();
