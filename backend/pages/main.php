<?php
    global $template_directory;
    global $template_arr;
    global $biq_sns_settings;
    if( isset($_POST["is-biq-setting-submitted"]) ){
	$hidden_field= $_POST["is-biq-setting-submitted"];
    }
?>
<div ng-app="BApp">
    <div id="biq-sns-be-main" ng-controller="BCtrl" ng-cloak>
	<div class="header">
<!--	    <ul class="biq-tab h40">
		<li class="<?php if(!isset($_REQUEST['sub_page'])) echo "active ";?>"><span>Frontpage</span></li>
		<li><span>Setting</span></li>
	    </ul>-->
	    <?php
		$menu_page_url = menu_page_url( 'biq-sns-theme-setting', false );
		$main_tab_arr = array( );
		$main_tab_arr["frontpage"] = array( "title"=> "Frontpage", "action"=>$menu_page_url );
		$main_tab_arr["template"] = array( "title"=> "Template", "action"=>$menu_page_url."&action=template" );
		$action = ( isset($_REQUEST['action']) ) ? $_REQUEST['action'] : '';
		$has_active = false;
		foreach( $main_tab_arr AS $key=>$val ){//Set all as inactive
		    $main_tab_arr[$key]["active"]=false;
		    if($key === $action){
			$main_tab_arr[$key]["active"]=true;
			$has_active = true;
		    }
		}
                $template_active = $template_arr[ $biq_sns_settings["active_template"] ];
		if(!$has_active) $main_tab_arr["frontpage"]["active"]=true;//SET frontpage as default active if $action not match any array
//		print_r($main_tab_arr);
	    ?>
	    <biq-tab tab-type="url" header-height="40">
                <?php
                    foreach( $template_active AS $key=>$val ){
                        if( empty($action) ) { $action = $key; }
                ?>
                    <biq-tab-item title="<?php echo $template_active[$key]["label"]?>"
                        <?php echo $action == $key ? 'active' : '';?>
                        url="<?php echo menu_page_url( 'biq-sns-theme-setting', false ).'&action='.$key; ?>"
                    </biq-tab-item>
                <?php
                    }
                ?>
	    </biq-tab>
	</div>
	<div class="biq-body">
	    <?php
                $template_file = $template_directory.'/backend/pages/'.$action.".php";
                if(file_exists($template_file)){
                    require_once $template_file;
                }else{
                    echo '<h2 class="template-not-found"><span class="fa fa-warning fa-lg"></span> Template file not found for: "'.ucfirst($action).'" </h2>';
                }
	    ?>
	</div>
    </div>
</div>