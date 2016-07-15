 <?php

class Plate extends CI_Controller {

    function get() {
        $this->load->library('account/authentication');
        $this->load->model('plates_model');

        $content = array('success' => false);

        $plate = 0;
        if ($this->input->get('plate')) {
            $query = strtoupper($this->input->get('plate'));
            $state = strtoupper($this->input->get('state'));
            $plate = $this->plates_model->get_plate_by_plate($query, $state);
        } else if ($this->input->get('plate_id')) {
            $plate_id = $this->input->get('plate_id');
            $plate = $this->plates_model->get_plate_by_plate_id($plate_id);
        } else if ($this->authentication->is_signed_in()) {
            $plate = $this->plates_model->get_plate_by_account_id($this->session->userdata('account_id'));
        }

        if ( ! $plate) {
            $content['reason'] = 'invalid_input';
            $content['reason_text'] = 'Account id not given and user not logged in';
        } else {
            $content['success'] = true;
            $content['data'] = $plate;
        }

        header('Content-type: application/json');
        echo json_encode($content);
    }

    function get_by_account() {
        $this->load->library('account/authentication');
        $this->load->model('plates_model');

        $content = array('success' => false);

        $account_id = $this->input->get('account_id');
        if ( ! $account_id) {
            if ($this->authentication->is_signed_in()) {
                $account_id = $this->session->userdata('account_id');
            }
        }

        if ( ! $account_id) {
            $content['reason'] = 'invalid_input';
            $content['reason_text'] = 'Account id not given and user not logged in';
        } else {
            $content['success'] = true;
            $content['data'] = $this->plates_model->get_plates_by_account_id($account_id);
        }

        header('Content-type: application/json');
        echo json_encode($content);
    }

    function get_wall() {
        $this->load->library('account/authentication');
        $this->load->model('plates_model');

        $content = array('success' => false);

        $plate_id = 0;
        if ($this->input->get('plate_id')) {
            $plate_id = $this->input->get('plate_id');
        } else if ($this->authentication->is_signed_in()) {
            $plate = $this->plates_model->get_plate_by_account_id($this->session->userdata('account_id'));
            $plate_id = $plate->id;
        }

        if ( ! $plate_id) {
            $content['reason'] = 'invalid_input';
            $content['reason_text'] = 'Plate id not given and user not logged in';
        } else {
            $this->load->model('wall_posts_model');

            $content['success'] = true;
            $content['data'] = $this->wall_posts_model->get_wall_posts($plate_id);
        }

        header('Content-type: application/json');
        echo json_encode($content);
    }

    function update_plate() {
        $this->load->model(array('plates_model'));

        $content = array('success' => false);
        $data = array();

        if ($this->input->post('data')) {
            $data = json_decode($this->input->post('data'), true);
        } else if ($this->input->post()) {
            $data['make'] = $this->input->post('make') ? $this->input->post('make') : NULL;
            $data['model'] = $this->input->post('model') ? $this->input->post('model') : NULL;
            $data['year'] = $this->input->post('year') ? $this->input->post('year') : NULL;
            $data['color'] = $this->input->post('color') ? $this->input->post('color') : NULL;
            $data['state'] = $this->input->post('state') ? $this->input->post('state') : NULL;
            $data['access'] = $this->input->post('access') ? $this->input->post('access') : NULL;
            $data['plate_pic_url'] = $this->input->post('plate_pic_url') ? $this->input->post('plate_pic_url') : NULL;
            $data['id'] = $this->input->post('plate_id') ? $this->input->post('plate_id') : NULL;
        }

        if (empty($data)) {
            $content['reason'] = 'invalid_input';
            $content['reason_text'] = 'Invalid post data';
        } else {
            $this->plates_model->update($data['id'], $data);
            $content['success'] = true;
        }
        header('Content-type: application/json');
        echo json_encode($content);
    }

    function update_location() {
        $this->load->model(array('plates_model'));

        $content = array('success' => false);
        $data = array();

        if ($this->input->post('data')) {
            $data = json_decode($this->input->post('data'), true);
        } else if ($this->input->post()) {
            $data['plate_id'] = $this->input->post('plate_id');
            $data['lat'] = $this->input->post('lat');
            $data['lon'] = $this->input->post('lon');
        }

        if (empty($data)) {
            $content['reason'] = 'invalid_input';
            $content['reason_text'] = 'Invalid post data';
        } else {
            $plate_id = $data['plate_id'];
            unset($data['plate_id']);
            $this->plates_model->update($plate_id, $data);
            $content['success'] = true;
        }
        header('Content-type: application/json');
        echo json_encode($content);
    }

