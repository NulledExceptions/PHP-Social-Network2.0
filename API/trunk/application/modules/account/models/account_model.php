<?php

if ( ! defined('BASEPATH'))
    exit('No direct script access allowed');

class Account_model extends CI_Model {

    var $_table = 'account';

    /**
     * Get account by id
     *
     * @access public
     * @param string $account_id
     * @return object account object
     */
    function get_by_id($account_id) {
        return $this->db->get_where($this->_table, array('id' => $account_id))->row();
    }

    function get_profile_by_id($account_id) {
        $this->db->select("id, email, createdon, lastsignedinon, fname, lname, birthday, gender, interested_in, profile_pic_url, plate_id");
        return $this->db->get_where($this->_table, array('id' => $account_id))->row();
    }
    
    function get_display_info($account_id) {
        $this->db->select("id, email, fname, lname, profile_pic_url");
        return $this->db->get_where($this->_table, array('id' => $account_id))->row();
    }
    
    function get_multiple_display_info($ids = array()) {
        $this->db->select("id, email, fname, lname, profile_pic_url");
        $this->db->where_in('id', $ids);
        $result = $this->db->get($this->_table)->result();
        $return = array();
        foreach ($result as $r) {
            $return[$r->id] = $r;
        }
        return $return;
    }
    // --------------------------------------------------------------------

    /**
     * Get account by username
     *
     * @access public
     * @param string $username
     * @return object account object
     */
    function get_by_username($username) {
        return $this->db->get_where($this->_table, array('username' => $username))->row();
    }

    // --------------------------------------------------------------------

    /**
     * Get account by email
     *
     * @access public
     * @param string $email
     * @return object account object
     */
    function get_by_email($email) {
        return $this->db->get_where($this->_table, array('email' => $email))->row();
    }

    // --------------------------------------------------------------------

    /**
     * Get account by username or email
     *
     * @access public
     * @param string $username_email
     * @return object account object
     */
    function get_by_username_email($username_email) {
        return $this->db->from($this->_table)->where('username', $username_email)->or_where('email', $username_email)->get()->row();
    }

    // --------------------------------------------------------------------

    /**
     * Create an account
     *
     * @access public
     * @param string $username
     * @param string $hashed_password
     * @return int insert id
     */
    function create($username, $email = NULL, $password = NULL) {
        // Create password hash using phpass
        if ($password !== NULL) {
            $this->load->helper('account/phpass');
            $hasher = new PasswordHash(PHPASS_HASH_STRENGTH, PHPASS_HASH_PORTABLE);
            $hashed_password = $hasher->HashPassword($password);
        }

        $this->load->helper('date');
        $this->db->insert($this->_table, array(
            'username' => $username,
            'email' => $email,
            'password' => isset($hashed_password) ? $hashed_password : NULL,
            'createdon' => mdate('%Y-%m-%d %H:%i:%s', now())
        ));

        return $this->db->insert_id();
    }

    // --------------------------------------------------------------------

    /**
     * Change account username
     *
     * @access public
     * @param int $account_id
     * @param int $new_username
     * @return void
     */
    function update_username($account_id, $new_username) {
        $this->db->update($this->_table, array('username' => $new_username), array('id' => $account_id));
    }
    
    function update_plate_id($account_id, $plate_id)
    {   
         $data = array(
            'plate_id' => $plate_id
        );
        $this->db->where('id', $account_id);
        $this->db->update($this->_table, $data);       
    }
    
        
    
    // --------------------------------------------------------------------

    /**
     * Change account email
     *
     * @access public
     * @param int $account_id
     * @param int $new_email
     * @return void
     */
    function update_email($account_id, $new_email) {
        $this->db->update($this->_table, array('email' => $new_email), array('id' => $account_id));
    }

    // --------------------------------------------------------------------

    /**
     * Change account password
     *
     * @access public
     * @param int $account_id
     * @param int $hashed_password
     * @return void
     */
    function update_password($account_id, $password_new) {
        $this->load->helper('account/phpass');
        $hasher = new PasswordHash(PHPASS_HASH_STRENGTH, PHPASS_HASH_PORTABLE);
        $new_hashed_password = $hasher->HashPassword($password_new);

        $this->db->update($this->_table, array('password' => $new_hashed_password), array('id' => $account_id));
    }

