function BIQWidgetStructure(){

}
/*
 * 'key' is the main key of $atts at wordpress shortcode function. If 'key' = 'content, it is eman $content
 */
BIQWidgetStructureDefaults = {
    'attribute_css' :[
	{ 'key' : 'css_inline', 'type' : 'text', 'label' : 'Inline CSS'},
	{ 'key' : 'classes', 'type' : 'text', 'label' : 'CSS Classes', 'placeholder' : 'Sparate by space for multiple class name' }
    ]
};
BIQWidgetStructure.prototype.contact_email_simple = {
    'title' : 'Setting - Contact Email Simple',
    'attribute_main' : [
	{ 'key' : 'content', 'type' : 'text', 'label' : 'Email Address', 'required':true, 'input_attrs':'type="email"' },
	{ 'key' : 'icon_type', 'type' : 'radio', 'label' : 'Icon type', 
	    'value' : [
		{ 'label': 'Image', 'value': 'image'},
		{ 'label': 'Class', 'value': 'class'}
	    ] 
	},
	{ 'key' : 'icon_value', 'type' : 'text', 'label' : 'URL Image / class',
            'default': template_uri+'/images/biq/widgets/contact-email-simple/icon-contact-email-21x14.png'
	    , 'placeholder' :'Leave empty for default value' }
    ],
    'attribute_css' :[
	{ 'key' : 'css_inline', 'type' : 'text', 'label' : 'Inline CSS'},
	{ 'key' : 'classes', 'type' : 'text', 'label' : 'CSS Classes', 'placeholder' : 'Sparate by space for multiple class name' }
    ]
};
BIQWidgetStructure.prototype.contact_phone_simple = {
    'attribute_main' : [
	
    ]
};

BIQWidgetStructure.prototype.logo = {
    'title' : 'Setting - Logo',
    'attribute_main':[
        { 'key': 'img_file_name', 'type':'file', 'label':'Browse' },
        { 'key' : 'img_title', 'type':'text', 'label':'Image Title' },
        { 'key' : 'img_alt', 'type':'text', 'label':'Alternative text' }
    ],
    'attribute_css' :[
	{ 'key' : 'css_inline', 'type' : 'text', 'label' : 'Inline CSS'},
	{ 'key' : 'classes', 'type' : 'text', 'label' : 'CSS Classes', 'placeholder' : 'Sparate by space for multiple class name' }
    ]
};

