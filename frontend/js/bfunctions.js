String.prototype.ucfirst = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
function bcapitalize(p_str) {
    return p_str.charAt(0).toUpperCase() + p_str.slice(1);
}
function bisnull(p_var){
	if((typeof(p_var)==='undefined')||(p_var==null)||(p_var==''))return true;
	else return false;
}
function json_max_id(p_json,p_field){
    var max_id=0;
    if(p_json.length>0){
	for(var i=0;i<p_json.length;i++){
	    var cur_record=p_json[i];
	    for(var key in cur_record){
		if(key==p_field){
		    if(cur_record[key]>max_id){
			max_id=cur_record[key];
		    }
		}
	    }
	}
    }
    return max_id;
}
function arr_max(p_arr){
	var max_val=0;
	if(p_arr.length>0){
		for(var i=0;i<p_arr.length;i++){
			if(p_arr[i]>max_val){
				max_val=p_arr[i];
			}
		}
	}
	return max_val;
}
function bemail_addr_is_valid(p_mail_str){
	var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return reg.test(p_mail_str);
}
function addr_rfc822_htmldecode(p_str){
	if(p_str==='')
		return '';
	var tmp_str=p_str.replace(/&lt;/g,'<');
	tmp_str=tmp_str.replace(/&gt;/g,'>');
	return tmp_str;
}
function addr_rfc822_parsing(p_str){
	if(p_str==='')
		return '';
	var rfc822_addr_str_raw=addr_rfc822_htmldecode(p_str);
	var rfc822_addr_str=rfc822_addr_str_raw.trim();
	var split_lt_str=rfc822_addr_str.split('<');
	var arr_refine={contact_name:'',email_address:''};
	if(split_lt_str.length==1){
		arr_refine.email_address=rfc822_addr_str;
	}else{
		for(var i=0;i<split_lt_str.length;i++){
			if(i==0){
				var str_contact_name=split_lt_str[i].trim();
				arr_refine.contact_name=str_contact_name;
			}else{
				var str_email_address=split_lt_str[i].replace('>','');
				arr_refine.email_address=str_email_address.trim();
			}
		}
	}
	if(!mail_addr_is_valid(arr_refine.email_address)){//IF the email address is not valid. Then make return all to empty ('')
		arr_refine.contact_name='';
		arr_refine.email_address='';
	}
	return arr_refine;
}
function badd_resize_body(str_function){
	var body_onresize=jQuery('body').attr('onresize');
	var body=document.getElementsByTagName('body')[0];
	if(bisnull(body_onresize)){
		body.setAttribute('onresize',str_function+';');
	}else{
		if(body_onresize.search(str_function)===-1){
		    var body_onresize_last_char=body_onresize.substring(body_onresize.length-1,body_onresize.length);
		    if(body_onresize_last_char!==';'){body_onresize+=';';}
		    body_onresize+=str_function+';';
		}
		body.setAttribute('onresize',body_onresize);
	}
}
function binput_validation(p_conf){
    ////p_conf is json format({form_selector:'jquery_selector',
		    //validation:[
		    //	{field_name:'name',field_type:'input'/'textarea' etc.,validation_type:'required'/'email'/'password_repeat'
		    //	    ,opt:{password_repeat_name:'name'}}
		    //]
    //})
    var is_form_valid=true;
    var css_error={background:'#ffa2a2',border:'1px solid #ffa2a2'};
    var css_valid={background:'',border:''};
    var form=jQuery(p_conf.form_selector);
    for(var i=0;i<p_conf.validation.length;i++){
	var field_name=p_conf.validation[i].field_name;
	var field_type=p_conf.validation[i].field_type;
	var validation_type=p_conf.validation[i].validation_type;
	var opt=p_conf.validation[i].opt;

	var field_obj=jQuery(p_conf.form_selector+' '+field_type+'[name="'+field_name+'"]');
	var val=field_obj.val();
	if(validation_type==='required'){
	    if(field_obj.length){
		if(bisnull(val)){
		    is_form_valid=false;
		    field_obj.css(css_error);
		}else{
		    field_obj.css(css_valid);
		}
	    }
	}
	if(validation_type==='email'){
	    if(field_obj.length){
		if(mail_addr_is_valid(val)!==true){
		    is_form_valid=false;
		    field_obj.css(css_error);
		}else{
		    field_obj.css(css_valid);
		}
	    }
	}
	if(validation_type==='select'){
	    if(field_obj.length){
		var not_equal_str=p_conf.validation[i].opt.not_equal_str;
		if(field_obj.val()===not_equal_str){
		    is_form_valid=false;
		    field_obj.css(css_error);
		}else{
		    field_obj.css(css_valid);
		}
	    }
	}
	if(validation_type==='password_repeat'){
	    if(field_obj.length){
		var password_repeat_name=p_conf.validation[i].opt.password_repeat_name;
		var password_repeat_field=jQuery(p_conf.form_selector+' input[name="'+password_repeat_name+'"]');
		var password_repeat_val=password_repeat_field.val();
		if(bisnull(val)){
		    is_form_valid=false;
		    field_obj.css(css_error);
		}else{
		    if(val!==password_repeat_val){
			is_form_valid=false;
			password_repeat_field.css(css_error);
		    }else{
			password_repeat_field.css(css_valid);
		    }
		}
	    }
	}
    }
    return is_form_valid;
}
function bexplode(p_str, p_separator){
    var arr_ret=[];
    var tmp_str='';
    for(var i=0; i<p_str.length;i++){
	if(p_str.substring(i,(i+1))===p_separator){
	    arr_ret.push(tmp_str);
	    tmp_str='';
	}else{
	    tmp_str=tmp_str+p_str.substring(i,(i+1));
	}
	if(i===(p_str.length-1)){
	    arr_ret.push(tmp_str);
	}
    }
    return arr_ret;
}
function b_arr_contain(arr, obj) {
    var i = arr.length;
    while (i--) {
       if (arr[i] === obj) {
           return true;
       }
    }
    return false;
}