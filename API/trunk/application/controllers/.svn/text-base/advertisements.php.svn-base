<?php

class Advertisements extends CI_Controller {

    function submit_ad() {
        echo '<form action="/advertisements/submit" method="POST">';
        echo '<input type=text name=content value=content />';
        echo '<input type=title name=title value=title />';
        echo '<input type=text name=budget value=budget />';
        echo '<input type=text name=audience value=audience />';
        echo '<input type=text name=location value=location />';
        echo '<input type=text name=schedule value=schdule />';
        echo '<input type=submit />';
        echo '</form><br>';
    }

    function submit() {
        $this->load->library(array('account/authentication'));
        $this->load->model(array('advertisements_model', 'account/account_model'));

        $content = array('success' => false);
        $data = array();

        if ($this->input->post('data')) {
            $data = json_decode($this->input->post('data'), true);
        } else if ($this->input->post()) {
            $data['title'] = $this->input->post('title') ? $this->input->post('title') : NULL;
            $data['body'] = $this->input->post('body') ? $this->input->post('body') : NULL;
            $data['payment'] = $this->input->post('payment') ? $this->input->post('payment') : NULL;
            $data['budget'] = $this->input->post('budget') ? $this->input->post('budget') : NULL;
            $data['schedule'] = $this->input->post('schedule') ? $this->input->post('schedule') : NULL;
            $data['location'] = $this->input->post('location') ? $this->input->post('location') : NULL;
            $data['audience'] = $this->input->post('audience') ? $this->input->post('audience') : NULL;
        }


        if (!$this->authentication->is_signed_in()) {
            $content['reason'] = 'not_signed_in';
            $content['reason_text'] = 'Must log in';
        } else if (empty($data)) {
            $content['reason'] = 'invalid_input';
            $content['reason_text'] = 'Invalid post data';
        } else { //the input is valid
            $data['account_id'] = $this->session->userdata('account_id');
            if (!$data['account_id']) {
                $content['reason'] = 'invalid_user';
                $content['reason_text'] = 'user not logged in';
            } else {


                $this->advertisements_model->submit($data);

                $content['success'] = true;
            }
        }

        header('Content-type: application/json');
        echo json_encode($content);
    }

    function get() {
        $content = array();

        $this->load->model('advertisements_model');
        $content['success'] = true;
        $content['data'] = $this->advertisements_model->get();

        header('Content-type: application/json');
        echo json_encode($content);
    }

}