    function post() {
        $this->load->library(array('account/authentication'));
        $this->load->model(array('wall_posts_model'));

        $content = array('success' => false);
        $data = array();

        if ($this->input->post('data')) {
            $data = json_decode($this->input->post('data'), true);
        } else if ($this->input->post()) {
            $account_id = $this->input->post('account_id');
            $data['plate_id'] = $this->input->post('plate_id');
            $data['content'] = $this->input->post('content');
            $data['parent_id'] = ($this->input->post('parent_id')) ? $this->input->post('parent_id') : 0;
            if ($this->input->post('img_url')) {
                $data['img_url'] = $this->input->post('img_url');
            }
            if ($this->input->post('vid_url')) {
                $data['vid_url'] = $this->input->post('vid_url');
            }
            if ($this->input->post('vid_thumb_url')) {
                $data['vid_thumb_url'] = $this->input->post('vid_thumb_url');
            }
            if ($this->input->post('link_url')) {
                $data['link_url'] = $this->input->post('link_url');
            }
            if ($this->input->post('anon')) {
                $data['anon'] = $this->input->post('anon');
            }
        }

        if ( ! isset($data['img_url'])) {
            $data['img_url'] = "";
        }
        if ( ! isset($data['vid_url'])) {
            $data['vid_url'] = "";
        }
        if ( ! isset($data['vid_thumb_url'])) {
            $data['vid_thumb_url'] = "";
        }
        if ( ! isset($data['link_url'])) {
            $data['link_url'] = "";
        }
        if ( ! isset($data['anon'])) {
            $data['anon'] = false;
        }
        
        $account_id = $this->session->userdata('account_id');
        
        if (! $account_id || $data['anon']) {
            $account_id = 0;
        }

        if ($data['content']) {
            $this->wall_posts_model->post($account_id, $data['plate_id'], $data['content'], $data['parent_id'], $data['img_url'], $data['vid_url'], $data['link_url'], $data['vid_thumb_url']);
        }
        $content['success'] = true;

        header('Content-type: application/json');
        echo json_encode($content);
    }

    function delete() {
        $this->load->library(array('account/authentication'));
        $this->load->model(array('wall_posts_model'));

        $content = array('success' => false);
        $data = array();

        if ($this->input->post('data')) {
            $data = json_decode($this->input->post('data'), true);
        } else if ($this->input->post()) {
            $data['wall_post_id'] = $this->input->post('wall_post_id');
        }

        if ( ! $this->authentication->is_signed_in()) {
            $content['reason'] = 'signed_out';
            $content['reason_text'] = 'Not logged in';
        } else if (empty($data)) {
            $content['reason'] = 'invalid_input';
            $content['reason_text'] = 'Invalid post data';
        } else {
            $content['success'] = $this->wall_posts_model->delete_post($this->session->userdata('account_id'), $data['wall_post_id']);
            if ( ! $content['success']) {
                $content['reason'] = 'not_owner';
                $content['reason_text'] = 'User is not owner of comment or plate';
            }
        }
        header('Content-type: application/json');
        echo json_encode($content);
    }

    function assoc_user() {
        $this->load->library(array('account/authentication'));
        $this->load->model('plates_model');

        $content = array('success' => false);
        $data = array();

        $data['account_id'] = 0;
        if ($this->input->post('data')) {
            $data = json_decode($this->input->post('data'), true);
        } else if ($this->input->post()) {
            $data['plate_id'] = $this->input->post('plate_id');
            $data['account_id'] = $this->input->post('account_id');
        }

        if ( ! isset($data['account_id']) || ! $data['account_id']) {
            if ( ! $this->authentication->is_signed_in()) {
                $content['reason'] = 'signed_out';
                $content['reason_text'] = 'Not logged in';
            } else {
                $data['account_id'] = $this->session->userdata('account_id');
            }
        }

        if (empty($data)) {
            $content['reason'] = 'invalid_input';
            $content['reason_text'] = 'Invalid post data';
        } else {
            if ( ! ($content['success'] = $this->plates_model->associate_user($this->session->userdata('account_id'), $data['plate_id']))) {
                $content['reason'] = 'taken';
                $content['reason_text'] = 'Plate already associated with a user';
            }
        }
        header('Content-type: application/json');
        echo json_encode($content);
    }

    function update_average() {
        $this->load->library('account/authentication');

        $content = array('success' => false);

        $wall_post_id = 0;
        if ($this->input->get('wall_post_id')) {
            $wall_post_id = $this->input->get('wall_post_id');
        }

        if ( ! $wall_post_id) {
            $content['reason'] = 'invalid_input';
            $content['reason_text'] = 'Plate id not given and user not logged in';
        } else {
            $this->load->model('wall_posts_model');

            $content['success'] = true;
            $this->wall_posts_model->update_average($wall_post_id);
        }

        header('Content-type: application/json');
        echo json_encode($content);
    }

    function get_wall_favorite() {
        $this->load->library('account/authentication');
        $this->load->model(array('plates_model', 'favorites_model'));

        $content = array('success' => false);

        if ($this->input->get('plate_id')) {
            $plate_id = $this->input->get('plate_id');
        }
        if ($this->authentication->is_signed_in()) {
            $account_id = $this->session->userdata('account_id');
        }

        if ( ! $plate_id) {
            $content['reason'] = 'invalid_input';
            $content['reason_text'] = 'Plate id not given and user not logged in';
        }
        if ( ! $account_id) {
            $content['success'] = 'false';
            $content['reason'] = 'You are not logged in! Only favorites of this person can view';
        }

        $plate_id_owner = $this->plates_model->get_account_id_by_plate_id($plate_id);

        // $content['test']=$plate_id_owner;
        $result = $this->favorites_model->check_favorites($plate_id_owner->account_id, $account_id);
        if ( ! $result) {
            $content['success'] = 'false';
            $content['reason'] = "You are not on this person's frineds list, only friends can view";
        } else {
            $this->load->model('wall_posts_model');

            $content['success'] = true;
            $content['data'] = $this->wall_posts_model->get_wall_posts($plate_id);
        }

        header('Content-type: application/json');
        echo json_encode($content);
    }

}
