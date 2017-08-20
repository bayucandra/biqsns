/* 
    Created on : Sep 29, 2016, 3:41 PM
    Author     : bayucandra@gmail.com
    Version    : 0.6
*/
function BIQSlider(p_conf_overide){
    var self = this;
    self.overide_config(p_conf_overide, self.conf);
    if( !jQuery(self.conf.wrapper).length ){
        console.error('BIQSlider: Element "'+self.conf.wrapper+'" doesn\'t exist.');
        return;
    }

    self.init_view();
    
    setTimeout(function(){ self.start(); },self.conf.player_start_timeout);
}
BIQSlider.prototype.conf = {
    wrapper:'.biq-widgets.slider',
    css_width:'100%',
    css_height:400,
    slide_show_delay:7000,
    wrapper_height_def:30,
    margin_image_vertical:0,//in percent
    img_height_auto:false,
    check_image_interval:5000,
    player_start_timeout:9000
};
BIQSlider.prototype.slider_state = {
    paused:false,
    current_slide_index:1,
    check_image_interval:setInterval(function(){},1000),
    total_img:0,
    player_interval:setInterval(function(){},3000)
};
BIQSlider.prototype.start=function(){
    var self = this;
    clearInterval(self.slider_state.check_image_interval);
    self.slider_state.check_image_interval =//periodically check image load, when all loaded then clear the check interval and do the slideshow
        setInterval(
            function(){
                self.check_images_isloaded();
            },
            self.conf.check_image_interval
        );
};

BIQSlider.prototype.slide_show = function(){
    var self = this;
    var selector_slide=self.conf.wrapper+' .slide';

    var current_idx = self.slider_state.current_slide_index;
    if( current_idx < self.slider_state.total_img){
//	var img_src=jQuery(selector_slide+':nth-child('+(self.slider_state.current_slide_index+1).toString()+')').attr('src');
//	jQuery('#'+conf.id_wrapper+' .bg_blur').css('background-image','url(\''+img_src+'\')');

	var slide_old=jQuery(selector_slide+':nth-child('+current_idx.toString()+')').removeClass('visible');
	slide_old.removeClass('visible');
	slide_old.addClass('hidden');
//	var text_old=jQuery(self.conf.wrapper+' .description h3:nth-child('+current_idx.toString()+')');
//	text_old.removeClass('visible');
//	text_old.addClass('hidden');
	
//	var content_old=jQuery(self.conf.wrapper+' .description p:nth-of-type('+current_idx.toString()+')');
//	content_old.removeClass('visible');
//	content_old.addClass('hidden');
	
	var next_slider=current_idx+1;
	var slide_next=jQuery(selector_slide+':nth-child('+next_slider.toString()+')');
	slide_next.removeClass('hidden');
	slide_next.addClass('visible');
//	var text_next=jQuery(self.conf.wrapper+' .description h3:nth-child('+next_slider.toString()+')');
//	text_next.removeClass('hidden');
//	text_next.addClass('visible');
	
//	var content_next=jQuery(self.conf.wrapper+' .description p:nth-of-type('+next_slider.toString()+')');
//	content_next.removeClass('hidden');
//	content_next.addClass('visible');

	self.pager_set_active(current_idx+1);
	self.slider_state.current_slide_index++;
    }else{
	var slide_old=jQuery(selector_slide+':nth-child('+current_idx.toString()+')');
	slide_old.removeClass('visible');
	slide_old.addClass('hidden');
//	var text_old=jQuery(self.conf.wrapper+' .description h3:nth-child('+current_idx.toString()+')');
//	text_old.removeClass('visible');
//	text_old.addClass('hidden');
	
//	var content_old=jQuery(self.conf.wrapper+' .description p:nth-of-type('+current_idx.toString()+')');
//	content_old.removeClass('visible');
//	content_old.addClass('hidden');
	
	var slide_next = jQuery(selector_slide+':nth-child(1)');
	slide_next.removeClass('hidden');
	slide_next.addClass('visible');
//	var text_next = jQuery(self.conf.wrapper+' .description h3:nth-child(1)');
//	text_next.removeClass('hidden');
//	text_next.addClass('visible');
	
//	var content_next = jQuery(self.conf.wrapper+' .description p:nth-of-type(1)');
//	content_next.removeClass('hidden');
//	content_next.addClass('visible');
	
	self.pager_set_active(1);
	self.slider_state.current_slide_index=1;
    }
    self.auto_image_height();
};

BIQSlider.prototype.auto_image_height = function(){
    var self = this;
    var selector_slide=self.conf.wrapper+' .slide';
    if(self.conf.img_height_auto){
	var current_img_height=jQuery(selector_slide+':nth-child('+self.slider_state.current_slide_index+')').children('img').height();
	if(self.bisnull(current_img_height)||(current_img_height<30)){
	    current_img_height=self.conf.css_height;
	}
	var margin_image_vertical = (current_img_height*self.conf.margin_image_vertical/100);
	var wrapper_height= current_img_height + margin_image_vertical;
	jQuery(self.conf.wrapper).animate({height:wrapper_height});
	jQuery(selector_slide+':nth-child('+self.slider_state.current_slide_index+')').css('top',margin_image_vertical);
	jQuery(self.conf.wrapper+' .pager').css('bottom', (margin_image_vertical/2)+10);
    }
};

