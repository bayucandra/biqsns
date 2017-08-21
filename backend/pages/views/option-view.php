<?php
    global $biq_sns_settings;
    global $template_uri;
    $favicon_file = $template_uri."/favicon.ico";
?>
<div class="wrap">
    <h1>BIQ - <?php _e('Theme option','biqdev');?></h1>
    <form name="biq-sns-option-form" method="POST" action="">
        <table class="form-table">
            <tbody>
                <tr>
                    <th colspan="2">
                        <h2 style="color:#0074a2;border-bottom: 1px #b4b9be solid;">
                            <?php _e('General Layout', 'biqdev'); ?>
                        </h2>
                    </th>
                </tr>
                <tr>
                    <th>
                        <label>favicon</label>
                    </th>
                    <td>
                        <img src="<?php echo $favicon_file; ?>"/>
                        <input type="file"/>
                    </td>
                </tr>
                <tr>
                    <th>
                        <label for="maintenance-mode"><?php _e('Maintenance Mode', 'biqdev')?></label>
                    </th>
                    <td>
                        <input name="maintenance-mode" type="checkbox" id="maintenance-mode" value="1" />
                        <span><?php esc_attr_e( 'Maintenance mode on', 'biqdev' ); ?></span>
                    </td>
                </tr>
                
                <!-- =============================BEGIN SEO SECTION===============================-->
                
                <tr>
                    <th colspan="2"><h2 style="color:#0074a2;border-bottom: 1px #b4b9be solid;">SEO</h2></th>
                </tr>
                <tr>
                    <th>
                        <label for="home-meta-keyword"><?php _e('Home page meta keyword (comma separated)', 'biqdev')?></label>
                    </th>
                    <td>
                        <textarea id="home-meta-keyword" name="home-meta-keyword" maxlength="50" cols="80" rows="2" style="resize: none;"></textarea>
                    </td>
                </tr>
                <tr>
                    <th>
                        <label for="home-meta-description"><?php _e('Home page meta description (recomended 50 character)', 'biqdev')?></label>
                    </th>
                    <td>
                        <textarea id="home-meta-description" name="home-meta-description" maxlength="255" cols="80" rows="2" style="resize: none;"></textarea>
                    </td>
                </tr>
            </tbody>
        </table>
        <p>
            <input type="submit" value="Save Changes" class="button button-primary" name="biq-sns-theme-option-submit"/>
        </p>
    </form>
</div>
