/*
 *Created by: Bayu candra <bayucandra@gmail.com>
 *Creation Year: 2016
*/
function BIQThemeDialog( $mdDialog, $mdMedia, bsLoadingOverlayService, Notification, $rootScope, $timeout, $mdSidenav ){
    var self=this;
    self.biq_theme_manager = null;
    self.customFullScreen=$mdMedia('xs') || $mdMedia('sm');
    self.elementWrapperDefault= { target : document.getElementById(main_wrapper_id) };
    self.template = null;//SET BY BIQThemeManager
    self.params = {};
    self.show = function(ev, params){
        self.params = params;//Pass this to the $scope of controller
//        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && self.customFullscreen;
        $mdDialog.show({
            controller: self.controller,
            template: self.template,
    //      disableParentScroll: false,
            parent: angular.element(document.body),
            targetEvent: self.elementWrapperDefault,
            clickOutsideToClose:true, escapeToClose:true,// disable later escapeToClose on masking
            fullscreen: self.customFullScreen
        })
        .then(function(submit) {
        }, function() {//Must be same function as 'hide' in the controller
            self.hide();
        });
    };
    self.buttons = null;//link 'buttons' object at $scope
    self.controller = function($scope, $mdDialog) {
        $scope.input_value = self.params.values;
        $scope.structure = self.params.structure;
        $scope.buttons = {
            text: {submit:'Submit',cancel:'Cancel'},
            message: { 
                cancel:{ text: 'Widget edit canceled', type:'warning'} 
            } 
        };
        self.buttons = $scope.buttons;
        
        $scope.widget_not_ready = self.params.widget_not_ready;
        $scope.inputs ={ list:{ mode:'',values:{}, server_data:[] }, date:new Date().getTime() };
        if( $scope.input_value.hasOwnProperty('list') ){
            $scope.inputs.list.server_data = $scope.input_value.list;
            $scope.buttons.text.cancel = 'Finish';
            $scope.buttons.message.cancel.text = 'Widget edit finish';
            $scope.buttons.message.cancel.type = 'success';
        }
        $scope.inputs.list.submit = function(){//Create / Submit
            if($scope.inputs.list.mode===''){
                $scope.inputs.list.values = {};
                $scope.inputs.list.api.removeAll();
                $scope.inputs.list.mode ='create';
                return;
            }
            var formData = new FormData();
            //BEGIN FILE UPLOAD========
            var file = $b('.lf-ng-md-file-input');
            var model_value = angular.element($b(file[0])).data('$ngModelController').$modelValue[0];
            if(bisnull(model_value) && ($scope.inputs.list.mode==='create')){
                Notification("Error, you must select file to upload","error");
                return;
            }
            if(!bisnull(model_value) && ( model_value.hasOwnProperty('lfFile') )){//if has file
                formData.append(
                    $b(file[0]).attr('lf-files'),
                    model_value.lfFile
                );
            }
            if($scope.inputs.list.hasOwnProperty('img_name_old')){
                formData.append( 'img_name_old', $scope.inputs.list.img_name_old );
            }
            formData.append( 'file_key', $b(file[0]).attr('lf-files') );
            formData.append( 'mode', $scope.inputs.list.mode );
            //END FILE UPLOAD****
            //BEGIN INPUT======
//            for(var key in $scope.inputs.list.values){
//                var value =  !bisnull($scope.inputs.list.values[key]) ? $scope.inputs.list.values[key] : '';
//                formData.append(key, value);
//            }
            var inputs = JSON.stringify($scope.inputs.list.values);
            formData.append('inputs', inputs );
            formData.append('widget_type', $scope.input_value.widget_type);
            formData.append('widget_id', $scope.input_value.widget_id);
            //END INPUT********
//            formData.append('create_record', true);
            formData.append('action', 'widget_save');//The wordpress ajax name
            self.functions.maskShow('widget-dialog');
            $b.ajax({
                'url': ajaxurl,
                'type':'POST', 'data':formData,
                'async': false, 'cache': false,
                'contentType': false, 'processData': false,
                'success':function(response){
                    var response_json = JSON.parse(response);
                    if(response_json.is_found){
//                        $scope.inputs.list.server_data.splice( 0, $scope.inputs.list.server_data.length );
                        
                        var server_data = JSON.parse(response_json.json_data);
                        $scope.inputs.list.server_data = server_data;
//                        angular.copy(server_data, $scope.inputs.list.server_data);
                        $scope.inputs.list.values = {};
                        $scope.inputs.list.mode = '';
                        $scope.inputs.list.api.removeAll();
                        
                        $b('#biq-sns-be-main [data-biq-widget-id="'+response_json.widget_id+'"]').replaceWith(response_json.html);
                        $timeout(function(){
                            $rootScope.BIQThemeManager.widgetHoverApply(response_json.widget_id);
                        });
                        Notification("Widget succesfully updated","success");
                    }else{
//                        var error_message = !bisnull(response_json.html) ? response_json.html : 'Empty response, seem widget functions not defined properly.';
                        Notification("Widget input failed: "+response_json.message, "error");
                    }
                    self.functions.maskHide('widget-dialog');
                },
                'error':function(response){
                    Notification("There is error with server","error");
                }
            });
        };
        $scope.inputs.list.update = function(img_name){
            $scope.inputs.list.mode = 'update';
            var inputs = {};
            for( var i=0; i<$scope.inputs.list.server_data.length;i++ ){
                if( $scope.inputs.list.server_data[i].img_name === img_name ){
                    angular.copy($scope.inputs.list.server_data[i].inputs, inputs);
                }
            }
            $scope.inputs.list.values = inputs;
            $scope.inputs.list.img_name_old = img_name;
            $scope.inputs.date = new Date().getTime();
        };
        $scope.inputs.list.delete = function(){
            var formData = new FormData();
            var delete_select = $scope.inputs.list.delete_select;//set at deleteConfirm() parameters
            var img_name = delete_select.img_name;
            var widget_id = delete_select.widget_id;
            var widget_type = delete_select.widget_type;
            var title =delete_select.title;
            
            formData.append('action', 'widget_save');//The wordpress ajax name
            formData.append('widget_type', widget_type);
            formData.append('mode', 'destroy');
            formData.append('img_name', img_name);
            formData.append('widget_id', widget_id);
            self.functions.maskShow('widget-dialog');
            $b.ajax({
                'url': ajaxurl,
                'type':'POST', 'data':formData,
                'async': false, 'cache': false,
                'contentType': false, 'processData': false,
                'success':function(response){
                    var response_json = JSON.parse(response);
                    if(response_json.is_found){
                        var server_data = JSON.parse(response_json.json_data);
                        $scope.inputs.list.server_data = server_data;
                        $b('body').find('[data-biq-widget-id="'+response_json.widget_id+'"]').replaceWith(response_json.html);
                        Notification("Success deleting slider: "+title,"success");
                        $mdSidenav('list-delete-confirm').close();
                    }else{
                        Notification("Error deleting slider: "+title, "error");
                    }
                    self.functions.maskHide('widget-dialog');
                },
                'error':function(response){
                    console.log(response);
                    Notification("There is error with server","error");
                    self.functions.maskHide('widget-dialog');
                }
            });
        };
        $scope.inputs.list.deleteConfirm = function(img_name, widget_id, widget_type, title){
            $scope.inputs.list.mode = '';
            $scope.inputs.list.delete_select = { img_name:img_name, widget_id: widget_id, widget_type: widget_type, title:title };
            $mdSidenav('list-delete-confirm').open();
        };
        if( $scope.input_value.hasOwnProperty('list') ){//IF input is 'list' type
            $scope.input_value.no_submit_callback = $scope.inputs.list.submit;
        }
        $scope.inputs.list.deleteCancel = function(){
            $mdSidenav('list-delete-confirm').close();
        };
        
        $scope.hide = function(p_success) {// for hiding outside scope, pass 'true' to avoid 'Notification()'
            p_success = typeof p_success !== 'undefined' ? p_success : false;
            self.hide(p_success);
            $mdDialog.hide();
        };
        $scope.submit = function(submit){
            if($scope.input_value.no_submit){
                if( typeof $scope.input_value.no_submit_callback === 'function' ){
                    $scope.input_value.no_submit_callback();
                }
                return;
            }
            var formData = new FormData($b('#widget-dialog form')[0]);

            for(var key in $scope.input_value){
                var value = !bisnull($scope.input_value[key]) ? $scope.input_value[key] : '';
                formData.append(key, value);
//                console.log(key+' '+$scope.input_value[key]);
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
                        $b('body').find('[data-biq-widget-id="'+response_json.widget_id+'"]').replaceWith(response_json.html);
                        $timeout(function(){
                            $rootScope.BIQThemeManager.widgetHoverApply(response_json.widget_id);
                        });
                        Notification("Widget succesfully updated","success");
                    }else{
                        self.functions.maskHide('widget-dialog');
                        var error_message = !bisnull(response_json.html) ? response_json.html : 'Empty response, seem widget functions not defined properly.';
                        Notification("Widget update failed: "+error_message, "error");
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
        if(!p_success) Notification( self.buttons.message.cancel.text, self.buttons.message.cancel.type);
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
