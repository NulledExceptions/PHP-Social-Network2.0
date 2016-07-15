<?php

class Advertisements_model extends CI_Model {

    var $_table = "advertisements";

    function submit($data = array()) {
        
        $this->db->insert($this->_table, $data);
    }

    function get() {
        return $this->db->get($this->_table)->result();
    }
}