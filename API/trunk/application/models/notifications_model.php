<?php

class Notifications_model extends CI_Model {

    var $_table = 'notifications';

    function add($account_id, $type, $target_id, $message, $category = NULL) {
        $this->load->helper('date');
        $data = array(
            'account_id' => $account_id,
            'type' => $type,
            'target_id' => $target_id,
            'message' => $message,
            'category' => $category,
            'timestamp' => mdate('%Y-%m-%d %H:%i:%s', now())
        );
        $this->db->insert($this->_table, $data);
        $this->load->library('ios_push');
        $this->ios_push->push($account_id, $message, $data);
    }

    function get($account_id) {
        $this->load->model('account/account_model');
        $this->load->model('plates_model');

        $this->db->select("$this->_table.*");
        $this->db->where("$this->_table.account_id", $account_id);
        $this->db->where("$this->_table.show","1");
        $this->db->order_by("$this->_table.timestamp", 'desc');
        $result = $this->db->get($this->_table)->result_array();
        for ($i = 0; $i < count($result); $i ++ ) {
            if ($result[$i]['type'] == 'account') {
                $result[$i]['target'] = $this->account_model->get_by_id($result[$i]['target_id']);
            } else if ($result[$i]['type'] == 'plate') {
                $result[$i]['target'] = $this->plates_model->get_plate_by_plate_id($result[$i]['target_id']);
            }
        }
        $this->db->set("unread", "0");
        $this->db->where("$this->_table.account_id", $account_id);
        $this->db->where("$this->_table.show","1");
        $this->db->update($this->_table);
        return $result;
    }
    
    function hide($notification_id) {
        $this->db->set("show", "0");
        $this->db->where("$this->_table.id", $notification_id);
        $this->db->update($this->_table);
    }

}

