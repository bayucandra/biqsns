var $b = jQuery.noConflict();
function BIQThemeManagement(){
    var self = this;
    self.structure = new BIQWidgetStructure;
    self.init = function(p_wrapper_selector){
	$b(document).ready(function(){
	    $b.mobile.linkBindingEnabled = false;
	    $b('#wpcontent').css({marginTop: 30});
	    self.loading('body');
	    self.jQueryMobileInit();
	    self.hoverToEdit();
	});
    };
}
BIQThemeManagement.prototype.body_wrapper = '#biq-sns-be-main';
BIQThemeManagement.prototype.hoverToEdit= function(){
    var self = this;
    self.hover_to_edit = {
	widget_sel : null,//Will be assigned with jQuery(this) on widget hover event => hoverToEdit()
	hide_delay : 700,
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
	    if(!self2.is_editing){
		self2.hide();
	    }
	},
	onmouseleave: function(){
	    var self2 = this;
	    self2.hide_timeout_obj = setTimeout( function(){ self2.auto_hide();}, self2.hide_delay );
	},
	set_overlay_sizes : function(){
	    var self2 = this;
	    var el_sel_position = self.hover_to_edit.widget_sel.offset();

	    $b('.hover-to-edit').css({left : el_sel_position.left, top : el_sel_position.top});
	    $b('.hover-to-edit .highlight').css({
		width: self.hover_to_edit.widget_sel.outerWidth(),
		height: self.hover_to_edit.widget_sel.outerHeight()});
	}
    };
    
   var hover_to_edit_html =
	   '<div class="hover-to-edit"> \n\
		<div class="highlight"></div>\n\
		<div class="footer"><div class="button edit">Edit</div></div>\n\
	    </div>';
    $b('body').append(hover_to_edit_html);
    $b('.hover-to-edit .footer .button').on('click', function(e){
	self.editWidget(e);
    });
    $b('.biq-widgets').on('hover', function(e){
	if(e.type === 'mouseenter'){
//	    $b('.hover-to-edit').hide(0);//Hide first it was shown for other widget
//	    setTimeout( function(){
		    self.hover_to_edit.widget_sel = $b(this);
		    self.hover_to_edit.set_overlay_sizes();
		    $b('.hover-to-edit').show(0, function(){
			$b('.hover-to-edit .highlight').show(200);
		    });
//		}, 100);
	}
    });
    $b('.hover-to-edit').on('hover', function(e){
	if(e.type === 'mouseenter'){
	    self.hover_to_edit.is_editing = false;
	    clearTimeout(self.hover_to_edit.hide_timeout_obj);
	}else if(e.type === 'mouseleave'){
	    self.hover_to_edit.onmouseleave();
	}
    });
};
BIQThemeManagement.prototype.jQueryMobileInit = function(){
    var self = this;
    self.createDialog();
    
};
BIQThemeManagement.prototype.createDialog = function(){
    var self = this;
    //BEGIN DIALOG
    $b( '#biq-sns-be-dialog' ).remove();
    var dialog_html = 
	'<div id="biq-sns-be-dialog" data-role="dialog" data-close-btn="right">\n\
	    <div data-role="header">\n\
		<h1 class="title">Loading...</h1>\n\
	    </div><!-- /header -->\n\
	    <div role="main" class="ui-content">\n\
		\n\
		<div class="tabs" data-role="navbar" data-iconpos="left">\n\
		    <ul>\n\
			<li><button data-icon="navigation" class="attribute-main ui-btn-active">Main Attribute</button></li>\n\
			<li><button data-icon="bullets" class="attribute-css">CSS Attribute</button></li>\n\
		    </ul>\n\
		</div>\n\
		<div class="bcontent">\n\
		    <div class="attribute-main"></div>\n\
		    <div class="attribute-css"></div>\n\
		</div>\n\
	    </div>\n\
	    <div data-role="footer">\n\
		<h1></h1>\n\
		<button class="ui-btn-right">Submit</button>\n\
	    </div>\n\
	</div>';
    $b('body').append( dialog_html );
    self.dialogAttributeTab();
//    self.jquery_mobile.dialog = $b( '#biq-sns-be-dialog' );
};

BIQThemeManagement.prototype.dialogAttributeTabShowMain = function(){
    $b('#biq-sns-be-dialog ul li > .attribute-css').removeClass('ui-btn-active');
    $b('#biq-sns-be-dialog ul li > .attribute-main').addClass('ui-btn-active');
    $b('#biq-sns-be-dialog .bcontent > *').hide( 100, function(){
	$b('#biq-sns-be-dialog .bcontent .attribute-main').show( 100 );
    } );
};

