define([
	'angular'
], function(ng) {
	'use strict';
	return ng.module('CloudView.Services', []).constant('ENDPOINT_URI', 'http://localhost:8081/api/');
});
