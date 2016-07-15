<?php

class Util extends CI_Controller {

    function get_map_image_form() {
        echo '<form action="/util/get_map_image" method="GET">';
        echo '<input type=text name=image_url />';
        echo '<input type=submit />';
        echo '</form>';
    }

    function upload_form() {
        $this->load->helper('form');
        echo form_open_multipart('util/do_upload?f=upload');
        echo '<input type="file" name="upload" />';
        echo '<input type="submit" />';
    }

    function do_upload() {
        $content = array('success' => false);

        $f = $this->input->get('f');
        if ( ! $f) {
            $f = "upload";
        }
        $upload_config = array();
        $upload_config['upload_path'] = './temp/';
        $upload_config['file_name'] = $this->_gen_uuid();
        $upload_config['allowed_types'] = '*';
        $upload_config['max_size'] = 67108864;
        $this->load->library('upload', $upload_config);

        if ($this->upload->do_upload($f)) {
            $content['success'] = true;

            $upload_data = $this->upload->data();
            $this->load->library('aws');
                
            if (getimagesize($upload_data['full_path'])) {
                $imanip_config = array();
                $imanip_config['image_library'] = 'gd2';
                $imanip_config['source_image'] = $upload_data['full_path'];
                $imanip_config['create_thumb'] = TRUE;
                $imanip_config['maintain_ratio'] = TRUE;
                $imanip_config['width'] = 100;
                $imanip_config['height'] = 100;

                $this->load->library('image_lib', $imanip_config);

                $this->image_lib->resize();

                $thumb_path = "" . $upload_data['file_path'] . $upload_data['raw_name'] . "_thumb" . $upload_data['file_ext'];

                $this->aws->s3_put($thumb_path);
            }
            $url = $this->aws->s3_put($upload_data['full_path']);
            $content['data'] = $url;
        } else {
            $content['reason_text'] = $this->upload->display_errors('', '');
        }

        header('Content-type: application/json');
        echo json_encode($content);
    }

    function _gen_uuid() {
        return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
                        // 32 bits for "time_low"
                        mt_rand(0, 0xffff), mt_rand(0, 0xffff),
                        // 16 bits for "time_mid"
                        mt_rand(0, 0xffff),
                        // 16 bits for "time_hi_and_version",
                        // four most significant bits holds version number 4
                        mt_rand(0, 0x0fff) | 0x4000,
                        // 16 bits, 8 bits for "clk_seq_hi_res",
                        // 8 bits for "clk_seq_low",
                        // two most significant bits holds zero and one for variant DCE1.1
                        mt_rand(0, 0x3fff) | 0x8000,
                        // 48 bits for "node"
                        mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
        );
    }

    function get_plate_image() {
        $plate_text = "";
        $state = "PM";
        if ($this->input->get('plate')) {
            $plate_text = ($this->input->get('plate')) ? strtoupper($this->input->get('plate')) : $plate_text;
            $state = ($this->input->get('state')) ? strtoupper($this->input->get('state')) : $state;
        }

        $plate_text = substr($plate_text, 0, 7);

        header('Content-Type: image/png');

        $extension = '.png';            //extension of empty state plate image
        $imageFolder = 'img/state/';

        //probably want a font for each state
        $font = 'fonts/motorway';

        $size = 62; // default font size.

        $red = 0; // black text...
        $grn = 0;
        $blu = 0;

        $bg_red = 255; // on white background.
        $bg_grn = 255;
        $bg_blu = 255;

        // get the font height.
        $bounds = ImageTTFBBox($size, 0, $font, "W");
        $font_height = abs($bounds[7] - $bounds[1]);

        // determine bounding box.
        $bounds = ImageTTFBBox($size, 0, $font, $plate_text);

        $width = abs($bounds[4] - $bounds[6]);
        $height = abs($bounds[7] - $bounds[1]);

        $offset_y = $font_height + 10;
        $offset_x = 0;

        $textimage_handler = imagecreate($width + 1, $height + 1);

        $background = ImageColorAllocate($textimage_handler, $bg_red, $bg_grn, $bg_blu);
        $foreground = ImageColorAllocate($textimage_handler, $red, $grn, $blu);

        ImageColorTransparent($textimage_handler, $background);
        ImageInterlace($textimage_handler, false);

        // render the image
        ImageTTFText($textimage_handler, $size, 0, $offset_x, $offset_y, $foreground, $font, $plate_text);
        // $textimage_handler has text image resource.
        // load empty plate
        $platefile = $imageFolder . $state . $extension;
        $plateimage_handler = @imagecreatefrompng($platefile);

        //getting the image size for the original image
        $plateimage_width = imagesx($plateimage_handler);
        $plateimage_height = imagesy($plateimage_handler);

        $textimage_width = imagesx($textimage_handler);
        $textimage_height = imagesy($textimage_handler);

        $dest_x = ($plateimage_width - $textimage_width) / 2;
        $dest_y = ($plateimage_height - $textimage_height) / 2;

        imagecopy($plateimage_handler, $textimage_handler, $dest_x, $dest_y, 0, 0, $textimage_width, $textimage_height);

        // print image
        imagepng($plateimage_handler, null);
    }

    function get_map_image() {
        // File and new size
        $filename = 'http://teamrecon.nayeem.co/board/uploads/no_profile.png';

        if ($this->input->get('image_url')) {
            $filename = $this->input->get('image_url');
        }
        $newwidth = 40;
        $newheight = 40;

        // Content type
        header('Content-Type: image/jpeg');

        // Get new sizes
        list($width, $height) = getimagesize($filename);


        // Load
        $thumb = imagecreatetruecolor($newwidth, $newheight);
        $source = imagecreatefromjpeg($filename);

        // Resize
        imagecopyresized($thumb, $source, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);

        // Output
        imagejpeg($thumb);
    }

    function get_link_info() {
        ini_set('display_errors', 0);
        error_reporting(0);
        $content = array('success' => false);

        $url = $this->input->get('url');

        if ($url) {
            $html = file_get_contents($url);

            $dom = new DOMDocument();
            $dom->loadHTML($html);
            $dom->preserveWhiteSpace = false;

            $titles = $dom->getElementsByTagname('title');
            foreach ($titles as $title) {
                $linkTitle = $title->nodeValue;
            }

            $metas = $dom->getElementsByTagname('meta');

            foreach ($metas as $meta) {
                if ($meta->getAttribute("name") == "description") {
                    $linkDesc = $meta->getAttribute("content");
                }
            }

            $imgs = $dom->getElementsByTagname('img');

            foreach ($imgs as $img) {
                $firstImage = $img->getAttribute("src");

                if (strpos("http://", $firstImage) === false) {
                    $firstImage = $url . '/' . $firstImage;
                }

                break;
            }

            $data = array();

            $data['img'] = $firstImage;
            $data['title'] = $linkTitle;
            $data['desc'] = $linkDesc;

            $content['success'] = true;
            $content['data'] = $data;
        }

        header('Content-type: application/json');
        echo json_encode($content);
    }

}
