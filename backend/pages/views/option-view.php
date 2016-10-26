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
                    <th colspan="2"><h2 style="color:#0074a2;border-bottom: 1px #b4b9be solid;">General Layout</h2></th>
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
                        <label for="sidebar_width">Sidebar width</label>
                    </th>
                    <td>
                        <input type="number" id="sidebar_width" name="sidebar_width" class="small-text" value="<?php echo $biq_sns_settings["option"]["sidebar_width"]; ?>" /> px ( pixel unit )
                    </td>
                </tr>
                <tr>
                    <th colspan="2"><h2 style="color:#0074a2;border-bottom: 1px #b4b9be solid;">SEO</h2></th>
                </tr>
            </tbody>
        </table>
        <p>
            <input type="submit" value="Save Changes" class="button button-primary" name="biq-sns-theme-option-submit"/>
        </p>
    </form>
</div>
