<?php

class Gallery_model extends CI_Model {

    var $_table = "gallery";

   function upload($account_id, $dataArgs) {
        $this->load->helper('date');
        $data = array(
            'plate_id' => $dataArgs['plate_id'],
            'account_id' => $account_id,
            'uploadedon' => mdate('%Y-%m-%d %H:%i:%s', now()),
            'url' => $dataArgs['url'],
            'media_type' => $dataArgs['media_type'],
            'thumb_url' => $dataArgs['thumb_url']
        );
        $this->db->insert($this->_table, $data);
    }

    function get_images($plate_id) {
        $this->db->where("$this->_table.plate_id",$plate_id );
        $this->db->from($this->_table);
        return $this->db->get()->result();
    }
}

