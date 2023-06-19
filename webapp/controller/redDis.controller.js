sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/core/routing/History"
], function (Controller, MessageBox, History) {
	"use strict";

	return Controller.extend("bri.Redemption.controller.redDis", {

		onInit: function () {
			this.router = sap.ui.core.UIComponent.getRouterFor(this);
			this.router.attachRoutePatternMatched(this._handleRouteMatched, this);
			this.omodel_Common = this.getOwnerComponent().getModel("Omodel_cmn");
			this.oTrk_Model = this.getOwnerComponent().getModel("Trk_model");
		},
		_handleRouteMatched: function (oEvent) {
			debugger;

			this.temjson = {
				results: []
			};
			var Parameter = oEvent.getParameter("arguments");
			var _self = this;
			_self.byId("idSwtichMode").setState(false);
			_self.docno = Parameter.docno;
			_self.sttus = Parameter.bnftyp;
			// _self.comp = Parameter.bukrs;
			// if (_self.comp !== "") {
			// 	if (_self.sttus == "DFL") {
			// 		_self.getView().byId("bukrs").setValue(_self.comp);
			// 	} else {
			// 		_self.getView().byId("1").setValue(_self.comp);
			// 	}

			// }
			if (_self.sttus == "DFL") {
				_self.getView().byId("exce").setVisible(true);
				_self.getView().byId("idItemTtinst").setVisible(false);
				_self.getView().byId("inepcg").setVisible(false);
				_self.getView().byId("eximp1").setVisible(true);
				_self.getView().byId("eximp").setVisible(true);
				_self.getView().byId("impsumm").setVisible(true);
				_self.getView().byId("imp2").setVisible(false);
				_self.getView().byId("ipmid").setVisible(false);
				_self.getView().byId("exp1").setVisible(false);
				_self.getView().byId("expbl2").setVisible(false);
				_self.getView().byId("1sthd").setVisible(true);
				_self.getView().byId("Simple3Fo1rmDisplay35").setVisible(true);
				_self.getView().byId("exp3").setVisible(true);
				_self.getView().byId("Simple3Fo1rmDisplay35").setVisible(true);
				_self.getView().byId("2sthead").setVisible(false);
				_self.getView().byId("Simple3Fo1rmDisplay395").setVisible(false);
			} else if (_self.sttus == "EPCG") {
				_self.getView().byId("inepcg").setVisible(true);
				_self.getView().byId("idItemTtinst").setVisible(true);
				_self.getView().byId("exce").setVisible(false);
				_self.getView().byId("eximp1").setVisible(false);
				_self.getView().byId("eximp").setVisible(false);
				_self.getView().byId("impsumm").setVisible(false);
				_self.getView().byId("ipmid").setVisible(true);
				_self.getView().byId("imp2").setVisible(true);
				_self.getView().byId("exp3").setVisible(false);
				_self.getView().byId("exp1").setVisible(true);
				_self.getView().byId("expbl2").setVisible(true);
				_self.getView().byId("1sthd").setVisible(false);
				_self.getView().byId("Simple3Fo1rmDisplay35").setVisible(false);
				_self.getView().byId("2sthead").setVisible(true);
				_self.getView().byId("Simple3Fo1rmDisplay395").setVisible(true);

				// } else if (_self.oSelectedItem == "Clubbinf DFL") {  

			} else {}

			_self.getView().byId("ContChange").setTitle(_self.getView().getModel("i18n").getResourceBundle().getText(
				"Redemption Details for Tracking Number") + " " + ":" + " " + _self.docno);
			var filter = new Array();
			var filterval = new sap.ui.model.Filter("docno", sap.ui.model.FilterOperator.EQ, _self.docno);
			filter.push(filterval);
			this.oTrk_Model.read("/xBRIxi_imp_tl_rhdr", {
				filters: filter,
				urlParameters: {
					"$expand": "to_redemption_duty,to_redemption_det,to_redemption_enclousure"

				},
				success: function (response) {
					if (response.results.length <= 0) {

					} else {
						_self.temjson = {
							results: []
						};
						_self.temjsonCust = {
							results: []
						};
						_self.temjsonRed = {
							results: []
						};
						_self.temjsonEncl = {
							results: []
						};
						_self.temjson.results = _self.temjson.results.concat(response.results);

						_self.meetdate = _self.temjson.results[0].meetdt;
						_self.meetdt = _self.convertToSAPdate(_self.meetdate);
						_self.temjson.results[0].meetdt = _self.meetdt;

						// for (var i = 0; i < _self.temjson.results.length; i++) {
						_self.orgdate = _self.temjson.results[0].issdt;
						_self.issdt = _self.convertToSAPdate(_self.orgdate);
						_self.temjson.results[0].issdt = _self.issdt;

						_self.duedate = _self.temjson.results[0].filedt;
						_self.filedt = _self.convertToSAPdate(_self.duedate);
						_self.temjson.results[0].filedt = _self.filedt;

						_self.duedate = _self.temjson.results[0].fstexprevaldt;
						_self.fstexprevaldt = _self.convertToSAPdate(_self.duedate);
						_self.temjson.results[0].fstexprevaldt = _self.fstexprevaldt;

						_self.duedate = _self.temjson.results[0].ifirstextdt;
						_self.ifirstextdt = _self.convertToSAPdate(_self.duedate);
						_self.temjson.results[0].ifirstextdt = _self.ifirstextdt;

						_self.paydate = _self.temjson.results[0].isecondextdt;
						_self.isecondextdt = _self.convertToSAPdate(_self.paydate);
						_self.temjson.results[0].isecondextdt = _self.isecondextdt;

						_self.paydate = _self.temjson.results[0].scndexprevaldt;
						_self.scndexprevaldt = _self.convertToSAPdate(_self.paydate);
						_self.temjson.results[0].scndexprevaldt = _self.scndexprevaldt;

						_self.paydate = _self.temjson.results[0].expenddt;
						_self.expenddt = _self.convertToSAPdate(_self.paydate);
						_self.temjson.results[0].expenddt = _self.expenddt;

						// _self.paydate = _self.temjson.results[i].scndexprevaldt;
						// _self.isecondextdt = _self.convertToSAPdate(_self.paydate);
						// _self.temjson.results[i].isecondextdt = _self.isecondextdt;
						// }
						var oModelData = new sap.ui.model.json.JSONModel();
						oModelData.setData(_self.temjson.results[0]);
						_self.getView().setModel(oModelData, "tablehead");
						/////////////////*********custom det*********************/////////////////////////////					

						for (var k = 0; k < _self.temjson.results[0].to_redemption_duty.results.length; k++) {
							_self.temjsonCust.results = _self.temjson.results[0].to_redemption_duty.results;

							_self.trkno = _self.temjsonCust.results[k].trkno;

						}
						// for (var i = 0; i < _self.temjsonCust.results.length; i++) {
						_self.dutydate = _self.temjsonCust.results[0].duty_paid_dt;
						_self.duty_paid_dt = _self.convertToSAPdate(_self.dutydate);
						_self.temjsonCust.results[0].duty_paid_dt = _self.duty_paid_dt;
						// }
						var oModelDatacust = new sap.ui.model.json.JSONModel();
						oModelDatacust.setData(_self.temjsonCust.results[0]);
						_self.getView().setModel(oModelDatacust, "tablecust");
						/////////////////*********custom det*********************/////////////////////////////		
						/////////////////*********redemption*********************/////////////////////////////
						for (var k = 0; k < _self.temjson.results[0].to_redemption_det.results.length; k++) {
							_self.temjsonRed.results = _self.temjson.results[0].to_redemption_det.results;

						}
						// for (var i = 0; i < _self.temjsonCust.results.length; i++) {
						_self.reddate = _self.temjsonRed.results[0].red_date;
						_self.red_date = _self.convertToSAPdate(_self.reddate);
						_self.temjsonRed.results[0].red_date = _self.red_date;

						_self.subdate = _self.temjsonRed.results[0].dgft_sub_dt;
						_self.dgft_sub_dt = _self.convertToSAPdate(_self.subdate);
						_self.temjsonRed.results[0].dgft_sub_dt = _self.dgft_sub_dt;

						_self.clsdate = _self.temjsonRed.results[0].bnd_lut_clsdt;
						_self.bnd_lut_clsdt = _self.convertToSAPdate(_self.clsdate);
						_self.temjsonRed.results[0].bnd_lut_clsdt = _self.bnd_lut_clsdt;

						_self.licdt = _self.temjsonRed.results[0].license_clsdt;
						_self.license_clsdt = _self.convertToSAPdate(_self.licdt);
						_self.temjsonRed.results[0].license_clsdt = _self.license_clsdt;

						var oModelDatared = new sap.ui.model.json.JSONModel();
						oModelDatared.setData(_self.temjsonRed.results[0]);
						_self.getView().setModel(oModelDatared, "tablered");
						/////////////////*********redemption*********************/////////////////////////////
						/////////////////*********Enclosure*********************/////////////////////////////

						for (var k = 0; k < _self.temjson.results[0].to_redemption_enclousure.results.length; k++) {
							_self.temjsonEncl.results = _self.temjson.results[0].to_redemption_enclousure.results;
							_self.temjsonEncl.results = _self.temjsonEncl.results.slice().sort((a, b) => a.sl_no - b.sl_no);

						}
						for (var i = 0; i < _self.temjsonEncl.results.length; i++) {
							_self.docdate = _self.temjsonEncl.results[i].doc_dt;
							_self.doc_dt = _self.convertToSAPdate(_self.docdate);
							_self.temjsonEncl.results[i].doc_dt = _self.doc_dt;
						}
						// for (var i = 0; i < _self.temjsonEncl.results.length; i++) {
						// 	_self.temjsonEncl.results[i].docchk= "true";
						// }

						var oModelDataEncl = new sap.ui.model.json.JSONModel();
						oModelDataEncl.setData(_self.temjsonEncl);
						_self.getView().setModel(oModelDataEncl, "tableEncl");
						_self.getView().getModel("tableEncl").refresh();
						/////////////////*********Enclosure*********************/////////////////////////////
					}
				},
				error: function (oError) {
					MessageBox.error("Something Went Wrong . Please Try again Later");
					//_self._CloseBusyDialog();
				}
			});
			_self.OnChangeSwitch();
			_self.expobligation();
			_self.Impsumm();

			_self.excImp();
			_self.Installation();
		},
		excImp: function () {
			debugger;
			var _self = this;
			_self.oTrk_Model.read("/xBRIxCE_GET_REDM_EXC_IMP(ibs_trkno='" + _self.trkno + "')/Set", {
				// _self.oTrk_Model.read("/xBRIxCE_GET_REDM_EXC_IMP", {
				success: function (oData) {
					// _self.getView().byId("idItemTtableExcImp").setVisible(true);
					console.log(oData);
					if (oData.results.length <= 0) {
						MessageBox.error("No Matching Result(s) Found for the Filter Excess Import");
					} else {
						_self.tempjsonExcimp = {
							results: []
						};
						_self.tempjsonExcimp.results = _self.tempjsonExcimp.results.concat(oData.results);
						 //_self.tempjsonExcimp.results = _self.tempjsonExcimp.results.filter(a => a.trkno == _self.trkno);

						var oModelDataExcimp = new sap.ui.model.json.JSONModel();
						oModelDataExcimp.setData(_self.tempjsonExcimp);
						_self.getView().setModel(oModelDataExcimp, "tableexcImp");

					}
				},
				error: function (error) {
					MessageBox.error("Something Went Wrong . Please Try again Later");
				}
			});

		},

		Installation: function () {
			debugger;
			var _self = this;
			_self.oTrk_Model.read("/xBRIxI_EPCG_INST_CERTIFCT_RPT", {
				success: function (oData) {
					// _self.getView().byId("instanew").setVisible(true);
					console.log(oData);
					if (oData.results.length <= 0) {
						MessageBox.error("No Matching Result(s) Found for the Filter Installation");
					} else {
						_self.tempjsoninsta = {
							results: []
						};
						_self.tempjsoninsta.results = _self.tempjsoninsta.results.concat(oData.results);
						// _self.tempjsoninsta.results = _self.tempjsoninsta.results.filter(a => a.trkno == _self.trkno);

						var oModelDataInsta = new sap.ui.model.json.JSONModel();
						oModelDataInsta.setData(_self.tempjsoninsta);
						_self.getView().setModel(oModelDataInsta, "tableinsta");

					}
				},
				error: function (error) {
					MessageBox.error("Something Went Wrong . Please Try again Later");
				}
			});

		},
		Impsumm: function () {
			debugger;
			var _self = this;
			_self.oTrk_Model.read("/xBRIxI_IMP_REDM_DET", {
				success: function (oData) {
					// _self.getView().byId("idItemTtableImpsumm").setVisible(true);
					// _self.getView().byId("idItemTtableImpsummEPCG").setVisible(true);
					console.log(oData);
					if (oData.results.length <= 0) {
						MessageBox.error("No Matching Result(s) Found for the Filter Import Summary");
					} else {
						_self.tempjsonimp = {
							results: []
						};
						_self.tempjsonimp.results = _self.tempjsonimp.results.concat(oData.results);
						// _self.tempjsonimp.results = _self.tempjsonimp.results.filter(a => a.trkno == _self.trkno);

						var oModelDataimp = new sap.ui.model.json.JSONModel();
						oModelDataimp.setData(_self.tempjsonimp);
						_self.getView().setModel(oModelDataimp, "tableimp");

					}
				},
				error: function (error) {
					MessageBox.error("Something Went Wrong . Please Try again Later");
				}
			});

		},
		expobligation: function () {
			debugger;
			var _self = this;
			_self.oTrk_Model.read("/xBRIxI_EXP_LIC_OBG", {
				success: function (oData) {
					// _self.getView().byId("idItemTtableExpob").setVisible(true);
					console.log(oData);
					if (oData.results.length <= 0) {
						// MessageBox.error("No Matching Result(s) Found for the Filter Export Obligation");
					} else {
						_self.tempjsonobli = {
							results: []
						};
						_self.tempjsonobli.results = _self.tempjsonobli.results.concat(oData.results);
						// _self.tempjsonobli.results = _self.tempjsonobli.results.filter(a => a.trkno == _self.trkno);
						// _self.oSelectedItemCompany = _self.getView().byId("bukrs").getValue();
						// _self.tempjsonobli.results = _self.tempjsonobli.results.filter(a => a.bukrs == _self.oSelectedItemCompany);
						var oModelDataexobl = new sap.ui.model.json.JSONModel();
						oModelDataexobl.setData(_self.tempjsonobli);
						_self.getView().setModel(oModelDataexobl, "tableExpobl");

					}
				},
				error: function (error) {
					MessageBox.error("Something Went Wrong . Please Try again Later");
				}
			});

		},
		DecCheckbcd: function (oEvent) {
			debugger;
			// var rowval = oEvent.getSource().getParent().getIndex();
			var val = oEvent.mParameters.newValue;

			if ((val == "") || (val == " ")) {
				// if (val == " ") {
				MessageBox.error("Cant make BDC filed as null");
				return;
			}

			var val2 = isNaN(val);
			if ((val2) == true) {
				MessageBox.error("Only accept Numbers");
				this.getView().byId("bcd").setValue("");
				// this.temjson1.results[rowval].db_amt = "";
			}
			var val = parseFloat(val);
			var roundedNumber = val.toFixed(2);
			if (roundedNumber != val) {
				MessageBox.error("Error: Number should have at most two decimal places.");
				// this.temjson1.results[rowval].db_amt = "";
				this.getView().byId("bcd").setValue("");
			}

		},
		DecChecksws: function (oEvent) {
			debugger;
			// var rowval = oEvent.getSource().getParent().getIndex();
			var val = oEvent.mParameters.newValue;

			if ((val == "") || (val == " ")) {
				// if (val == " ") {
				MessageBox.error("Cant make BDC filed as null");
				return;
			}

			var val2 = isNaN(val);
			if ((val2) == true) {
				MessageBox.error("Only accept Numbers");
				this.getView().byId("sws").setValue("");
				// this.temjson1.results[rowval].db_amt = "";
			}
			var val = parseFloat(val);
			var roundedNumber = val.toFixed(2);
			if (roundedNumber != val) {
				MessageBox.error("Error: Number should have at most two decimal places.");
				// this.temjson1.results[rowval].db_amt = "";
				this.getView().byId("sws").setValue("");
			}

		},
		DecCheckigst: function (oEvent) {
			debugger;
			// var rowval = oEvent.getSource().getParent().getIndex();
			var val = oEvent.mParameters.newValue;

			if ((val == "") || (val == " ")) {
				// if (val == " ") {
				MessageBox.error("Cant make BDC filed as null");
				return;
			}

			var val2 = isNaN(val);
			if ((val2) == true) {
				MessageBox.error("Only accept Numbers");
				this.getView().byId("igst").setValue("");
				// this.temjson1.results[rowval].db_amt = "";
			}
			var val = parseFloat(val);
			var roundedNumber = val.toFixed(2);
			if (roundedNumber != val) {
				MessageBox.error("Error: Number should have at most two decimal places.");
				// this.temjson1.results[rowval].db_amt = "";
				this.getView().byId("igst").setValue("");
			}

		},
		DecCheckint: function (oEvent) {
			debugger;
			// var rowval = oEvent.getSource().getParent().getIndex();
			var val = oEvent.mParameters.newValue;

			if ((val == "") || (val == " ")) {
				// if (val == " ") {
				MessageBox.error("Cant make BDC filed as null");
				return;
			}

			var val2 = isNaN(val);
			if ((val2) == true) {
				MessageBox.error("Only accept Numbers");
				this.getView().byId("intrst_amt").setValue("");
				// this.temjson1.results[rowval].db_amt = "";
			}
			var val = parseFloat(val);
			var roundedNumber = val.toFixed(2);
			if (roundedNumber != val) {
				MessageBox.error("Error: Number should have at most two decimal places.");
				// this.temjson1.results[rowval].db_amt = "";
				this.getView().byId("intrst_amt").setValue("");
			}

		},
		DecCheckcust: function (oEvent) {
			debugger;
			// var rowval = oEvent.getSource().getParent().getIndex();
			var val = oEvent.mParameters.newValue;

			if ((val == "") || (val == " ")) {
				// if (val == " ") {
				MessageBox.error("Cant make BDC filed as null");
				return;
			}

			var val2 = isNaN(val);
			if ((val2) == true) {
				MessageBox.error("Only accept Numbers");
				this.getView().byId("cust_dty_paid").setValue("");
				// this.temjson1.results[rowval].db_amt = "";
			}
			var val = parseFloat(val);
			var roundedNumber = val.toFixed(2);
			if (roundedNumber != val) {
				MessageBox.error("Error: Number should have at most two decimal places.");
				// this.temjson1.results[rowval].db_amt = "";
				this.getView().byId("cust_dty_paid").setValue("");
			}

		},
		DecCheckintp: function (oEvent) {
			debugger;
			// var rowval = oEvent.getSource().getParent().getIndex();
			var val = oEvent.mParameters.newValue;

			if ((val == "") || (val == " ")) {
				// if (val == " ") {
				MessageBox.error("Cant make BDC filed as null");
				return;
			}

			var val2 = isNaN(val);
			if ((val2) == true) {
				MessageBox.error("Only accept Numbers");
				this.getView().byId("intrst_paid").setValue("");
				// this.temjson1.results[rowval].db_amt = "";
			}
			var val = parseFloat(val);
			var roundedNumber = val.toFixed(2);
			if (roundedNumber != val) {
				MessageBox.error("Error: Number should have at most two decimal places.");
				// this.temjson1.results[rowval].db_amt = "";
				this.getView().byId("intrst_paid").setValue("");
			}

		},
		DecCheckcomp: function (oEvent) {
			debugger;
			// var rowval = oEvent.getSource().getParent().getIndex();
			var val = oEvent.mParameters.newValue;

			if ((val == "") || (val == " ")) {
				// if (val == " ") {
				MessageBox.error("Cant make BDC filed as null");
				return;
			}

			var val2 = isNaN(val);
			if ((val2) == true) {
				MessageBox.error("Only accept Numbers");
				this.getView().byId("comp_fee_paid").setValue("");
				// this.temjson1.results[rowval].db_amt = "";
			}
			var val = parseFloat(val);
			var roundedNumber = val.toFixed(2);
			if (roundedNumber != val) {
				MessageBox.error("Error: Number should have at most two decimal places.");
				// this.temjson1.results[rowval].db_amt = "";
				this.getView().byId("comp_fee_paid").setValue("");
			}

		},
		DecCheckan: function (oEvent) {
			debugger;
			// var rowval = oEvent.getSource().getParent().getIndex();
			var val = oEvent.mParameters.newValue;

			if ((val == "") || (val == " ")) {
				// if (val == " ") {
				MessageBox.error("Cant make BDC filed as null");
				return;
			}

			var val2 = isNaN(val);
			if ((val2) == true) {
				MessageBox.error("Only accept Numbers");
				this.getView().byId("other_charges").setValue("");
				// this.temjson1.results[rowval].db_amt = "";
			}
			var val = parseFloat(val);
			var roundedNumber = val.toFixed(2);
			if (roundedNumber != val) {
				MessageBox.error("Error: Number should have at most two decimal places.");
				// this.temjson1.results[rowval].db_amt = "";
				this.getView().byId("other_charges").setValue("");
			}

		},
		NumbercheckOriginal: function (oEvent) {
			debugger;
			var val = oEvent.mParameters.newValue;
			var rowval = oEvent.getSource().getParent().getIndex();
			// if ((val == "") || (val == " ")) {
			// 	// if (val == " ") {
			// 	MessageBox.error("Cant make Copy filed as null");
			// 	return;
			// }

			var val2 = isNaN(val);
			if ((val2) == true) {
				MessageBox.error("Only accept Numbers");
				this.temjsonEncl.results[rowval].docorg = "";
				// this.temjson1.results[rowval].db_amt = "";
			}
			if (val.includes(".")) {
				MessageBox.error("Cant put Decimals");
				this.temjsonEncl.results[rowval].docorg = "";
			}
		},
		Numbercheckcopy: function (oEvent) {
			debugger;
			var val = oEvent.mParameters.newValue;
			var rowval = oEvent.getSource().getParent().getIndex();
			// if ((val == "") || (val == " ")) {
			// 	// if (val == " ") {
			// 	MessageBox.error("Cant make Original filed as null");
			// 	return;
			// }

			var val2 = isNaN(val);
			if ((val2) == true) {
				MessageBox.error("Only accept Numbers");
				this.temjsonEncl.results[rowval].doccopy = "";
				// this.temjson1.results[rowval].db_amt = "";
			}
			if (val.includes(".")) {
				MessageBox.error("Cant put Decimals");
				this.temjsonEncl.results[rowval].doccopy = "";

			}
		},
		convertToSAPdate: function (value) { //alert(value);
			if (value) {
				if (value instanceof Date) {
					var NewDateform = value;
				} else if (value.indexOf("T00:00:00")) {
					return value;
				} else {}
				var mnth = ("0" + (NewDateform.getMonth() + 1)).slice(-2);
				var day = ("0" + NewDateform.getDate()).slice(-2);
				var output = [NewDateform.getFullYear(), mnth, day].join("-") + "T00:00:00";
				return output;
			}
		},
		OnChangeSwitch: function () {
			debugger;
			var EnabledModel = new sap.ui.model.json.JSONModel({
				enable: true
			});
			this.getView().setModel(EnabledModel, "State");
			if (this.byId("idSwtichMode").getState() === false) {
				EnabledModel.setProperty('/enable', false);
				// this.AuthConfiguration("Change");
				// EnabledModelanetwr1.setProperty('/enable', false);
				// this.getView().byId("Acptid").setVisible(false);
				this.getView().byId("save").setVisible(false);
				this.getView().byId("addItemBtns").setVisible(false);
				this.getView().byId("iditemdel").setVisible(false);
			} else {
				EnabledModel.setProperty('/enable', true);
				// EnabledModelanetwr1.setProperty('/enable', true);
				this.getView().byId("save").setVisible(true);
				// this.getView().byId("Acptid").setVisible(true);
				this.getView().byId("addItemBtns").setVisible(true);
				this.getView().byId("iditemdel").setVisible(true);
			}
		},

		onPressGoBack: function () {
			//history.go(-1);
			var _self = this;
			var sPrevHash = History.getInstance().getPreviousHash();
			MessageBox.warning("Your entries will be lost if you leave this page.", {
				actions: [sap.m.MessageBox.Action.OK],
				onClose: function (oAction) {
					if (oAction === sap.m.MessageBox.Action.OK) {
						if (sPrevHash !== "") {
							window.history.go(-1);
						} else {
							_self.router.navTo("redList", true);
						}
					}
				}
			});
		},
		OnPressDeleteItem: function (oArg) {
			debugger;
			var _self = this;
			//var filters = new Array();
			if (_self.temjsonEncl.results.length != 0) {
				_self.slno = oArg.getSource().getParent().getCells()[0].getValue();
				_self.rowIndex = oArg.getSource().getParent().getIndex();
			}
			// for (var i = 0; i < _self.temjsonEncl.results.length; i++) {
			if (_self.temjsonEncl.results.length == 1) {
				MessageBox.error("Atleast One Item Should Exists");
				return;
			}
			// }

			MessageBox.confirm("Changes Cannot be Undone. Do you Really Want to Delete?", {
				actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
				onClose: function (oAction) {
					if (oAction === sap.m.MessageBox.Action.OK) {
						var mParameters = {};
						mParameters.groupId = "deleteGroup";
						mParameters.ETag = "*";
						if (_self.temjsonEncl.results.length != 0) {
							_self.oTrk_Model.remove("/xBRIxI_IMP_TL_RDOC(trkno='" + _self.temjsonEncl
								.results[_self.rowIndex].trkno + "',docno='" + _self.temjsonEncl.results[_self.rowIndex].docno +
								"',sl_no='" + _self.temjsonEncl.results[_self.rowIndex].sl_no +
								"')", mParameters);
							_self.temjsonEncl.results.splice(_self.rowIndex, 1);
						}

						_self.oTrk_Model.setDeferredGroups(["deleteGroup"]);
						_self.oTrk_Model.submitChanges({
							groupId: "deleteGroup",
							success: function (oData) {
								MessageBox.success("Record Deleted Successfully");
							},
							error: function (oError) {
								MessageBox.success("Error while Deleting Successfully");
							}
						});
						_self.getView().getModel("tableEncl").refresh();
					}
				}
			});

		},
		addItemRow: function () {
			debugger;
			// this.tempjsonenclosure = {
			// 	results: []
			// };
			// this.tempjsonenclosure.results.push({
			// 	sl_no: "",
			// 	docdescr: "",
			// 	docchk: "",
			// 	docorg: "",
			// 	doccopy: "",
			// 	doc_no: "",
			// 	doc_dt: ""

			// });
			// var oModelDataEncl = new sap.ui.model.json.JSONModel([]);
			// oModelDataEncl.setData(this.tempjsonenclosure);
			// this.getView().setModel(oModelDataEncl, "tableEncl");
			// this.getView().getModel("tableEncl").refresh();

			for (var i = 0; i < this.temjsonEncl.results.length; i++) {
				this.trkno = this.temjsonEncl.results[i].trkno;
			}
			// if (!this.temjsonEncl) {
			// 	this.temjsonEncl = {
			// 		results: [{
			// 			sl_no: "",
			// 			docdescr: "",
			// 			docchk: "",
			// 			docorg: "",
			// 			doccopy: "",
			// 			doc_no: "",
			// 			doc_dt: "",
			// 			docno: this.docno

			// 		}]
			// 	};
			// 	var oModelDataEncl = new sap.ui.model.json.JSONModel([]);
			// 	oModelDataEncl.setData(this.temjsonEncl);
			// 	this.getView().setModel(oModelDataEncl, "tableEncl");

			// } else {
			// 	this.temjsonEncl.results.push({
			// 		//internal_tracking_no: "",
			// 		sl_no: "",
			// 		docdescr: "",
			// 		docchk: "F",
			// 		docorg: "",
			// 		doccopy: "",
			// 		doc_no: "",
			// 		doc_dt: "",
			// 		docno: this.docno
			// 	});
			// 	var oModelDataEncl = new sap.ui.model.json.JSONModel([]);
			// 	oModelDataEncl.setData(this.temjsonEncl);
			// 	this.getView().setModel(oModelDataEncl, "tableEncl");

			// }

			if (this.temjsonEncl.results.length != 0) {
				var add = this.temjsonEncl.results.length - 1;
				var addnew = this.temjsonEncl.results[add].sl_no;
				var x = parseInt(addnew);
			} else {
				x = 0;
			}
			var y = x + 1;
			var z = y.toString();

			this.temjsonEncl.results.push({
				sl_no: z,
				docdescr: "",
				docchk: "F",
				docorg: "",
				doccopy: "",
				doc_no: "",
				doc_dt: "",
				docno: this.docno,
				trkno: this.trkno
			});
			var oModelDataEncl = new sap.ui.model.json.JSONModel([]);
			oModelDataEncl.setData(this.temjsonEncl);
			this.getView().setModel(oModelDataEncl, "tableEncl");

		},
		ChangeSchmeIssue: function (oEvent) {
			debugger;
			var currentRow = oEvent.getSource().getParent().getIndex();
			var val = oEvent.getSource().getValue();
			this.temjsonEncl.results[currentRow].doc_dt = val;
			this.getView().getModel("tableEncl").refresh();
		},
		InsertSlno: function (oEvent) {
			debugger;
			var currentRow = oEvent.getSource().getParent().getIndex();
			var val = oEvent.getSource().getValue();
			this.temjsonEncl.results[currentRow].sl_no = val;
			this.getView().getModel("tableEncl").refresh();
			// if ((val == "") || (val == " ")) {
			// 	// if (val == " ") {
			// 	MessageBox.error("Cant make Document filed as null");
			// 	return;
			// } else 
			// {
			// var SplitDatePar = val.split("-");
			// var SplitDatePar1 = SplitDatePar[2].slice(0, -9);

			// this.temjson1.results[currentRow].custom_boe_date = null;
			// }

		},
		onPressSave: function () {
			debugger;
			var _self = this;
			var mParameters = {
				groupId: "updatBatch"
			};
			var _self = this;
			////////////////////////////////////////*****header*****/////////////////////////////////
			if (_self.sttus == "DFL") {
				_self.oEntry = {

					hq_fileno: this.getView().byId("hq_fileno").getValue() ? this.getView().byId("hq_fileno").getValue() : null

				};
			} else {
				_self.oEntry = {

					meetno: this.getView().byId("meetno").getValue() ? this.getView().byId("meetno").getValue().trim() : null,
					caseno: this.getView().byId("caseno").getValue() ? this.getView().byId("caseno").getValue().trim() : null,
					meetdt: this.getView().byId("meetdt").getValue() ? this.getView().byId("meetdt").getValue().trim() : null

				};
			}

			///////////////////////////////////*****header*****//////////////////////////////////////////
			/////////////////////////*****customdet///////////////
			for (var i = 0; i < _self.temjsonCust.results.length; i += 1) {
				delete _self.temjsonCust.results[i].__metadata;
				delete _self.temjsonCust.results[i].waers;
				delete _self.temjsonCust.results[i].custkyrs;
				delete _self.temjsonCust.results[i].compkyrs;
				delete _self.temjsonCust.results[i].chrgkyrs;
				_self.trkno = _self.temjsonCust.results[i].trkno;
				_self.oTrk_Model.update("/xBRIxI_IMP_TL_RDCP(docno='" + _self.docno + "',trkno='" + _self.trkno + "')", _self.temjsonCust.results[
						i], mParameters

				);
			}
			//////////////////////////////*****customdet//////////////////////////////////////////
			//////////////////////////////*****redemption//////////////////////////////////////////
			for (var i = 0; i < _self.temjsonRed.results.length; i += 1) {
				delete _self.temjsonRed.results[i].__metadata;

				_self.trkno = _self.temjsonRed.results[i].trkno;
				_self.oTrk_Model.update("/xBRIxI_IMP_TL_REDT(docno='" + _self.docno + "',trkno='" + _self.trkno + "')", _self.temjsonRed.results[
						i], mParameters

				);

			}
			//////////////////////////////*****redemption//////////////////////////////////////////
			//////////////////////////////*****Enclosure//////////////////////////////////////////
			for (var i = 0; i < _self.temjsonEncl.results.length; i += 1) {
				if (_self.temjsonEncl.results[i].docchk == "F") {
					_self.temjsonEncl.results[i].docchk = "T";
					delete _self.temjsonEncl.results[i].__metadata;
					// _self.temjsonEncl.results[i].trkno = _self.trkno;
					_self.oTrk_Model.create("/xBRIxI_IMP_TL_RDOC", _self.temjsonEncl.results[i], {
						method: "POST",
						mParameters
					});

					// _self.oTrk_Model.create("/xBRIxI_IMP_TL_RDOC(docno='" + _self.docno + "')", _self.temjsonEncl.results[
					// 		i], mParameters
					// );
					// _self.oTrk_Model.create("/xBRIxI_IMP_TL_RDOC(docno='" + _self.docno + "',trkno='" + _self.trkno + "',sl_no='" + _self.temjsonEncl
					// 	.results[
					// 		i].sl_no + "')", _self.temjsonEncl.results[
					// 		i], mParameters

					// );

				} else {
					delete _self.temjsonEncl.results[i].__metadata;
					delete _self.temjsonEncl.results[i].waers;
					delete _self.temjsonEncl.results[i].custkyrs;
					delete _self.temjsonEncl.results[i].compkyrs;
					delete _self.temjsonEncl.results[i].chrgkyrs;
					_self.temjsonEncl.results[i].trkno = _self.trkno;
					_self.oTrk_Model.update("/xBRIxI_IMP_TL_RDOC(docno='" + _self.docno + "',trkno='" + _self.trkno + "',sl_no='" + _self.temjsonEncl
						.results[
							i].sl_no + "')", _self.temjsonEncl.results[
							i], mParameters

					);
				}
			}
			//////////////////////////////*****Enclosure//////////////////////////////////////////

			_self.oTrk_Model.update("/xBRIxi_imp_tl_rhdr(docno='" + _self.docno + "')", _self.oEntry, {
				// method: "POST",
				success: function (oData, response) {

					var msg = "Document Number:" + _self.docno + " " + "Updated Successfully";
					var Trkno = _self.docno;
					MessageBox.success(msg, {
						actions: [sap.m.MessageBox.Action.OK],
						onClose: function (oAction) {
							if (oAction === sap.m.MessageBox.Action.OK) {
								window.FlagRefresh = true;
								window.Trkno1 = Trkno;
								_self.router.navTo("redList", true);
								// _self._CloseBusyDialog();

							}
						}
					});
					//}
					// _self._CloseBusyDialog();

				},

				error: function (err) {
					MessageBox.error("Something went wrong,Please try again later.");
					// _self._CloseBusyDialog();
				}
			});

		},
	});

});