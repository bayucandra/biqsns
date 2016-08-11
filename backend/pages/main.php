<?php
    global $template_directory;
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
		if(!$has_active) $main_tab_arr["frontpage"]["active"]=true;//SET frontpage as default active if $action not match any array
//		print_r($main_tab_arr);
	    ?>
	    <biq-tab tab-type="url" header-height="40">
		<biq-tab-item title="<?php echo $main_tab_arr["frontpage"]["title"]?>"
		    <?php echo $main_tab_arr["frontpage"]["active"]?"active":"";?>
		    url="<?php echo menu_page_url( 'biq-sns-theme-setting', false ); ?>">
		</biq-tab-item>
		<biq-tab-item title="<?php echo $main_tab_arr["template"]["title"]?>"
		    <?php echo $main_tab_arr["template"]["active"]?"active":"";?>
		    url="<?php echo menu_page_url( 'biq-sns-theme-setting', false ).'&action=template'; ?>">
		</biq-tab-item>
	    </biq-tab>
	</div>
	<div class="biq-body">
	    <?php
		if( isset($_REQUEST['sub_page']) ){
		    switch($_REQUEST['sub_page']){
			case 'frontpage':
			    require_once $template_directory.'/backend/pages/frontpage.php';
			default:
			    require_once $template_directory.'/backend/pages/frontpage.php';
		    }
		}else{
		    require_once $template_directory.'/backend/pages/frontpage.php';
		}
	    ?>
	</div>
    </div>
</div>