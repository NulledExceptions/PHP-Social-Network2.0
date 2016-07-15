<?php

class Favorite extends CI_Controller {
    /*
      function add_form() {
      echo '<form action="/favorite/add" method="POST">';
      echo '<input type=text name=target_id />';
      echo '<input type=submit />';
      echo '</form>';
      }

      function remove_form() {
      echo '<form action="/favorite/remove" method="POST">';
      echo '<input type=text name=target_id />';
      echo '<input type=submit />';
      echo '</form>';
      }

      function confirm_form() {
      echo '<form action="/favorite/confirm" method="POST">';
      echo '<input type=text name=target_id />';
      echo '<input type=submit />';
      echo '</form>';
      }
     */

    function add() {

        $this->load->library(array('account/authentication'));
        $this->load->model(array('favorites_model', 'account/account_model'));

        $content = array('success' => false);
        $data = array();

        if ($this->input->post('data')) {
            $data = json_decode($this->input->post('data'), true);
        } else if ($this->input->post()) {
            $data['target_id'] = $this->input->post('target_id');
        }

        if ( ! $this->authentication->is_signed_in()) {
            $content['reason'] = 'signed_out';
            $content['reason_text'] = 'Not logged in';
        } else if (empty($data)) {
            $content['reason'] = 'invalid_input';
            $content['reason_text'] = 'Invalid post data';
        } else { //the input is valid
            if ($this->favorites_model->check_favorites($this->session->userdata('account_id'), $data['target_id'])) {
                $content['success'] = true;
                $content['reason'] = 'already_favorited';
                $content['reason_text'] = 'Already a favorite';
            } else {
                //double check this next line!
                $this->favorites_model->add_favorite($this->session->userdata('account_id'), $data['target_id']);
                $content['success'] = true;
            }
        }

        header('Content-type: application/json');
        echo json_encode($content);
    }

    function confirm() {
        $this->load->library(array('account/authentication'));
        $this->load->model(array('favorites_model', 'account/account_model'));

        $content = array('success' => false);
        $data = array();

        if ($this->input->post('data')) {
            $data = json_decode($this->input->post('data'), true);
        } else if ($this->input->post()) {
            $data['target_id'] = $this->input->post('target_id');
        }

        if ( ! $this->authentication->is_signed_in()) {
            $content['reason'] = 'signed_out';
            $content['reason_text'] = 'Not logged in';
        } else if (empty($data)) {
            $content['reason'] = 'invalid_input';
            $content['reason_text'] = 'Account id not given and user not logged in OR no target id';
        } else { //the input is valid
            $content['success'] = true;
            $this->favorites_model->confirm_user($this->session->userdata('account_id'), $data['target_id']);
        }

        header('Content-type: application/json');
        echo json_encode($content);
    }

    function remove() {

        $this->load->library(array('account/authentication'));
        $this->load->model(array('favorites_model', 'account/account_model'));

        $content = array('success' => false);
        $data = array();

        if ($this->input->post('data')) {
            $data = json_decode($this->input->post('data'), true);
        } else if ($this->input->post()) {
            $data['target_id'] = $this->input->post('target_id');
        }

        if ( ! $this->authentication->is_signed_in()) {
            $content['reason'] = 'signed_out';
            $content['reason_text'] = 'Not logged in';
        } else if (empty($data)) {
            $content['reason'] = 'invalid_input';
            $content['reason_text'] = 'Invalid post data';
        } else { //the input is valid
            $this->favorites_model->remove_favorite($this->session->userdata('account_id'), $data['target_id']);
            $content['success'] = true;
        }

        header('Content-type: application/json');
        echo json_encode($content);
    }

    function get() {
        $this->load->library(array('account/authentication'));
        $this->load->model(array('favorites_model', 'account/account_model'));

        $content = array('success' => false);

        $account_id = 0;
        if ($this->input->get('account_id')) {
            $account_id = $this->input->get('account_id');
        } else if ($this->authentication->is_signed_in()) {
            $account_id = $this->session->userdata('account_id');
        }


        if ( ! $account_id) {
            $content['reason'] = 'invalid_input';
            $content['reason_text'] = 'Account id not given and user not logged in';
        } else { //the input is valid
            $content['success'] = true;
            $content['data'] = $this->favorites_model->get_confirmed_favorites($account_id);
        }

        header('Content-type: application/json');
        echo json_encode($content);
    }

    function get_pending() {
        $this->load->library(array('account/authentication'));
        $this->load->model(array('favorites_model', 'account/account_model'));

        $content = array('success' => false);

        $account_id = 0;
        if ($this->input->get('account_id')) {
            $account_id = $this->input->get('account_id');
        } else if ($this->authentication->is_signed_in()) {
            $account_id = $this->session->userdata('account_id');
        }


        if ( ! $account_id) {
            $content['reason'] = 'invalid_input';
            $content['reason_text'] = 'Account id not given and user not logged in';
        } else { //the input is valid
            $content['success'] = true;
            $content['data'] = $this->favorites_model->get_unconfirmed_favorites($account_id);
        }

        header('Content-type: application/json');
        echo json_encode($content);
    }

    function check() {
        $this->load->library(array('account/authentication'));
        $this->load->model(array('favorites_model', 'account/account_model'));

        $content = array('success' => false);

        $favorite_id = 0;
        $account_id = 0;
        if ($this->input->get('favorite_id')) {
            $favorite_id = $this->input->get('favorite_id');
            $account_id = $this->input->get('account_id');
        }

        if ( ! $account_id && $this->authentication->is_signed_in()) {
            $account_id = $this->session->userdata('account_id');
        }


        if ( ! $account_id) {
            $content['reason'] = 'invalid_input';
            $content['reason_text'] = 'Account id not given and user not logged in';
        } else if ( ! $favorite_id) {
            $content['reason'] = 'invalid_input';
            $content['reason_text'] = 'Favorite ID not given';
        } else if ($account_id == $favorite_id) {
            $content['reason'] = 'self_check';
            $content['reason_text'] = 'You cannot be friends with yourself';
        } else { //the input is valid
            $content['success'] = true;
            $content['data'] = array(
                'is_favorite' => $this->favorites_model->check_favorites($account_id, $favorite_id),
                'is_pending' => $this->favorites_model->check_pending($account_id, $favorite_id)
            );
        }

        header('Content-type: application/json');
        echo json_encode($content);
    }

}