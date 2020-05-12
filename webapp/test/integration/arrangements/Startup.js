sap.ui.define([
  "sap/ui/test/Opa5"
], function(Opa5) {
  "use strict";

  return Opa5.extend("br.com.idxtec.ui5Template.test.integration.arrangements.Startup", {

    iStartMyApp: function () {
      this.iStartMyUIComponent({
        componentConfig: {
          name: "br.com.idxtec.ui5Template",
          async: true,
          manifest: true
        }
      });
    }

  });
});
