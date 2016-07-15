<?php

class Follower extends CI_Controller {
    /*
      function add_form() {
      echo '<form action="/follower/add" method="POST">';
      echo '<input type=text name=plate_id />';
      echo '<input type=submit />';
      echo '</form>';
      }

      function remove_form() {
      echo '<form action="/follower/remove" method="POST">';
      echo '<input type=text name=plate_id />';
      echo '<input type=submit />';
      echo '</form>';
      }

      function get_followers_wall_form() {
      echo '<form action="/follower/get_followers_wall" method="get">';
      echo '<input type=text name=plate_id value=plate_id />';
      echo '<input type=submit />';
      echo '</form>';
      }
     */

    function add() {

        $this->load->library(array('account/authentication'));
        $this->load->model(array('followers_model', 'account/account_model'));

        $content = array('success' => false);
        $data = array();

        if ($this->input->post('data')) {
            $data = json_decode($this->input->post('data'), true);
        } else if ($this->input->post()) {
            $data['plate_id'] = $this->input->post('plate_id');
        }


        if ( ! $this->authentication->is_signed_in()) {
            $content['reason'] = 'signed_out';
            $content['reason_text'] = 'Not logged in';
        } else if (empty($data)) {
            $content['reason'] = 'invalid_input';
            $content['reason_text'] = 'Invalid post data';
        } else { //the input is valid
            if ($this->followers_model->check_if_follower($data['plate_id'], $this->session->userdata('account_id'))) {
                $content['reason'] = 'already_following';
                $content['reason_text'] = 'Already following';
            } else {
                //double check this next line!
                $this->followers_model->add_follower($data['plate_id'], $this->session->userdata('account_id'));
                $content['success'] = true;
            }
        }

        header('Content-type: application/json');
        echo json_encode($content);
    }

    function remove() {

        $this->load->library(array('account/authentication'));
        $this->load->model(array('followers_model', 'account/account_model'));

        $content = array('success' => false);
        $data = array();

        if ($this->input->post('data')) {
            $data = json_decode($this->input->post('data'), true);
        } else if ($this->input->post()) {
            $data['plate_id'] = $this->input->post('plate_id');
        }

        if ( ! $this->authentication->is_signed_in()) {
            $content['reason'] = 'signed_out';
            $content['reason_text'] = 'Not logged in';
        } else if (empty($data)) {
            $content['reason'] = 'invalid_input';
            $content['reason_text'] = 'Invalid post data';
        } else { //the input is valid
            $this->followers_model->remove_follower($data['plate_id'], $this->session->userdata('account_id'));
            $content['success'] = true;
        }

        header('Content-type: application/json');
        echo json_encode($content);
    }

    function get() {
        $this->load->library(array('account/authentication'));
        $this->load->model(array('followers_model', 'account/account_model'));

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
            $content['data'] = $this->followers_model->get_following($account_id);
        }

        header('Content-type: application/json');
        echo json_encode($content);
    }

    function check() {
        $this->load->library(array('account/authentication'));
        $this->load->model(array('followers_model', 'account/account_model', 'plates_model'));

        $content = array('success' => false);

        $plate_id = 0;
        $account_id = 0;
        if ($this->input->get('plate_id')) {
            $plate_id = $this->input->get('plate_id');
            $account_id = $this->input->get('account_id');
        }

        if ( ! $account_id && $this->authentication->is_signed_in()) {
            $account_id = $this->session->userdata('account_id');
        }

        if ( ! $account_id) {
            $content['reason'] = 'invalid_input';
            $content['reason_text'] = 'Account id not given and user not logged in';
        } else if ( ! $plate_id) {
            $content['reason'] = 'invalid_input';
            $content['reason_text'] = 'Plate ID not given';
        } else { //the input is valid
            if ($this->plates_model->is_owned_by($plate_id, $account_id)) {
                $content['reason'] = 'self_check';
                $content['reason_text'] = 'You cannot follow your own plate';
            } else {
                $content['success'] = true;
                $content['data'] = array(
                    'is_following' => $this->followers_model->check_if_follower($account_id, $plate_id)
                );
            }
        }

        header('Content-type: application/json');
        echo json_encode($content);
    }

    function get_followers_wall() {
        $this->load->library(array('account/authentication'));
        $this->load->model(array('wall_posts_model', 'account/account_model', 'followers_model'));

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

            $myFollowers = $this->followers_model->get_following_plateids($account_id);
            $content['test'] = $myFollowers;
            //$content['data'] = $this->wall_posts_model->get_followers_wall_posts($myFollowers);
            echo var_dump($myFollowers);
        }
    }

}