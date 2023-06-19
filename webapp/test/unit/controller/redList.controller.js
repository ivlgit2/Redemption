/*global QUnit*/

sap.ui.define([
	"bri/Redemption/controller/redList.controller"
], function (Controller) {
	"use strict";

	QUnit.module("redList Controller");

	QUnit.test("I should test the redList controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});