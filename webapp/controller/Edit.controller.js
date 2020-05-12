sap.ui.define([
  "br/com/idxtec/ui5Template/controller/BaseController",
  "sap/m/MessageBox"
], function (
  BaseController,
  MessageBox
) {
  "use strict";

  return BaseController.extend("br.com.idxtec.ui5Template.controller.Edit", {
    onInit: function () {
      this.getRouter().getRoute("Edit").attachMatched(this._routerMatch, this);
      this.getView().setBusyIndicatorDelay(0);
    },

    _routerMatch: function (oEvent) {
      let id = oEvent.getParameter("arguments").id;
      let sPath = "/People('" + id + "')";
      this.getModel("view").setProperty("/editable", false);
      this.getView().bindElement(sPath);
    },

    _bindView: function (sObjectPath) {
      let oView = this.getView();
      this.getView().bindElement({
        path: sObjectPath,
        events: {
          dataRequested: function () {
            oView.setBusy(true);
          },
          dataReceived: function () {
            oView.setBusy(false);
          }
        }
      });
    },

    save: async function () {
      let oModel = this.getModel();
      let oView = this.getView();

      try {
        oView.setBusy(true);
        await oModel.submitBatch("updGroup");
        if (!oModel.hasPendingChanges()) {
          MessageBox.success(this.getBundle().getText(this.getBundle().getText("EditController.MsgSuccess")), {
            onClose: function () {
              oModel.refresh();
              this.onNavBack();
            }.bind(this)
          });
        } else {
          MessageBox.alert(this.getBundle().getText(this.getBundle().getText("EditController.MsgFail")));
        }
      } catch (oError) {
        MessageBox.error(oError.toString());
      } finally {
        oView.setBusy(false);
      }

    },

    cancel: function () {
      if (this.getModel().hasPendingChanges()) {
        this.getModel().resetChanges();
      }

      this.onNavBack();
    }


  });
});