BIQWidgetStructure.prototype.menu_main = {
    'title' : 'Setting Main Menu',
    'attribute_main':[
        { 'key': 'float', 'type' : 'radio', 'label' : 'Float', 
	    'value' : [
		{ 'label': 'Right', 'value': 'right'},
		{ 'label': 'Left', 'value': 'left'}
	    ]
        }
    ],
    'attribute_css' :[
	{ 'key' : 'css_inline', 'type' : 'text', 'label' : 'Inline CSS'},
	{ 'key' : 'classes', 'type' : 'text', 'label' : 'CSS Classes', 'placeholder' : 'Sparate by space for multiple class name' }
    ]
};
BIQWidgetStructure.prototype.heading_section_left = {
    'title' : 'Setting - Heading section left',
    'attribute_main' :[
        {'key':'content', 'type':'text', 'label': 'Header Text', 'required':true},
        {'key':'tag_name', 'type':'radio', 'label':'Tag name',
            'value': [
                { 'label': 'H4','value':'h4' },
                { 'label': 'H3','value':'h3' },
                { 'label': 'H2','value':'h2' },
                { 'label': 'H1','value':'h1' }
            ]
        },
        {'key':'highlight', 'type':'radio', 'label':'Highlight',
            'value': [
                { 'label':'<font style="color:#113481">Default</font>', 'value':'highlight-default' },
                { 'label':'<font style="color:#df1f26">Red</font>', 'value':'highlight-red' },
                { 'label':'None', 'value':'none' }
            ]
        }
    ],
    'attribute_css' : BIQWidgetStructureDefaults.attribute_css
};
BIQWidgetStructure.prototype.category_list = {
    'title' : 'Setting - Category list',
    'attribute_main' :[
        { 'key':'taxonomy', 'type':'text', 'label':'Taxonomy', 'default':'product_cat' },
        { 'key':'orderby', 'type':'radio', 'label':'Order By',
            'value':[
                { 'label': 'name', 'value':'name' }, { 'label':'description', 'value':'description' }, {'label':'slug', 'value':'slug'}
            ]
        },
        { 'key':'order', 'type':'radio', 'label':'Order',
            'value':[
                {'label':'ASC', 'value':'ASC'}, {'label':'DESC', 'value':'DESC'}
            ]
        },
        { 'key':'hide_empty', 'type':'radio', 'label':'hide_empty',
            'value':[
                {'label':'true', 'value':'1'}, {'label':'false', 'value':'0'}
            ]
        },
        { 'key':'hierarchical', 'type':'radio', 'label':'hierarchical',
            'value':[
                {'label':'true', 'value':'1'}, {'label':'false', 'value':'0'}
            ]
        }
    ],
    'attribute_css' : BIQWidgetStructureDefaults.attribute_css
};
BIQWidgetStructure.prototype.slider = {
    'title' : 'Setting - Slider',
    'attribute_main':[
        { 'key':'slider', type:'list', 'label':'Upload Slider',
            'inputs':[
                { 'key':'title', type:'text', 'label':'Title' },
                { 'key':'caption', type:'text', 'label':'Caption' },
                { 'key':'url', type:'text', 'label':'URL' }
            ],
            'inputs_disp':[
                {'key':'title', 'tag':'h6'},{'key':'caption','tag':'div'}
            ]
        }
    ],
    'attribute_css' : BIQWidgetStructureDefaults.attribute_css
};
BIQWidgetStructure.prototype.footer_short_description = {
    'title' : 'Setting - Footer short description',
    'attribute_main':[
        { 'key':'title', 'type':'text', 'label':'Title' },
        { 'key':'description_source', 'type':'radio', 'label' :'Description source',
            'value':[
                {'label':'Custom', 'value':'custom'}, {'label':'Equal Home Meta', 'value':'equal_to_meta'}
            ]
        },
        { 'key':'description', 'type':'text', 'label':'Description', 'input_wrapper_attrs':'ng-show="input_value.description_source===\'custom\'"' }
    ],
    'attribute_css' : BIQWidgetStructureDefaults.attribute_css
};

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

/**
 * @file biq-theme-manager.js
 * @brief Main theme manager for widget interface
 * 
 * This is the main Class which controll the widget interaction trough angular main module. Will instantiated as angular service. Depend on:
 * - BIQThemeDialog => linked to variable member self.dialog
 * - BIQWidgetElementParser => linked to variable member self.BIQWidgetElementParser
 * <br>Both of them linked as a member / properties, since will result as circular reference if directly put as argument at angular 'factory' declaration.
 * 
 * @author Bayu candra <bayucandra@gmail.com>
*/

function BIQThemeManager( Notification, $q, BIQThemeDialog, BIQWidgetElementParser ){
    var self = this;
    self.Notification = Notification;
    self.$q = $q;
    self.BIQWidgetElementParser = BIQWidgetElementParser;
    self.structure = new BIQWidgetStructure;
    self.structure_item = null; // will set at generateWidgetImputAll()
    self.dialog = BIQThemeDialog; /// <i>self.dialog</i> variable will be referenced to md-dialog to show. Set this class by pointer to those md-dialog.
}

/**
 * @brief initializing the main Object/Class
 * 
 * Run main hover mask functions and set body events
 */
BIQThemeManager.prototype.init = function(){
    var self = this;
    $b(document).ready(function(){
        self.loading('body', 1500);
        self.hoverToEdit();
        window.onbeforeunload=function(){
            self.loading('body');
        };
    });
};

/**
 * @brief generate overlay mask over widget
 * 
 * Will be initialy called by init() function to generate overlay element above widget which will need to edit. 
 */
