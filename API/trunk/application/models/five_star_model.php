<?php

class Five_star_model extends CI_Model {

    var $_table = "five_star_ratings";

    function rate_post($account_id, $wall_post_id, $rating) {
        $this->load->helper('date');

        $this->db->where('account_id', $account_id);
        $this->db->where('wall_post_id', $wall_post_id);
        $result = $this->db->get($this->_table);
        $this->load->model('wall_posts_model');
        $wall_posts_table = $this->wall_posts_model->_table;
        if ($result->num_rows() > 0) {
            $this->db->where('account_id', $account_id);
            $this->db->where('wall_post_id', $wall_post_id);
            $data = array(
                'rating' => $rating,
                'postedon' => mdate('%Y-%m-%d %H:%i:%s', now())
            );
            $this->db->update($this->_table, $data);
        } else {
            $data = array(
                'wall_post_id' => $wall_post_id,
                'account_id' => $account_id,
                'rating' => $rating,
                'postedon' => mdate('%Y-%m-%d %H:%i:%s', now())
            );
            $this->db->where('account_id', $account_id);
            $this->db->where('wall_post_id', $wall_post_id);
            $this->db->insert($this->_table, $data);
            
            $this->db->where('id', $wall_post_id);
            $post_data = $this->db->get($wall_posts_table)->row();

            $this->load->model('account/account_model');
            $actor = $this->account_model->get_by_id($account_id);

            $this->load->model('notifications_model');
            $this->notifications_model->add($post_data->account_id, 'plate', $post_data->plate_id, "$actor->fname $actor->lname has rated your post", "notification");
        }

        $data = array('avg_rating' => $this->get_average_rating($wall_post_id));
        $this->db->where('id', $wall_post_id);
        $this->db->update($wall_posts_table, $data);
    }

    function get_ratings($wall_post_id) {
        $this->load->model('account/account_model');
        $account_table = $this->account_model->_table;
        $this->db->select("$this->_table.*, $account_table.fname, $account_table.lname, $account_table.profile_pic_url");
        $this->db->where("$this->_table.wall_post_id", $wall_post_id);
        $this->db->join($account_table, "$this->_table.account_id = $account_table.id");
        return $this->db->get($this->_table)->result();
    }

    function get_count($wall_post_id) {
        $this->db->where("wall_post_id", $wall_post_id);
        $this->db->from($this->_table);
        return $this->db->count_all_results();
    }

    function get_average_rating($wall_post_id) {
        $this->db->where('wall_post_id', $wall_post_id);
        $result = $this->db->get($this->_table)->result();
        $sum = 0;
        $count = 0;
        foreach ($result as $r) {
            $sum += (int) $r->rating;
            $count ++;
        }

        $avg_rating = 0.0;
        if ($count > 1) {
            $avg_rating = (double) ((double) $sum) / ((double) $count);
        } else if ($count == 1) {
            $avg_rating = (double) $sum;
        }

        return $avg_rating;
    }

}