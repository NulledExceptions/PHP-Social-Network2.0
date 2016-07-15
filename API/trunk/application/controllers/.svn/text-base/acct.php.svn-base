<?php

class Acct extends CI_Controller {
    /*
      function login_form() {
      echo '<form action="/acct/login" method="POST">';
      echo '<input type=text name=sign_in_username_email />';
      echo '<input type=password name=sign_in_password />';
      echo '<input type=submit />';
      echo '</form><br />';
      echo '<form action="/acct/login" method="POST">';
      echo '<input type=text name=data />';
      echo '<input type=submit />';
      echo '</form>';
      }

      function logout_form() {
      echo '<form action="/acct/logout" method="POST">';
      echo '<input type=submit name=logout value=logout>';
      echo '</form><br>';
      echo '<form action="/acct/logout" method="POST">';
      echo '<input type=text name=logout />';
      echo '<input type=submit />';
      echo '</form>';
      }

      function register_form() {
      echo '<form action="/acct/register" method="POST">';
      echo '<input type=text name=sign_up_email />';
      echo '<input type=password name=sign_up_password />';
      echo '<input type=submit />';
      echo '</form><br />';
      echo '<form action="/acct/register" method="POST">';
      echo '<input type=text name=data />';
      echo '<input type=submit />';
      echo '</form>';
      }

      function profile_form() {
      echo '<form action="/acct/update_profile" method="POST">';
      echo '<input type=text name=data />';
      echo '<input type=submit />';
      echo '</form>';
      }

      function change_password_form() {
      echo '<form action="/acct/change_password" method="POST">';
      echo '<input type=text name=password_new />';
      echo '<input type=submit />';
      echo '</form>';
      }

      function forgot_password_form() {
      echo '<form action="/acct/forgot_password" method="POST">';
      echo '<input type=text name=forgot_password_email />';
      echo '<input type=submit />';
      echo '</form>';
      }
     */

    function login() {
        $this->load->library(array('account/authentication'));
        $this->load->model(array('account/account_model'));

        $content = array('success' => false);
        $data = array();

        if ($this->input->post('data')) {
            $data = json_decode($this->input->post('data'), true);
        } else if ($this->input->post()) {
            $data['sign_in_username_email'] = $this->input->post('sign_in_username_email');
            $data['sign_in_password'] = $this->input->post('sign_in_password');
            $data['sign_in_remember'] = $this->input->post('sign_in_remember');
        }
        
        if (!isset($data['sign_in_remember'])) {
             $data['sign_in_remember'] = false;
        }

        if ($this->authentication->is_signed_in()) {
            $content['success'] = true;
            $content['reason'] = 'signed_in';
            $content['reason_text'] = 'Already logged in';
        } else if (empty($data)) {
            $content['reason'] = 'invalid_input';
            $content['reason_text'] = 'Invalid post data';
        } else {
            $user = $this->account_model->get_by_username_email($data['sign_in_username_email']);
            if ( ! $user || ! $this->authentication->check_password($user->password, $data['sign_in_password'])) {
                $this->session->set_userdata('sign_in_failed_attempts', (int) $this->session->userdata('sign_in_failed_attempts') + 1);
                $content['reason'] = 'login_error';
                $content['reason_text'] = 'Username/email and password pair not found';
            } else {
                $this->session->unset_userdata('sign_in_failed_attempts');
                $this->authentication->sign_in($user->id, $data['sign_in_remember']);
                $content['success'] = true;
            }
        }
        header('Content-type: application/json');
        echo json_encode($content);
    }

    function logout() {
        $this->load->library(array('account/authentication'));
        $content = array('success' => false);

        if ( ! $this->authentication->is_signed_in()) {
            $content['success'] = true;
            $content['reason'] = 'signed_out';
            $content['reason_text'] = 'Not logged in';
        } else {
            if ($this->input->post('data')) {
                $data = json_decode($this->input->post('data'), true);
                if ($data['logout']) {
                    $this->authentication->sign_out();
                    $content['success'] = true;
                }
            } else if ($this->input->post('logout')) {
                $this->authentication->sign_out();
                $content['success'] = true;
            } else {
                $content['reason'] = 'invalid_input';
                $content['reason_text'] = 'Invalid post data';
            }
        }

        header('Content-type: application/json');
        echo json_encode($content);
    }

