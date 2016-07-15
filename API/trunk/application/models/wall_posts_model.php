<?php

class Wall_posts_model extends CI_Model {

    var $_table = "wall_posts";

    function get_local_feed() {
        $this->load->model('five_star_model');

        $this->load->model(array('account/account_model', 'plates_model', 'five_star_model'));
        $account_table = $this->account_model->_table;
        $plates_table = $this->plates_model->_table;

        $this->db->select("$this->_table.*");
        $this->db->select("$account_table.fname, $account_table.lname, $account_table.profile_pic_url");
        $this->db->select("$plates_table.plate, $plates_table.state");
        $this->db->where("$this->_table.parent_id", 0);
        $this->db->where("$this->_table.deletedon", NULL);
        $this->db->order_by("$this->_table.id", "desc");
        $this->db->limit(20);
        $this->db->join($account_table, "$this->_table.account_id = $account_table.id");
        $this->db->join($plates_table, "$account_table.plate_id = $plates_table.id");
        $results = $this->db->get($this->_table)->result();
        $ret = array();

        foreach ($results as $r) {
            if ($r->deletedon == null) {
                $temp = $r;
                $this->db->select("$this->_table.*");
                $this->db->select("$account_table.fname, $account_table.lname, $account_table.profile_pic_url");
                $this->db->select("$plates_table.plate, $plates_table.state");
                $this->db->where("$this->_table.parent_id", $r->id);
                $this->db->where("$this->_table.deletedon", NULL);
                $this->db->order_by('postedon', 'asc');
                $this->db->join($account_table, "$this->_table.account_id = $account_table.id", "left");
                $this->db->join($plates_table, "$account_table.plate_id = $plates_table.id", "left");
                $temp->comments = $this->db->get($this->_table)->result_array();
                $temp->num_ratings = (string) $this->five_star_model->get_count($r->id);
                if ($temp->num_ratings > 0) {
                    $temp->ratings = $this->five_star_model->get_ratings($r->id);
                }
                $comment_tmp = array();
                foreach ($temp->comments as $tc) {
                    if ($tc['deletedon'] == null) {
                        $tc['num_ratings'] = (string) $this->five_star_model->get_count($tc['id']);
                        if ($tc['num_ratings'] > 0) {
                            $tc['ratings'] = $this->five_star_model->get_ratings($r->id);
                        }
                        $comment_tmp[] = $tc;
                    }
                }
                $temp->comments = $comment_tmp;
                $ret[] = $temp;
            }
        }
        return $ret;
    }

    function get_feed($account_id) {
        $this->load->model(array('account/account_model', 'plates_model', 'five_star_model', 'favorites_model', 'followers_model'));

        $fav_ids = $this->favorites_model->get_favorites_ids($account_id);
        $foll_ids = $this->followers_model->get_following_ids($account_id);


        if (empty($fav_ids) && empty($foll_ids)) {
            return $this->get_local_feed();
        }

        $account_table = $this->account_model->_table;
        $plates_table = $this->plates_model->_table;

        $this->db->select("$this->_table.*");
        $this->db->select("$account_table.fname, $account_table.lname, $account_table.profile_pic_url");
        $this->db->select("$plates_table.plate, $plates_table.state");
        $this->db->where("$this->_table.deletedon", NULL);
        if ( ! empty($fav_ids)) {
            $this->db->where_in("$this->_table.account_id", $fav_ids);
        }
        if ( ! empty($foll_ids)) {
            $this->db->where_in("$this->_table.plate_id", $foll_ids);
        }
        $this->db->order_by("$this->_table.id", "desc");
        $this->db->join($account_table, "$this->_table.account_id = $account_table.id");
        $this->db->join($plates_table, "$account_table.plate_id = $plates_table.id");
        $results = $this->db->get($this->_table)->result();
        $ret = array();

        foreach ($results as $r) {
            if ($r->parent_id == 0 && $r->deletedon == null) {
                $temp = $r;
                $this->db->select("$this->_table.*");
                $this->db->select("$account_table.fname, $account_table.lname, $account_table.profile_pic_url");
                $this->db->select("$plates_table.plate, $plates_table.state");
                $this->db->where("$this->_table.parent_id", $r->id);
                $this->db->where("$this->_table.deletedon", NULL);
                $this->db->order_by('postedon', 'asc');
                $this->db->join($account_table, "$this->_table.account_id = $account_table.id", "left");
                $this->db->join($plates_table, "$account_table.plate_id = $plates_table.id", "left");
                $temp->comments = $this->db->get($this->_table)->result_array();
                $temp->num_ratings = (string) $this->five_star_model->get_count($r->id);
                if ($temp->num_ratings > 0) {
                    $temp->ratings = $this->five_star_model->get_ratings($r->id);
                }
                $comment_tmp = array();
                foreach ($temp->comments as $tc) {
                    if ($tc['deletedon'] == null) {
                        $tc['num_ratings'] = (string) $this->five_star_model->get_count($tc['id']);
                        if ($tc['num_ratings'] > 0) {
                            $tc['ratings'] = $this->five_star_model->get_ratings($r->id);
                        }
                        $comment_tmp[] = $tc;
                    }
                }
                $temp->comments = $comment_tmp;
                $ret[] = $temp;
            }
        }
        return $ret;
    }