BIQThemeManager.prototype.hoverToEdit= function(){
    var self = this;
    self.hover_to_edit = {
	widget_sel : null,//Will be assigned with jQuery(this) on widget hover event => hoverToEdit()
	hide_delay : 500,
	is_editing : false,//If true, prevent auto hide
	hide_timeout_obj : null,// To handle setTimeout on mouseleave and must cancel by clearTimeout when enter again before delay reached
	hide: function(p_delay){
	    p_delay = typeof p_delay !== 'undefined' ? p_delay : 100;
	    $b('.hover-to-edit .highlight').hide(p_delay, function(){
		$b('.hover-to-edit').hide(0);
	    });
	},
	auto_hide: function(){
	    var self2 = this;
//	    if(!self2.is_editing){
		self2.hide();
//	    }
	},
	onmouseleave: function(){
	    var self2 = this;
	    self2.hide_timeout_obj = setTimeout( function(){ self2.auto_hide();}, self2.hide_delay );
	},
	set_overlay_sizes : function(p_callback){
//	    var self2 = this;
	    var el_sel_position = self.hover_to_edit.widget_sel.offset();

	    $b('.hover-to-edit').css({left : el_sel_position.left+'px', top : el_sel_position.top+'px'});
	    $b('.hover-to-edit .highlight').css({
		width: self.hover_to_edit.widget_sel.outerWidth(),
		height: self.hover_to_edit.widget_sel.outerHeight()
            });
            if(typeof p_callback === 'function'){
                p_callback();
            }
	}
    };
    
   var hover_to_edit_html =
	   '<div class="hover-to-edit"> \n\
		<div class="highlight" title="Double click here to edit"></div>\n\
		<div class="footer"><div class="button edit">Edit</div></div>\n\
	    </div>';
    $b('body').append(hover_to_edit_html);
    $b('.hover-to-edit .highlight').on('dblclick', function(e){
	self.editWidget(e);
    });
    $b('.hover-to-edit .footer .button').on('click', function(e){
	self.editWidget(e);
    });
    $b('.hover-to-edit').on('hover', function(e){
	if(e.type === 'mouseenter'){
	    self.hover_to_edit.is_editing = false;//temporary unused variable handler
	    clearTimeout(self.hover_to_edit.hide_timeout_obj);
	}else if(e.type === 'mouseleave'){
	    self.hover_to_edit.onmouseleave();
	}
    });
    self.widgetHoverApply();
};
/**
 * @brief apply hover mask to widget based whether "individually" per element or "all in once" to all elements
 * 
 * The "individual" procedure necessary to apply the hover overlay mask only to individual widget after creation.
 * Usually called by biq-theme-dialog.js when submit widget is finished and success
 * <br><br>The "all in once" procedure will executed on the first time whole page loaded
 * @param {String} p_widget_id the ID of widget which usually got from AJAX response generated by PHP/Wordpress server,
 *  if omitted / undefined then it is mean for "all in once procedure"
 */
BIQThemeManager.prototype.widgetHoverApply = function(p_widget_id){
    var self = this;
    var selector = typeof p_widget_id!=='undefined' ?
            '.biq-widgets[data-biq-widget-id="'+p_widget_id+'"]'//Only match to specific data-biq-widget-id
            :'.biq-widgets'; //All widget
    $b(selector).on('hover', function(e){
	if(e.type === 'mouseenter'){
            clearTimeout( self.hover_to_edit.hide_timeout_obj );
            $b('.hover-to-edit .highlight').stop(false, true);//stop previous animation: $b('.hover-to-edit .highlight').show(200);
            self.hover_to_edit.widget_sel = null;
            self.hover_to_edit.widget_sel = $b(this);
            self.hover_to_edit.set_overlay_sizes(
                function(){
                    $b('.hover-to-edit').show(0, function(){
                        $b('.hover-to-edit .highlight').show(200);
                    });
                }
            );
	}
    });
};
/**
 * @brief executed on "edit" button click or mask overlay doubleclick
 * 
 * 1.generate template for md-dialog interface and input content <br>
 * 2.show the md-dialog <br>
 * 3.hide the overlay mask interface <br>
 * 
 * @param {Object} e DOM emitted on the event click button and doubleclick overlay mask
 */
