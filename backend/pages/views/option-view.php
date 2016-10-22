<?php
    global $biq_sns_settings;
    global $template_uri;
    $favicon_file = $template_uri."/favicon.ico";
?>
<div class="wrap">
    <h1>BIQ - Theme option</h1>
    <form name="biq-sns-option-form" method="POST" action="">
        <table class="form-table">
            <tbody>
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
                        <label for="sidebar_width">Sidebar width</label>
                    </th>
                    <td>
                        <input type="number" id="sidebar_width" name="sidebar_width" class="small-text" value="<?php echo $biq_sns_settings["option"]["sidebar_width"]; ?>" /> px ( pixel unit )
                    </td>
                </tr>
            </tbody>
        </table>
        <p>
            <input type="submit" value="Save Changes" class="button button-primary" name="biq-sns-theme-option-submit"/>
        </p>
    </form>
</div>
