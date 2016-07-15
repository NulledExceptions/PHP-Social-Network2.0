<?php

class Gallery extends CI_Controller {

    function upload_url_form() {
        echo '<form action="/gallery/upload" method="POST">';
        echo '<input type=text name=url value=url />';
        echo '<input type=text name=plate_id value=plate_id />';
        echo '<input type=submit />';
        echo '</form><br />';
    }

    function get_form() {
        echo '<form action="/gallery/get_imgs" method="get">';
        echo '<input type=text name=plate_id value=plate_id />';
        echo '<input type=submit />';
        echo '</form><br />';
    }

    function upload() {
        $this->load->library(array('account/authentication'));
        $this->load->model(array('gallery_model'));

        $content = array('success' => false);
        $data = array();

        if ($this->input->post('data')) {
            $data = json_decode($this->input->post('data'), true);
        } else if ($this->input->post()) {
            $data['url'] = $this->input->post('url');
            $data['plate_id'] = $this->input->post('plate_id');
            if ($this->input->post('media_type')){
                $data['media_type'] = $this->input->post('media_type');
            }
            if ($this->input->post('thumb_url')){
                $data['thumb_url'] = $this->input->post('thumb_url');
            }
        }

        if (!$this->authentication->is_signed_in()) {
            $content['reason'] = 'signed_out';
            $content['reason_text'] = 'Not logged in';
        } else if (empty($data)) {
            $content['reason'] = 'invalid_input';
            $content['reason_text'] = 'Invalid post data';
        } else {
       
        if ( ! isset($data['media_type'])) {
            $data['media_type'] = "image";
        }
        if ( ! isset($data['thumb_url'])) {
            $data['thumb_url'] = "";
        }
            
       $this->gallery_model->upload($this->session->userdata('account_id'), $data);           
       $content['success'] = true;
        }
        header('Content-type: application/json');
        echo json_encode($content);
    }
    
    function delete() {
        $this->load->library(array('account/authentication'));
        $this->load->model(array('gallery_model'));   
        
        if ($this->input->post('data')) {
            $data = json_decode($this->input->post('data'), true);
        } else if ($this->input->post()) {
            $data['media_id'] = $this->input->post('media_id');
        }
        
        if (!$this->authentication->is_signed_in()) {
            $content['reason'] = 'signed_out';
            $content['reason_text'] = 'Not logged in';
        } else if (empty($data)) {
            $content['reason'] = 'invalid_input';
            $content['reason_text'] = 'Invalid post data';
        } else {          
            $content['success'] = $this->gallery_model->delete($data['media_id']);
        }
        
        header('Content-type: application/json');
        echo json_encode($content);
    }

    function get_imgs() {
        
        $this->load->model('gallery_model');
        $content = array('success' => false);
        $data = array();
        if ($this->input->get('plate_id')) {
            $plate_id = $this->input->get('plate_id');
        }
        $images[] = array();
        $images = $this->gallery_model->get_images($plate_id);
        
        $content['success'] = true;
        
        $content['image'] = $images;
        header('Content-type: application/json');
        
 
        echo json_encode($content);
    }

}