BIQThemeManager.prototype.editWidget = function(e){
    var self = this;
    
    self.hover_to_edit.is_editing = true;
    var widget_input = self.generateWidgetInputAll();
    self.dialog.biq_theme_manager = self;

    self.dialog.template = 
	'\
	    <md-dialog id="widget-dialog" aria-label="'+widget_input.title+'" class="bs-loading-container" \
		     bs-loading-overlay="widget-dialog" bs-loading-overlay-template-url="'+template_uri+'/backend/app/template/dialog/dialog-default.html" \
		     bs-loading-overlay-delay="1000" flex="{{dialog.flex}}" style="height:{{dialog.height}}" \
		ng-cloak> \
	    <form name="widgetForm" class="biq-dialog"> \
		<md-toolbar class="bdialog-toolbar"> \
		  <div class="md-toolbar-tools"> \
		    <h2>'+widget_input.title+'</h2> \
		    <span flex></span> \
		    <md-button class="md-icon-button" ng-click="hide()"> \
		      <md-icon md-svg-src="'+template_uri+'/images/icon/dialog_close.svg" aria-label="Close dialog"></md-icon> \
		    </md-button> \
		  </div> \
		</md-toolbar> \
		<md-dialog-content layout="column" layout-padding ng-if="widget_not_ready==null"> \
                    <input type="hidden" name="widget_type" ng-model="input_value.widget_type">\
                    <input type="hidden" name="widget_id" ng-model="input_value.widget_id">\
			<biq-tab tab-type="tab" header-height="40" style="margin:5px;" container-width="100%">\
		    '+
			widget_input.main + widget_input.css
		    +'  </biq-tab>\
		</md-dialog-content> \
		<md-dialog-actions layout="row" ng-if="widget_not_ready==null"> \
		    <span flex></span> \
		    <md-button type="submit" ng-hide="input_value.no_submit" ng-click="submit(true)" class="md-primary" md-autofocus>Submit</md-button> \
		    <md-button ng-click="hide()" style="margin-left:10px;">{{buttons.text.cancel}}</md-button> \
		</md-dialog-actions> \
                    \
                <md-dialog-content ng-if="widget_not_ready!=null" layout-padding>\
                    <h4 style="color:red;">Widget not ready for setting:</h4> \
                    <h3>{{widget_not_ready.message}}</h3>\
                </md-dialog-content>\
	    </form> \
	</md-dialog>';
    var values = self.BIQWidgetElementParser.getValues(
            self.hover_to_edit.widget_sel.data('biqWidgetType'), // the type of widget eg : contact_email_simple
            self.hover_to_edit.widget_sel, self.structure_item
        );
    self.$q.when(values).then(//whether promise or not
        function(data){//the promise data or just data
            var widget_not_ready = null;
            var widget_not_ready_el = self.hover_to_edit.widget_sel.children('.widget-not-ready');
            if( widget_not_ready_el.length ){
                widget_not_ready = {message: widget_not_ready_el.html()};
            }
        //    values["layout"] = self.getLayoutClass();//currently unused, used widget_id instead via BIQWidgetElementParser on each
            self.dialog.show(e, {values: data, structure: self.structure_item, widget_not_ready:widget_not_ready});

            self.hover_to_edit.onmouseleave();
        });
};
/**
 * @brief Generate input markup element for md-dialog interface
 * 
 * Produce {Object} data type, has 2 main properties. One is 'main' for the main widget input, the other is 'css' for inline and classes option.
 * @returns {Object} ret return object for input at md-dialog : <br>
 * - main : for main widget setting input
 * - css : for css input, usually 'inline' and 'classes'
 * - title: for using as md-dialog title
 * - layout: currently unused
 */
