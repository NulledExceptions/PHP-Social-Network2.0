<?php

class Pm extends CI_Controller {
    /*
      function send_form() {
      echo '<form action="/pm/send" method="POST">';
      echo '<input type=text name=receiver_id value=reciver_id />';
      echo '<input type=text name=content value=content />';
      echo '<input type=submit />';
      echo '</form><br />';
      }
     */

    function send() {
        $this->load->library(array('account/authentication'));
        $this->load->model(array('private_messages_model'));

        $content = array('success' => false);
        $data = array();

        if ($this->input->post('data')) {
            $data = json_decode($this->input->post('data'), true);
        } else if ($this->input->post()) {
            $data['receiver_id'] = $this->input->post('receiver_id');
            $data['content'] = $this->input->post('content');
        }


        if ( ! $this->authentication->is_signed_in()) {
            $content['reason'] = 'signed_out';
            $content['reason_text'] = 'Not logged in';
        } else if (empty($data)) {
            $content['reason'] = 'invalid_input';
            $content['reason_text'] = 'Invalid post data';
        } else {
            $this->private_messages_model->send_message($this->session->userdata('account_id'), $data['receiver_id'], $data['content']);
            $content['success'] = true;
        }
        header('Content-type: application/json');
        echo json_encode($content);
    }

    function get() {
        $this->load->library('account/authentication');
        $this->load->model('private_messages_model');

        $content = array('success' => false);

        if ( ! $this->authentication->is_signed_in()) {
            $content['reason'] = 'signed_out';
            $content['reason_text'] = 'Not logged in';
        } else {
            $content['data'] = $this->private_messages_model->get_all_messages($this->session->userdata('account_id'));
            $content['success'] = true;
        }

        header('Content-type: application/json');
        echo json_encode($content);
    }

}