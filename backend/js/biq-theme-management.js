function BIQThemeManagement(){
    var $b = jQuery.noConflict();
    var self = this;
    self.structure = new BIQWidgetStructure;
    self.init = function(p_wrapper_selector){
	$b(document).ready(function(){
//	    $b.mobile.linkBindingEnabled = false;
	    
	    self.loading('body');
	    self.jQueryMobileInit();
	    self.hoverToEdit();
	});
    };
}
BIQThemeManagement.prototype.body_wrapper = '#biq-sns-be-main';
BIQThemeManagement.prototype.hoverToEdit= function(){
    var $b = jQuery.noConflict();
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
    self.jquery_mobile = { main_page: null, dialog : null };
    var $b = jQuery.noConflict();
    
    //BEGIN DIALOG
    var dialog_html = 
	'<div id="biq-sns-be-dialog" data-role="dialog" data-close-btn="right">\n\
	    <div data-role="header">\n\
		    <h1 id="biq-sns-be-dialog-title">Loading...</h1>\n\
	    </div><!-- /header -->\n\
	    <div role="main" class="ui-content">\n\
		    <p>Loading...</p>\n\
	    </div>\n\
	    <div data-role="footer">\n\
		<button class="vex-dialog-button-primary vex-dialog-button vex-first vex-last">Submit</button>\n\
	    </div>\n\
	</div>';
    $b('body').append( dialog_html );
    self.jquery_mobile.dialog = $b( '#biq-sns-be-dialog' );
//    $b(self.jquery_mobile.dialog).on( "dialogcreate",
//	function( event, ui ) {
//	    alert('test');
//		$b( self.jquery_mobile.dialog ).children('.ui-icon-delete').on('click', function(){ alert('test');});
//	} 
//    );

//    $b( self.jquery_mobile.dialog ).dialog({
//      create: function( event, ui ) { alert('test');}
//    });
//    
//    $b( "#biq-sns-be-dialog" ).on( "dialogcreate", function( event, ui ) { alert('test');} );
};
BIQThemeManagement.prototype.editWidget = function(e){
    var self = this;
    var $b = jQuery.noConflict();
    self.hover_to_edit.is_editing = true;
    var widget_input = self.generateWidgetInput();
    
    $b('#biq-sns-be-dialog-title').html( widget_input.title );
    $b('#biq-sns-be-dialog .ui-content').html( widget_input.html );
    $b.mobile.changePage( "#biq-sns-be-dialog" );

//    vex.open({
//	content: widget_input.html,
//	showCloseButton : false,
//	afterOpen: function($vexContent){
//	    // console.log $vexContent.data().vex
//	    setTimeout( function(){
//		    self.hover_to_edit.set_overlay_sizes();
//		    $b( "#tabs" ).tabs();
//		}, 100
//	    );
//	},
//	afterClose: function(){
//	    self.hover_to_edit.is_editing = false;
//	    console.log('vexClose');
//	    setTimeout( function(){
//		self.hover_to_edit.onmouseleave();
//		    self.hover_to_edit.set_overlay_sizes();
//		}, 100
//	    );
//	}
//    });
};
BIQThemeManagement.prototype.loading = function(p_selector){// #id or .class
    $b = jQuery.noConflict();
    var loading_html = '<div id="biq-loading">\n\
	<div class="image">\n\
	    <img src="'+template_uri+'/images/biq/biq-logo.png"\n\
	    <br /><h3>Loading...</h3>\n\
	</div>\n\
    </div>';
    $b(p_selector).append(loading_html);
//    $b('#biq-loading').css({height: $b('#biq-loading').parent().height()});
    setTimeout(function(){
	$b('#biq-loading').hide(200);
    },1500);
};

BIQThemeManagement.prototype.generateWidgetInput = function(){
    var self = this;
    var ret = {html : '-', title: '-'};
    //BEGIN CONVERT CLASS NAME TO STRUCTURE NAME Eg. contact-email-simple to contact_email_simple
    var widget_classes = self.hover_to_edit.widget_sel.attr('class');
    var widget_classes_split = widget_classes.split(' ');
    var widget_structure_name = widget_classes_split[1].replace(/-/g, '_');
    //END CONVERT CLASS NAME TO STRUCTURE ===============
    var structure = self.structure[widget_structure_name];
    var html_form = '\n\
    <div data-role="footer">\n\
	<div data-role="navbar" data-iconpos="left">\n\
	    <ul>\n\
		<li><a href="#" data-icon="home" class="ui-btn-active"">Frontpage</a></li>\n\
		<li><a href="#" data-icon="gear">Setting</a></li>\n\
	    </ul>\n\
	</div>\n\
    </div>';
    for(var i=0; i<structure.attribute_main.length; i++){
	var attribute_main = structure.attribute_main[i];
	switch( attribute_main.type ){
	    case "text":
		html_form = html_form+'\n\
		    <label for="'+attribute_main.key+'">'+attribute_main.label+'</label>\n\
		    <input type="text" name="'+attribute_main.key+'" id="'+attribute_main.key+'" >';
		break;
	}
    }
    ret.html = html_form;
    ret.title = structure.title;
    return ret;
};
