// ==UserScript==
// @name         Last updated for App Store apps
// @namespace    https://github.com/fnurl/userscripts
// @version      0.1
// @description  Add information about when the app was last updated to the product information.
// @author       @fnurl
// @match        https://itunes.apple.com/*/app/*
// @license      MIT
// ==/UserScript==

(function() {
  'use strict';
  // wait until everything has loaded
  $(window).bind("load", function() {
    // add an additional wait as workaround for text disappearing when loading for the first time
    var timeout = 500;
    window.setTimeout(function() {
      // Localized labels
      var lang = {
                   "sv": "Senaste versionen",
                   "en": "Latest version",
                 };
      // Localized label string
      var updatedText;

      // Localization for defined presets
      var locale = $("html").attr("lang").match("..");
      //var locale = window.location.pathname.match("/(.*?)/.*")[1];
      if (lang.hasOwnProperty(locale)) {
        updatedText = lang[locale];
      }
      else {
        // Localized update history string for other locales
        updatedText = $(".version-history__headline").text();
      }

      // Info about the last version
      var lastVersion = $(".version-history__item").first();
      var versionNumber = lastVersion.find('[class$="version-number"]').text();
      var versionDate = lastVersion.find("time").attr("datetime");

      // Product info element
      var productHeaderList = $("header .product-header__list");

      // Prepare info about last version and add it to the product info
      var lastUpdatedListItem = '<li class="product-header__list__item">' +
                                updatedText + ': ' +
                                versionNumber + ' (' + versionDate + ')' +
                                '</li>';
      productHeaderList.append(lastUpdatedListItem);
    }, timeout);
  });
})();