    // --------------------------------------------------------------------

    /**
     * Update account last signed in dateime
     *
     * @access public
     * @param int $account_id
     * @return void
     */
    function update_last_signed_in_datetime($account_id) {
        $this->load->helper('date');

        $this->db->update($this->_table, array('lastsignedinon' => mdate('%Y-%m-%d %H:%i:%s', now())), array('id' => $account_id));
    }

    // --------------------------------------------------------------------

    /**
     * Update password reset sent datetime
     *
     * @access public
     * @param int $account_id
     * @return int password reset time
     */
    function update_reset_sent_datetime($account_id) {
        $this->load->helper('date');

        $resetsenton = mdate('%Y-%m-%d %H:%i:%s', now());

        $this->db->update($this->_table, array('resetsenton' => $resetsenton), array('id' => $account_id));

        return strtotime($resetsenton);
    }

    /**
     * Remove password reset datetime
     *
     * @access public
     * @param int $account_id
     * @return void
     */
    function remove_reset_sent_datetime($account_id) {
        $this->db->update($this->_table, array('resetsenton' => NULL), array('id' => $account_id));
    }

    // --------------------------------------------------------------------

    /**
     * Update account deleted datetime
     *
     * @access public
     * @param int $account_id
     * @return void
     */
    function update_deleted_datetime($account_id) {
        $this->load->helper('date');

        $this->db->update($this->_table, array('deletedon' => mdate('%Y-%m-%d %H:%i:%s', now())), array('id' => $account_id));
    }

    /**
     * Remove account deleted datetime
     *
     * @access public
     * @param int $account_id
     * @return void
     */
    function remove_deleted_datetime($account_id) {
        $this->db->update($this->_table, array('deletedon' => NULL), array('id' => $account_id));
    }

    // --------------------------------------------------------------------

    /**
     * Update account suspended datetime
     *
     * @access public
     * @param int $account_id
     * @return void
     */
    function update_suspended_datetime($account_id) {
        $this->load->helper('date');

        $this->db->update($this->_table, array('suspendedon' => mdate('%Y-%m-%d %H:%i:%s', now())), array('id' => $account_id));
    }

    /**
     * Remove account suspended datetime
     *
     * @access public
     * @param int $account_id
     * @return void
     */
    function remove_suspended_datetime($account_id) {
        $this->db->update($this->_table, array('suspendedon' => NULL), array('id' => $account_id));
    }

    function update($account_id, $attributes = array()) {

        if (isset($attributes['fname']))
            if (strlen($attributes['fname']) > 255)
                $attributes['fname'] = substr($attributes['fname'], 0, 255);

        if (isset($attributes['lname']))
            if (strlen($attributes['lname']) > 255)
                $attributes['lname'] = substr($attributes['name'], 0, 255);

        if (isset($attributes['birthday'])) {
            $this->load->helper('date');
            $attributes['birthday'] = mdate('%Y-%m-%d', strtotime($attributes['birthday']));
        }

        if (isset($attributes['gender'])) {
            switch (strtolower($attributes['gender'])) {
                case 'f': case 'female': $attributes['gender'] = 'f';
                    break;
                case 'm': case 'male': $attributes['gender'] = 'm';
                    break;
            }
        }
        
        if (isset($attributes['interested_in'])) {
            switch (strtolower($attributes['interested_in'])) {
                case 'f': case 'female': $attributes['interested_in'] = 'f';
                    break;
                case 'm': case 'male': $attributes['interested_in'] = 'm';
                    break;
            }
        }

        $this->db->where('id', $account_id);
        $this->db->update($this->_table, $attributes);
    } 
    
    function get_primary($account_id) {
        return $this->db->from($this->_table)->where('id', $account_id)->get()->row();
    }
    
    function update_token($account_id, $token) {
        $this->db->where('token', $token);
        $result = $this->db->get($this->_table);
        if ($result->num_rows() > 0) {
            foreach ($result->result() as $row) {
                $this->db->set('token','');
                $this->db->where('id', $row->id);
                $this->db->update($this->_table);
            }
        }
        $this->db->set('token', $token);
        $this->db->where('id', $account_id);
        $this->db->update($this->_table);
    }

}

/* End of file account_model.php */
/* Location: ./application/modules/account/models/account_model.php */