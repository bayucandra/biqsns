<?php
    global $biq_sns_settings;
?>
<div class="wrap">
    <h1>BIQ - Woocommerce setting page</h1>
    <form name="biq-sns-woocommerce-setting-form" method="POST" action="">
        <table class="form-table">
            <tbody>
                <tr>
                    <th>
                        <label for="mode">Display product mode</label>
                    </th>
                    <td>
                        <fieldset>
                            <legend class="screen-reader-text">Display product mode</legend>
                            <label>
                                <input type="radio" id="mode" name="mode" value="show"<?php echo ($biq_sns_settings["woocommerce"]["product_display_mode"]=="show") ? ' checked="true"' : ""; ?>/>
                                <span><?php esc_attr_e( 'Show mode ( For display product only )', 'biqsoft')?></span>
                            </label>
                            <br/>
                            <label>
                                <input type="radio" name="mode" value="shop"<?php echo ($biq_sns_settings["woocommerce"]["product_display_mode"]=="shop") ? ' checked="true"' : ""; ?>/>
                                <span><?php esc_attr_e( 'Shop mode ( For online store )', 'biqsoft')?></span>
                            </label>
                        </fieldset>
                    </td>
                </tr>
                <tr>
                    <th>
                        <label>loop_shop_column</label>
                    </th>
                    <td>
                        <input type="number" class="small-text" value="<?php echo $biq_sns_settings["woocommerce"]["loop_shop_columns"];?>" min="2" step="1" name="loop_shop_columns">
                    </td>
                </tr>
                <tr>
                    <th>
                        <label>loop_shop_per_page</label>
                    </th>
                    <td>
                        <input type="number" class="small-text" value="<?php echo $biq_sns_settings["woocommerce"]["loop_shop_per_page"];?>" min="2" step="1" name="loop_shop_per_page">
                    </td>
                </tr>
            </tbody>
        </table>
        <p class="submit">
            <input type="submit" value="Save Changes" class="button button-primary" name="biq-sns-woocommerce-setting-submit">
        </p>
    </form>
</div>