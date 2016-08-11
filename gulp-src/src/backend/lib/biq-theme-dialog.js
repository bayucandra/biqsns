/*
 *Created by: Bayu candra <bayucandra@gmail.com>
 *Creation Year: 2016
*/
function BIQThemeDialog( $mdDialog, $mdMedia, bsLoadingOverlayService, Notification, $rootScope, $timeout ){
    var self=this;
    self.biq_theme_manager = null;
    self.customFullScreen=$mdMedia('xs') || $mdMedia('sm');
    self.elementWrapperDefault= { target : document.getElementById(main_wrapper_id) };
    self.template = null;//SET BY BIQThemeManager
    self.params = {};
    self.show = function(ev, params){
        self.params = params;//Pass this to the $scope of controller
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && self.customFullscreen;
        $mdDialog.show({
            controller: self.controller,
            template: self.template,
    //      disableParentScroll: false,
            parent: angular.element(document.body),
            targetEvent: self.elementWrapperDefault,
            clickOutsideToClose:true, escapeToClose:true,// disable later escapeToClose on masking
            fullscreen: useFullScreen
        })
        .then(function(submit) {
        }, function() {//Must be same function as 'hide' in the controller
            self.hide();
        });
    };

    self.controller = function($scope, $mdDialog) {
        $scope.input_value = self.params.values;
        $scope.hide = function(p_success) {// for hiding outside scope, pass 'true' to avoid 'Notification()'
            p_success = typeof p_success !== 'undefined' ? p_success : false;
            self.hide(p_success);
            $mdDialog.hide();
        };
        $scope.submit = function(submit) {
            var formData = new FormData($b('#widget-dialog form')[0]);
            for(var key in $scope.input_value){
                var value = !bisnull($scope.input_value[key]) && ( $scope.input_value[key]!== 'undefined' ) ? $scope.input_value[key] : '';
                formData.append(key, value);
            }
            //BEGIN IF has files to upload===============
            var files = $b('.lf-ng-md-file-input');

            if(files.length){
                for(var i=0; i<files.length; i++){
                    var model_value = angular.element($b(files[i])).data('$ngModelController').$modelValue[0];
                    if(!bisnull(model_value)){
                        formData.append(
                            $b(files[i]).attr('lf-files'),
                            model_value.lfFile
                        );
                    }
                }
            }
            //END IF has files to upload****************
            
            formData.append('action', 'widget_save');//The Wordpress ajax name
            
            self.functions.maskShow('widget-dialog');
            $b.ajax({
                'url': ajaxurl,
                'type' : 'POST', 'data':formData,
                'async': false, 'cache': false,
                'contentType': false, 'processData': false,
                'success':function(response){//ajaxurl is default by Wordpress
                    var response_json = JSON.parse(response);
                    if( response_json.is_found ){
                        $scope.hide(true);
                        $b('body').find('[data-biq-widget-id="'+response_json.widget_id+'"]').replaceWith(response_json.html);//continue here 160801
                        $timeout(function(){
                            $rootScope.BIQThemeManager.widgetHoverApply(response_json.widget_id);
                        });
                        Notification("Widget succesfully updated","success");
                    }else{
                        self.functions.maskHide('widget-dialog');
                        Notification("Widget update failed: "+response_json.html, "error");
                    }
                }
            });
        };

        $scope.dialog = {};
        $scope.$watch(function(){//WATCH SCREEN SIZE FOR SET FLEX OF DIALOG WIDTH
            return $mdMedia('gt-sm');
        }, function(wantRestore){
            $scope.dialog['flex'] = wantRestore ?  40 : 100;
            $scope.dialog['height'] = wantRestore ? 'auto' : '100%';
        });

    	$scope.$watch(function() {
            return $mdMedia('xs') || $mdMedia('sm');
    	}, function(wantsFullScreen) {
            self.customFullscreen = (wantsFullScreen === true);
    	});
    };
    
    self.hide = function(p_success){
        p_success = typeof p_success !== 'undefined' ? p_success : false;
        self.functions.maskHide('widget-dialog');
        if(!p_success) Notification('Widget edit canceled', 'warning');
//        self.biq_theme_manager.hover_to_edit.is_editing = false;
//        self.biq_theme_manager.hover_to_edit.onmouseleave();
    };
    
    self.functions = {
        maskShow : function(referenceId){
            bsLoadingOverlayService.start({
              referenceId: referenceId
            });
        },
        maskHide : function(referenceId){
            bsLoadingOverlayService.stop({
              referenceId: referenceId
            });
        }
    };
}
