function BIQWidgetStructure(){
    
}
/*
 * 'key' is the main key of $atts at wordpress shortcode function. If 'key' = 'content, it is eman $content
 */
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
	{ 'key' : 'icon_value', 'type' : 'text', 'label' : 'URL Image / class', 'default': template_uri+'/images/biq/widgets/icon-contact-email-21x14.png'
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

/*
 *Created by: Bayu candra <bayucandra@gmail.com>
 *Creation Year: 2016
 *Description: Main theme manager for widget interface
*/

function BIQThemeManager(  ){
    var self = this;
    self.BIQWidgetElementParser = null;
    self.structure = new BIQWidgetStructure;
    self.structure_item = null; // will set at generateWidgetImputAll()
    self.dialog = null;
    self.init = function(){
	$b(document).ready(function(){
	    self.loading('body', 1500);
	    self.hoverToEdit();
	    window.onbeforeunload=function(){
		self.loading('body');
	    };
	});
    };
}
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
	set_overlay_sizes : function(){
	    var self2 = this;
	    var el_sel_position = self.hover_to_edit.widget_sel.offset();

	    $b('.hover-to-edit').css({left : el_sel_position.left+'px', top : el_sel_position.top+'px'});
	    $b('.hover-to-edit .highlight').css({
		width: self.hover_to_edit.widget_sel.outerWidth(),
		height: self.hover_to_edit.widget_sel.outerHeight()});
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
    self.widgetHoverApplyAll();
};
BIQThemeManager.prototype.widgetHoverApplyAll = function(){
    var self = this;
    $b('.biq-widgets').on('hover', function(e){
	if(e.type === 'mouseenter'){
//	    $b('.hover-to-edit').hide(0);//Hide first it was shown for other widget
//	    setTimeout( function(){
                    $b('.hover-to-edit .highlight').stop(true, true);
		    self.hover_to_edit.widget_sel = $b(this);
//		    self.BIQWidgetElementParser.contactEmailSimple(self.hover_to_edit.widget_sel);
		    self.hover_to_edit.set_overlay_sizes();
		    $b('.hover-to-edit').show(0, function(){
			$b('.hover-to-edit .highlight').show(200);
		    });
//		}, 100);
	}
    });
};
BIQThemeManager.prototype.widgetHoverApply = function(p_widget_id){
    var self = this;
    $b('.biq-widgets[data-biq-widget-id="'+p_widget_id+'"]').on('hover', function(e){
	if(e.type === 'mouseenter'){
            self.hover_to_edit.widget_sel = $b(this);
            self.hover_to_edit.set_overlay_sizes();
            $b('.hover-to-edit').show(0, function(){
                $b('.hover-to-edit .highlight').show(200);
            });
	}
    });
};


BIQThemeManager.prototype.initToggleButton = function( p_parent_selector ){
    $b(p_parent_selector+' btn-group[data-toggle-name]').each(function () {
    var group = $b(this);
    var form = group.parents('form').eq(0);
    var name = group.attr('data-toggle-name');
    var hidden = $b('input[name="' + name + '"]', form);
    $b('button', group).each(function () {
	var button = $b(this);
	button.live('click', function () {
	    hidden.val($b(this).val());
	    alert(hidden.val());
	});
	if (button.val() === hidden.val()) {
	    button.addClass('active');
	}
    });
    });
};

BIQThemeManager.prototype.editWidget = function(e){
    var self = this;
    self.hover_to_edit.is_editing = true;
    var widget_input = self.generateWidgetInputAll();
    self.dialog.biq_theme_manager = self;

    self.dialog.template = 
	'\
	    <md-dialog id="widget-dialog" aria-label="'+widget_input.title+'" class="bs-loading-container" \
		     bs-loading-overlay="widget-dialog" bs-loading-overlay-template-url="'+template_uri+'/backend/app/template/dialog/dialog-default.html" \
		     bs-loading-overlay-delay="2000" flex="{{dialog.flex}}" style="height:{{dialog.height}}" \
		ng-cloak> \
	    <form name="widget-form" class="biq-dialog"> \
		<md-toolbar class="bdialog-toolbar"> \
		  <div class="md-toolbar-tools"> \
		    <h2>'+widget_input.title+'</h2> \
		    <span flex></span> \
		    <md-button class="md-icon-button" ng-click="hide()"> \
		      <md-icon md-svg-src="'+template_uri+'/images/icon/dialog_close.svg" aria-label="Close dialog"></md-icon> \
		    </md-button> \
		  </div> \
		</md-toolbar> \
		<md-dialog-content layout="column" layout-padding> \
                    <input type="hidden" name="widget_type" ng-model="input_value.widget_type">\
                    <input type="hidden" name="widget_id" ng-model="input_value.widget_id">\
			<biq-tab tab-type="tab" header-height="40" style="margin:5px;" container-width="100%">\
		    '+
			widget_input.main + widget_input.css
		    +'  </biq-tab>\
		</md-dialog-content> \
		<md-dialog-actions layout="row"> \
		    <span flex></span> \
		    <md-button type="submit" ng-click="submit(true)" class="md-primary" md-autofocus>Submit</md-button> \
		    <md-button ng-click="hide()" style="margin-left:10px;">Cancel</md-button> \
		</md-dialog-actions> \
	    </form> \
	</md-dialog>';
//    var values = self.BIQWidgetElementParser.contactEmailSimple(self.hover_to_edit.widget_sel, self.structure_item);
    var values = self.BIQWidgetElementParser.getValues(
            self.hover_to_edit.widget_sel.data('biqWidgetType'), // the type of widget eg : contact_email_simple
            self.hover_to_edit.widget_sel, self.structure_item
        );
//    values["layout"] = self.getLayoutClass();//currently unused, used widget_id instead via BIQWidgetElementParser on each
    self.dialog.show(e, {values: values});
    
    self.hover_to_edit.onmouseleave();
};
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
BIQThemeManager.prototype.generateWidgetInputAll = function(){
    var self = this;
    var ret = {main : '-', css : '-', title: '-', layout: ''};//layout is for the main layout root ( "header", "body" or "footer" )
    //BEGIN CONVERT CLASS NAME TO STRUCTURE NAME Eg. contact-email-simple to contact_email_simpleXXXXXXXX change to using data-
    var widget_classes = self.hover_to_edit.widget_sel.attr('class');
    var widget_classes_split = widget_classes.split(' ');
    var widget_structure_name = self.hover_to_edit.widget_sel.data('biqWidgetType');//widget_classes_split[1].replace(/-/g, '_');
    //END CONVERT CLASS NAME TO STRUCTURE ===============
    self.structure_item = self.structure[widget_structure_name];
    
    var html_form_main = '';
    for(var i=0; i<self.structure_item.attribute_main.length; i++){
	var attribute_main = self.structure_item.attribute_main[i];
	switch( attribute_main.type ){
	    case "text":
		html_form_main = html_form_main + self.generateInputForm.text( attribute_main );
		break;
	    case "radio":
		html_form_main = html_form_main + self.generateInputForm.radio( attribute_main );
		break;
            case "file":
                html_form_main = html_form_main + self.generateInputForm.file( attribute_main );
                break;
	}
    }
    ret.main = '<biq-tab-item title="Main">'+html_form_main+'</biq-tab-item>';
    
    var html_form_css = '';
    for(var i=0; i<self.structure_item.attribute_css.length; i++){
	var attribute_css = self.structure_item.attribute_css[i];
	switch( attribute_css.type ){
	    case "text":
		html_form_css = html_form_css + self.generateInputForm.text( attribute_css );
		break;
	    case "radio":
		html_form_css = html_form_css + self.generateInputForm.radio( attribute_css );
		break;
	}
    }
    ret.css = '<biq-tab-item title="CSS">'+html_form_css+'</biq-tab-item>';
    
    ret.title = self.structure_item.title;
    ret.layout = self.getLayoutClass();
//    self.getStructureIdx();
    return ret;
};
BIQThemeManager.prototype.generateInputForm = {
    text : function( p_structure_item ){
	var is_required = ( p_structure_item.hasOwnProperty('required') && (p_structure_item.required) );
	var ngRequired = is_required ? ' ng-required="true"' : '';
	var input_attrs = p_structure_item.hasOwnProperty('input_attrs') ? p_structure_item.input_attrs : '';
	var placeholder = bisnull(p_structure_item.placeholder) ? '' : '( '+p_structure_item.placeholder+' )';
	var ret_html = 
		'<md-input-container class="md-block" flex> \
		    <label>'+p_structure_item.label+': '+placeholder+'</label> \
		    <input name="'+p_structure_item.key+'"'+ngRequired+' ng-model="input_value.'+p_structure_item.key+'" '+input_attrs+'> \
		    <div ng-if="'+is_required+'" ng-messages="widget-form.'+p_structure_item.key+'.$error"> \
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
    radio : function(p_structure_item){
	var ret_html=
		'<md-input-container class="md-block" flex>\
		    <md-radio-group ng-model="input_value.'+p_structure_item.key+'" layout="row">\n\
		    <span class="label1 w10">'+p_structure_item.label+'</span>';
	for(var i=0; i< p_structure_item.value.length; i++){
	    var label = p_structure_item.value[i].label; var value = p_structure_item.value[i].value;
	    ret_html = ret_html + '<md-radio-button value="'+value+'" class="md-primary">'+label+'</md-radio-button>';
	}
	var ret_html = ret_html + 
		    '</md-radio-group>\n\
		</md-input-container>';
	return ret_html;
    }
};

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

/*
 *Created by: Bayu candra <bayucandra@gmail.com>
 *Creation Year: 2016
*/
function BIQWidgetElementParser(){
    
}
/**
 * Main function to Get values based on widget name by call other functions 
 * 
 * @param {String} p_widget_type is based on widget type wich is belong to html attribute named data-biq-widget-type which need to convert to
 *      function name which is using camel case convention ( by using typeToFunction() function)
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
    var values={};
    var self = this;
    values["widget_id"] = p_el.data('biqWidgetId'); values["widget_type"] = p_el.data('biqWidgetType');
    values["content"] = p_el.children('.text').html();
     
    if( p_el.children('.icon').children('img').length ){
	values['icon_type'] = 'image';
	var image_src = p_el.children('.icon').children('img').attr('src');
	values["icon_value"] = image_src === self.getDefaultValue( p_structure_item, 'icon_value' )? '' : image_src ;
    }else{
	values['icon_type'] = 'css';
	values["icon_value"] = p_el.children('.icon').children('span').attr('class');
    }
    //BEGIN CSS PART===========
    values['css_inline'] = p_el.attr('style');
    values['classes'] = self.getClassNames( p_el.attr('class') );
    return values;
};
BIQWidgetElementParser.prototype.logo = function(p_el, p_structure_item){
    var values={};
    var self = this;
    values['widget_id'] = p_el.data('biqWidgetId'); values['widget_type'] = p_el.data('biqWidgetType');
    
    values['img_title'] = p_el.children('img').attr('title');
    values['img_alt'] = p_el.children('img').attr('alt');
    
    values['css_inline'] = p_el.attr('style');
    values['classes'] = self.getClassNames( p_el.attr('class') );
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
/**
 * Get class name which belong to attributes only, by remove first 2 classes which is default to be exist ( 'biq-widgets' and a class name of widget )
 * 
 * @param {String} p_class_names is the value of 'class' attribute at HTML element
 * @returns {String} contain class filtered ( 2 default class removed )
 */
BIQWidgetElementParser.prototype.getClassNames = function( p_class_names ){
    var ret = "";
    var class_names_arr = p_class_names.split(' ');
    class_names_arr.splice(0,2);
    for(var i=0; i<class_names_arr.length; i++){
	ret = ret+class_names_arr[i];
	if(i !== (class_names_arr.length-1) ){
	    ret = ret+' ';
	}
    }
    return ret;
};
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