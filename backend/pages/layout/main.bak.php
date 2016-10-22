<?php
    if( isset($_POST["is-biq-setting-submitted"]) ){
	$hidden_field= $_POST["is-biq-setting-submitted"];
    }
?>
<h2>Front page setting</h2>
<hr/>
<h2>Header settings</h2>
<form method="post" action="">
    <input type="hidden" name="is-biq-setting-submitted" value="Y" />
    <table class="form-table">
	<tr valign="top">
	    <td>
		<label for="biq-contact-email"><?php esc_attr_e("Contact Email");?></label>
	    </td>
	    <td>
		<input name="biq-contact-email" id="biq-contact-email" type="text" value="" class="regular-text" />
	    </td>
	</tr>
	<tr valign="top">
	    <td>
	    </td>
	    <td>
		<input class="button-primary" type="submit" value="<?php esc_attr_e( 'Submit' ); ?>" />
	    </td>
	</tr>
    </table>
</form>