    function get_wall_posts($plate_id) {
        $this->load->model('five_star_model');

        $this->load->model(array('account/account_model', 'plates_model', 'five_star_model'));
        $account_table = $this->account_model->_table;
        $plates_table = $this->plates_model->_table;

        $this->db->select("$this->_table.*");
        $this->db->select("$account_table.fname, $account_table.lname, $account_table.profile_pic_url");
        $this->db->select("$plates_table.plate, $plates_table.state");
        $this->db->where("$this->_table.plate_id", $plate_id);
        $this->db->where("$this->_table.parent_id", 0);
        $this->db->where("$this->_table.deletedon", NULL);
        $this->db->order_by("$this->_table.id", "desc");
        $this->db->join($account_table, "$this->_table.account_id = $account_table.id");
        $this->db->join($plates_table, "$account_table.plate_id = $plates_table.id");
        $results = $this->db->get($this->_table)->result();
        $ret = array();

        foreach ($results as $r) {
            if ($r->deletedon == null) {
                $temp = $r;
                $this->db->select("$this->_table.*");
                $this->db->select("$account_table.fname, $account_table.lname, $account_table.profile_pic_url");
                $this->db->select("$plates_table.plate, $plates_table.state");
                $this->db->where("$this->_table.plate_id", $plate_id);
                $this->db->where("$this->_table.parent_id", $r->id);
                $this->db->order_by('postedon', 'asc');
                $this->db->join($account_table, "$this->_table.account_id = $account_table.id", "left");
                $this->db->join($plates_table, "$account_table.plate_id = $plates_table.id", "left");
                $temp->comments = $this->db->get($this->_table)->result_array();
                $temp->num_ratings = (string) $this->five_star_model->get_count($r->id);
                if ($temp->num_ratings > 0) {
                    $temp->ratings = $this->five_star_model->get_ratings($r->id);
                }
                $comment_tmp = array();
                foreach ($temp->comments as $tc) {
                    if ($tc['deletedon'] == null) {
                        $tc['num_ratings'] = (string) $this->five_star_model->get_count($tc['id']);
                        if ($tc['num_ratings'] > 0) {
                            $tc['ratings'] = $this->five_star_model->get_ratings($r->id);
                        }
                        $comment_tmp[] = $tc;
                    }
                }
                $temp->comments = $comment_tmp;
                $ret[] = $temp;
            }
        }
        return $ret;
    }