BIQThemeManager.prototype.generateWidgetInputAll = function(input_model){
    var self = this;
    var ret = {main : '-', css : '-', title: '-', layout: ''};//layout is for the main layout root ( "header", "body" or "footer" )
    //BEGIN CONVERT CLASS NAME TO STRUCTURE NAME Eg. contact-email-simple to contact_email_simpleXXXXXXXX change to using data-
//    var widget_classes = self.hover_to_edit.widget_sel.attr('class');
//    var widget_classes_split = widget_classes.split(' ');
    var widget_structure_name = self.hover_to_edit.widget_sel.data('biqWidgetType');//widget_classes_split[1].replace(/-/g, '_');
    //END CONVERT CLASS NAME TO STRUCTURE ===============
    self.structure_item = self.structure[widget_structure_name];
    
    var html_form_main = self.formMainConstruct();
    ret.main = '<biq-tab-item title="Main">'+html_form_main+'</biq-tab-item>';
    
    input_model = typeof input_model !== 'undefined' ? input_model : 'input_value.';
    
    var html_form_css = '';
    for(var i=0; i<self.structure_item.attribute_css.length; i++){
	var attribute_css = self.structure_item.attribute_css[i];
	switch( attribute_css.type ){
	    case "text":
		html_form_css = html_form_css + self.generateInputForm.text( attribute_css, input_model );
		break;
	    case "radio":
		html_form_css = html_form_css + self.generateInputForm.radio( attribute_css, input_model );
		break;
	}
    }
    ret.css = '<biq-tab-item title="CSS">'+html_form_css+'</biq-tab-item>';
    
    ret.title = self.structure_item.title;
//    ret.layout = self.getLayoutClass(); //currently unused
//    self.getStructureIdx();
    return ret;
};
/**
 * @brief Convert all structure data records to HTML input form based on functions inside generateInputForm
 * @params {Object} attribute_main by default using selected widget structure data, but it can be overide with other structure data
 * @returns {String} string in HTML format of input form
 */
BIQThemeManager.prototype.formMainConstruct = function( attribute_main, input_model ){
    var self = this;
    var html_form_main = '';
    input_model = typeof input_model !== 'undefined' ? input_model : 'input_value.';
    attribute_main = typeof attribute_main !== 'undefined' ? attribute_main : self.structure_item.attribute_main;
    for(var i=0; i<attribute_main.length; i++){
	var attribute_main_item = attribute_main[i];
	switch( attribute_main_item.type ){
	    case "text":
		html_form_main = html_form_main + self.generateInputForm.text( attribute_main_item,input_model );
		break;
	    case "radio":
		html_form_main = html_form_main + self.generateInputForm.radio( attribute_main_item,input_model );
		break;
            case "file":
                html_form_main = html_form_main + self.generateInputForm.file( attribute_main_item );
                break;
            case "list":
                html_form_main = html_form_main + self.generateInputForm.list( attribute_main_item,input_model );
                break;
	}
    }
    return html_form_main;
};
/**
 * @brief Generate input form per element to call in generateWidgetInputAll()
 * 
 * The element produced in angular material style. Will call inside loop check each element of 'main' and 'css' tab.
 */
