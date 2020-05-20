//@ts-nocheck
sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/Device",
  "br/com/idxtec/ui5Template/model/models",
  "./controller/ErrorHandler"
], function(UIComponent, Device, models, ErrorHandler) {
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

      // initialize the error handler with the component
      this._oErrorHandler = new ErrorHandler(this);

      // enable routing
      this.getRouter().initialize();

      this.getModel("view").setData({
        editable: true
      });

      // set the device model
      this.setModel(models.createDeviceModel(), "device");
    },

    destroy: function () {
      this._oErrorHandler.destroy();
      // call the base component's destroy function
      UIComponent.prototype.destroy.apply(this, arguments);
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