    function post($account_id, $plate_id, $content, $parent_id, $img_url, $vid_url, $link_url, $vid_thumb_url) {
        $this->load->helper('date');
        $this->load->model('plates_model');
        
        $plate = $this->plates_model->get_plate_by_plate_id($plate_id);

        $data = array(
            'account_id' => $account_id,
            'plate_id' => $plate_id,
            'content' => $content,
            'parent_id' => $parent_id,
            'img_url' => $img_url,
            'vid_url' => $vid_url,
            'vid_thumb_url' => $vid_thumb_url,
            'link_url' => $link_url,
            'lat' => $plate->lat,
            'lon' => $plate->lon,
            'access' => '0',
            'postedon' => mdate('%Y-%m-%d %H:%i:%s', now())
        );
        
        $this->db->insert($this->_table, $data);
        $id = $this->db->insert_id();

        $this->load->model('account/account_model');
        $this->load->model('plates_model');
        $this->load->model('notifications_model');
        $this->load->model('wall_posts_model');

        $actor = $this->account_model->get_by_id($account_id);
        $plate_owner = $this->account_model->get_by_id($this->plates_model->get_account_id_by_plate_id($plate_id)->account_id);

        if ($parent_id == 0) {

            if ($plate_owner->id != $account_id) {
                $this->notifications_model->add($plate_owner->id, 'plate', $plate_id, "$actor->fname $actor->lname has posted on your plate", "notification");
            }
        } else {
            $notified = array((int) $account_id);

            if ($account_id != $plate_owner->id) {
                $this->notifications_model->add($plate_owner->id, 'plate', $plate_id, "$actor->fname $actor->lname has commented on a post on your plate", "notification");
                $notified[] = (int) $plate_owner->id;
            }

            $this->db->where('id', $parent_id);
            $result = $this->db->get($this->_table)->row();
            if (array_search($result->account_id, $notified) === FALSE) {
                $plate_owner = $this->account_model->get_by_id($result->account_id);
                $this->notifications_model->add($plate_owner->id, 'plate', $plate_id, "$actor->fname $actor->lname has commented on your post", "notification");
                $notified[] = (int) $plate_owner->id;
            }

            $this->db->where('parent_id', $parent_id);
            $result = $this->db->get($this->_table)->result();
            foreach ($result as $row) {
                if ($row->id != $id && $row->account_id > 0 && array_search($row->account_id, $notified) === FALSE) {
                    $plate_owner = $this->account_model->get_by_id($row->account_id);
                    $this->notifications_model->add($plate_owner->id, 'plate', $plate_id, "$actor->fname $actor->lname has commented on a post you commented on", "notification");
                    $notified[] = (int) $plate_owner->id;
                }
            }
        }
    }

    function delete_post($account_id, $wall_post_id) {
        $this->load->model('plates_model');
        $this->load->helper('date');

        $this->db->where('id', $wall_post_id);
        $row = $this->db->get($this->_table)->row();

        $plate = $this->plates_model->get_plate_by_plate_id($row->plate_id);

        if ($row->account_id == $account_id || $plate->account_id == $account_id) {

            $data = array(
                'deletedon' => mdate('%Y-%m-%d %H:%i:%s', now())
            );
            $this->db->where('id', $wall_post_id);
            $this->db->update($this->_table, $data);
            return true;
        } else {
            return false;
        }
    }

    function update_average($wall_post_id) {
        $data = array('avg_rating' => $this->five_star_model->get_average_rating($wall_post_id));
        $this->db->where('id', $wall_post_id);
        $this->db->update($this->_table, $data);
    }

    function get_followers_wall_posts($myFollowers) {

        // $this->load->model(array('account/account_model', 'wall_posts_model'));
        //  $this->db->select("$this->_table.*");
        // $this->db->select("$account_table.fname, $account_table.lname, $account_table.profile_pic_url");
        //  $value() = array($myFollowers);
        //      $this->db->or_where_in('plate_id',  $value);
        //    $this->db->order_by("$this->_table.id", "desc");
        $this->db->join($account_table, "$this->_table.account_id = $account_table.id");
        $results = $this->db->get($this->_table)->result();
        $ret = array();

        foreach ($results as $r) {
            if ($r->deletedon == null) {
                $temp = $r;
                $this->db->select("$this->_table.*");
                $this->db->select("$account_table.fname, $account_table.lname, $account_table.profile_pic_url");
                $this->db->where("$this->_table.plate_id", $r->plate_id);
                $this->db->where("$this->_table.parent_id", $r->id);
                $this->db->order_by('postedon', 'desc');
                $this->db->join($account_table, "$this->_table.account_id = $account_table.id", "left");
                $temp->comments = $this->db->get($this->_table)->result();
                $ret[] = $temp;
            }
        }
        return $ret;
    }

}