    function register() {
        $this->load->library(array('account/authentication'));
        $this->load->model(array('account/account_model', 'plates_model'));

        $content = array('success' => false);
        $data = array();

        if ($this->input->post('data')) {
            $data = json_decode($this->input->post('data'), true);
        } else if ($this->input->post()) {
            $data['sign_up_email'] = $this->input->post('sign_up_email');
            $data['sign_up_password'] = $this->input->post('sign_up_password');
        }


        if ($this->authentication->is_signed_in()) {
            $content['reason'] = 'signed_in';
            $content['reason_text'] = 'Already logged in';
        } else if (empty($data)) {
            $content['reason'] = 'invalid_input';
            $content['reason_text'] = 'Invalid post data';
        } else { //the input is valid
            if ($this->account_model->get_by_email($data['sign_up_email']) ? TRUE : FALSE) {
                $content['reason'] = 'email_taken';
                $content['reason_text'] = 'The email is in use';
            } else {

                $user_id = $this->account_model->create($data['sign_up_email'], $data['sign_up_email'], $data['sign_up_password']);
                $this->authentication->sign_in($user_id);
                $plate_id = $this->plates_model->create_random_plate($this->session->userdata('account_id'));
                $this->account_model->update_plate_id($this->session->userdata('account_id'), $plate_id->id);
                $content['success'] = true;
            }
        }

        header('Content-type: application/json');
        echo json_encode($content);
    }

    function user() {
        $this->load->library(array('account/authentication'));
        $this->load->model(array('account/account_model'));

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
        } else {
            $user = $this->account_model->get_profile_by_id($account_id);
            $content['success'] = true;
            $content['data'] = $user;
        }

