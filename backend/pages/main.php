<?php
    global $template_directory;
    if( isset($_POST["is-biq-setting-submitted"]) ){
	$hidden_field= $_POST["is-biq-setting-submitted"];
    }
?>
<div id="biq-sns-be-main" class="bootstrap-wrapper">
    <div data-role="footer">
	<div data-role="navbar" data-iconpos="left">
	    <ul>
		<li><a href="#" data-icon="home" class="<?php if(!isset($_REQUEST['sub_page'])) echo " ui-btn-active";?>">Frontpage</a></li>
		<li><a href="#" data-icon="gear">Setting</a></li>
	    </ul>
	</div>
    </div>
    <div class="body">
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