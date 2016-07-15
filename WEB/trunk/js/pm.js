// updating functions
var is_logged_in = false;
var user = {
    "id" : 0, 
    "fname" : "Anonymous", 
    "profile_pic_url" : ""
};

function update_user() {
    acct_user(success, error);
    function success(data) {
        is_logged_in = true;
        user = data;
        
        if (user.profile_pic_url) {
            $('#acct_pic').attr('src', user.profile_pic_url);
        } else {
            $('#acct_pic').attr('src', "uploads/no_profile.png")
        }
        load_home();
        header.update_notifications();
        header.update_garage();
        header.update_messages();
        header.update_following();
        header.update_favorites();
        header.update_requests();
    }
    function error() {
        is_logged_in = false;
        user = {
            "id" : 0, 
            "fname" : "Anonymous", 
            "profile_pic_url" : ""
        };
        views.refresh();
    }
}



function load_home() {
    
    views.refresh();
    
    update_plate_profile();
    load_feed();
    set_follow_button(0);
    views.show_profile();
    
    function update_plate_profile() {
        if (user.id != 0) {
            set_favorite_button(user.id);
            if (user.profile_pic_url) {
                $('#prof_acct_img').attr('src', user.profile_pic_url);
            } else {
                $('#prof_acct_img').attr('src', 'uploads/no_profile.png');
            }
            if (user.fname && user.lname) {
                $('#prof_acct_name').html(user.fname + ' ' + user.lname);
            } else {
                $('#prof_acct_name').html(' ');
            }
            plate_get(success, error, user.plate_id)
            function success(profile_data) {
                $('#prof_plate_img').attr('src', api_url + 'util/get_plate_image?plate='+ profile_data.plate+'&state=' + profile_data.state); 
                
                $('#prof_acct_plate').html(profile_data.state + ' Plate# ' + profile_data.plate);
                
                if (profile_data.make && profile_data.model) {
                    $('#prof_acct_car').html(profile_data.make + ' ' + profile_data.model);
                } else {
                    $('#prof_acct_car').html(' ');
                }
                if (profile_data.color) {
                    $('#prof_acct_color').html(profile_data.color);
                } else {
                    $('#prof_acct_color').html(' ');
                }
                if (profile_data.year){
                    $('#prof_acct_year').html(profile_data.year);
                } else {
                    $('#prof_acct_year').html(' ');
                }
            }
            function error () {
                $('#prof_plate_img').attr('src', api_url + 'util/get_plate_image?plate=PLATEME&state=PM'); 
                $('#prof_acct_plate').html(' ');
                
                $('#prof_acct_car').html(' ');
                $('#prof_acct_color').html(' ');
                $('#prof_acct_year').html(' ');
            }
        } else {
            $('#prof_acct_name').html(' ');
            $('#prof_acct_img').attr('src', 'uploads/no_profile.png');
            
            $('#prof_plate_img').attr('src', api_url + 'util/get_plate_image?plate=PLATEME&state=PM'); 
            $('#prof_acct_plate').html(' ');
            
            $('#prof_acct_car').html(' ');
            $('#prof_acct_color').html(' ');
            $('#prof_acct_year').html(' ');
        
        }
    
    }
    
}

