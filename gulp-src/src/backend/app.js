/*
 *Created by: Bayu candra <bayucandra@gmail.com>
 *Creation Year: 2016
 */
"use strict";

var bngapp=angular.module('BApp',['ngAnimate','ngMaterial', 'lfNgMdFileInput', 'bsLoadingOverlay', 'ui-notification', 'ngMessages'])
.controller('BCtrl', function($scope, $mdMedia, $rootScope, BIQThemeManager, $http, $q){
    $rootScope.BIQThemeManager = BIQThemeManager;
    $rootScope.BIQThemeManager.init();
    $rootScope.scopeCtrl = $scope;
	
    angular.element(document).ready(function(){
	$b('.notice').remove();
    });
})
.factory('BIQThemeDialog', function($mdDialog, $mdMedia, bsLoadingOverlayService, Notification, $rootScope, $timeout, $mdSidenav){
    var ref = new BIQThemeDialog($mdDialog, $mdMedia, bsLoadingOverlayService, Notification, $rootScope, $timeout, $mdSidenav);
    
    return ref;
})
.factory('BIQThemeManager', function(Notification, $q, BIQThemeDialog, BIQWidgetElementParser){
    var ref = new BIQThemeManager(Notification, $q, BIQThemeDialog, BIQWidgetElementParser);
//    ref.BIQWidgetElementParser = BIQWidgetElementParser;
//    ref.dialog = BIQThemeDialog;
    return ref;
})
.factory( 'BIQWidgetElementParser', function($http, $q, Notification){
    var ref = new BIQWidgetElementParser($http, $q, Notification);
    return ref;
})
.directive('biqTab', biqTab)
.directive( 'biqTabItem', biqTabItem )
.config(function(NotificationProvider) {
    NotificationProvider.setOptions({
	delay: 2500,
	startTop: 20,
	startRight: 10,
	verticalSpacing: 20,
	horizontalSpacing: 20,
	positionX: 'left',
	positionY: 'bottom'
    });
  });