BIQThemeManager.prototype.generateInputForm = {
    text : function( p_structure_item, input_model ){
	var is_required = ( p_structure_item.hasOwnProperty('required') && (p_structure_item.required) );
	var ngRequired = is_required ? ' ng-required="true"' : '';
        var input_wrapper_attrs = p_structure_item.hasOwnProperty( 'input_wrapper_attrs' ) ?
                ' '+p_structure_item.input_wrapper_attrs
                : '';
	var input_attrs = p_structure_item.hasOwnProperty('input_attrs') ? ' '+p_structure_item.input_attrs : '';
	var placeholder = bisnull(p_structure_item.placeholder) ? '' : '( '+p_structure_item.placeholder+' )';
	var ret_html = 
		'<md-input-container class="md-block" flex'+input_wrapper_attrs+'>'
		    +'<label>'+p_structure_item.label+': '+placeholder+'</label> \
		    <input name="'+p_structure_item.key+'"'+ngRequired+'+ ng-model="'+input_model+p_structure_item.key+'"'+input_attrs+'> \
		    <div ng-if="'+is_required+'" ng-messages="widgetForm.'+p_structure_item.key+'.$error"> \
			<div ng-message="required" style="text-align:right;">'+p_structure_item.label+' is required.</div> \
		    </div> \
		</md-input-container>';
	
	return ret_html;
    },
    file : function( p_structure_item ){
        var ret_html =
                '<lf-ng-md-file-input lf-files="'+p_structure_item.key+'" lf-browse-label="'+p_structure_item.label+'" \
                         accept="image/*" ng-disabled="ctrl.disabled01"> \
                    </lf-ng-md-file-input>';
        return ret_html;
    },
    radio : function(p_structure_item, input_model){
	var ret_html=
		'<md-input-container class="md-block" flex>\
		    <md-radio-group ng-model="'+input_model+p_structure_item.key+'" layout="row">\n\
		    <span class="label1 w10">'+p_structure_item.label+'</span>';
	for(var i=0; i< p_structure_item.value.length; i++){
	    var label = p_structure_item.value[i].label; var value = p_structure_item.value[i].value;
	    ret_html = ret_html + '<md-radio-button value="'+value+'" class="md-primary">'+label+'</md-radio-button>';
	}
	var ret_html = ret_html + 
		    '</md-radio-group>\n\
		</md-input-container>';
	return ret_html;
    },
    list: function(p_structure_item){
        var ret_html=
                '<input type="hidden" name="mode" ng-model="inputs.list.mode"/>'
                +'<md-content ng-show="inputs.list.mode!==\'\'" class="animate-show">'
                    +'<lf-ng-md-file-input ng-disable="inputs.list.mode===\'update\'" lf-files="'+p_structure_item.key+'" lf-api="inputs.list.api" lf-browse-label="'+p_structure_item.label+'" \
                             accept="image/*" ng-disabled="ctrl.disabled01"> \
                    </lf-ng-md-file-input>'
                    +BIQThemeManager.prototype.formMainConstruct(p_structure_item.inputs, 'inputs.list.values.')
                +'</md-content>'
                +'<div layout="row">'
                    +'<md-button class="md-primary md-raised" ng-click="inputs.list.submit()">\n\
                            {{(inputs.list.mode==\'\')?\'Add\': (inputs.list.mode===\'create\' ? \'Submit\' : \'Update\' ) }}\n\
                        </md-button>'
                    +'<md-button ng-show="inputs.list.mode!=\'\'" class="md-warn md-raised" ng-click="inputs.list.mode=\'\'">\n\
                            Cancel\n\
                        </md-button>'
                +'</div>'
                +'<br>'
                +'<md-list layout-padding>'
                    +'<md-list-item ng-repeat="record in inputs.list.server_data track by record.img_name">'
                        +'<div style="height:80px;overflow:hidden;" layout="row" layout-align="center center"><img ng-cloack src="{{record.uri_base}}/thumb_{{record.img_name}}?token={{inputs.date}}"/></div>'
                        +'<div style="height:80px;overflow:hidden;font-size:1.1rem;" layout="row" layout-padding layout-align="start center" class="flex">'
                            +'<span>{{record.inputs.title!==\'\' ? record.inputs.title : record.img_name }}</span>'
                        +'</div>'
                        +'<div layout="column">'
                            +'<md-button class="md-primary" style="margin:0;" ng-click="inputs.list.update(record.img_name)">edit</md-button>'
                            +'<md-button class="md-warn" style="margin:0;" ng-click="inputs.list.deleteConfirm(record.img_name, input_value.widget_id, input_value.widget_type, record.inputs.title)">delete</md-button>'
                        +'</div>'
                        +'<md-divider ng-if="!$last"></md-divider>'
                    +'</md-list-item>'
                +'</md-list>'
                +'<md-sidenav class="md-sidenav-left md-whiteframe-4dp" md-component-id="list-delete-confirm" flex style="max-width:100%; width:100%;">'
                    +'<h3 style="text-align:center;"><font style="color:#999999">Confirm to delete :</font> {{inputs.list.delete_select.title}} ?</h3>\n\
                        <div layout="column" layout-align="center center">\n\
                                <md-button class="md-warn md-raised" ng-click="inputs.list.delete()">\n\
                                    Yes\n\
                                </md-button>\n\
                                <md-button class="md-raised" ng-click="inputs.list.deleteCancel()">\n\
                                    No\n\
                                </md-button>\n\
                        </div>'
                +'</md-sidenav>';
        return ret_html;
    }
};
/**
 * @brief display loading inside an element.
 * @param {String} p_selector jQuery format selector where the loading will be displayed
 * @param {Integer} p_timeout Delay timeout for the loading to be displayed ( in millisecond )
 */
BIQThemeManager.prototype.loading = function(p_selector, p_timeout){// #id or .class
    var loading_html = '<div id="biq-loading">\n\
	<div class="image">\n\
	    <img src="'+template_uri+'/images/biq/biq-logo.png"\n\
	    <br /><h3>Loading...</h3>\n\
	</div>\n\
    </div>';
    $b(p_selector).append(loading_html);
    if(typeof p_timeout !== 'undefined'){
	setTimeout(function(){
	    $b('#biq-loading').hide(200);
	},p_timeout);
    }
};
/**
 * Currently unused, basicly it will get to which layout belong: "header", "body" or "footer"
 */
