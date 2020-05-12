sap.ui.define([
  "sap/ui/test/Opa5"
], function(Opa5) {
  "use strict";

  return Opa5.extend("br.com.idxtec.Template.test.integration.arrangements.Startup", {

    iStartMyApp: function () {
      this.iStartMyUIComponent({
        componentConfig: {
          name: "br.com.idxtec.Template",
          async: true,
          manifest: true
        }
      });
    }

  });
});
