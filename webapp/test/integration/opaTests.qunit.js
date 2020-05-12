/* global QUnit */

QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function() {
  "use strict";

  sap.ui.require([
    "br/com/idxtec/Template/test/integration/AllJourneys"
  ], function() {
    QUnit.start();
  });
});