BIQThemeManagement.prototype.dialogAttributeTab = function(){
    var self = this;
    self.dialogAttributeTabShowMain();
    if($b('#biq-sns-be-dialog').length){
	$b('#biq-sns-be-dialog ul li button').on('click', function(){
	   if( $b(this).hasClass('attribute-main') && $b('#biq-sns-be-dialog .bcontent .attribute-main').is(':hidden') ){
	       $b('#biq-sns-be-dialog .bcontent > *').hide( 100, function(){
		   $b('#biq-sns-be-dialog .bcontent .attribute-main').show( 100 );
		   $b('#biq-sns-be-dialog ul li > .attribute-css').removeClass('ui-btn-active');
		   $b('#biq-sns-be-dialog ul li > .attribute-main').addClass('ui-btn-active');
	       } );
	   }else if( $b(this).hasClass('attribute-css') && $b('#biq-sns-be-dialog .bcontent .attribute-css').is(':hidden') ){
	       $b('#biq-sns-be-dialog .bcontent > *').hide( 100, function(){
		   $b('#biq-sns-be-dialog .bcontent .attribute-css').show( 100 );
		   $b('#biq-sns-be-dialog ul li > .attribute-css').addClass('ui-btn-active');
		   $b('#biq-sns-be-dialog ul li > .attribute-main').removeClass('ui-btn-active');
	       } );
	   }
	});
    }
};

BIQThemeManagement.prototype.editWidget = function(e){
    var self = this;
    self.hover_to_edit.is_editing = true;
    var widget_input = self.generateWidgetInputAll();
    $b('#biq-sns-be-dialog .title').html( widget_input.title );
    $b.mobile.changePage( "#biq-sns-be-dialog" );
    $b('#biq-sns-be-dialog .ui-content .bcontent .attribute-main').html( widget_input.main );
    $b('#biq-sns-be-dialog .ui-content .bcontent .attribute-css').html( widget_input.css );

    self.dialogAttributeTabShowMain();
    
    $b('.ui-page').trigger('create');
};
BIQThemeManagement.prototype.loading = function(p_selector){// #id or .class
    var loading_html = '<div id="biq-loading">\n\
	<div class="image">\n\
	    <img src="'+template_uri+'/images/biq/biq-logo.png"\n\
	    <br /><h3>Loading...</h3>\n\
	</div>\n\
    </div>';
    $b(p_selector).append(loading_html);
    setTimeout(function(){
	$b('#biq-loading').hide(200);
    },1500);
};

BIQThemeManagement.prototype.generateWidgetInputAll = function(){
    var self = this;
    var ret = {main : '-', css : '-', title: '-'};
    //BEGIN CONVERT CLASS NAME TO STRUCTURE NAME Eg. contact-email-simple to contact_email_simple
    var widget_classes = self.hover_to_edit.widget_sel.attr('class');
    var widget_classes_split = widget_classes.split(' ');
    var widget_structure_name = widget_classes_split[1].replace(/-/g, '_');
    //END CONVERT CLASS NAME TO STRUCTURE ===============
    var structure = self.structure[widget_structure_name];
    var html_form_main = '';
    for(var i=0; i<structure.attribute_main.length; i++){
	var attribute_main = structure.attribute_main[i];
	switch( attribute_main.type ){
	    case "text":
		html_form_main = html_form_main + self.generateInputForm.text( attribute_main );
		break;
	}
    }
    ret.main = html_form_main;
    
    var html_form_css = '';
    for(var i=0; i<structure.attribute_css.length; i++){
	var attribute_css = structure.attribute_css[i];
	switch( attribute_css.type ){
	    case "text":
		html_form_css = html_form_css + self.generateInputForm.text( attribute_css );
		break;
	}
    }
    ret.css = html_form_css;
    
    ret.title = structure.title;
    return ret;
};
BIQThemeManagement.prototype.generateInputForm = {
    text : function( p_structure_item ){
	var ret_html = 
		'<label for="'+p_structure_item.key+'">'+p_structure_item.label+':</label>\n\
		<input type="text" name="'+p_structure_item.key+'" id="'+p_structure_item.key+'" data-autogrow="true" >';
	
	return ret_html;
    }
};
