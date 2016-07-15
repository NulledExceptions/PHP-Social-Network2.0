<?php

Class Five_star extends CI_Controller {
    /*
      function rate_form() {
      echo '<form action="/five_star/rate" method="POST">';
      echo '<input type=text name=rating />';
      echo '<input type=text name=wall_post_id />';
      echo '<input type=submit />';
      echo '</form><br />';
      }
     */

    function rate() {
        $this->load->library(array('account/authentication'));
        $this->load->model(array('five_star_model'));

        $content = array('success' => false);
        $data = array();

        if ($this->input->post('data')) {
            $data = json_decode($this->input->post('data'), true);
        } else if ($this->input->post()) {
            $data['wall_post_id'] = $this->input->post('wall_post_id');
            $data['rating'] = $this->input->post('rating');
        }


        if ( ! $this->authentication->is_signed_in()) {
            $content['reason'] = 'signed_out';
            $content['reason_text'] = 'Not logged in';
        } else if (empty($data)) {
            $content['reason'] = 'invalid_input';
            $content['reason_text'] = 'Invalid post data';
        } else {
            $this->five_star_model->rate_post($this->session->userdata('account_id'), $data['wall_post_id'], $data['rating']);
            $content['success'] = true;
        }
        header('Content-type: application/json');
        echo json_encode($content);
    }

    function get() {
        $this->load->library('account/authentication');

        $content = array('success' => false);

        $wall_post_id = 0;
        if ($this->input->get('wall_post_id')) {
            $wall_post_id = $this->input->get('wall_post_id');
        }

        if ( ! $wall_post_id) {
            $content['reason'] = 'invalid_input';
            $content['reason_text'] = 'No wall_post_id';
        } else {
            $this->load->model('five_star_model');

            $content['data'] = $this->five_star_model->get_ratings($wall_post_id);
            $content['success'] = true;
        }

        header('Content-type: application/json');
        echo json_encode($content);
    }

}
