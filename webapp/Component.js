sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/Device",
  "br/com/idxtec/ui5Template/model/models"
], function(UIComponent, Device, models) {
  "use strict";

  return UIComponent.extend("br.com.idxtec.ui5Template.Component", {

    metadata: {
      manifest: "json"
    },

    /**
     * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
     * @public
     * @override
     */
    init: function() {
      // call the base component's init function
      UIComponent.prototype.init.apply(this, arguments);

      // enable routing
      this.getRouter().initialize();

      this.getModel("view").setData({
        editable: true
      });

      // set the device model
      this.setModel(models.createDeviceModel(), "device");
    },

    getContentDensityClass: function () {
      if (!this._sContentDensityClass) {
        if (!sap.ui.Device.support.touch) {
          this._sContentDensityClass = "sapUiSizeCompact";
        } else {
          this._sContentDensityClass = "sapUiSizeCozy";
        }
      }
      return this._sContentDensityClass;
    }

  });
});
