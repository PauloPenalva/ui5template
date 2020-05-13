//@ts-nocheck
sap.ui.define([
  "br/com/idxtec/ui5Template/controller/BaseController",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/m/MessageBox"
], function (BaseController,
  Filter,
  FilterOperator,
  MessageBox) {
  "use strict";

  return BaseController.extend("br.com.idxtec.ui5Template.controller.App", {
    onInit: function () {
      this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
      this.getView().setBusyIndicatorDelay(0);
    },

    onSearch: function (oEvent) {
      let sQuery = oEvent.getParameter("query");
      let oFilterLastName = new Filter("LastName", FilterOperator.Contains, sQuery);
      let oFilterFirstName = new Filter("FirstName", FilterOperator.Contains, sQuery);
      let oFilter = new Filter({
        filters: [
          oFilterLastName,
          oFilterFirstName
        ],
        and: false
      });

      this.byId("table").getBinding("rows").filter(oFilter);
    },

    onAdd: function () {
      this.navTo("Add");
    },

    onEdit: function () {
      let oTable = this.byId("table");
      let oContext = oTable.getContextByIndex(oTable.getSelectedIndex());

      if (oContext) {
        let sId = oContext.getProperty("UserName");
        this.navTo("Edit", {
          id: sId
        });
      }
    },

    onRefresh: function () {
      if (!this.getModel().hasPendingChanges()) {
        this.getModel().refresh();
        this.byId("table").clearSelection();
      }
    },

    onDelete: async function () {
      let oTable = this.byId("table");
      let oContext = oTable.getContextByIndex(oTable.getSelectedIndex());

      if (oContext) {
        try {
          if (await this._msgConfirmDelete() == MessageBox.Action.OK) {
            this.getView().setBusy(true);
            await oContext.delete("$auto");
            oTable.clearSelection();
          }
        } catch (oError) {
          MessageBox.error(oError.toString());
        } finally {
          this.getView().setBusy(false);
        }
      }
    },

    _msgConfirmDelete: function () {
      return new Promise(resolve => {
        MessageBox.confirm(this.getBundle().getText("AppController.ConfirmDelete"), {
          onClose: sAction => {
            resolve(sAction);
          }
        });
      });
    }

  });

});