function load_feed() {
    var html_content = "";
    if (user.account_id) {
        $('#post_button').click(function () {
            do_home_post();
        });
        acct_get_feed(success, error, account_id); 
    } else {
        $('#post_button').click(function () { });
        acct_get_local_feed(success, error);
    }
        
    function success(data) {
        $.each(data, function(post, post_data) {
            //image
            html_content += "<div class=\"row\"><div class=\"span1\"><img class=\"chrome\" src=\"";
            if (post_data.profile_pic_url) {
                html_content += post_data.profile_pic_url;
            } else {
                html_content += "uploads/no_profile.png";
            }
            html_content += "\"/></div><div class=\"span5\">";
                
            //main post
            html_content += "<div class=\"row post-box\"><div><a style=\"margin-left:10px\" href=\"javascript:void(0);\" ";
            html_content += "onclick=\"do_user(" + post_data.account_id + ");\"";
            html_content += ">" + post_data.fname + " " + post_data.lname + " | " + post_data.plate + ", " + post_data.state;
            html_content += "</a>"; 
                
            html_content += '<form onclick="rate_post(' +post_data.id +', $(\'#fstar_' + post_data.id + ' input[name=fstar_' + post_data.id +']:checked\').val())" style="display:inline; float:right; margin-right:10px" id="fstar_' + post_data.id + '">';
            html_content += '<input type="radio" class="star" name="fstar_' + post_data.id + '" value="1" ';
            html_content += (Math.floor(post_data.avg_rating) == 1) ? 'checked="checked" />' : ' />';
            html_content += '<input type="radio" class="star" name="fstar_' + post_data.id + '" value="2" ';
            html_content += (Math.floor(post_data.avg_rating) == 2) ? 'checked="checked" />' : ' />';
            html_content += '<input type="radio" class="star" name="fstar_' + post_data.id + '" value="3" ';
            html_content += (Math.floor(post_data.avg_rating) == 3) ? 'checked="checked" />' : ' />';
            html_content += '<input type="radio" class="star" name="fstar_' + post_data.id + '" value="4" ';
            html_content += (Math.floor(post_data.avg_rating) == 4) ? 'checked="checked" />' : ' />';
            html_content += '<input type="radio" class="star" name="fstar_' + post_data.id + '" value="5" ';
            html_content += (Math.floor(post_data.avg_rating) == 5) ? 'checked="checked" />' : ' />';
            html_content += '</form>';
                
                
            html_content += "<div class=\"msg\">"
            html_content += post_data.content;
            var t = post_data.postedon.split(/[- :]/);
            var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
            html_content +=  "</div>";
            if (post_data.img_url) {
                html_content += '<div class="msg-img"><img class="span3 offset1" style="margin: 5px 10px" alight="left" src="' + post_data.img_url + '" /></div>';
            } 
            if (post_data.vid_url) {
                html_content += '<div class="msg-img"><video width="435px" preload="metadata" controls src="' + post_data.vid_url + '" </video></div>';
            } 
            if (post_data.link_url) {
                html_content += '<div class="msg-img"><a href="' + post_data.link_url + '">' + post_data.link_url + '</a></div>';
            }
            html_content += "<div style=\"margin-left:15px; font-size:10px; float:left\">"+ d.toLocaleDateString() + " at " + d.toLocaleTimeString() +"</div>";
                
            if (post_data.num_ratings > 0) {
                html_content += "<div style=\"margin-right:15px; font-size:10px; float:right\"><a data-toggle=\"modal\" href=\"#myModal_"+post_data.id+"\">"+post_data.num_ratings+"&nbsp;ratings</a></div>"; 
                    
                html_content +=  '<div class="modal" style="display:none" id="myModal_'+post_data.id+'" class="modal hide fade">';
                html_content +=  '  <div class="modal-header">';
                html_content +=  '    <a class="close" data-dismiss="modal">×</a>';
                html_content +=  '    <h3>5 Star Rating</h3>';
                html_content +=  '  </div>';
                html_content +=  '  <div class="modal-body">';
                $.each(post_data.ratings, function(bogus, curr_rating) {
                    var curr_pic = (curr_rating.profile_pic_url) ? curr_rating.profile_pic_url : "uploads/no_profile.png";
                        
                    html_content += '<div class="row"><img class="chrome span1" href="'+ curr_pic + '" />';
                    html_content += '<div class="span2">'+ curr_rating.fname + ' ' + curr_rating.lname + '</div>';
                        
                    html_content += '<form style="display:inline; float:right; margin-right:10px" id="fstar_' + post_data.id + '">';
                    html_content += '<input type="radio" class="star" name="fstar_rating_' + curr_rating.id + '" disabled="disabled" value="1" ';
                    html_content += (Math.floor(curr_rating.rating) == 1) ? 'checked="checked" />' : ' />';
                    html_content += '<input type="radio" class="star" name="fstar_rating_' + curr_rating.id + '" disabled="disabled" value="2" ';
                    html_content += (Math.floor(curr_rating.rating) == 2) ? 'checked="checked" />' : ' />';
                    html_content += '<input type="radio" class="star" name="fstar_rating_' + curr_rating.id + '" disabled="disabled" value="3" ';
                    html_content += (Math.floor(curr_rating.rating) == 3) ? 'checked="checked" />' : ' />';
                    html_content += '<input type="radio" class="star" name="fstar_rating_' + curr_rating.id + '" disabled="disabled" value="4" ';
                    html_content += (Math.floor(curr_rating.rating) == 4) ? 'checked="checked" />' : ' />';
                    html_content += '<input type="radio" class="star" name="fstar_rating_' + curr_rating.id + '" disabled="disabled" value="5" ';
                    html_content += (Math.floor(curr_rating.rating) == 5) ? 'checked="checked" />' : ' />';
                    html_content += '</form></div>';
                    
                });
                html_content +=  '  </div>';
                html_content +=  '  <div class="modal-footer">';
                html_content +=  '    <a href="javascript:void(0);" onclick="$(\'#myModal_'+post_data.id+'\').modal(\'hide\');" class="btn">Close</a>';
                html_content +=  '  </div>';
                html_content +=  '</div>';
                
            }
            html_content += "</div></div><div class=\"row\"><div class=\"span3\">&nbsp;</div></div>";
                
            var num_comm = post_data.comments.length;
                
            if (num_comm > 2) {
                html_content += '<div class="row show-all-link-'+ post_data.id+'" ><a class="span2 offset1" href="javascript:void(0);" onclick="show_all(' + post_data.id + ')">show all ' + num_comm + ' comments</a></div><div class="span3 show-all-link-'+ post_data.id+'">&nbsp;</div>';
            }
                
            if (post_data.comments) {
                var count = 0;
                $.each(post_data.comments, function(comm, comm_data){
                    html_content += "<div class=\"row post-box ";
                    if (count < num_comm - 2) {
                        html_content += 'post-hidden-' + post_data.id +'" style="display:none"';
                    } else {
                        html_content += '" ';
                    }
                    html_content += "><div><a style=\"margin-left:10px\" href=\"javascript:void(0);\" ";
                    html_content += "onclick=\"do_user(" + comm_data.account_id + ");\"";
                    html_content += "\">";
                    html_content += comm_data.fname + " " + comm_data.lname + " | " + post_data.plate + ", " + post_data.state;
                    html_content += "</a>"; 
                        
                        
                    html_content += '<form onclick="rate_post(' +comm_data.id +', $(\'#fstar_' + comm_data.id + ' input[name=fstar_' + comm_data.id +']:checked\').val())" style="display:inline; float:right; margin-right:10px" id="fstar_' + comm_data.id + '">';
                    html_content += '<input type="radio" class="star" name="fstar_' + comm_data.id + '" value="1" ';
                    html_content += (Math.floor(comm_data.avg_rating) == 1) ? 'checked="checked" />' : ' />';
                    html_content += '<input type="radio" class="star" name="fstar_' + comm_data.id + '" value="2" ';
                    html_content += (Math.floor(comm_data.avg_rating) == 2) ? 'checked="checked" />' : ' />';
                    html_content += '<input type="radio" class="star" name="fstar_' + comm_data.id + '" value="3" ';
                    html_content += (Math.floor(comm_data.avg_rating) == 3) ? 'checked="checked" />' : ' />';
                    html_content += '<input type="radio" class="star" name="fstar_' + comm_data.id + '" value="4" ';
                    html_content += (Math.floor(comm_data.avg_rating) == 4) ? 'checked="checked" />' : ' />';
                    html_content += '<input type="radio" class="star" name="fstar_' + comm_data.id + '" value="5" ';
                    html_content += (Math.floor(comm_data.avg_rating) == 5) ? 'checked="checked" />' : ' />';
                    html_content += '</form>';
                        
                    profile_pic = (comm_data.profile_pic_url) ? comm_data.profile_pic_url : "uploads/no_profile.png";
                        
                    html_content += "<div class=\"msg\"><img class=\"span1 chrome\" style=\"width:50px; height:50px; margin: 0 5px\" src=\"" + profile_pic + "\" />";
                    html_content += comm_data.content;
                    var t = comm_data.postedon.split(/[- :]/);
                    var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
                    html_content +=  "</div><div style=\"margin-left:15px; font-size:10px; float:left\">"+ d.toLocaleDateString() + " at " + d.toLocaleTimeString() +"</div>"; 
                        
                    if (comm_data.num_ratings > 0) {
                        html_content += "<div style=\"margin-right:15px; font-size:10px; float:right\"><a data-toggle=\"modal\" href=\"#myModal_"+comm_data.id+"\">"+comm_data.num_ratings+"&nbsp;ratings</a></div>"; 
                            
                        html_content +=  '<div class="modal" style="display:none" id="myModal_'+comm_data.id+'" class="modal hide fade">';
                        html_content +=  '  <div class="modal-header">';
                        html_content +=  '    <a class="close" data-dismiss="modal">×</a>';
                        html_content +=  '    <h3>5 Star Rating</h3>';
                        html_content +=  '  </div>';
                        html_content +=  '  <div class="modal-body">';
                        $.each(comm_data.ratings, function(bogus, curr_rating) {
                            var curr_pic = (curr_rating.profile_pic_url) ? curr_rating.profile_pic_url : "uploads/no_profile.png";
                                
                            html_content += '<div class="row"><img class="chrome span1" href="'+ curr_pic + '" />';
                            html_content += '<div class="span2">'+ curr_rating.fname + ' ' + curr_rating.lname + '</div>';
                                
                            html_content += '<form style="display:inline; float:right; margin-right:10px" id="fstar_' + post_data.id + '">';
                            html_content += '<input type="radio" class="star" name="fstar_rating_' + curr_rating.id + '" disabled="disabled" value="1" ';
                            html_content += (Math.floor(curr_rating.rating) == 1) ? 'checked="checked" />' : ' />';
                            html_content += '<input type="radio" class="star" name="fstar_rating_' + curr_rating.id + '" disabled="disabled" value="2" ';
                            html_content += (Math.floor(curr_rating.rating) == 2) ? 'checked="checked" />' : ' />';
                            html_content += '<input type="radio" class="star" name="fstar_rating_' + curr_rating.id + '" disabled="disabled" value="3" ';
                            html_content += (Math.floor(curr_rating.rating) == 3) ? 'checked="checked" />' : ' />';
                            html_content += '<input type="radio" class="star" name="fstar_rating_' + curr_rating.id + '" disabled="disabled" value="4" ';
                            html_content += (Math.floor(curr_rating.rating) == 4) ? 'checked="checked" />' : ' />';
                            html_content += '<input type="radio" class="star" name="fstar_rating_' + curr_rating.id + '" disabled="disabled" value="5" ';
                            html_content += (Math.floor(curr_rating.rating) == 5) ? 'checked="checked" />' : ' />';
                            html_content += '</form></div>';
                            
                        });
                        html_content +=  '  </div>';
                        html_content +=  '  <div class="modal-footer">';
                        html_content +=  '    <a href="javascript:void(0);" onclick="$(\'#myModal_'+comm_data.id+'\').modal(\'hide\');" class="btn">Close</a>';
                        html_content +=  '  </div>';
                        html_content +=  '</div>';
                        
                    }
                        
                    html_content += "</div></div><div class=\"row\"><div class=\"span3 ";
                    if (count < num_comm - 2) {
                        html_content += 'post-hidden-' + post_data.id +'" style="display:none"';
                    } else {
                        html_content += '" ';
                    }
                    html_content += ">&nbsp;</div></div>";
                    count++;
                });
            }
            html_content += "<div class=\"row\" style=\"margin-left:10px;margin-right:-30px;border-radius:18px\" >";
            html_content += "<button class=\"btn\" onclick=\"do_wall_post(";
            html_content += post_data.plate_id + ', ' + post_data.id + ');';
            html_content += "\"><span class=\"icon-share-alt\"></span>&nbsp;Reply</button><textarea class=\"input span4\" id=\"message_";
            html_content += post_data.id + "\"></textarea></div><hr />";
            html_content += "</div></div>";
        });
        $("#wall").html(html_content);
            
        $('input[type=radio].star').rating();
    }
    function error() {
    }
}
function load_plate(plate_id, plate, state) {
    
    views.refresh();
    if (plate && state) {
        plate_get(success, error, 0, plate, state);
    } else if (plate_id > 0) {
        plate_get(success, error, plate_id);
    }
    function success(data) {
        if (data.account_id) {
            function usersuccess(userdata) {
                data.userdata = userdata;
                update_plate_profile(data);
                load_wall(data.id);
                set_follow_button(data.id);
                views.show_profile();
            }
            function usererror(){
                update_plate_profile(data);
                load_wall(data.id);
                set_follow_button(data.id);
                views.show_profile();
            }
            acct_user(usersuccess, usererror, data.account_id);
        } else {
            update_plate_profile(data);
            load_wall(data.id);
            set_follow_button(data.id);
            views.show_profile();
        }
    }
    function error() {
    }
    
    function update_plate_profile(profile_data) {
        $('#prof_plate_img').attr('src', api_url + 'util/get_plate_image?plate='+ profile_data.plate+'&state=' + profile_data.state); 
        //$('#prof_plate_img').attr('src', 'img/plateme_plate_small.png'); 
        
        $('#prof_acct_plate').html(profile_data.state + ' Plate# ' + profile_data.plate);
        
        if (profile_data.userdata && profile_data.userdata.profile_pic_url) {
            $('#prof_acct_img').attr('src', profile_data.userdata.profile_pic_url);
        } else {
            $('#prof_acct_img').attr('src', 'uploads/no_profile.png');
        }
        
        if (profile_data.userdata) {
            set_favorite_button(profile_data.userdata.id);
            
            if (profile_data.userdata.fname && profile_data.userdata.lname) {
                $('#prof_acct_name').html(profile_data.userdata.fname + ' ' + profile_data.userdata.lname);
            } else {
                $('#prof_acct_name').html(' ');
            }
            if (profile_data.make && profile_data.model) {
                $('#prof_acct_car').html(profile_data.make + ' ' + profile_data.model);
            } else {
                $('#prof_acct_car').html(' ');
            }
            if (profile_data.color) {
                $('#prof_acct_color').html(profile_data.color);
            } else {
                $('#prof_acct_color').html(' ');
            }
            if (profile_data.year){
                $('#prof_acct_year').html(profile_data.year);
            } else {
                $('#prof_acct_year').html(' ');
            }
        } else {
            $('#prof_acct_name').html(' ');
            $('#prof_acct_car').html(' ');
            $('#prof_acct_color').html(' ');
            $('#prof_acct_year').html(' ');
        }
    
    }
    
}

