//@ts-nocheck
sap.ui.define(
  ["br/com/idxtec/ui5Template/controller/BaseController", "sap/m/MessageBox"],
  function (BaseController, MessageBox) {
    "use strict";

    return BaseController.extend("br.com.idxtec.ui5Template.controller.Add", {
      onInit: function () {
        this.getRouter().getRoute("Add").attachMatched(this._routerMatch, this);
      },

      _routerMatch: function () {
        let oBinding = this.getModel().bindList("/People");
        let oContext = oBinding.create();
        this.getModel("view").setProperty("/editable", true);
        this.getView().setBindingContext(oContext);
      },

      save: async function () {
        let oModel = this.getModel();
        let oView = this.getView();

        oView.setBusy(true);
        await oModel.submitBatch("updGroup");
        if (!oModel.hasPendingChanges()) {
          MessageBox.success(
            this.getBundle().getText("AddController.MsgSuccess"),
            {
              onClose: function () {
                oModel.refresh();
                this.onNavBack();
              }.bind(this),
            }
          );
        }
        oView.setBusy(false);
      },

      cancel: function () {
        if (this.getModel().hasPendingChanges()) {
          this.getModel().resetChanges();
        }

        this.onNavBack();
      },
    });
  }
);
