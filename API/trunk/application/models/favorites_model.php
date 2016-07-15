<?php

class Favorites_model extends CI_Model {

    var $_table = "favorites";
    var $confirmed_user = 1;
    var $unconfirmed_user = 0;

    function add_favorite($source_id, $target_id) {
        $this->load->helper('date');
        $data = array(
            'source_id' => $source_id,
            'target_id' => $target_id,
            'confirmed' => $this->unconfirmed_user,
            'createdon' => mdate('%Y-%m-%d %H:%i:%s', now())
        );
        $this->db->insert($this->_table, $data);

        $this->load->model('account/account_model');
        $actor = $this->account_model->get_by_id($source_id);

        $this->load->model('notifications_model');
        $this->notifications_model->add($target_id, 'account', $actor->id, "$actor->fname $actor->lname has requested to be your favorite", "fav_req");
    }

    function remove_favorite($source_id, $target_id) {
        $data = array(
            'source_id' => $source_id,
            'target_id' => $target_id
        );
        $this->db->delete($this->_table, $data);
        $data = array(
            'source_id' => $target_id,
            'target_id' => $source_id
        );
        $this->db->delete($this->_table, $data);
    }

    function confirm_user($source_id, $target_id) {
        $this->db->where('source_id', $target_id);
        $this->db->where('target_id', $source_id);
        $this->db->where('confirmed', $this->unconfirmed_user);
        $result = $this->db->get($this->_table);

        if ($result->num_rows > 0) {
            $data2 = array(
                'confirmed' => $this->confirmed_user
            );
            $this->db->where('source_id', $target_id);
            $this->db->where('target_id', $source_id);
            $this->db->update($this->_table, $data2);
            $this->load->helper('date');
            $data = array(
                'source_id' => $source_id,
                'target_id' => $target_id,
                'confirmed' => $this->confirmed_user,
                'createdon' => mdate('%Y-%m-%d %H:%i:%s', now())
            );
            $this->db->insert($this->_table, $data);

            $this->load->model('account/account_model');
            $actor = $this->account_model->get_by_id($source_id);

            $this->load->model('notifications_model');
            $this->notifications_model->add($target_id, 'account', $actor->id, "$actor->fname $actor->lname has accepted your favorite request", "favorite");
        }
    }

    function get_confirmed_favorites($account_id) {
        $this->load->model('account/account_model');
        $account_table = $this->account_model->_table;
        $this->load->model('plates_model');
        $plates_table = $this->plates_model->_table;

        $this->db->select("$account_table.id, $account_table.fname, $account_table.lname, $account_table.profile_pic_url, $account_table.plate_id, $plates_table.lat, $plates_table.lon");
        $this->db->where('source_id', $account_id);
        $this->db->where('confirmed', $this->confirmed_user);
        $this->db->join($account_table, "$this->_table.target_id = $account_table.id", "left");
        $this->db->join($plates_table, "$account_table.plate_id = $plates_table.id", "left");
        $this->db->from($this->_table);
        return $this->db->get()->result();
    }
    
    function get_favorites_ids($account_id) {
        $this->db->select("$this->_table.target_id");
        $this->db->where('source_id', $account_id);
        $this->db->where('confirmed', $this->confirmed_user);
        $this->db->from($this->_table);
        $result = $this->db->get()->result_array();
        $ids = array();
        foreach ($result as $row) {
            $ids[] = $row['target_id'];
        }
        return $ids;
    }

    function get_unconfirmed_favorites($account_id) {
        $this->load->model('account/account_model');
        $account_table = $this->account_model->_table;

        $this->db->select("$account_table.id, $account_table.fname, $account_table.lname, $account_table.profile_pic_url");
        $this->db->where('target_id', $account_id);
        $this->db->where('confirmed', $this->unconfirmed_user);
        $this->db->join($account_table, "$this->_table.source_id = $account_table.id", "left");
        $this->db->from($this->_table);
        return $this->db->get()->result();
    }

    function check_favorites($source_id, $target_id) {
        $this->db->where('source_id', $source_id);
        $this->db->where('target_id', $target_id);
        $this->db->where('confirmed', 1);

        $result = $this->db->get($this->_table);
        return $result->num_rows() > 0;
    }

    function check_pending($source_id, $target_id) {
        $this->db->where('source_id', $source_id);
        $this->db->where('target_id', $target_id);
        $this->db->where('confirmed', 0);

        $result = $this->db->get($this->_table);
        return $result->num_rows() > 0;
    }

}