function load_wall(plate_id) {
    $('#post_button').click(function () {
        do_wall_post(plate_id);
    });
    html_content = "";
    plate_get_wall(success, error, plate_id);
    function success(data) {
        $.each(data, function(post, post_data) {
            //image
            html_content += "<div class=\"row\"><div class=\"span1\"><img class=\"chrome\" src=\"";
            if (post_data.profile_pic_url) {
                html_content += post_data.profile_pic_url;
            } else {
                html_content += "uploads/no_profile.png";
            }
            html_content += "\"/></div><div class=\"span5\">";
                
            //main post
            html_content += "<div class=\"row post-box\"><div><a style=\"margin-left:10px\" href=\"javascript:void(0);\" ";
            html_content += "onclick=\"do_user(" + post_data.account_id + ");\"";
            html_content += ">" + post_data.fname + " " + post_data.lname + " | " + post_data.plate + ", " + post_data.state;
            html_content += "</a>"; 
                
            html_content += '<form onclick="rate_post(' +post_data.id +', $(\'#fstar_' + post_data.id + ' input[name=fstar_' + post_data.id +']:checked\').val())" style="display:inline; float:right; margin-right:10px" id="fstar_' + post_data.id + '">';
            html_content += '<input type="radio" class="star" name="fstar_' + post_data.id + '" value="1" ';
            html_content += (Math.floor(post_data.avg_rating) == 1) ? 'checked="checked" />' : ' />';
            html_content += '<input type="radio" class="star" name="fstar_' + post_data.id + '" value="2" ';
            html_content += (Math.floor(post_data.avg_rating) == 2) ? 'checked="checked" />' : ' />';
            html_content += '<input type="radio" class="star" name="fstar_' + post_data.id + '" value="3" ';
            html_content += (Math.floor(post_data.avg_rating) == 3) ? 'checked="checked" />' : ' />';
            html_content += '<input type="radio" class="star" name="fstar_' + post_data.id + '" value="4" ';
            html_content += (Math.floor(post_data.avg_rating) == 4) ? 'checked="checked" />' : ' />';
            html_content += '<input type="radio" class="star" name="fstar_' + post_data.id + '" value="5" ';
            html_content += (Math.floor(post_data.avg_rating) == 5) ? 'checked="checked" />' : ' />';
            html_content += '</form>';
                
                
            html_content += "<div class=\"msg\">";
            html_content += post_data.content;
            var t = post_data.postedon.split(/[- :]/);
            var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
            html_content +=  "</div>";
            if (post_data.img_url) {
                html_content += '<div class="msg-img"><img class="span3 offset1" style="margin: 5px 10px" alight="left" src="' + post_data.img_url + '" /></div>';
            } 
            if (post_data.vid_url) {
                html_content += '<div class="msg-img"><video width="435px" preload="metadata" controls src="' + post_data.vid_url + '" </video></div>';
            } 
            if (post_data.link_url) {
                html_content += '<div class="msg-img"><a href="' + post_data.link_url + '">' + post_data.link_url + '</a></div>';
            }
                
            html_content += "<div style=\"margin-left:15px; font-size:10px; float:left\">"+ d.toLocaleDateString() + " at " + d.toLocaleTimeString() +"</div>";
                
            if (post_data.num_ratings > 0) {
                html_content += "<div style=\"margin-right:15px; font-size:10px; float:right\"><a data-toggle=\"modal\" href=\"#myModal_"+post_data.id+"\">"+post_data.num_ratings+"&nbsp;ratings</a></div>"; 
                    
                html_content +=  '<div class="modal" style="display:none" id="myModal_'+post_data.id+'" class="modal hide fade">';
                html_content +=  '  <div class="modal-header">';
                html_content +=  '    <a class="close" data-dismiss="modal">×</a>';
                html_content +=  '    <h3>5 Star Rating</h3>';
                html_content +=  '  </div>';
                html_content +=  '  <div class="modal-body">';
                $.each(post_data.ratings, function(bogus, curr_rating) {
                    var curr_pic = (curr_rating.profile_pic_url) ? curr_rating.profile_pic_url : "uploads/no_profile.png";
                        
                    html_content += '<div class="row"><img class="chrome span1" href="'+ curr_pic + '" />';
                    html_content += '<div class="span2">'+ curr_rating.fname + ' ' + curr_rating.lname + '</div>';
                        
                    html_content += '<form style="display:inline; float:right; margin-right:10px" id="fstar_' + post_data.id + '">';
                    html_content += '<input type="radio" class="star" name="fstar_rating_' + curr_rating.id + '" disabled="disabled" value="1" ';
                    html_content += (Math.floor(curr_rating.rating) == 1) ? 'checked="checked" />' : ' />';
                    html_content += '<input type="radio" class="star" name="fstar_rating_' + curr_rating.id + '" disabled="disabled" value="2" ';
                    html_content += (Math.floor(curr_rating.rating) == 2) ? 'checked="checked" />' : ' />';
                    html_content += '<input type="radio" class="star" name="fstar_rating_' + curr_rating.id + '" disabled="disabled" value="3" ';
                    html_content += (Math.floor(curr_rating.rating) == 3) ? 'checked="checked" />' : ' />';
                    html_content += '<input type="radio" class="star" name="fstar_rating_' + curr_rating.id + '" disabled="disabled" value="4" ';
                    html_content += (Math.floor(curr_rating.rating) == 4) ? 'checked="checked" />' : ' />';
                    html_content += '<input type="radio" class="star" name="fstar_rating_' + curr_rating.id + '" disabled="disabled" value="5" ';
                    html_content += (Math.floor(curr_rating.rating) == 5) ? 'checked="checked" />' : ' />';
                    html_content += '</form></div>';
                    
                });
                html_content +=  '  </div>';
                html_content +=  '  <div class="modal-footer">';
                html_content +=  '    <a href="javascript:void(0);" onclick="$(\'#myModal_'+post_data.id+'\').modal(\'hide\');" class="btn">Close</a>';
                html_content +=  '  </div>';
                html_content +=  '</div>';
                
            }
            html_content += "</div></div><div class=\"row\"><div class=\"span3\">&nbsp;</div></div>";
                
            var num_comm = post_data.comments.length;
                
            if (num_comm > 2) {
                html_content += '<div class="row show-all-link-'+ post_data.id+'" ><a class="span2 offset1" href="javascript:void(0);" onclick="show_all(' + post_data.id + ')">show all ' + num_comm + ' comments</a></div><div class="span3 show-all-link-'+ post_data.id+'">&nbsp;</div>';
            }
                
            if (post_data.comments) {
                var count = 0;
                $.each(post_data.comments, function(comm, comm_data){
                    html_content += "<div class=\"row post-box ";
                    if (count < num_comm - 2) {
                        html_content += 'post-hidden-' + post_data.id +'" style="display:none"';
                    } else {
                        html_content += '" ';
                    }
                    html_content += "><div><a style=\"margin-left:10px\" href=\"javascript:void(0);\" ";
                    html_content += "onclick=\"do_user(" + comm_data.account_id + ");\"";
                    html_content += "\">";
                    html_content += comm_data.fname + " " + comm_data.lname + " | " + post_data.plate + ", " + post_data.state;
                    html_content += "</a>"; 
                        
                        
                    html_content += '<form onclick="rate_post(' +comm_data.id +', $(\'#fstar_' + comm_data.id + ' input[name=fstar_' + comm_data.id +']:checked\').val())" style="display:inline; float:right; margin-right:10px" id="fstar_' + comm_data.id + '">';
                    html_content += '<input type="radio" class="star" name="fstar_' + comm_data.id + '" value="1" ';
                    html_content += (Math.floor(comm_data.avg_rating) == 1) ? 'checked="checked" />' : ' />';
                    html_content += '<input type="radio" class="star" name="fstar_' + comm_data.id + '" value="2" ';
                    html_content += (Math.floor(comm_data.avg_rating) == 2) ? 'checked="checked" />' : ' />';
                    html_content += '<input type="radio" class="star" name="fstar_' + comm_data.id + '" value="3" ';
                    html_content += (Math.floor(comm_data.avg_rating) == 3) ? 'checked="checked" />' : ' />';
                    html_content += '<input type="radio" class="star" name="fstar_' + comm_data.id + '" value="4" ';
                    html_content += (Math.floor(comm_data.avg_rating) == 4) ? 'checked="checked" />' : ' />';
                    html_content += '<input type="radio" class="star" name="fstar_' + comm_data.id + '" value="5" ';
                    html_content += (Math.floor(comm_data.avg_rating) == 5) ? 'checked="checked" />' : ' />';
                    html_content += '</form>';
                        
                    profile_pic = (comm_data.profile_pic_url) ? comm_data.profile_pic_url : "uploads/no_profile.png";
                        
                    html_content += "<div class=\"msg\"><img class=\"span1\" style=\"width:50px; height:50px; margin: 0 5px\" src=\"" + profile_pic + "\" />";
                    html_content += comm_data.content;
                    var t = comm_data.postedon.split(/[- :]/);
                    var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
                    html_content +=  "</div><div style=\"margin-left:15px; font-size:10px; float:left\">"+ d.toLocaleDateString() + " at " + d.toLocaleTimeString() +"</div>"; 
                        
                    if (comm_data.num_ratings > 0) {
                        html_content += "<div style=\"margin-right:15px; font-size:10px; float:right\"><a data-toggle=\"modal\" href=\"#myModal_"+comm_data.id+"\">"+comm_data.num_ratings+"&nbsp;ratings</a></div>"; 
                            
                        html_content +=  '<div class="modal" style="display:none" id="myModal_'+comm_data.id+'" class="modal hide fade">';
                        html_content +=  '  <div class="modal-header">';
                        html_content +=  '    <a class="close" data-dismiss="modal">×</a>';
                        html_content +=  '    <h3>5 Star Rating</h3>';
                        html_content +=  '  </div>';
                        html_content +=  '  <div class="modal-body">';
                        $.each(comm_data.ratings, function(bogus, curr_rating) {
                            var curr_pic = (curr_rating.profile_pic_url) ? curr_rating.profile_pic_url : "uploads/no_profile.png";
                                
                            html_content += '<div class="row"><img class="chrome span1" href="'+ curr_pic + '" />';
                            html_content += '<div class="span2">'+ curr_rating.fname + ' ' + curr_rating.lname + '</div>';
                                
                            html_content += '<form style="display:inline; float:right; margin-right:10px" id="fstar_' + post_data.id + '">';
                            html_content += '<input type="radio" class="star" name="fstar_rating_' + curr_rating.id + '" disabled="disabled" value="1" ';
                            html_content += (Math.floor(curr_rating.rating) == 1) ? 'checked="checked" />' : ' />';
                            html_content += '<input type="radio" class="star" name="fstar_rating_' + curr_rating.id + '" disabled="disabled" value="2" ';
                            html_content += (Math.floor(curr_rating.rating) == 2) ? 'checked="checked" />' : ' />';
                            html_content += '<input type="radio" class="star" name="fstar_rating_' + curr_rating.id + '" disabled="disabled" value="3" ';
                            html_content += (Math.floor(curr_rating.rating) == 3) ? 'checked="checked" />' : ' />';
                            html_content += '<input type="radio" class="star" name="fstar_rating_' + curr_rating.id + '" disabled="disabled" value="4" ';
                            html_content += (Math.floor(curr_rating.rating) == 4) ? 'checked="checked" />' : ' />';
                            html_content += '<input type="radio" class="star" name="fstar_rating_' + curr_rating.id + '" disabled="disabled" value="5" ';
                            html_content += (Math.floor(curr_rating.rating) == 5) ? 'checked="checked" />' : ' />';
                            html_content += '</form></div>';
                            
                        });
                        html_content +=  '  </div>';
                        html_content +=  '  <div class="modal-footer">';
                        html_content +=  '    <a href="javascript:void(0);" onclick="$(\'#myModal_'+comm_data.id+'\').modal(\'hide\');" class="btn">Close</a>';
                        html_content +=  '  </div>';
                        html_content +=  '</div>';
                        
                    }
                        
                    html_content += "</div></div><div class=\"row\"><div class=\"span3 ";
                    if (count < num_comm - 2) {
                        html_content += 'post-hidden-' + post_data.id +'" style="display:none"';
                    } else {
                        html_content += '" ';
                    }
                    html_content += ">&nbsp;</div></div>";
                    count++;
                });
            }
            html_content += "<div class=\"row\" style=\"margin-left:10px;margin-right:-30px;border-radius:18px\" >";
            html_content += "<button class=\"btn\" onclick=\"do_wall_post(";
            html_content += plate_id + ', ' + post_data.id + ');';
            html_content += "\"><span class=\"icon-share-alt\"></span>&nbsp;Reply</button><textarea class=\"input span4\" id=\"message_";
            html_content += post_data.id + "\"></textarea></div><hr />";
            html_content += "</div></div>";
        });
        $("#wall").html(html_content);
            
        $('input[type=radio].star').rating();
    }
    function error() {
    }
}

