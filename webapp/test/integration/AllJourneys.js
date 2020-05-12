sap.ui.define([
  "sap/ui/test/Opa5",
  "br/com/idxtec/Template/test/integration/arrangements/Startup",
  "br/com/idxtec/Template/test/integration/BasicJourney"
], function(Opa5, Startup) {
  "use strict";

  Opa5.extendConfig({
    arrangements: new Startup(),
    pollingInterval: 1
  });

});
