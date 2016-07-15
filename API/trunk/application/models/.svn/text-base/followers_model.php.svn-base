<?php

class Followers_model extends CI_Model {

    var $_table = "followers";

    function add_follower($plate_id, $account_id) {
        $this->load->helper('date');
        $data = array(
            'plate_id' => $plate_id,
            'account_id' => $account_id,
            'createdon' => mdate('%Y-%m-%d %H:%i:%s', now())
        );
        $this->db->insert($this->_table, $data);
    }

    function remove_follower($plate_id, $account_id) {
        $data = array(
            'plate_id' => $plate_id,
            'account_id' => $account_id
        );
        $this->db->delete($this->_table, $data);
    }

    function get_following($account_id) {
        $this->load->model('plates_model');
        $plate_table = $this->plates_model->_table;
        
        $this->load->model('account/account_model');
        $account_table = $this->account_model->_table;

        $this->db->select("$this->_table.plate_id, $plate_table.plate, $plate_table.state, $plate_table.plate_pic_url, $plate_table.make, $plate_table.model, $plate_table.year, $plate_table.account_id, $account_table.fname, $account_table.lname");
        $this->db->where("$this->_table.account_id", $account_id);
        $this->db->join($plate_table, "$this->_table.plate_id = $plate_table.id", "left");
        $this->db->join($account_table, "$plate_table.account_id = $account_table.id", "left");
        $this->db->from($this->_table);
        return $this->db->get()->result_array();
    }

    function get_following_ids($account_id) {

        $this->db->select("$this->_table.plate_id");
        $this->db->where("$this->_table.account_id", $account_id);
        $this->db->from($this->_table);
        $result = $this->db->get()->result_array();
        $ids = array();
        foreach ($result as $row) {
            $ids[] = $row['plate_id'];
        }
        return $ids;
    }

    function check_if_follower($account_id, $plate_id) {
        $this->db->where('plate_id', $plate_id);
        $this->db->where('account_id', $account_id);
        $this->db->from($this->_table);

        $result = $this->db->get();
        
        if ($result->num_rows() > 0)
            return TRUE;
        else
            return FALSE;
    }

    function check_followers($source_id, $target_id) {
        $this->db->where('source_id', $source_id);


        $result = $this->db->get($this->_table);
        if ($result->num_rows() > 0)
            return TRUE;
        else
            return FALSE;
    }

}