BIQSlider.prototype.slide_show_current = function(p_idx){
    var self = this;
    var selector_slide=self.conf.wrapper+' .slide';
    clearInterval(self.slider_state.player_interval);

    var idx_old=self.slider_state.current_slide_index.toString();
    var slide_old=jQuery(selector_slide+':nth-child('+idx_old+')');
    slide_old.removeClass('visible');
    slide_old.addClass('hidden');
//    var text_old=jQuery(self.conf.wrapper+' .description h3:nth-child('+idx_old+')');
//    text_old.removeClass('visible');
//    text_old.addClass('hidden');
//    
//    var content_old=jQuery(self.conf.wrapper+' .description p:nth-of-type('+idx_old+')');
//    content_old.removeClass('visible');
//    content_old.addClass('hidden');
    
    self.slider_state.current_slide_index=p_idx;
//    var img_src=jQuery(self.conf.wrapper+' img:nth-child('+(self.slider_state.current_slide_index).toString()+')').attr('src');
//    jQuery(self.conf.wrapper+' .bg_blur').css('background-image','url(\''+img_src+'\')');
    
    var slide_next = jQuery(selector_slide+':nth-child('+p_idx.toString()+')');
    slide_next.removeClass('hidden');
    slide_next.addClass('visible');
//    var text_next = jQuery(self.conf.wrapper+' .description h3:nth-child('+p_idx.toString()+')');
//    text_next.removeClass('hidden');
//    text_next.addClass('visible');
//    
//    var content_next = jQuery(self.conf.wrapper+' .description p:nth-of-type('+p_idx.toString()+')');
//    content_next.removeClass('hidden');
//    content_next.addClass('visible');

    self.slider_state.player_interval=setInterval(function(){ self.slide_show(); }, self.conf.slide_show_delay);

    self.pager_set_active(p_idx);
    self.auto_image_height();
};


BIQSlider.prototype.check_images_isloaded = function(){
    var self = this;
    var selector_slide=self.conf.wrapper+' .slide';
    var is_all_loaded=true;
    jQuery(selector_slide).each(function(){
	var is_ff=false;
        var img = jQuery(this).children('img');
	if(!self.bisnull(img[0].naturalWidth)){
	    is_ff=true;
	}
	try{
	    if(!img[0].complete || (is_ff&&img[0].naturalWidth===0)){
		    is_all_loaded=false;
	    }
	}catch(e){
	    console.error(e);
	}
    });
    if(is_all_loaded){
        jQuery(self.conf.wrapper).addClass('ready');
	jQuery(self.conf.wrapper).css("background-image","none");
	clearInterval(self.slider_state.check_image_interval);
	if(self.slider_state.total_img>1){
	    self.slide_show_current(2);
	}else{
	    self.slide_show_current(1);
	}
        jQuery(self.conf.wrapper+' .pager').show();
    }
};

BIQSlider.prototype.init_view = function(){
    var self = this;
    var selector_slide=self.conf.wrapper+' .slide';
    self.slider_state.total_img=jQuery(selector_slide).length;

    self.pager();

//    var wrapper_width = jQuery(self.conf.wrapper).width();
//    var wrapper_height = wrapper_width*self.conf.wrapper_height_def/100;

    jQuery(self.conf.wrapper).css('height', self.conf.css_height+'px');

//    jQuery(selector_slide+':nth-child('+self.slider_state.current_slide_index+')').removeClass('visible');
//    jQuery(selector_slide+':nth-child('+self.slider_state.current_slide_index+')').addClass('hidden');
    self.slider_state.current_slide_index=1;
    
    jQuery(selector_slide).removeClass('visible');
    jQuery(selector_slide).addClass('hidden');

    jQuery(selector_slide+':nth-child(1)').removeClass('hidden');
    jQuery(selector_slide+':nth-child(1)').addClass('visible');
    self.pager_set_active(1);
    self.auto_image_height();
};

BIQSlider.prototype.pager = function(){
    var self = this;
    var pager_wrapper=jQuery(document.createElement('div'));
    pager_wrapper.addClass('pager');
    for(var i=0;i<self.slider_state.total_img;i++){
	var pager_item=jQuery(document.createElement('div'));
	pager_item.addClass('item');
	pager_item.addClass('inactive');
	pager_item.on('click',function(){
            var idx = jQuery(this).index()+1;
            self.slide_show_current(idx);
        });
	pager_wrapper.append(pager_item);
    }
    var main_wrapper= jQuery(self.conf.wrapper);
    main_wrapper.append(pager_wrapper);
    pager_wrapper.hide();//Initially hide and show latter when the main wrapper configured which triggered by check_images_isloaded() function
// 	jQuery('#'+conf.id_wrapper).append(pager_wrapper);
};

BIQSlider.prototype.pager_set_active = function(p_img_idx){
    var self = this;
    jQuery(self.conf.wrapper+' .pager .item').removeClass('active').addClass('inactive');
    jQuery(self.conf.wrapper+' .pager .item:nth-child('+p_img_idx.toString()+')').removeClass('inactive').addClass('active');
};
//BEGIN GENERAL FUNCTIONS=====================
BIQSlider.prototype.overide_config = function(p_conf_overide,p_conf_reference){
    var self = this;
    if(!self.bisnull(p_conf_overide)){
	jQuery.each(p_conf_overide,function(k,v){
	    p_conf_reference[k]=v;//OVERIDING CONFIGS
	});
    }
};

BIQSlider.prototype.bisnull = function(p_var){
    if((typeof(p_var)==='undefined')||(p_var===null)||(p_var===''))return true;
    else return false;
};
