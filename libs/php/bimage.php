<?php
/*! \class BImage
 * \brief class to processing image (upload, resize, convert, convert stream etc.)
 *
 * @author bayucandra@gmail.com
 * V.0.1 (2015-05-11)
 */
class BImage {
    private $debug_mode;
    private $path_str,$no_image_path;
    private $img_source, $wm_resource, $wm_pos_x, $wm_pos_y, $wm_nw, $wm_nh;
    private $orig_type, $orig_width, $orig_height;//pixel in INT
    private $max_width, $max_height;//pixel in INT
    private $new_width, $new_height;//pixel in INT
    private $error_arr;//initialized at constructor with : "success"=>true, "msg"=>""
    function __construct($p_path_str="",$p_arr=array()) {//$p_arr[no_image_path,..]
	$this->debug_mode=0;
	$this->error_arr = array("success"=>true, "msg"=>"");
	if(!empty($p_path_str)){
	    $this->load_image($p_path_str);
	}
	if( isset($p_arr) && (count($p_arr)>0) ){
	    if(isset($p_arr["no_image_path"])){
		$this->no_image_path=$p_arr["no_image_path"];
	    }
	}
    }
    public function load_image($p_path_str){
	if(file_exists($p_path_str) || (isset($this->no_image_path) && !empty($this->no_image_path)) ){
	    $this->path_str = $p_path_str;
	    $this->max_width = -1;
	    $this->max_height = -1;
	    if(is_resource($this->img_source)){
		imagedestroy($this->img_source);
	    }

	    $image_sizes = getimagesize($this->path_str);
	    $this->orig_type = $image_sizes[2];
	    $this->orig_width = $image_sizes[0]; $this->new_width = $image_sizes[0];
	    $this->orig_height = $image_sizes[1]; $this->new_height = $image_sizes[1];

	    switch($image_sizes[2]){
		case IMAGETYPE_GIF:
		    $this->img_source = imagecreatefromgif($this->path_str);
		    break;
		case IMAGETYPE_JPEG:
		    $this->img_source = imagecreatefromjpeg($this->path_str);
		    break;
		case IMAGETYPE_PNG:
		    $this->img_source = imagecreatefrompng($this->path_str);
		    break;
		default :
		    $this->error_arr["success"] = false;
		    $this->error_arr["msg"] = "Error, image source is not supported. Must be upload JPEG, GIF and PNG only.";
		    break;
	    }
	}else{
	    $this->error_arr["success"] = false;
	    $this->error_arr["msg"] = "Error, file not exist <b>($this->path_str)</b>.";
//	    echo $this->error_arr["msg"];
	}
    }
    function set_max_size($p_arr){// $p_arr=array("max_width","max_height");
	if(!$this->error_arr["success"]){
	    echo $this->error_arr["msg"];
	    return;
	}
	//BEGIN INIT WITH ORIGINAL SIZE IN CASE NO NEDD TO RESIZE==================
	$new_width = $this->orig_width;
	$new_height = $this->orig_height;
	//END INIT WITH ORIGINAL SIZE IN CASE NO NEDD TO RESIZE==================
	if(!isset($p_arr) || 
		(!isset($p_arr["max_width"]) && !isset($p_arr["max_height"]))
	    ){
	    return;
	}
	if(isset($p_arr["max_width"]) && isset($p_arr["max_height"])){
	    if($this->orig_width > $this->orig_height){
		$ratio = $this->orig_width / $this->orig_height;
		$new_width = $p_arr["max_width"];
		$new_height = ceil($new_width / $ratio);
		if($new_height > $p_arr["max_height"]){
		    $new_height = $p_arr["max_height"];
		    $new_width = ceil($new_height * $ratio);
		}
	    }elseif($this->orig_height > $this->orig_width){
		$ratio = $this->orig_height / $this->orig_width;
		$new_height = $p_arr["max_height"];
		$new_width = ceil($new_height / $ratio);
		if($new_width > $p_arr["max_width"]){
		    $new_width = $p_arr["max_width"];
		    $new_height = ceil($new_width * $ratio);
		}
	    }elseif($this->orig_width == $this->orig_height){
		$new_width = $p_arr["max_width"];
		$new_height = $new_width;
		if($new_height > $p_arr["max_height"]){
		    $new_height = $p_arr["max_height"];
		    $new_width = $new_height;
		}
	    }
	}elseif(isset($p_arr["max_width"]) && !isset($p_arr["max_height"])){
	    if($this->orig_width > $p_arr["max_width"]){
		$ratio = $this->orig_width / $this->orig_height;
		$new_width = $p_arr["max_width"];
		$new_height = $new_width / $ratio;
	    }
	}elseif(!isset($p_arr["max_width"]) && isset($p_arr["max_height"])){
	    if($this->orig_height > $p_arr["max_height"]){
		$ratio = $this->orig_width / $this->orig_height;
		$new_height = $p_arr["max_height"];
		$new_width = $new_height * $ratio;
	    }
	}
	
	//FINAL MAIN PROCEDURE=================
	$this->new_width = $new_width;
	$this->new_height = $new_height;
    }
    private function gen_image_dest($p_orig_type = -1){//$p_arr("watermark"=>array("path","percent"))
//	echo $this->new_width."/". $this->new_height;
	if(!$this->error_arr["success"]){
	    return;
	}
	$type = ($p_orig_type == -1) ? $this->orig_type : $p_orig_type;
	$img_dest = imagecreatetruecolor($this->new_width, $this->new_height);
	$img_src = $this->img_source;
	if(is_resource($this->wm_resource)){
	    imagecopy($img_src,$this->wm_resource, $this->wm_pos_x, $this->wm_pos_y,0,0,$this->wm_nw,$this->wm_nh);
	}
	switch($type){
	    case IMAGETYPE_GIF:
		$bg_white = imagecolorallocate($img_dest,  255, 255, 255);
		imagefilledrectangle($img_dest, 0, 0, $this->new_width, $this->new_height, $bg_white);
		imagecopyresampled($img_dest, $this->img_source, 0, 0, 0, 0,
			$this->new_width, $this->new_height, $this->orig_width, $this->orig_height);
		break;
	    case IMAGETYPE_JPEG:
		$bg_white = imagecolorallocate($img_dest,  255, 255, 255);
		imagefilledrectangle($img_dest, 0, 0, $this->new_width, $this->new_height, $bg_white);
		imagecopyresampled($img_dest, $this->img_source, 0, 0, 0, 0,
			$this->new_width, $this->new_height, $this->orig_width, $this->orig_height);
		break;
	    case IMAGETYPE_PNG:
		imagealphablending( $img_dest, false );
		imagesavealpha( $img_dest, true );
		imagecopyresampled($img_dest, $this->img_source, 0, 0, 0, 0,
			$this->new_width, $this->new_height, $this->orig_width, $this->orig_height);
		break;
	}
	return $img_dest;
    }
    public function show($p_arr=array("orig_type" => -1, "jpeg_quality" => 90, "png_compress" => 9, 
	    "cache"=>array("max_age"=>900)
	)){
	$cache_max_age = defined('CACHE_MAX_AGE') ? CACHE_MAX_AGE : $p_arr["cache"]["max_age"];
	$ret_image = null;
	$type = ($p_arr["orig_type"] == -1) ? $this->orig_type : $p_arr["orig_type"];
	$arr_state=array("success"=>true,"message"=>"");

	$gen_image_dest=$this->gen_image_dest($p_arr["orig_type"]);
	
	$modified_date = gmdate('D, d M Y H:i:s', filemtime($this->path_str));

	header("Cache-Control : max-age=$cache_max_age, public");
	header("Etag:".md5($modified_date));
	switch($type){
	    case IMAGETYPE_GIF:
		if(!$this->debug_mode==1){
		    header("Content-Type: image/gif");
		    header('Last-Modified: '.$modified_date.' GMT', true, 200);
		}
		$ret_image = imagegif($gen_image_dest) or die("Failed to generate image");
		break;
	    case IMAGETYPE_JPEG:
		if(!$this->debug_mode==1){
		    header("Content-Type: image/jpg");
		    header('Last-Modified: '.$modified_date.' GMT', true, 200);
		}
		$ret_image = imagejpeg($gen_image_dest, NULL, $p_arr["jpeg_quality"]);
		break;
	    case IMAGETYPE_PNG:
		if(!$this->debug_mode==1){
		    header("Content-Type: image/png");
		    header('Last-Modified: '.$modified_date.' GMT', true, 200);
		}
		$ret_image = imagepng($gen_image_dest, NULL, $p_arr["png_compress"]);
		break;
	    default :
		$arr_state["success"] = false;
		$arr_state["message"] .= "Error, image output type not supported. Must be only in JPEG, GIF or PNG.";
		break;
	}
	if($ret_image===false){
	    $arr_state["success"]=false;
	    $arr_state["message"] .= "There is unknown error when generating image.";
	}
	if($arr_state["success"]){
	    return $ret_image;
	}else{
	    echo $arr_state["message"];
	}
    }
    public function save($p_path_save, $p_orig_type = -1, $p_jpeg_quality = 90, $p_png_compress = 9){
//	$ret_image = null;
	$type = ($p_orig_type == -1) ? $this->orig_type : $p_orig_type;
	$arr_state=array("success"=>true,"message"=>"");
	$gen_image_dest = $this->gen_image_dest($p_orig_type);
	$is_success = true;
	switch($type){
	    case IMAGETYPE_GIF:
		$is_success = imagegif($gen_image_dest, $p_path_save);
		break;
	    case IMAGETYPE_JPEG:
		$is_success = imagejpeg($gen_image_dest, $p_path_save, $p_jpeg_quality);
		break;
	    case IMAGETYPE_PNG:
		$is_success = imagepng($gen_image_dest, $p_path_save, $p_png_compress);
		break;
	    default :
		$arr_state["success"] = false;
		$arr_state["message"] .= "Error, image output type not supported. Must be only in JPEG, GIF or PNG.";
		break;
	}
	if($is_success === false){
            $arr_state["success"] = false;
	    $arr_state["message"] .= "There is unknown error when trying to save image.";
	}
	return $arr_state;
    }
    public function watermark_set($p_arr=array("path","percent")){
	if(!$this->error_arr["success"]){
	    echo $this->error_arr["msg"];
	    return;
	}
	if(is_resource($this->wm_resource)){
	    imagedestroy($this->wm_resource);
	}
	$wm_path=$p_arr["path"];
	$wm_percent=$p_arr["percent"];
	if(file_exists($wm_path)){
	    $wm_size=getimagesize($wm_path);

	    $wm_width=$wm_size[0];
	    $wm_height=$wm_size[1];
	    $image_type=$wm_size[2];

	    $wm_ratio=$wm_width/$wm_height;
	    $this->wm_nw=($wm_percent/100)*$this->orig_width;
	    $this->wm_nh=$this->wm_nw/$wm_ratio;

	    $this->wm_pos_x=($this->orig_width-$this->wm_nw)/2;
	    $this->wm_pos_y=($this->orig_height-$this->wm_nh)/2;

	    $wm_sumb=null;
	    switch($image_type){
		case IMAGETYPE_GIF:
		    $wm_sumb = imagecreatefromgif($wm_path);
		    break;
		case IMAGETYPE_JPEG:
		    $wm_sumb = imagecreatefromjpeg($wm_path);
		    break;
		case IMAGETYPE_PNG:
		    $wm_sumb = imagecreatefrompng($wm_path);
		    break;
		default :
		    $this->error_arr["success"] = false;
		    $this->error_arr["msg"] = "Error, watermarking image source is not supported. Must be upload JPEG, GIF and PNG only.";
		    break;
	    }
	    $wm_tuj=imagecreatetruecolor($this->wm_nw,$this->wm_nh);
	    imagealphablending($wm_tuj,false);
	    $wm_color_transparent=imagecolorallocatealpha($wm_tuj,0,0,0,127);
	    imagefill($wm_tuj,0,0,$wm_color_transparent);
	    imagecopyresampled($wm_tuj,$wm_sumb,0,0,0,0,$this->wm_nw,$this->wm_nh,$wm_width,$wm_height) or die("Failed to resize watermark");
	    $this->wm_resource=$wm_tuj;
//	    if(is_resource($wm_tuj)){
//		imagedestroy($wm_tuj);
//	    }
//	    imagecopy($ret_img,$wm_tuj,$wm_pos_x,$wm_pos_y,0,0,$wm_nw,$wm_nh);
	}
    }
    public function watermark_unset(){
	if(is_resource($this->wm_resource)){
	    imagedestroy($this->wm_resource);
	}
    }
    public function debug_mode(){
	$this->debug_mode = 1;
    }
    public function get_error($p_str_idx){
	return $this->error_arr[$p_str_idx];
    }
}