function show_all(post_id) {
    $('.post-hidden-'+post_id).fadeIn();
    $('.show-all-link-'+post_id).hide();
}

function set_follow_button(plate_id) {
    follower_check(success, error, plate_id);
    function success(data) {
        if (data.is_following) {
            $('#follow_button').html('<img src="img/follow_following.png" />');
            $('#follow_button').attr('onclick', 'unfollow_plate('+plate_id+');');
            $('#follow_button').mouseover(function () { 
                $("#follow_button img").attr("src", "img/follow_unfollow.png"); 
            });
            $('#follow_button').mouseout(function () { 
                $("#follow_button img").attr("src", "img/follow_following.png"); 
            });
        } else {
            $('#follow_button').html('<img src="img/follow_add.png" />');
            $('#follow_button').attr('onclick', 'follow_plate('+plate_id+');');
            $('#follow_button').unbind('mouseover');
            $('#follow_button').unbind('mouseout');
        }
    }
    function error() {
        $('#follow_button').html(' ');
        $('#follow_button').mouseover(void(0));
        $('#follow_button').mouseout(void(0));
    }

}

function set_favorite_button(favorite_id) {
    favorite_check(success, error, favorite_id);
    function success(data) {
        if (data.is_favorite) {
            $('#favorite_button').html('<img src="img/favorite_favorited.png" />');
            $('#favorite_button').attr('onclick', 'unfavorite('+favorite_id+');');
            $('#favorite_button').mouseover(function () { 
                $("#favorite_button img").attr("src", "img/favorite_remove.png"); 
            });
            $('#favorite_button').mouseout(function () { 
                $("#favorite_button img").attr("src", "img/favorite_favorited.png"); 
            });
        } else if (data.is_pending) {
            $('#favorite_button').html('<img src="img/favorite_pending.png" />');
            $('#favorite_button').attr('onclick', 'unfavorite('+favorite_id+');');
            $('#favorite_button').mouseover(function () { 
                $("#favorite_button img").attr("src", "img/favorite_remove.png"); 
            });
            $('#favorite_button').mouseout(function () { 
                $("#favorite_button img").attr("src", "img/favorite_pending.png"); 
            });
        } else {
            $('#favorite_button').html('<img src="img/favorite_add.png" />');
            $('#favorite_button').attr('onclick', 'favorite('+favorite_id+');');
            $('#favorite_button').unbind('mouseover');
            $('#favorite_button').unbind('mouseout');
        }
    }
    function error() {
        $('#favorite_button').html(' ');
        $('#favorite_button').unbind('mouseover');
        $('#favorite_button').unbind('mouseout');
    }

}
// action functions 

