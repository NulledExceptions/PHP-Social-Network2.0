<?php
class Notifications extends CI_Controller {
    function get() {
        $this->load->library(array('account/authentication'));
        $this->load->model(array('notifications_model'));

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
            $notifications = $this->notifications_model->get($account_id);
            $content['success'] = true;
            $content['data'] = $notifications;
        }

        header('Content-type: application/json');
        echo json_encode($content);
    }
    
    function hide() {
        $this->load->model(array('notifications_model'));

        $content = array('success' => false);
        $data = array();

        if ($this->input->post('data')) {
            $data = json_decode($this->input->post('data'), true);
        } else if ($this->input->post()) {
            $data['notification_id'] = $this->input->post('notification_id');
        }


        if (empty($data)) {
            $content['reason'] = 'invalid_input';
            $content['reason_text'] = 'Invalid post data';
        } else {
            $this->notifications_model->hide($data['notification_id']);
            $content['success'] = true;
        }
        header('Content-type: application/json');
        echo json_encode($content);
    }
}