=== EduAdmin Booking ===
Contributors: mnchga
Tags: booking, participants, courses, events, eduadmin, lega online
Requires at least: 4.9
Tested up to: 5.3
Stable tag: 2.19.7
Requires PHP: 5.2
License: GPL3
License-URI: https://www.gnu.org/licenses/gpl-3.0.en.html
EduAdmin plugin to allow visitors to book courses at your website. Requires EduAdmin-account.

== Description ==

Plugin that you connect to [EduAdmin](https://www.eduadmin.se) to enable booking on your website.

[<img src="https://img.shields.io/wordpress/plugin/v/eduadmin-booking.svg" alt="Plugin version" />](https://wordpress.org/plugins/eduadmin-booking/)
[<img src="https://img.shields.io/wordpress/plugin/dt/eduadmin-booking.svg" alt="Downloads" />](https://wordpress.org/plugins/eduadmin-booking/)
[<img src="https://img.shields.io/wordpress/v/eduadmin-booking.svg" alt="Tested up to" />](https://wordpress.org/plugins/eduadmin-booking/)

[<img src="https://badges.gitter.im/MultinetInteractive/EduAdmin-WordPress.png" alt="Gitter" />](https://gitter.im/MultinetInteractive/EduAdmin-WordPress)
[<img src="https://travis-ci.org/MultinetInteractive/EduAdmin-WordPress.svg?branch=master" alt="Build status" />](https://travis-ci.org/MultinetInteractive/EduAdmin-WordPress)
[<img src="https://scrutinizer-ci.com/g/MultinetInteractive/EduAdmin-WordPress/badges/quality-score.png?b=master" alt="Code quality" />](https://scrutinizer-ci.com/g/MultinetInteractive/EduAdmin-WordPress/?branch=master)

[<img src="https://img.shields.io/github/commits-since/MultinetInteractive/EduAdmin-WordPress/latest.svg" alt="Commits since latest plugin version" />](https://wordpress.org/plugins/eduadmin-booking/)

Requires the following PHP-modules

- php-curl
- php-mbstring

== Installation ==

-   Upload the zip-file (or install from WordPress) and activate the plugin
-   Provide the API key from EduAdmin.
-   Create pages for the different views and give them their shortcodes

== Upgrade Notice ==

= 2.0 =
We have replaced everything with a new API-client, so some things may be broken. If you experience any bugs (not new feature-requests), please contact the MultiNet Support.
If you notice that your API key doesn't work any more, you have to contact us.

== Changelog ==

The full changelog available on https://github.com/MultinetInteractive/EduAdmin-WordPress/blob/production/CHANGELOG.md

### [2.19.7](https://github.com/MultinetInteractive/EduAdmin-WordPress/compare/v2.19.6...v2.19.7) (2020-07-15)


### Bug Fixes

* Found an instance where we shouldn't add the timezone to the dates, because.. it's impossible. ([29c75df](https://github.com/MultinetInteractive/EduAdmin-WordPress/commit/29c75dfe9c45e97ad0356ff3b85ccc3e14740674))

### [2.19.6](https://github.com/MultinetInteractive/EduAdmin-WordPress/compare/v2.19.5...v2.19.6) (2020-07-15)


### Bug Fixes

* Rolling with our own date methods, since the built in didn't do what I expected ([e57e2dc](https://github.com/MultinetInteractive/EduAdmin-WordPress/commit/e57e2dc5c046edb8127d758078465dc1c215330b))

### [2.19.5](https://github.com/MultinetInteractive/EduAdmin-WordPress/compare/v2.19.4...v2.19.5) (2020-07-14)


### Bug Fixes

* **dates:** Using another method from WP to present dates instead.. ([560df4b](https://github.com/MultinetInteractive/EduAdmin-WordPress/commit/560df4b25255b56e1d497274ae2960fabfabe6f8))

### [2.19.4](https://github.com/MultinetInteractive/EduAdmin-WordPress/compare/v2.19.3...v2.19.4) (2020-07-07)


### Bug Fixes

* Use `date_i18n` instead of `date` to get the correct timezone as well! ([7f2083f](https://github.com/MultinetInteractive/EduAdmin-WordPress/commit/7f2083f630048b0eabf78c7af51bab9f4b8e5044))


