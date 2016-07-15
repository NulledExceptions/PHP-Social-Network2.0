<?php

class Private_messages_model extends CI_Model {

    var $_table = "private_messages";

    function send_message($sender_id, $receiver_id, $content) {
        $this->load->helper('date');
        $data = array(
            'sender_id' => $sender_id,
            'receiver_id' => $receiver_id,
            'content' => $content,
            'senton' => mdate('%Y-%m-%d %H:%i:%s', now())
        );
        $this->db->insert($this->_table, $data);
    }

    function get_all_messages($account_id) {
        $this->load->model(array('account/account_model'));

        $this->db->or_where('sender_id', $account_id);
        $this->db->or_where('receiver_id', $account_id);
        $this->db->order_by('senton', 'asc');
        $this->db->from($this->_table);
        $results = $this->db->get()->result_array();
        $res = array();
        $accounts = array($account_id);

        foreach ($results as $r) {
            if ($r['sender_id'] == $account_id) {
                if ( ! isSet($res[$r['receiver_id']])) {
                    $res[$r['receiver_id']] = array();
                    $accounts[] = $r['receiver_id'];
                }

                $res[$r['receiver_id']][] = $r;
            } else {
                if ( ! isSet($res[$r['sender_id']])) {
                    $res[$r['sender_id']] = array();
                    $accounts[] = $r['sender_id'];
                }
                $res[$r['sender_id']][] = $r;
            }
        }
        $res['accounts'] = $this->account_model->get_multiple_display_info($accounts);
        return $res;
    }

}