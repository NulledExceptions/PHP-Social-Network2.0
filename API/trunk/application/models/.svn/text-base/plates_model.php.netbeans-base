<?php

class Plates_model extends CI_Model {

    var $_table = 'plates';

    function get_plate_by_plate($plate, $state) {
        $this->db->where('plate', $plate);
        $this->db->where('state', $state);
        $result = $this->db->get($this->_table);
        if ($result->num_rows == 0) {
            $this->load->helper('date');
            $this->db->insert($this->_table, array('plate' => $plate,
                'state' => $state,
                'createdon' => mdate('%Y-%m-%d %H:%i:%s', now())
            ));
            $this->db->where('plate', $plate);
            $this->db->where('state', $state);
            $result = $this->db->get($this->_table);
        }
        return $result->row();
    }

    function get_plate_by_plate_id($plate_id) {
        $this->db->where('id', $plate_id);
        $result = $this->db->get($this->_table);
        return $result->row();
    }

    function get_plate_by_account_id($account_id) {
        $this->load->model('account/account_model');
        $account_table = $this->account_model->_table;

        $this->db->select("$this->_table.*");
        $this->db->where("$account_table.id", $account_id);
        $this->db->join($this->_table, "$account_table.plate_id = $this->_table.id");
        $result = $this->db->get($account_table);
        return $result->row();
    }

    function get_plates_by_account_id($account_id) {
        $this->db->where('account_id', $account_id);
        $result = $this->db->get($this->_table);
        return $result->result();
    }

    function update($plate_id, $attributes = array()) {
        $this->load->helper('date');

        if (isset($attributes['year']))
            $attributes['year'] = mdate('%Y-%m-%d %H:%i:%s', strtotime($attributes['year']));

        if (isset($attributes['state']))
            if (strlen($attributes['state']) > 2)
                $attributes['state'] = substr($attributes['state'], 0, 1);

        $this->db->where('id', $plate_id);
        $this->db->update($this->_table, $attributes);
    }

    function associate_user($account_id, $plate_id) {

        $this->db->where('id', $plate_id);
        $result = $this->db->get($this->_table);
        if ($result->num_rows() > 0 && ! $result->row()->account_id) {
            $this->db->where('id', $plate_id);
            $data = array(
                'account_id' => $account_id
            );
            $this->db->update($this->_table, $data);
            return true;
        }
        return false;
    }

    function get_account_id_by_plate_id($plate_id) {
        $this->db->select('account_id');
        $this->db->where('id', $plate_id);
        $result = $this->db->get($this->_table);
        return $result->row();
    }

    function is_owned_by($plate_id, $account_id) {
        $this->db->where('id', $plate_id);
        $this->db->where('account_id', $account_id);
        $result = $this->db->get($this->_table);
        return $result->num_rows() > 0;
    }

    function create_random_plate($account_id) {
        $length = 8;
        $random = "";
        srand((double) microtime() * 1000000);

        $data = "AbcDE123IJKLMN67QRSTUVWXYZ";
        $data .= "aBCdefghijklmn123opq45rs67tuv89wxyz";
        $data .= "0FGH45OP89";

        for ($i = 0; $i < $length; $i ++ ) {
            $random .= substr($data, (rand() % (strlen($data))), 1);
        }


        //strtoupper
        $plate = strtoupper($random);

        //$this->db->where('plate', $plate);
        //$result = $this->db->get($this->_table);
        //if ($result->num_rows > 0) {
        //  $plate = '0000000';
        //}

        $this->load->helper('date');
        $make = 'pm';
        $model = 'generic';
        $access = 4;
        $data = array(
            'plate' => $plate,
            'account_id' => $account_id,
            'make' => $make,
            'model' => $model,
            'access' => $access,
            'state' => $make,
            'createdon' => mdate('%Y-%m-%d %H:%i:%s', now())
        );
        if ($this->db->insert($this->_table, $data)) {

            $this->db->where('account_id', $account_id);
            $result = $this->db->get($this->_table);
            return $result->row();
        }
    }

}
