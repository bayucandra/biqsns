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
