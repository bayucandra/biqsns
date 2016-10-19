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
