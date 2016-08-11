var biqTab = function($rootScope){//named biqTab
    return {
	restrict : 'E',
	transclude: true,
	scope : {
	    tabType : '@',//tab/url
	    headerHeight: '@', 
	    containerWidth: '@',//with 'px' / '%' sufix
	    ngclass: '='
	},
	controller : ['$scope','$attrs', function($scope, $attrs){
	    var self = this;
	    var panes = $scope.panes = [];
//	    $scope.getStyle = function(){ return 'tst';};
//	    console.log(self.style);
	    //BEGIN CSS CLASS GENERATE==========================
	    $scope.headerHeightClass = function(){
		return ' h'+$scope.headerHeight;
	    };
	    $scope.containerStyle = {};
	    if( $attrs.hasOwnProperty( 'containerWidth') ) $scope.containerStyle['width'] = $attrs.containerWidth;
//	    $scope.containerStyle = function(){
//		var style = '';
//		if($scope.containerWidth!=='')
//		return ' w'+$scope.containerWidth;
//	    };
	    //END CSS CLASS GENERATE***************************
	    $scope.select = function(pane) {
		angular.forEach(panes, function(pane) {
		    pane.selected = false;
		});
		pane.selected = true;
	    };
	    $scope.click = function(pane){
		$scope.select(pane);
		if($scope.tabType === 'url' ){
		     window.location = pane.url;
		}
	    };
	    self.addPane = function(pane) {
		if ( (panes.length === 0) || ( typeof pane.active !== 'undefined' ) ) {
		  $scope.select(pane);
		}
		panes.push(pane);
	    };
	}],
	template: '<div class="biq-tab disable-select{{headerHeightClass()}}">\n\
	    <ul>\n\
	      <li ng-repeat="pane in panes" ng-class="{active:pane.selected}">\n\
		<span ng-click="click(pane)">{{pane.title}}</span>\n\
	      </li>\n\
	    </ul>\n\
	    <div ng-show="tabType===\'tab\'" class="tab-content" ng-transclude ng-style={{containerStyle}}></div>\n\
	  </div>'
    };
//    "@"   (  Text binding / one-way binding )
//"="   ( Direct model binding / two-way binding )
//"&"   ( Behaviour binding / Method binding  )
};

var biqTabItem = function(){
    return {
	require: '^^biqTab',
	restrict: 'E',
	transclude: true,
	scope: {
	  title: '@', url:'@', active:'@'
	},
	link: function(scope, element, attrs, biqTabCtrl) {
	    biqTabCtrl.addPane(scope);
	},
	template:
	    '<div class="tab-pane animate-show" ng-show="selected">\n\
		<div ng-transclude></div>\n\
	    </div>'
    };
};
