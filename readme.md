=== EduAdmin Booking ===
Contributors: mnchga
Tags: booking, participants, courses, events, eduadmin, lega online
Requires at least: 4.7
Tested up to: 5.0
Stable tag: 2.0.45
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
- php-mcrypt

== Installation ==

-   Upload the zip-file (or install from WordPress) and activate the plugin
-   Provide the API key from EduAdmin.
-   Create pages for the different views and give them their shortcodes

== Upgrade Notice ==

= 2.0 =
We have replaced everything with a new API-client, so some things may be broken. If you experience any bugs (not new feature-requests), please contact the MultiNet Support.
If you notice that your API key doesn't work any more, you have to contact us.

== Changelog ==

### 2.0.45
- fix: Don't add temporary participant if you use the contact as participant. Would double the price. :D

### 2.0.44
- add: Added lots of new classes to labels and elements, so that people can find stuff, and customize it.
- chg: Replaced h3 with divs in questions and attributes

### 2.0.43
- chg: When checking price, make sure we have a temporary participant if none are present.

### 2.0.42
- fix: When we load a customer from the session, we should also load the `CustomerGroupId`

### 2.0.41
- If you get to the `/book/` URL on a course template that doesn't have any events, we will now show a label saying `No events planned for this course yet.` 

### 2.0.40
- Don't set the customer group if it's already set.

### 2.0.39
- If the price is zero (no participants added, don't show any text)

### 2.0.38
- fix: Fixing problems with iOS not being able to select second text box within labels.

### 2.0.37
- fix: Logical error when to show invoice information

### 2.0.36
- fix: CSS-fixes, missing css.

### 2.0.35
- add: If it seems like inc/excl VAT is the same price, show as VAT free. [#222](https://github.com/MultinetInteractive/EduAdmin-WordPress/issues/222)
- add: Backend setting to allow customers to update their profile while booking (only existing customers) [#219](https://github.com/MultinetInteractive/EduAdmin-WordPress/issues/219)
- fix: Adding missing CSS to Programme Detail / Booking
- chg: Rewritten the rewrite rules to all work from the `EduAdminRouter` instead of `edu-rewrites.php`

### 2.0.34
- fix: Using `BuyerReference` when we fetch in profile.
- chg: Switched to SCSS and splitted files into multiple files instead

### 2.0.33
- chg: `BuyerReference` should be saved in `BuyerReference`, not `SellerReference`