function do_wall_post(plate_id, parent_id) {
    var img_url = "";
    var vid_url = "";
    var link_url = ""
    var msg = "";
    var anon = 0;
    if (parent_id > 0) {
        msg = $('#message_'+ parent_id).val();
        $('#message_'+ parent_id).val('');
    } else {
        msg = $('#message').val();
        $('#message').val('');
        
        img_url = $('#post_upload_img_url').val();
        $('#post_upload_img_url').val('');
        $('#post_upload_img_field').val('');
        $('#post_upload_img_preview').attr('src','');
        
        vid_url = $('#post_upload_vid_url').val();
        $('#post_upload_vid_url').val('');
        $('#post_upload_vid_field').val('');
        $('#post_upload_vid_preview').attr('src','');
        
        link_url = $('#post_link_url').val();
        $('#post_link_url').val('');
    }
    
    if ($('#post_anon').hasClass('selected')) {
        anon = 1;
    } else {
        anon = 0;
    }
    plate_post(success, error, plate_id, msg, parent_id, img_url, vid_url, link_url, anon);
    function success() {
        load_wall(plate_id);
        $('#post_box').slideUp();
        $('#post_upload_img').slideUp();
        $('#post_upload_vid').slideUp();
        $('#post_link').slideUp();
    }
    function error() {
        $('#post_box').slideUp();
        $('#post_upload_img').slideUp();
        $('#post_upload_vid').slideUp();
        $('#post_link').slideUp();   
    }
}