BIQThemeManager.prototype.getLayoutClass = function(){
    var self = this;
    var ret = '';//return class name of main layout wrapper
    
    var layout_class_arr = ["header", "body", "footer"];
    
    var layout_el = self.hover_to_edit.widget_sel.closest('.layout');
    for(var i=0; i<layout_class_arr.length; i++){
	if( layout_el.hasClass( layout_class_arr[i] ) ) ret = layout_class_arr[i];
    }
    return ret;
};

/** @file biq-widget-element-parser.js
 * @brief Parsing HTML DOM element to get the structure data of widget
 *
 *@author Bayu candra <bayucandra@gmail.com>
 *Creation Year: 2016
*/
function BIQWidgetElementParser($http, $q, Notification){
    var self = this;
    self.$http = $http;
    self.$q = $q;
    self.Notification = Notification;
}
/**
 * Main function to Get values based on widget name by call other functions 
 * 
 * @param {String} p_widget_type is based on widget type wich is belong to html attribute named data-biq-widget-type which need to convert to function name which is using camel case convention ( by using typeToFunction() function)
 * @param {Object} p_widget_sel HTML element got from jQuery function $('#id'). It is selected widget by click 'Edit' after hovering
 * @param {Object} p_structure_sel Selected structure by matching p_widget_sel and defined at biq-widget-structure.js.
 * @returns {Object} generated by function called with self[p_widget_type] which give reference to a function
 */
BIQWidgetElementParser.prototype.getValues = function(p_widget_type, p_widget_sel, p_structure_sel){
    var values = {};
    var self = this;
    var widget_function = self.typeToFunction(p_widget_type);
    values= self[widget_function](p_widget_sel, p_structure_sel);
    return values;
};
/* 
 * 1. Expect JQuery element as parameter i.e: $(element)
 * 2. return var values = { main:{ key: value}, css: {} };
 */
BIQWidgetElementParser.prototype.contactEmailSimple = function( p_el, p_structure_item ){
//    '<a href="mailto:'.$content.'" class="biq-widgets contact-email-simple"'. $css_inline .'>'
//			.'<div class="icon"><img src="'.$icon_value.'"></div>' 
//			.'<div class="text">'. $content .'</div>' 
//		    .'</a>'
    var self = this;
    var values = self.defaultFormValues(p_el);
    
    values["content"] = p_el.children('.text').html();
     
    if( p_el.children('.icon').children('img').length ){
	values['icon_type'] = 'image';
	var image_src = p_el.children('.icon').children('img').attr('src');
	values["icon_value"] = image_src === self.getDefaultValue( p_structure_item, 'icon_value' )? '' : image_src ;
    }else{
	values['icon_type'] = 'css';
	values["icon_value"] = p_el.children('.icon').children('span').attr('class');
    }
    
    return values;
};
BIQWidgetElementParser.prototype.logo = function(p_el, p_structure_item){
    var self = this;
    var values = self.defaultFormValues(p_el);
    
    values['img_title'] = p_el.children('img').attr('title');
    values['img_alt'] = p_el.children('img').attr('alt');
    
    return values;
};
BIQWidgetElementParser.prototype.menuMain = function(p_el, p_structure_item){
    var self = this;
    var values = self.defaultFormValues(p_el);

    values['float'] = p_el.hasClass('right') ? 'right' : 'left';
    
    return values;
};
BIQWidgetElementParser.prototype.headingSectionLeft = function(p_el, p_structure_item){
    var self = this;
    var values = self.defaultFormValues(p_el);
    values["content"] = p_el.html();
    values["tag_name"] = p_el.prop("tagName").toLowerCase();
    if(p_el.hasClass('highlight-default')){
        values['highlight'] = 'highlight-default';
    }else if( p_el.hasClass('highlight-red') ){
        values['highlight'] = 'highlight-red';
    }else{
        values['highlight'] = 'none';
    }
    return values;
};
BIQWidgetElementParser.prototype.categoryList = function(p_el, p_structure_item){
    var self = this;
    var values = self.defaultFormValues(p_el);
    values['taxonomy'] = p_el.data('taxonomy');
    values['orderby'] = p_el.data('orderby');
    values['order'] = p_el.data('order');
    values['hide_empty'] = p_el.data('hideEmpty');
    values['hierarchical'] = p_el.data('hierarchical');
    return values;
};
BIQWidgetElementParser.prototype.slider = function(p_el, p_structure_item){
    var self = this;
    var deferred = self.$q.defer();
    var values = self.defaultFormValues(p_el);
    
    values["no_submit"] = true;
    values["main_attribute"] = p_structure_item.attribute_main[0];
    
    $b.ajax({
        method:'POST', url:ajaxurl,
        data:{ action:'widget_query', query_type:'slider', widget_id:values.widget_id },
        'success':function(response){//ajaxurl is default by Wordpress
            var response_json = JSON.parse(response);
            values['list'] = response_json.list;
            deferred.resolve(values);
        },
        'error':function(xhr){
            self.Notification('Error server. Status: '+xhr.status,'error');
            deferred.reject(values);
        }
    });

    return deferred.promise;
};
BIQWidgetElementParser.prototype.footerShortDescription = function(p_el, p_structure_item){
    var self = this;
    var values = self.defaultFormValues(p_el);
    values["description_source"] = p_el.data('descriptionSource');
    values["title"] = p_el.children('.title').html();
    return values;
};
/**
 * Important to get default value of 'key'. Usually necessary when default input can be empty to load based on default value.
 * 
 * @param [Object] p_structure_item structure of widget as defined on file biq-widget-structure.js
 * @param {String} p_key key of input / value type
 * @returns {String} the default value
 */
