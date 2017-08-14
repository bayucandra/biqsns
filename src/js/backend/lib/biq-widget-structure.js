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
                { type: 'two_col', inputs:[
                        { key: 'title', type:'text', 'label':'Title', flex: 70 },
                        {type: 'spacer', flex: 5},
                        { key: 'title_color', type:'text', 'label':'Color', 'placeholder': '#hex', flex: 30 }
                ] },
                { type: 'two_col', inputs:[
                        { key: 'caption', type:'text', 'label':'Caption', flex: 70 },
                        {type: 'spacer', flex: 5},
                        { key: 'caption_color', type:'text', 'label':'Color', 'placeholder': '#hex', flex: 30 }
                ] },
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
        { 'key':'description', 'type':'textarea',
            'textarea_attrs' : 'md-maxlength="254" rows="5"',
            'label':'Description', 'input_wrapper_attrs':'ng-show="input_value.description_source===\'custom\'"' }
    ],
    'attribute_css' : BIQWidgetStructureDefaults.attribute_css
};
BIQWidgetStructure.prototype.post_feed = {
    'title': 'Setting - Post feed',
    'attribute_main':[
        { 'key' : 'post_category', 'type':'text', 'label':'Post Category' },
        { 'key' : 'limit', 'type':'text', 'label':'Limit' },
        { 'key' : 'clickable', 'type':'radio', 'label':'Clickable',
            'value' : [
                {'label': 'true', 'value':'true'},
                {'label':'false', 'value':'false'}
            ]
        },
        { 'key' : 'staggered', 'type':'radio', 'label':'Staggered',
            'value' :[
                {'label': 'true', 'value': 'true'},
                {'label': 'false', 'value': 'false'}
            ]
        },
        { 'key' : 'type', 'type':'radio', 'label': 'Layout Type',
            'value' : [
                {'label' : '2 col circle', 'value' : 'two_col_circle'},
                {'label' : '2 col rect.', 'value' : 'two_col_rect'}
            ]
        },
        { 'key':'size', 'type': 'radio', 'label':'Size',
            'value' :[
                {'label':'Thumbnail', 'value':'thumbnail'},
                {'label':'Medium', 'value':'medium'},
                {'label':'Medium Large', 'value':'medium_large'}
            ]
        }
    ],
    'attribute_css' : BIQWidgetStructureDefaults.attribute_css
};