function do_home_post() {
    
    msg = $('#message').val();
    $('#message').val('');
        
    img_url = $('#post_upload_img_url').val();
    $('#post_upload_img_url').val('');
    $('#post_upload_img_field').val('');
    $('#post_upload_img_preview').attr('src','');
        
    vid_url = $('#post_upload_vid_url').val();
    $('#post_upload_vid_url').val('');
    $('#post_upload_vid_field').val('');
    $('#post_upload_vid_preview').attr('src','');
    
    link_url = $('#post_link_url').val();
    $('#post_link_url').val('');
        
    if ($('#post_anon').hasClass('active')) {
        anon = 1;
    } else {
        anon = 0;
    }
    plate_post(success, error, user.plate_id, msg, 0, img_url, vid_url, link_url, anon);
    function success() {
        load_feed();
        $('#post_box').slideUp();
        $('#post_upload_img').slideUp();
        $('#post_upload_vid').slideUp();
        $('#post_link').slideUp();
    }
    function error() {
        $('#post_box').slideUp();
        $('#post_upload_img').slideUp();
        $('#post_upload_vid').slideUp();
        $('#post_link').slideUp();   
    }
}

function do_login() {
    email = $('#sign_in_username_email').val();
    password = $('#sign_in_password').val();
    remember = $('#sign_in_remember').is(':checked');
    
    $('#sign_in_password').val('');
    $('#sign_in_remember').attr('checked', false);
    
    
    acct_login(success, error, email, password, remember);
    function success() {
        $('#login_group').removeClass('error');
        $('#sign_in_username_email').val('');
        update_user();
    }    
    function error() {
        $('#login_group').addClass('error');
    }
}

