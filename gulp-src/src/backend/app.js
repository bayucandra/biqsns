/*
 *Created by: Bayu candra <bayucandra@gmail.com>
 *Creation Year: 2016
 */

var bngapp=angular.module('BApp',['ngAnimate','ngMaterial', 'lfNgMdFileInput', 'bsLoadingOverlay', 'ui-notification'])
.controller('BCtrl', function($scope, $mdMedia, $rootScope, BIQThemeManager){
    $rootScope.BIQThemeManager = BIQThemeManager;
    $rootScope.BIQThemeManager.init();
    $rootScope.scopeCtrl = $scope;
	
    angular.element(document).ready(function(){
	
    });
})
.factory('BIQThemeDialog', function($mdDialog, $mdMedia, bsLoadingOverlayService, Notification, $rootScope, $timeout){
    var ref = new BIQThemeDialog($mdDialog, $mdMedia, bsLoadingOverlayService, Notification, $rootScope, $timeout);
    
    return ref;
})
.factory('BIQThemeManager', function($mdMedia, BIQThemeDialog, BIQWidgetElementParser){
    var ref = new BIQThemeManager($mdMedia);
    ref.BIQWidgetElementParser = BIQWidgetElementParser;
    ref.dialog = BIQThemeDialog;
    return ref;
})
.factory( 'BIQWidgetElementParser', function(){
    var ref = new BIQWidgetElementParser;
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