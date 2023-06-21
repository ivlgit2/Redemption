sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/core/routing/History"
], function (Controller, MessageBox, History) {
	"use strict";
	return Controller.extend("bri.Redemption.controller.redCrt", {

		onInit: function () {
			this.router = sap.ui.core.UIComponent.getRouterFor(this);
			this.router.attachRoutePatternMatched(this._handleRouteMatched, this);
			this.omodel_Common = this.getOwnerComponent().getModel("Omodel_cmn");
			this.oTrk_Model = this.getOwnerComponent().getModel("Trk_model");

		},
		_handleRouteMatched: function (oEvent) {
			debugger;

			this.getView().byId("bnefitType").setValue("");
			this.getView().byId("trkno").setValue("");
			this.getView().byId("lebelMode2").setVisible(false);
			this.getView().byId("acttuals").setText("");

			this.getView().byId("red_ref_no").setValue("");
			this.getView().byId("red_date").setValue("");
			this.getView().byId("dgft_sub_dt").setValue("");
			this.getView().byId("status").setValue("");
			this.getView().byId("bnd_lut_clsdt").setValue("");
			this.getView().byId("license_clsdt").setValue("");

			this.getView().byId("bcd").setValue("");
			this.getView().byId("sws").setValue("");
			this.getView().byId("igst").setValue("");
			this.getView().byId("intrst_amt").setValue("");
			this.getView().byId("cust_dty_paid").setValue("");
			this.getView().byId("intrst_paid").setValue("");
			this.getView().byId("comp_fee_paid").setValue("");
			this.getView().byId("other_charges").setValue("");
			this.getView().byId("duty_paid_dt").setValue("");
			this.getView().byId("bnkrefno").setValue("");
			this.getView().byId("bank_name").setValue("");
			this.getView().byId("cust_details").setValue("");

			this.getView().byId("Simple3Fo1rmDisplay35").setVisible(false);
			this.getView().byId("redemptiondetailsform").setVisible(false);
			this.getView().byId("Simple3Fo1rmDisplay395").setVisible(false);
			this.getView().byId("idItemTtableExpob").setVisible(false);
			this.getView().byId("expbl2").setVisible(false);
			this.getView().byId("idItemTtableImpsumm").setVisible(false);
			this.getView().byId("idItemTtableImpsummEPCG").setVisible(false);
			this.getView().byId("idItemTtableExcImp").setVisible(false);
			this.getView().byId("custdutydetailsform").setVisible(false);
			this.getView().byId("idItemTtable4").setVisible(false);
			this.getView().byId("idItemTtableenclo").setVisible(false);
			this.getView().byId("instanew").setVisible(false);
			// this.getView().byId("bcdalue").setValue("");
			if (this.tempjsonenclosure != undefined) {
				if (this.tempjsonenclosure.results.length != 0) {

					delete this.tempjsonenclosure.results;
					delete this.tempjsonenclosure;
					// var oModelIndDetails = new sap.ui.model.json.JSONModel([]);
					// oModelIndDetails.setData(this.article);
					// this.getView().setModel(oModelIndDetails, "list1");
					this.getView().getModel("tableEncl").refresh();
				}
			}

			this.readCodtyp();
		},
		readCodtyp: function () {
			debugger;
			var _self = this;
			var pvalue = "BFTY";
			// var prvaEncode = encodeURIComponent(pvalue);
			_self.omodel_Common.read("/xBRIxCE_CODTYP_NEW(inparam='" + pvalue + "')/Set", {
				success: function (getData) {
					for (var i = 0; i < getData.results.length; i++) {
						var oModelSave = new sap.ui.model.json.JSONModel([]);
						oModelSave.setData(getData.results);
						_self.getView().setModel(oModelSave, "bnftVal");
					}

				},
				error: function (getData) {
					MessageBox.error("error");

				}

			});
		},
		handleValueHelpBenfittype: function (oEvent) {
			debugger;
			var _self = this;
			_self.inputId = oEvent.getSource().getId();
			if (!_self._valueHelpPO) {
				_self._valueHelpPO = sap.ui.xmlfragment("bri.Redemption.view.fragments.Bnftype", _self);
				_self.getView().addDependent(_self._valueHelpPO);
			}
			_self._valueHelpPO.open();
		},
		handleValueHelpSearchBenfit: function (oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new sap.ui.model.Filter(
				"param1",
				sap.ui.model.FilterOperator.Contains, sValue
			);
			oEvent.getSource().getBinding("items").filter([oFilter]);
		},
		handleValueHelpCloseBenfit: function (oEvent) {
			debugger;
			var _self = this;
			if (oEvent.getParameter("selectedItem")) {
				_self.oSelectedItem = oEvent.getParameter("selectedItem").getTitle();
				if (_self.oSelectedItem) {
					var reqNoInputFrom = _self.getView().byId(_self.inputId);
					reqNoInputFrom.setValue(_self.oSelectedItem);
				}
				oEvent.getSource().getBinding("items").filter([]);
				if (oEvent !== null) {
					_self.getView().byId("lebelMode2").setVisible(true);
					_self.getView().byId("lebelMode3").setVisible(true);
				}
			}
		},
		handleValueHelpIntrkNo: function (oEvent) {
			debugger;
			// var _self = this;
			// _self._OpenBusyDialog();
			// var sInputValue = oEvent.getSource().getValue();
			// _self.inputId = oEvent.getSource().getId();
			// if (!_self._valueHelpDialogInv) {
			// 	_self._valueHelpDialogInv = sap.ui.xmlfragment("bri.Redemption.view.fragments.trkSearch", _self);
			// 	_self.getView().addDependent(_self._valueHelpDialogInv);
			// }
			// _self._CloseBusyDialog();
			// _self._valueHelpDialogInv.open(sInputValue);

			var _self = this;
			_self._OpenBusyDialog();
			_self.inputId = oEvent.getSource().getId();
			_self.oTrk_Model.read("/xBRIxI_IBSMASTFILTER", {
				success: function (getData) {
					_self.trkfil = {
						results: []
					};
					_self.trkfil.results = _self.trkfil.results.concat(getData.results);
					_self.trkfil.results = _self.trkfil.results.filter(a => a.bnftyp == _self.oSelectedItem);
					// _self.trkfil.results = _self.trkfil.results.filter((a => a.appln == D) && (b => b.appln == BS));

					var oModelData = new sap.ui.model.json.JSONModel();
					oModelData.setData(_self.trkfil);
					_self.getView().setModel(oModelData, "searchHelpModel");
					if (!_self._valueHelptrk) {
						_self._valueHelptrk = sap.ui.xmlfragment("bri.Redemption.view.fragments.trkSearch", _self);
						_self.getView().addDependent(_self._valueHelptrk);
					}
					_self._CloseBusyDialog();
					_self._valueHelptrk.open();
				}
			});

		},
		_handleValueHelpSearchIntrkNo: function (oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new sap.ui.model.Filter(
				"trkno",
				sap.ui.model.FilterOperator.Contains, sValue
			);
			oEvent.getSource().getBinding("items").filter([oFilter]);

		},
		_handleValueHelpCloseIntrkNo: function (oEvent) {
			debugger;
			// var _self = this;
			// if (oEvent.getParameter("selectedItem")) {
			// 	_self.oSelectedItem = oEvent.getParameter("selectedItem").getTitle();
			// 	if (_self.oSelectedItem) {
			// 		var reqNoInputFrom = _self.getView().byId(_self.inputId);
			// 		reqNoInputFrom.setValue(_self.oSelectedItem);
			// 		_self.CheckInvoiceDuplicates();
			// 		_self.getAddItem();
			// 	}
			// 	oEvent.getSource().getBinding("items").filter([]);
			// }
			var _self = this;
			var oSelectedItem = oEvent.getParameter("selectedContexts");
			if (oSelectedItem) {
				oSelectedItem.map(function (oContext) {
					var productInput = sap.ui.getCore().byId(_self.inputId);
					_self.trkno = oContext.getObject().trkno;
					productInput.setValue(_self.trkno);
					// _self.getView().byId("bukrs").setValue(oContext.getObject().bukrs);
					// _self.getView().byId("bukrs1").setValue(oContext.getObject().bukrs);
					_self.getView().byId("acttuals").setText(oContext.getObject().bsno);
				});
			}
			_self.getView().byId("save").setVisible(true);
			_self.getView().byId("idIconTabBar").setVisible(true);
			_self.getView().byId("custdutydetailsform").setVisible(true);
			_self.getView().byId("redemptiondetailsform").setVisible(true);
			_self.getView().byId("idItemTtableenclo").setVisible(true);
			if (_self.oSelectedItem == "DFL") {
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
			} else if (_self.oSelectedItem == "EPCG") {
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

			} else { }
			_self.expobligation();
			_self.Impsumm();
			_self.header();
			_self.excImp();
			_self.Installation();
			_self.Aro();

		},
		header: function () {
			debugger;
			var _self = this;

			_self.oTrk_Model.read("/xBRIxCE_GET_REDM_HDR(ibs_trkno='" + _self.trkno + "')/Set", {
				success: function (oData) {
					console.log(oData);
					if (oData.results.length <= 0) {
						MessageBox.error("No Matching Result(s) Found for the Filter Header");
					} else {
						_self.tempjsonhead = {
							results: []
						};
						_self.tempjsonhead.results = _self.tempjsonhead.results.concat(oData.results);
						// _self.tempjsonhead.results = _self.tempjsonhead.results.filter(a => a.trkno == _self.trkno);
						for (var i = 0; i < _self.tempjsonhead.results.length; i++) {
							_self.issuedate = _self.tempjsonhead.results[i].issdt;
							_self.issdt = _self.convertToSAPdate(_self.issuedate);
							_self.tempjsonhead.results[i].issdt = _self.issdt;

							_self.filedate = _self.tempjsonhead.results[i].filedt;
							_self.filedt = _self.convertToSAPdate(_self.filedate);
							_self.tempjsonhead.results[i].filedt = _self.filedt;

							_self.fimpdt = _self.tempjsonhead.results[i].ifirstextdt;
							_self.ifirstextdt = _self.convertToSAPdate(_self.fimpdt);
							_self.tempjsonhead.results[i].ifirstextdt = _self.ifirstextdt;

							_self.simpdt = _self.tempjsonhead.results[i].isecondextdt;
							_self.isecondextdt = _self.convertToSAPdate(_self.simpdt);
							_self.tempjsonhead.results[i].isecondextdt = _self.isecondextdt;

							_self.fexdt = _self.tempjsonhead.results[i].efirstextdt;
							_self.efirstextdt = _self.convertToSAPdate(_self.fexdt);
							_self.tempjsonhead.results[i].efirstextdt = _self.efirstextdt;

							_self.sexdt = _self.tempjsonhead.results[i].esecondextdt;
							_self.esecondextdt = _self.convertToSAPdate(_self.sexdt);
							_self.tempjsonhead.results[i].esecondextdt = _self.esecondextdt;

						}
						var oModelDatahead = new sap.ui.model.json.JSONModel();
						oModelDatahead.setData(_self.tempjsonhead.results[0]);
						_self.getView().setModel(oModelDatahead, "tablehead");

					}
				},
				error: function (error) {
					MessageBox.error("Something Went Wrong . Please Try again Later");
				}
			});

		},
		excImp: function () {
			debugger;
			var _self = this;
			_self.oTrk_Model.read("/xBRIxCE_GET_REDM_EXC_IMP(ibs_trkno='" + _self.trkno + "')/Set", {
				// _self.oTrk_Model.read("/xBRIxCE_GET_REDM_EXC_IMP", {
				success: function (oData) {
					_self.getView().byId("idItemTtableExcImp").setVisible(true);
					console.log(oData);
					if (oData.results.length <= 0) {
						MessageBox.error("No Matching Result(s) Found for the Filter Excess Import");
					} else {
						_self.tempjsonExcimp = {
							results: []
						};
						_self.tempjsonExcimp.results = _self.tempjsonExcimp.results.concat(oData.results);
						_self.tempjsonExcimp.results = _self.tempjsonExcimp.results.filter(a => a.trkno == _self.trkno);

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
			_self.oTrk_Model.read("/xBRIxI_EPCG_INST_CERTIFICATE", {
				// _self.oTrk_Model.read("/xBRIxI_EPCG_INST_CERTIFCT_RPT", {
				success: function (oData) {
					_self.getView().byId("instanew").setVisible(true);
					console.log(oData);
					if (oData.results.length <= 0) {
						MessageBox.error("No Matching Result(s) Found for the Filter Installation");
					} else {
						_self.tempjsoninsta = {
							results: []
						};
						_self.tempjsoninsta.results = _self.tempjsoninsta.results.concat(oData.results);
						_self.tempjsoninsta.results = _self.tempjsoninsta.results.filter(a => a.trkno == _self.trkno);

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
					_self.getView().byId("idItemTtableImpsumm").setVisible(true);
					_self.getView().byId("idItemTtableImpsummEPCG").setVisible(true);
					console.log(oData);
					if (oData.results.length <= 0) {
						MessageBox.error("No Matching Result(s) Found for the Filter Import Summary");
					} else {
						_self.tempjsonimp = {
							results: []
						};
						_self.tempjsonimp.results = _self.tempjsonimp.results.concat(oData.results);
						_self.tempjsonimp.results = _self.tempjsonimp.results.filter(a => a.trkno == _self.trkno);

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
					_self.getView().byId("idItemTtableExpob").setVisible(true);
					console.log(oData);
					if (oData.results.length <= 0) {
						MessageBox.error("No Matching Result(s) Found for the Filter Export Obligation");
					} else {
						_self.tempjsonobli = {
							results: []
						};
						_self.tempjsonobli.results = _self.tempjsonobli.results.concat(oData.results);
						_self.tempjsonobli.results = _self.tempjsonobli.results.filter(a => a.trkno == _self.trkno);
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
		Aro: function(){
			debugger;
			var _self = this;
			_self.oTrk_Model.read("/xBRIxI_IBSITMASTPO", {
				success: function (oData) {
					_self.getView().byId("idItemTtable4").setVisible(true);
					console.log(oData);
					if (oData.results.length <= 0) {
						MessageBox.error("No Matching Result(s) Found for the Filter Aro Invalidation");
					} else {
						_self.tempjsonAro = {
							results: []
						};
						_self.tempjsonAro.results = _self.tempjsonAro.results.concat(oData.results);
						_self.tempjsonAro.results = _self.tempjsonAro.results.filter(a => a.trkno == _self.trkno);

						var oModelDataAro = new sap.ui.model.json.JSONModel();
						oModelDataAro.setData(_self.tempjsonAro);
						_self.getView().setModel(oModelDataAro, "tableAro");

					}
				},
				error: function (error) {
					MessageBox.error("Something Went Wrong . Please Try again Later");
				}
			});
		},
		addItemRow: function () {
			debugger;
			if (!this.tempjsonenclosure) {

				this.tempjsonenclosure = {
					results: [{
						//internal_tracking_no: "",
						sl_no: (parseInt.length - 2 + 1).toString(),
						docdescr: "",
						docchk: "",
						docorg: "",
						doccopy: "",
						doc_no: "",
						doc_dt: ""
					}]
				};
				var oModelDataEncl = new sap.ui.model.json.JSONModel([]);
				oModelDataEncl.setData(this.tempjsonenclosure);
				this.getView().setModel(oModelDataEncl, "tableEncl");

			} else {
				this.tempjsonenclosure.results.push({
					//internal_tracking_no: "",
					sl_no: (parseInt(this.tempjsonenclosure.results.length) + 1).toString(),
					docdescr: "",
					docchk: "",
					docorg: "",
					doccopy: "",
					doc_no: "",
					doc_dt: ""
				});
				var oModelDataEncl = new sap.ui.model.json.JSONModel([]);
				oModelDataEncl.setData(this.tempjsonenclosure);
				this.getView().setModel(oModelDataEncl, "tableEncl");

			}
			this.getView().getModel("tableEncl").refresh();
			// if (!this.tempjsonenclosure) {
			// 	this.tempjsonenclosure = {
			// 		results: [{
			// 			sl_no: "",
			// 			docdescr: "",
			// 			docchk: "",
			// 			docorg: "",
			// 			doccopy: "",
			// 			doc_no: "",
			// 			doc_dt: ""
			// 		}]
			// 	};
			// 	var oModelDataEncl = new sap.ui.model.json.JSONModel([]);
			// 	oModelDataEncl.setData(this.tempjsonenclosure);
			// 	this.getView().setModel(oModelDataEncl, "tableEncl");

			// } else {
			// 	this.tempjsonenclosure.results.push({
			// 		//internal_tracking_no: "",
			// 		sl_no: "",
			// 		docdescr: "",
			// 		docchk: "",
			// 		docorg: "",
			// 		doccopy: "",
			// 		doc_no: "",
			// 		doc_dt: ""
			// 	});
			// 	var oModelDataEncl = new sap.ui.model.json.JSONModel([]);
			// 	oModelDataEncl.setData(this.tempjsonenclosure);
			// 	this.getView().setModel(oModelDataEncl, "tableEncl");

			// }

		},

		convertToSAPdate: function (value) { //alert(value);
			if (value) {
				if (value instanceof Date) {
					var NewDateform = value;
				} else if (value.indexOf("T00:00:00")) {
					return value;
				} else { }
				var mnth = ("0" + (NewDateform.getMonth() + 1)).slice(-2);
				var day = ("0" + NewDateform.getDate()).slice(-2);
				var output = [NewDateform.getFullYear(), mnth, day].join("-") + "T00:00:00";
				return output;
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
		onpresscreate: function (oEvent) {
			debugger;
			var _self = this;
			//***********************************Header create*******************************//
			// for (var i = 0; i < _self.tempjsonhead.results.length; i++) {
			// 	_self.issuedate = _self.tempjsonhead.results[i].issdt;
			// 	_self.issdt = _self.issuedate.slice(0, -9);
			// 	_self.tempjsonhead.results[i].issdt = _self.issdt;

			// }
			// _self.getView().getModel("tablehead").refresh();

			if (_self.oSelectedItem == "DFL") {
				_self.oEntry = {
					bukrs: this.getView().byId("bukrs").getValue().trim(),
					issdt: this.getView().byId("issdt").getValue().trim(),
					issauth: this.getView().byId("issauth").getValue().trim(),
					bnftyp: this.oSelectedItem,
					hq_fileno: this.getView().byId("hq_fileno").getValue(),
					fileno: this.getView().byId("fileno").getValue().trim(),
					filedt: this.getView().byId("filedt").getValue().trim(),
					impval: this.getView().byId("impval").getValue(),
					norms_type: this.getView().byId("norms_type").getValue(),
					ifirstextdt: this.getView().byId("ifirstextdt").getValue(),
					isecondextdt: this.getView().byId("isecondextdt").getValue(),
					cust_notif_no: this.getView().byId("cust_notif_no").getValue(),
					valadd: this.getView().byId("valadd").getValue(),
					eo_qty_percent: this.getView().byId("eo_qty_percent").getValue(),
					eo_val_percent: this.getView().byId("eo_val_percent").getValue(),
					actual_valadd: this.getView().byId("actual_valadd").getValue(),
					expenddt: this.getView().byId("expenddt").getValue(),
					siono: this.getView().byId("siono").getValue().trim(),
					obligfc: this.getView().byId("obligfc").getValue(),
					efirstextdt: this.getView().byId("efirstextdt").getValue(),
					esecondextdt: this.getView().byId("esecondextdt").getValue(),
					prdgrp: this.getView().byId("prdgrp").getValue(),
					totciflc: this.getView().byId("totciflc").getValue(),
					totciffc: this.getView().byId("totciffc").getValue(),
					obliglc: this.getView().byId("obliglc").getValue(),
					oblig_fix_lic: this.getView().byId("oblig_fix_lic").getValue(),
					oblig_lic_imp: this.getView().byId("oblig_lic_imp").getValue(),
					act_imp_cif_usd: this.getView().byId("act_imp_cif_usd").getValue(),
					imp_cif_val: this.getView().byId("imp_cif_val").getValue(),
					act_imp_cif_val: this.getView().byId("act_imp_cif_val").getValue(),
					act_fob_fc: this.getView().byId("act_fob_fc").getValue(),
					act_fob_lc: this.getView().byId("act_fob_lc").getValue()
					// totinvval_curr: this.getView().byId("totinvval_curr").getValue()
				};
				if ((_self.oEntry.filedt == ' ') || (_self.oEntry.filedt == "")) {

					_self.oEntry.filedt = null;
				}
				if ((_self.oEntry.issdt == ' ') || (_self.oEntry.issdt == "")) {

					_self.oEntry.issdt = null;
				}
				if ((_self.oEntry.ifirstextdt == ' ') || (_self.oEntry.ifirstextdt == "")) {

					_self.oEntry.ifirstextdt = null;
				}
				if ((_self.oEntry.isecondextdt == ' ') || (_self.oEntry.isecondextdt == "")) {

					_self.oEntry.isecondextdt = null;
				}
				if ((_self.oEntry.expenddt == ' ') || (_self.oEntry.expenddt == "")) {

					_self.oEntry.expenddt = null;
				}
				if ((_self.oEntry.efirstextdt == ' ') || (_self.oEntry.efirstextdt == "")) {

					_self.oEntry.efirstextdt = null;
				}
				if ((_self.oEntry.esecondextdt == ' ') || (_self.oEntry.esecondextdt == "")) {

					_self.oEntry.esecondextdt = null;
				}

			} else {
				_self.oEntry = {
					bukrs: this.getView().byId("bukrs1").getValue().trim(),
					issdt: this.getView().byId("issdt1").getValue().trim(),
					issauth: this.getView().byId("issauth1").getValue().trim(),
					bnftyp: this.oSelectedItem,
					hq_fileno: this.getView().byId("hq_fileno1").getValue(),
					fileno: this.getView().byId("fileno1").getValue().trim(),
					filedt: this.getView().byId("filedt1").getValue().trim(),
					impval: this.getView().byId("impval1").getValue().trim(),
					instplant: this.getView().byId("instplant").getValue().trim(),
					meetno: this.getView().byId("meetno").getValue(),
					caseno: this.getView().byId("caseno").getValue(),
					cust_notif_no: this.getView().byId("cust_notif_no1").getValue().trim(),
					valadd: this.getView().byId("valadd").getValue().trim(),
					meetdt: this.getView().byId("meetdt").getValue().trim(),
					eo_val_percent: this.getView().byId("eo_val_percent1").getValue(),
					// actual_valadd: this.getView().byId("actual_valadd1").getValue(),
					expenddt: this.getView().byId("expenddt1").getValue().trim(),
					// siono: this.getView().byId("siono1").getValue().trim(),
					obligfc: this.getView().byId("obligfc1").getValue().trim(),
					// efirstextdt: this.getView().byId("efirstextdt1").getValue(),
					// esecondextdt: this.getView().byId("esecondextdt1").getValue(),
					prdgrp: this.getView().byId("prdgrp1").getValue().trim(),
					totciflc: this.getView().byId("totciflc1").getValue().trim(),
					// totciffc: this.getView().byId("totciffc1").getValue(),
					// obliglc: this.getView().byId("obliglc1").getValue(),
					oblig_fix_lic: this.getView().byId("oblig_fix_lic1").getValue().trim(),
					oblig_lic_imp: this.getView().byId("oblig_lic_imp1").getValue().trim(),
					// act_imp_cif_usd: this.getView().byId("act_imp_cif_usd1").getValue(),
					// imp_cif_val: this.getView().byId("imp_cif_val1").getValue(),
					// act_imp_cif_val: this.getView().byId("act_imp_cif_val1").getValue(),
					act_fob_fc: this.getView().byId("act_fob_fc1").getValue().trim(),
					act_fob_lc: this.getView().byId("act_fob_lc1").getValue().trim()
				};
				if ((_self.oEntry.filedt == ' ') || (_self.oEntry.filedt == "")) {

					_self.oEntry.filedt = null;
				}
				if ((_self.oEntry.issdt == ' ') || (_self.oEntry.issdt == "")) {

					_self.oEntry.issdt = null;
				}
				if ((_self.oEntry.ifirstextdt == ' ') || (_self.oEntry.ifirstextdt == "")) {

					_self.oEntry.ifirstextdt = null;
				}
				if ((_self.oEntry.isecondextdt == ' ') || (_self.oEntry.isecondextdt == "")) {

					_self.oEntry.isecondextdt = null;
				}
				if ((_self.oEntry.expenddt == ' ') || (_self.oEntry.expenddt == "")) {

					_self.oEntry.expenddt = null;
				}
				if ((_self.oEntry.efirstextdt == ' ') || (_self.oEntry.efirstextdt == "")) {

					_self.oEntry.efirstextdt = null;
				}
				if ((_self.oEntry.esecondextdt == ' ') || (_self.oEntry.esecondextdt == "")) {

					_self.oEntry.esecondextdt = null;
				}
				if ((_self.oEntry.meetdt == ' ') || (_self.oEntry.meetdt == "")) {

					_self.oEntry.meetdt = null;
				}


			}
			///////////////////******************custom details////////////////////////////
			_self.oEntry.to_redemption_duty = [];
			_self.bcdval = _self.getView().byId("bcd").getValue();
			_self.swsval = _self.getView().byId("sws").getValue();
			_self.igstval = _self.getView().byId("igst").getValue();
			_self.intval = _self.getView().byId("intrst_paid").getValue();
			_self.custval = _self.getView().byId("cust_dty_paid").getValue();
			_self.comboval = _self.getView().byId("comp_fee_paid").getValue();
			_self.otherval = _self.getView().byId("other_charges").getValue();
			_self.dutydt = _self.getView().byId("duty_paid_dt").getValue();
			_self.bankref = _self.getView().byId("bnkrefno").getValue();
			_self.bankna = _self.getView().byId("bank_name").getValue();
			_self.custdt = _self.getView().byId("cust_details").getValue();
			_self.intamnt = _self.getView().byId("intrst_amt").getValue();

			// _self.exchangerate = param.kursf;
			// _self.curencyno = param.currency;
			// _self.vendorcode = param.vendor;

			_self.jsonHeaderCustm = {
				"results": [{
					bcd: _self.bcdval,
					sws: _self.swsval,
					igst: _self.igstval,
					intrst_paid: _self.intval,
					cust_dty_paid: _self.custval,
					comp_fee_paid: _self.comboval,
					other_charges: _self.otherval,
					duty_paid_dt: _self.dutydt,
					bnkrefno: _self.bankref,
					bank_name: _self.bankna,
					cust_details: _self.custdt,
					intrst_amt: _self.intamnt,
					trkno: _self.trkno

				}]
			};
			_self.oEntry.to_redemption_duty.push(_self.jsonHeaderCustm.results[0]);
			for (var i = 0; i < _self.jsonHeaderCustm.results.length; i++) {
				if ((_self.jsonHeaderCustm.results[i].bcd == "") || (_self.jsonHeaderCustm.results[i].bcd == '')) {
					_self.jsonHeaderCustm.results[i].bcd = null;
				}
				if ((_self.jsonHeaderCustm.results[i].sws == "") || (_self.jsonHeaderCustm.results[i].sws == '')) {
					_self.jsonHeaderCustm.results[i].sws = null;
				}
				if ((_self.jsonHeaderCustm.results[i].igst == "") || (_self.jsonHeaderCustm.results[i].igst == '')) {
					_self.jsonHeaderCustm.results[i].igst = null;
				}
				if ((_self.jsonHeaderCustm.results[i].intrst_paid == "") || (_self.jsonHeaderCustm.results[i].intrst_paid == '')) {
					_self.jsonHeaderCustm.results[i].intrst_paid = "0.00";
				}
				if ((_self.jsonHeaderCustm.results[i].cust_dty_paid == "") || (_self.jsonHeaderCustm.results[i].cust_dty_paid == '')) {
					_self.jsonHeaderCustm.results[i].cust_dty_paid = "0.00";
				}
				if ((_self.jsonHeaderCustm.results[i].comp_fee_paid == "") || (_self.jsonHeaderCustm.results[i].comp_fee_paid == '')) {
					_self.jsonHeaderCustm.results[i].comp_fee_paid = "0.00";
				}
				if ((_self.jsonHeaderCustm.results[i].other_charges == "") || (_self.jsonHeaderCustm.results[i].other_charges == '')) {
					_self.jsonHeaderCustm.results[i].other_charges = "0.00";
				}
				if ((_self.jsonHeaderCustm.results[i].intrst_amt == "") || (_self.jsonHeaderCustm.results[i].intrst_amt == '')) {
					_self.jsonHeaderCustm.results[i].intrst_amt = "0.00";
				}
				if ((_self.jsonHeaderCustm.results[i].duty_paid_dt == "") || (_self.jsonHeaderCustm.results[i].duty_paid_dt == '')) {
					_self.jsonHeaderCustm.results[i].duty_paid_dt = null;
				}


			}
			_self.getView().getModel("tablehead").refresh();
			///////////////////******************////////////////////////////
			///////////////////******************redemption////////////////////////////
			_self.oEntry.to_redemption_det = [];
			_self.red_ref_no = _self.getView().byId("red_ref_no").getValue();
			_self.red_date = _self.getView().byId("red_date").getValue();
			_self.dgft_sub_dt = _self.getView().byId("dgft_sub_dt").getValue();
			_self.status = _self.getView().byId("status").getValue();
			_self.bnd_lut_clsdt = _self.getView().byId("bnd_lut_clsdt").getValue();
			_self.license_clsdt = _self.getView().byId("license_clsdt").getValue();

			// _self.exchangerate = param.kursf;
			// _self.curencyno = param.currency;
			// _self.vendorcode = param.vendor;

			_self.jsonHeaderRedem = {
				"results": [{

					red_ref_no: _self.red_ref_no,
					red_date: _self.red_date,
					status: _self.status,
					dgft_sub_dt: _self.dgft_sub_dt,
					bnd_lut_clsdt: _self.bnd_lut_clsdt,
					license_clsdt: _self.license_clsdt,
					trkno: _self.trkno

				}]
			};
			_self.oEntry.to_redemption_det.push(_self.jsonHeaderRedem.results[0]);
			for (var i = 0; i < _self.jsonHeaderRedem.results.length; i++) {
				if ((_self.jsonHeaderRedem.results[i].red_date == "") || (_self.jsonHeaderRedem.results[i].red_date == '')) {
					_self.jsonHeaderRedem.results[i].red_date = null;
				}
				if ((_self.jsonHeaderRedem.results[i].bnd_lut_clsdt == "") || (_self.jsonHeaderRedem.results[i].bnd_lut_clsdt == '')) {
					_self.jsonHeaderRedem.results[i].bnd_lut_clsdt = null;
				}
				if ((_self.jsonHeaderRedem.results[i].license_clsdt == "") || (_self.jsonHeaderRedem.results[i].license_clsdt == '')) {
					_self.jsonHeaderRedem.results[i].license_clsdt = null;
				}
				if ((_self.jsonHeaderRedem.results[i].dgft_sub_dt == "") || (_self.jsonHeaderRedem.results[i].dgft_sub_dt == '')) {
					_self.jsonHeaderRedem.results[i].dgft_sub_dt = null;
				}
			}
			_self.getView().getModel("tablehead").refresh();
			/////////////////////**************/////////////////////////////
			///////////////////******************enclosure details////////////////////////////
			if (_self.tempjsonenclosure !=undefined) {
				for (var i = 0; i < _self.tempjsonenclosure.results.length; i++) {
					_self.tempjsonenclosure.results[i].trkno = _self.trkno;
				}
				_self.oEntry.to_redemption_enclousure = [];
				for (var i = 0; i < _self.tempjsonenclosure.results.length; i++) {
					_self.oEntry.to_redemption_enclousure.push(_self.tempjsonenclosure.results[i]);
				}

				_self.getView().getModel("tablehead").refresh();

				for (var i = 0; i < _self.tempjsonenclosure.results.length; i += 1) {
					_self.tempjsonenclosure.results[i].docchk = "T";
				}
			}


			// for (var i = 0; i < _self.tempjsonenclosure.results.length; i += 1) {
			// 	_self.oTrk_Model.create("/xBRIxi_imp_tl_rhdr(trkno='" + _self.tempjsonenclosure.results[
			// 		i].trkno + "')/to_redemption_enclousure", _self.tempjsonenclosure.results[i]);
			// }
			// _self.getView().getModel("tablehead").refresh();

			/////////////////////**************/////////////////////////////
			_self.oTrk_Model.create("/xBRIxi_imp_tl_rhdr", _self.oEntry, {
				method: "POST",
				success: function (oData, response) {

					var m = JSON.parse(response.headers["sap-message"]).message;
					var Trkno = m.split(" ")[2];
					MessageBox.success(m, {
						actions: [sap.m.MessageBox.Action.OK],
						onClose: function (oAction) {
							if (oAction === sap.m.MessageBox.Action.OK) {
								window.FlagRefresh = true;
								// window.FromTrackNumber = Trkno;
								window.Trkno1 = Trkno;
								_self.router.navTo("redList", true);
								// _self._CloseBusyDialog();
							}
						}
					});
				},
				error: function (err) {
					MessageBox.error("Something went wrong,Please try again later.");
				}
			});
		},
		// handleChange: function (oEvent) {
		// 	debugger;
		// 	var currentRow = oEvent.getSource().getParent().getIndex();
		// 	var val = oEvent.getSource().getValue();
		// 	this.tempjsonenclosure.results[currentRow].doc_dt = val;
		// 	this.getView().getModel("tablehead").refresh();
		// },
		DecCheckbcd: function (oEvent) {
			debugger;
			// var rowval = oEvent.getSource().getParent().getIndex();
			var val = oEvent.mParameters.newValue;


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
				this.tempjsonenclosure.results[rowval].docorg = "";
				// this.temjson1.results[rowval].db_amt = "";
			}
			if (val.includes(".")) {
				MessageBox.error("Cant put Decimals");
				this.tempjsonenclosure.results[rowval].docorg = "";
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
				this.tempjsonenclosure.results[rowval].doccopy = "";
				// this.temjson1.results[rowval].db_amt = "";
			}
			if (val.includes(".")) {
				MessageBox.error("Cant put Decimals");
				this.tempjsonenclosure.results[rowval].doccopy = "";

			}
		},
		ChangeDocdate: function (oEvent) {
			debugger;
			var currentRow = oEvent.getSource().getParent().getIndex();
			var val = oEvent.getSource().getValue();
			if ((val == "") || (val == '')) {
				this.tempjsonenclosure.results[currentRow].doc_dt = null;
			} else {
				this.tempjsonenclosure.results[currentRow].doc_dt = val;
			}

			this.getView().getModel("tableEncl").refresh();
		},
		InsertSlno: function (oEvent) {
			debugger;
			var currentRow = oEvent.getSource().getParent().getIndex();
			var val = oEvent.getSource().getValue();
			this.tempjsonenclosure.results[currentRow].sl_no = val;
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
		ConvertJsonDate: function (value) {
			output = "";
			if (value) {
				if (value instanceof Date) {
					var NewDateform = value;
				} else if (value.indexOf("T00:00:00")) {
					var NewDateform = new Date(value.substring(0, 10));
				} else {
					var formattedJsonDate = eval('new' + value.replace(/\//g, ' '));
					var NewDateform = new Date(formattedJsonDate);
				}
				var mnth = ("0" + (NewDateform.getMonth() + 1)).slice(-2);
				var day = ("0" + NewDateform.getDate()).slice(-2);
				var output = [day, mnth, NewDateform.getFullYear()].join("/");
			}
			return output;
		},
		OnPressDeleteItem: function (oArg) {
			debugger;
			var _self = this;
			//var filters = new Array();

			_self.slno = oArg.getSource().getParent().getCells()[0].getValue();
			_self.rowIndex = oArg.getSource().getParent().getIndex();



			MessageBox.confirm("Changes Cannot be Undone. Do you Really Want to Delete?", {
				actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
				onClose: function (oAction) {
					if (oAction === sap.m.MessageBox.Action.OK) {
						var mParameters = {};
						mParameters.groupId = "deleteGroup";
						mParameters.ETag = "*";
						// if (_self.tempjsonenclosure.results.length != 0) {
						// _self.oTrk_Model.remove("/xBRIxI_IMP_TL_RDOC(trkno='" + _self.tempjsonenclosure
						// 	.results[_self.rowIndex].trkno + "',docno='" + _self.tempjsonenclosure.results[_self.rowIndex].docno +
						// 	"',sl_no='" + _self.tempjsonenclosure.results[_self.rowIndex].sl_no +
						// 	"')", mParameters);
						_self.tempjsonenclosure.results.splice(_self.rowIndex, 1);
						// }

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
		_OpenBusyDialog: function () {
			if (!this.bsdalog) {
				this.bsdalog = sap.ui.xmlfragment(this.getView().getId(), "bri.Redemption.view.fragments.BusyDia", this);
				this.getView().addDependent(this.bsdalog);
			}
			this.bsdalog.open();
		},
		_CloseBusyDialog: function () {
			this.bsdalog.close();
		},

	});

});