function do_register() {
    email = $('#sign_up_email').val();
    password = $('#sign_up_password').val();
    
    $('#sign_up_email').val('');
    $('#sign_up_password').val('');
    
    acct_register(success, error, email, password);
    function success() {
        update_user();
    }
    function error() {
    }
}

function do_search(loc) {
    if (loc == 1) {
        plate = $('#center_plate').val();
        state = $('#center_state').val();
        $('#center_plate').val('');
        $('#center_state').val('');
        $('#center_plate_img').attr('src','/util/get_plate_image');
    } else {
        plate = $('#right_plate').val();
        state = $('#right_state').val();
        $('#right_plate').val('');
        $('#right_state').val('');
        $('#right_plate_img').attr('src','/util/get_plate_image');
    }
    load_plate(0, plate, state);
}

function do_user(account_id) {
    acct_user(success, error, account_id);
    function success(data) {
        $("#header-box").slideUp('fast');
        $('.overlay').fadeOut('fast');
        load_plate(data.plate_id);
    }
    function error() {
    }
}

function do_logout() {
    acct_logout(success, error);
    function success() {
        is_logged_in = false;
        user = {
            "id" : 0, 
            "fname" : "Anonymous", 
            "profile_pic_url" : ""
        }; 
        
        views.refresh();
    }
    function error() {
        views.refresh();
    }
}

function follow_plate(plate_id) {
    follower_add(success, error, plate_id);
    function success() {
        set_follow_button(plate_id);
    }
    function error() {
    }
}
function unfollow_plate(plate_id) {
    follower_remove(success, error, plate_id);
    function success() {
        set_follow_button(plate_id);
    }
    function error() {
    }
}
function favorite(target_id) {
    favorite_add(success, error, target_id);
    function success() {
        set_favorite_button(target_id);
    }
    function error() {        
    }
}
function unfavorite(target_id) {
    favorite_remove(success, error, target_id);
    function success() {
        set_favorite_button(target_id);
    }
    function error() {        
    }
}

function upload_file(form, success, myxhr) {
    var formData = new FormData(form[0]);
    $.ajax({
        url: api_url + 'util/do_upload',
        type: 'POST',
        xhr: myxhr,
        success: success,
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    });  
}

function rate_post(wall_post_id, rating) {
    five_star_rate(success, error, wall_post_id, rating);
    function success () {
    
    }
    function error () {
    
    }
}