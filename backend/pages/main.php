<?php
    global $template_directory;
    global $template_arr;
    global $biq_sns_settings;
//    if( isset($_POST["is-biq-setting-submitted"]) ){
//	$hidden_field= $_POST["is-biq-setting-submitted"];
//    }
?>
<div ng-app="BApp">
    <div id="biq-sns-be-main" ng-controller="BCtrl" ng-cloak>
	<div class="header">
	    <?php
//		$menu_page_url = menu_page_url( 'biq-sns-theme-setting', false );
                $template_active = $template_arr[ $biq_sns_settings["active_template"] ];
		$action = ( isset($_REQUEST['action']) ) ? $_REQUEST['action'] : '';
		$has_active = false;
		foreach( $template_active AS $key=>$val ){//Set all as inactive
		    if($key === $action){
			$has_active = true;
		    }
		}
	    ?>
	    <biq-tab tab-type="url" header-height="40">
                <?php
                    $i=0;
                    $template_active_count = count($template_active);
                    foreach( $template_active AS $key=>$val ){
                        if( empty($action) && ( $i==$template_active_count-1 ) ) { $action = $key; }
                ?>
                    <biq-tab-item title="<?php echo $template_active[$key]["label"]?>"
                        <?php echo $action == $key ? 'active' : '';?>
                        url="<?php echo menu_page_url( 'biq-sns-theme-setting', false ).'&action='.$key; ?>"
                    </biq-tab-item>
                <?php
                        $i++;
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
                    echo '<h2 class="template-not-found"><span class="fa fa-warning fa-lg"></span> Template file not found for: "'.ucfirst($action).'"</h2>';
                }
	    ?>
	</div>
    </div>
</div>