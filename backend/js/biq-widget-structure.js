function BIQWidgetStructure(){
    
}
/*
 * 'key' is the main key of $atts at wordpress shortcode function. If 'key' = 'content, it is eman $content
 */
BIQWidgetStructure.prototype.contact_email_simple = {
    'title' : 'Contact Email Simple - setting',
    'attribute_main' : [
	{ 'key' : 'icon_type', 'type' : 'radio', 'label' : 'Icon type', value : ['image','class'] },
	{ 'key' : 'icon_value', 'type' : 'text', 'label' : 'URL Image / class', 'placeholder' :'Leave empty for default value' },
	{ 'key' : 'content', 'type' : 'text', 'label' : 'Email Address' }
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