BIQWidgetElementParser.prototype.getDefaultValue = function(p_structure_item, p_key){
    var ret = '';
    for( var i=0; i<p_structure_item.attribute_main.length; i++){
	if(p_structure_item.attribute_main[i].key === p_key){
	    ret = p_structure_item.attribute_main[i].default;
	}
    }
    for( var i=0; i<p_structure_item.attribute_css.length; i++){
	if(p_structure_item.attribute_css[i].key === p_key){
	    ret = p_structure_item.attribute_css[i].default;
	}
    }
    return ret;
};

BIQWidgetElementParser.prototype.defaultFormValues = function(p_el){
    var self = this;
    var default_values={"widget_id": p_el.data('biqWidgetId'), "widget_type": p_el.data('biqWidgetType'), "css_inline": p_el.attr('style'),
        "classes":self.getClassNames( p_el )};
    return default_values;
};
/**
 * Get class name which belong to attributes only, by remove first 2 classes which is default to be exist ( 'biq-widgets' and a class name of widget )
 * 
 * @param {String} p_class_names is the value of 'class' attribute at HTML element
 * @returns {String} contain class filtered ( 2 default class removed )
 */
BIQWidgetElementParser.prototype.getClassNames = function( p_el ){
    var css_default_arr = typeof p_el.data('biqCssDefault') !=='undefined'?
            $b.trim( p_el.data('biqCssDefault') ).split(' ')
            :[];
    css_default_arr.push('biq-widgets');
    css_default_arr.push('biq-container');
    var css_all_arr = $b.trim( p_el.attr('class') ).split(' ');
    
    return css_all_arr.diff( css_default_arr ).join(' ');
};
//BIQWidgetElementParser.prototype.getClassNames = function( p_class_names ){
//    var ret = "";
//    var class_names_arr = p_class_names.split(' ');
//    class_names_arr.splice(0,2);
//    for(var i=0; i<class_names_arr.length; i++){
//	ret = ret+class_names_arr[i];
//	if(i !== (class_names_arr.length-1) ){
//	    ret = ret+' ';
//	}
//    }
//    return ret;
//};
/*
 * @param {String) p_str is the type name of widget based on convention usualy generated for data-biq-widget-type html attribute
 * @returns {String} Return the string name of function converted from data-biq-widget-type. By converting from underscore separator to camelCase
 */
BIQWidgetElementParser.prototype.typeToFunction = function(p_str){
    var ret = '';
    var type_arr = p_str.split('_');
    for(var i=0; i<type_arr.length; i++){
        var type_component = type_arr[i];
        if(i!==0) type_component = type_component.ucfirst();
        ret = ret + type_component;
    }
    return ret;
};

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