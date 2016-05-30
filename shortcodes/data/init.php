<?php
    $head_template = '{
	"shortcode" : "bbox_wrapper_full",
	"attributes" : { 
	    "classes" : "header layout"
	},
	"children" : [
	    {
		"shortcode" : "bbox_wrapper_full_alt",
		"attributes" : {
		    "classes" : "line-top"
		},
		"children" : [
		    {
			"shortcode" : "bbox_wrapper_short",
			"attributes" : {
			    "classes" : "info"
			},
			"children" : [
			    {
				"shortcode" : "contact_email_simple",
				"attributes" : "",
				"content" : "info@finefurniturecenter.com"
			    }
			]
		    }
		]
	    }
	]
    }';
    add_option('biq-sns-sc-head',$head_template);
?>