        header('Content-type: application/json');
        echo json_encode($content);
    }

    function update_profile() {
        $this->load->library(array('account/authentication'));
        $this->load->model(array('account/account_model'));

        $content = array('success' => false);
        $data = array();

        if ($this->input->post('data')) {
            $data = json_decode($this->input->post('data'), true);
        } else if ($this->input->post()) {
            $data['plate_id'] = $this->input->post('plate_id');
            $data['fname'] = $this->input->post('fname');
            $data['lname'] = $this->input->post('lname');
            $data['birthday'] = $this->input->post('birthday');
            $data['gender'] = $this->input->post('gender');
            $data['interested_in'] = $this->input->post('interested_in');
            $data['profile_pic_url'] = $this->input->post('profile_pic_url') ? $this->input->post('profile_pic_url') : NULL;
        }

        foreach ($data as $k => $v) {
            if ( ! $v) {
                unset($data[$k]);
            }
        }

        $account_id = 0;
        if (isset($data['account_id'])) {
            $account_id = $data['account_id'];
            unset($data['account_id']);
        } else if ($this->authentication->is_signed_in()) {
            $account_id = $this->session->userdata('account_id');
        }

        if ($account_id == 0) {
            $content['reason'] = 'signed_out';
            $content['reason_text'] = 'Not logged in and account_id not specified';
        } else if (empty($data)) {
            $content['reason'] = 'invalid_input';
            $content['reason_text'] = 'Invalid post data';
        } else {
            $this->account_model->update($account_id, $data);
            $content['success'] = true;
        }
        header('Content-type: application/json');
        echo json_encode($content);
    }

    function change_password() {
        $this->load->library(array('account/authentication'));
        $this->load->model(array('account/account_model'));

        $content = array('success' => false);
        $data = array();

        if ($this->input->post('data')) {
            $data = json_decode($this->input->post('data'), true);
        } else if ($this->input->post()) {
            $data['password_new'] = $this->input->post('password_new');
        }

        if ( ! $this->authentication->is_signed_in()) {
            $content['reason'] = 'signed_out';
            $content['reason_text'] = 'Not logged in';
        } else if (empty($data)) {
            $content['reason'] = 'invalid_input';
            $content['reason_text'] = 'Invalid post data';
        } else {
            $this->account_model->update_password($this->session->userdata('account_id'), $data['password_new']);
            $content['success'] = true;
        }
        header('Content-type: application/json');
        echo json_encode($content);
    }

    function forgot_password() {
        $this->load->library(array('account/authentication'));
        $this->load->model(array('account/account_model'));
        $this->load->config('account/account');
        $this->load->helper('url');

        $content = array('success' => false);
        $data = array();

        if ($this->input->post('data')) {
            $data = json_decode($this->input->post('data'), true);
        } else if ($this->input->post()) {
            $data['forgot_password_email'] = $this->input->post('forgot_password_email');
        }

        if ($this->authentication->is_signed_in()) {
            $content['reason'] = 'signed_in';
            $content['reason_text'] = 'Already logged in';
        } else if (empty($data)) {
            $content['reason'] = 'invalid_input';
            $content['reason_text'] = 'Invalid post data';
        } else {
            $user = $this->account_model->get_by_username_email($data['forgot_password_email']);
            if ( ! $user) {
                $content['reason'] = 'login_error';
                $content['reason_text'] = 'Email not found';
            } else {
                $time = $this->account_model->update_reset_sent_datetime($user->id);
                $password_reset_url = site_url('acct/reset_password?id=' . $user->id . '&token=' . sha1($user->id . $time . $this->config->item('password_reset_secret')));
                $content['success'] = true;
                $content['reset_url'] = $password_reset_url;
            }
        }
        header('Content-type: application/json');
        echo json_encode($content);
    }

    function reset_password() {
        $this->load->library(array('account/authentication'));
        $this->load->model(array('account/account_model'));
        $this->load->config('account/account');
        $this->load->helper('date');

        $content = array('success' => false);

        $account_id = 0;

        if ($this->input->get('id')) {
            $account_id = $this->input->get('id');
        }

        if ( ! $account_id) {
            $content['reason'] = 'invalid_input';
            $content['reason_text'] = 'Account not found';
        } else {
            $user = $this->account_model->get_by_id($account_id);
            if (now() < (strtotime($user->resetsenton) + $this->config->item("password_reset_expiration"))) {
                if ($this->input->get('token') == sha1($user->id . strtotime($user->resetsenton) . $this->config->item('password_reset_secret'))) {
                    $this->account_model->remove_reset_sent_datetime($user->id);
                    $this->authentication->sign_in($user->id);
                }
                $content['success'] = true;
            }
        }

        header('Content-type: application/json');
        echo json_encode($content);
    }

    function get_feed() {
        $this->load->library('account/authentication');
        $this->load->model('plates_model');

        $content = array('success' => false);

        $account_id = 0;
        if ($this->input->get('account_id')) {
            $account_id = $this->input->get('plate_id');
        } else if ($this->authentication->is_signed_in()) {
            $account_id = $this->session->userdata('account_id');
        }


        $this->load->model('wall_posts_model');
        $content['success'] = true;

        if ( ! $account_id) {
            $content['data'] = $this->wall_posts_model->get_local_feed();
        } else {
            $content['data'] = $this->wall_posts_model->get_feed($account_id);
        }

        header('Content-type: application/json');
        echo json_encode($content);
    }

    function get_local_feed() {
        $content = array('success' => true);

        $this->load->model('wall_posts_model');

        $content['data'] = $this->wall_posts_model->get_local_feed();

        header('Content-type: application/json');
        echo json_encode($content);
    }
    
    function update_token() {
        $this->load->library(array('account/authentication'));
        $this->load->model(array('account/account_model'));

        $content = array('success' => false);
        $data = array();

        if ($this->input->post('data')) {
            $data = json_decode($this->input->post('data'), true);
        } else if ($this->input->post()) {
            $data['account_id'] = $this->input->post('account_id');
            $data['token'] = $this->input->post('token');
        }

        $account_id = 0;
        if (isset($data['account_id']) && $data['account_id']) {
            $account_id = $data['account_id'];
            unset($data['account_id']);
        } else if ($this->authentication->is_signed_in()) {
            $account_id = $this->session->userdata('account_id');
        }

        if ($account_id == 0) {
            $content['reason'] = 'signed_out';
            $content['reason_text'] = 'Not logged in and account_id not specified';
        } else if (empty($data)) {
            $content['reason'] = 'invalid_input';
            $content['reason_text'] = 'Invalid post data';
        } else {
            $this->account_model->update_token($account_id, $data['token']);
            $content['success'] = true;
        }
        header('Content-type: application/json');
        echo json_encode($content);
    }
}
