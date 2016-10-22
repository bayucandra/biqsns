<?php
    global $biq_sns_settings;
?>
<div class="wrap">
    <h1>BIQ - Theme option</h1>
    <form name="biq-sns-option-form" method="POST" action="">
        <table class="form-table">
            <tbody>
                <tr>
                    <th>
                        <label for="">Sidebar width</label>
                    </th>
                    <td>
                        <input type="number" name="sidebar_width" class="small-text" value="<?php echo $biq_sns_settings["option"]["sidebar_width"]; ?>" /> px ( pixel unit )
                    </td>
                </tr>
            </tbody>
        </table>
    </form>
</div>
