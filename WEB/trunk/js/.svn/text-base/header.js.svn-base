var header = {
    //action methods
    "choose_car" : function (plate_id) {
        data = {
            "plate_id":plate_id
        }
        acct_update_profile(success, error, data);
        function success() {
            update_user()
            $("#header-box").slideUp();
            $('.overlay').fadeOut('fast');
        }
        function error() {
            update_user()
            $("#header-box").slideUp();
            $('.overlay').fadeOut('fast');
        }
    },
    "send_pm" : function (receiver_id) {
        content = $('#pm_reply_' + receiver_id).val();
        $('#pm_reply_' + receiver_id).val(' ');
        pm_send(success, error, receiver_id, content);
        function success() {
            header.show_msg(receiver_id);
        }
        function error() {            
        }
    },
    "unfollow" : function (plate_id) {
        follower_remove(success, error, plate_id);
        function success () {
            header.update_following();
        }
        function error () {
        }
    },
    "unfavorite"  : function (target_id) {
        favorite_remove(success, error, target_id);
        function success () {
            header.update_favorites();
            header.update_requests();
        }
        function error () {
        }
    },
    "confirm_fav"  : function (target_id) {
        favorite_confirm(success, error, target_id);
        function success () {
            header.update_favorites();
            header.update_requests();
        }
        function error () {
        }
    },
    "change_profile" : function (input) {
        data = {};
        if (input == 'fname') {
            data.fname = $('#edit_fname').val();
            data.lname = $('#edit_lname').val();
        } else if (input == 'gender') {
            data.gender = $('input:radio[name=gender]:checked').val();
        } else if (input == 'interested_in') {
            data.interested_in = $('input:radio[name=interested_in]:checked').val();
        } else if (input == 'pic') {
            data.profile_pic_url = $('#new_pic_url').val();
        }
        
        if (data) {
            acct_update_profile(success, error, data);
        }
        function success() {
        
        }
        function error() {
        
        }
    },
    "change_pw" : function () {
        password_new = $('#new_pw').val();
        if (password_new == $('#new_pw_conf').val()) {
            acct_change_password(success, error, password_new);
        }
        
        function success () {
        
        }
        function error () {
        
        }
    },
    "hide_notification" : function (notification_id)  {
        notifications_hide(success, error, notification_id);
        function success () {
            
        }
        function error () {
            
        }
    },
    //load methods
    "update_garage" : function () {
        $('#header_side').html('&nbsp;');
        var html_content = "";
        plate_get_by_account(success, error);
        
        function success (data) {
            html_content += '<div class="span8"><div class="row">&nbsp;</div>';
            $.each(data, function(id, plate) {
                pic_url = (plate.plate_profile_pic) ? plate.plate_profile_pic : "uploads/no_profile.png";
                if (plate.year) {
                    yr = plate.year.substr(0, 4);
                } else {
                    yr = 2012;
                }
                html_content += '<div class="row">';
                html_content += '<div class="span3" style="padding:10px 0;margin-left:-30px"><a href="javascript:void(0);" onclick="load_plate('+plate.id+')"><img class="span3" src="' + api_url + 'util/get_plate_image?plate=' + plate.plate + '&state=' + plate.state+'" /></a></div>';
                html_content += '<div class="span1" style="padding:20px 0"><img class="span2" src="' + pic_url + '" /></div>';
                html_content += '<div class="span2" style="padding:30px; font-size: 16px "><a href="javascript:void(0);" onclick="load_plate('+plate.id+')">'+ yr + ' ' + plate.make + ' ' + plate.model + '</a></div>';
                html_content += '<div class="span1" style="padding:30px 0"><button class="span1 header-btn" onclick="header.choose_car('+plate.id+');">SELECT</button></div>';
                html_content += '</div>';
            });
            html_content += '</div>';
            $("#garage").html(html_content);
        
        }
        
        function error() {
        
        }
    },
    "update_messages" : function () {
        $('#header_side').html('&nbsp;');
        var html_content = "";
        pm_get(success, error);
        function success(data) {
            var accounts = data.accounts;
            delete data.accounts;
            html_content += '<div class="span8"><div class="row">&nbsp;</div>';
            $.each(data, function(account_id, message_data) {
                profile_pic = (accounts[account_id].profile_pic_url) ? accounts[account_id].profile_pic_url : "uploads/no_profile.png";
                html_content += '<div class="row well"><img class="span1 chrome" src="' + profile_pic + '"><div class="span5">';
                html_content += '<div class="row"><a class="span5 msg-name" href="javascript: void(0);" onclick="do_user(' + account_id + ')">' + accounts[account_id].fname + ' ' + accounts[account_id].lname + '</a></div>';
                count = message_data.length;
                if (count > 1) {
                    html_content += '<div class="row"><span class="span5 msg-item">'+ message_data[count-2].content +'</span></div>';
                }
                html_content += '<div class="row"><span class="span5 msg-item">'+ message_data[count-1].content +'</span></div>';
                html_content += '</div><button class="span1 btn header-btn" onclick="header.show_msg('+account_id +');">VIEW</button>';
                html_content += '</div>';
            });
            html_content += '</div>';
            $('#messages').html(html_content)
        }
        function error() {
        }
    },
    "show_msg" : function (id) {
        $('#header_side').html('&nbsp;');
        var html_content = "";
        pm_get(success, error);
        function success(data) {
            var accounts = data.accounts;
            delete data.accounts;
            html_content += '<div class="span8"><div class="row">&nbsp;</div>';
            $.each(data, function(account_id, message_data) {
                if (account_id == id) {
                    curr_id = 0;
                    $.each(message_data, function(bogus, message) {
                        if (curr_id != message.sender_id) {
                            if (curr_id != 0) {
                                html_content += '</div><!-- content -->';
                                if (message.sender_id != account_id) {
                                    profile_pic = (accounts[message.receiver_id].profile_pic_url) ? accounts[message.receiver_id].profile_pic_url : "uploads/no_profile.png";
                                    html_content += '<img class="span1 chrome" src="' + profile_pic + '">'; 
                                }
                                html_content += '</div><!-- well -->'; 
                            
                            }
                            html_content += '<div class="row well">';
                            if (message.sender_id != account_id) {
                                profile_pic = (accounts[message.sender_id].profile_pic_url) ? accounts[message.sender_id].profile_pic_url : "uploads/no_profile.png";
                                html_content += '<img class="span1 chrome" src="' + profile_pic + '">'; 
                                html_content += '<div class="span5"><a href="javascript:void(0);" onclick=do_user('+message.sender_id+')>' + accounts[message.sender_id].fname + ' ' + accounts[message.sender_id].lname + '</a>';
                            } else {
                                html_content += '<div class="span1">&nbsp;</div>';
                                html_content += '<div class="span5" style="text-align:right"><div class="row"><a class="span5" href="javascript:void(0);" onclick=do_user('+message.sender_id+')>' + accounts[message.sender_id].fname + ' ' + accounts[message.sender_id].lname + '</a></div>';
                            }
                            curr_id = message.sender_id;
                        }
                        html_content += '<div class="row"><div class="span5">' + message.content + '</div></div>';
                    
                    });
                    html_content += '</div>';
                    if (curr_id == account_id) {
                        profile_pic = (accounts[curr_id].profile_pic_url) ? accounts[curr_id].profile_pic_url : "uploads/no_profile.png";
                        html_content += '<img class="span1 chrome" src="' + profile_pic + '">'; 
                    }
                    html_content += '</div>';
                    html_content += '<div class="row well"><button class="span1 btn header-btn" style="float:none" onclick="header.update_messages()"><i class="icon-arrow-left"></i></button>';
                    html_content += '<input class="span5" id="pm_reply_'+ account_id +'" style="margin-left: 30px; margin-top: 15px" type="text" onkeydown="javascript: if (event.keyCode == 13) header.send_pm('+ account_id+');" />';
                    html_content += '<button class="span1 btn header-btn" style="float:none" onclick="header.send_pm('+ account_id+')">REPLY</button>';
                
                }
            });
            html_content += '</div></div>';
            $('#messages').html(html_content)
        }
        function error() {
        }
    },
    "update_following" : function () {
        $('#header_side').html('&nbsp;');
        var html_content = "";
        follower_get(success, error);
        function success (data) {
            html_content += '<div class="span8"><div class="row">&nbsp;</div>';
            $.each(data, function(blah, plate) {
                pic_url = (plate.plate_profile_pic) ? plate.plate_profile_pic : "uploads/no_profile.png";
                if (plate.year) {
                    yr = plate.year.substr(0, 4);
                } else {
                    yr = 2012;
                }
                html_content += '<div class="row">';
                html_content += '<div class="span3" style="padding:10px 0;margin-left:-30px"><img class="span3" src="/util/get_plate_image?plate='+plate.plate+'&state='+plate.state+'" /></div>';
                html_content += '<div class="span1" style="padding:20px 0"><img class="span2" src="' + pic_url + '" /></div>';
                html_content += '<div class="span2" style="padding:30px; font-size: 16px "><a href="javascript:void(0);" onclick="do_user('+plate.account_id+');">'+ plate.fname + ' ' + plate.lname + '</a></div>';
                html_content += '<div class="span1" style="padding:30px 0"><button class="span1 btn header-btn" onclick="header.unfollow('+plate.plate_id+');">UNFOLLOW</button></div>';
                html_content += '</div>';
            });
            html_content += '</div>';
            $("#following").html(html_content);
        }
        function error() {
        
        }
    },
    "update_favorites" : function () {
        $('#header_side').html('&nbsp;');
        var html_content = "";
        favorite_get(success, error, 0);
        function success (data) {
            html_content += '<div class="span8"><div class="row">&nbsp;</div>';
            html_content += '<div class="row"><button class="span2 offset2 btn header-btn" onclick="header.update_favorites()">FAVORITES</button>';
            html_content += '<button class="span2 btn header-btn" style="margin-left:70px" onclick="header.update_pending()">PENDING</button></div>'; 
            html_content += '<div class="row">&nbsp;</div>';
            $.each(data, function(blah, user) {
                pic_url = (user.profile_pic_url) ? user.profile_pic_url : "uploads/no_profile.png";
                html_content += '<div class="row">';
                html_content += '<div class="span1" style="padding:20px 0"><img class="span2 chrome" src="' + pic_url + '" /></div>';
                html_content += '<div class="span3" style="padding:30px; font-size: 16px "><a href="javascript: void(0);" onclick="do_user(' + user.id + ')">' + user.fname + ' ' + user.lname + '</a></div>';
                html_content += '<div class="span1" style="padding:30px 0"><button class="span1 btn header-btn" onclick="do_user('+user.id+');">VIEW</button></div>';
                html_content += '<div class="span1" style="padding:30px 0"><button class="span1 btn header-btn deny" style="margin-left:70px" onclick="header.unfavorite('+user.id+');">REMOVE</button></div>';
                html_content += '</div>';
            });
            html_content += '</div>';
            $("#favorites").html(html_content);
        }
        function error() {
        
        }
    },
    "update_pending" :function () {
        $('#header_side').html('&nbsp;');
        var html_content = "";
        favorite_get(success, error, 0);
        function success (data) {
            html_content += '<div class="span8"><div class="row">&nbsp;</div>';
            html_content += '<div class="row"><button class="span2 offset2 btn header-btn" onclick="header.update_favorites()">FAVORITES</button>';
            html_content += '<button class="span2 btn header-btn" style="margin-left:70px" onclick="header.update_pending()">PENDING</button></div>'; 
            html_content += '<div class="row">&nbsp;</div>';
            html_content += '</div>';
            $("#favorites").html(html_content);
        }
        function error() {
        
        }
    },
    "update_requests" : function () {
        $('#header_side').html('&nbsp;');
        var html_content = "";
        favorite_get_pending(success, error, 0);
        function success (data) {
            html_content += '<div class="span8"><div class="row">&nbsp;</div>';
            $.each(data, function(blah, user) {
                pic_url = (user.profile_pic_url) ? user.profile_pic_url : "uploads/no_profile.png";
                html_content += '<div class="row">';
                html_content += '<div class="span1" style="padding:20px 0"><img class="span2 chrome" src="' + pic_url + '" /></div>';
                html_content += '<div class="span3" style="padding:30px; font-size: 16px "><a href="javascript: void(0);" onclick="do_user(' + user.id + ')">' + user.fname + ' ' + user.lname + '</a> added you as a Favorite</div>';
                html_content += '<div class="span1" style="padding:30px 0"><button class="span1 btn header-btn deny" onclick="header.unfavorite('+user.id+'); header.update_requests();">DENY</button></div>';
                html_content += '<div class="span1" style="padding:30px 0"><button class="span1 btn header-btn accept" style="margin-left:70px" onclick="header.confirm_fav('+user.id+'); header.update_requests();">ACCEPT</button></div>';
                html_content += '</div>';
            });
            html_content += '</div>';
            $("#fav_req").html(html_content);
        }
        function error() {
        
        }
    },
    "update_notifications" : function () {
        $('#header_side').html('&nbsp;');
        var html_content = "";
        notifications_get(success, error);
        function success(data) {
            html_content += '<div class="span8"><div class="row">&nbsp;</div>';
            var total_count = 0;
            var not_count = 0;
            var msg_count = 0;
            var req_count = 0;
            $.each(data, function(blah, user) {
                if (user.type == 'account') {
                    pic_url = (user.target.profile_pic_url) ? user.target.profile_pic_url : "uploads/no_profile.png";
                } else if (user.type == 'plate') {
                    pic_url = (user.target.plate_pic_url) ? user.target.plate_pic_url : "uploads/no_profile.png";
                }
                
                html_content += '<div class="row">';
                html_content += '<div class="span1" style="padding:20px 0"><img class="span2 chrome" src="' + pic_url + '" /></div>';
                html_content += '<div class="span4" style="padding:30px; font-size: 16px;'; 
                if (user.unread == 1) {
                    html_content += 'font-weight:bold;';
                    count++;
                }
                html_content += '"><a href="javascript: void(0);"'; 
                if (user.type == 'account') {
                    html_content += ' onclick="do_user(' + user.target_id + ')'; 
                } else if (user.type == 'plate') {
                    html_content += ' onclick="load_plate(' + user.target_id + ')';
                }
                html_content += '">' + user.message + '</a></div>';
                html_content += '<div class="span1" style="padding:30px 0"><button class="span1 btn header-btn" style="margin-left:70px" onclick="header.hide_notification('+user.id+'); header.update_notifications();">HIDE</button></div>';
                html_content += '</div>';
            });
            html_content += '</div>';
            $('#notifications').html(html_content);
            if (total_count > 0) {
                $('#prof_acct_badge').badger(''+count);
            } else {
                $('#prof_acct_badge').badger();
            }
        }
        function error() {
            
        }
    },
    "set_acct_side" : function () {
        var side_html = "";
        side_html += '<div class="row">&nbsp;</div>';
        side_html += '<div class="row">&nbsp;</div>';
        side_html += '<div class="row"><button style="margin-left:15px" class="span2 btn header-btn" onclick="header.update_acct_set();event.stopImmediatePropagation()">GENERAL</button></div>';
        side_html += '<div class="row"><button style="margin-left:15px" class="span2 btn header-btn" onclick="header.update_acct_set_sec();event.stopImmediatePropagation()">SECURITY</button></div>';
        side_html += '<div class="row"><button style="margin-left:15px" class="span2 btn header-btn" onclick="header.update_acct_set_pic();event.stopImmediatePropagation()">PROFILE PIC</button></div>';
        $('#header_side').html(side_html);
    },
    "update_acct_set" : function () {
        header.set_acct_side();
        var html_content = "";
        acct_user(success, error)
        function success (data) {
            html_content += '<div class="span8" style="font-size:16px"><div class="row">&nbsp;</div>';
            
            html_content += '<div class="row well"><div class="span6 form-horizontal">';
            html_content += '<label class="control-label" for="fname">Email</label>'; 
            html_content += '<input type="text" class="input" value="' + data.email + '" disabled /></div></div>'; 
            
            
            html_content += '<div class="row well"><div class="span6 form-horizontal" id="edit_name">';
            html_content += '<label class="control-label" for="fname">Name</label>'; 
            html_content += '<input type="text" name="fname" id="edit_fname" class="input" value="' + data.fname + '" disabled />'; 
            html_content += '<input type="text" name="lname" id="edit_lname" class="input" value="' + data.lname + '" disabled />';
            html_content += '</div><button class="span1 btn header-btn" id="edit_name_edit" onclick=\'$("#edit_name input").removeAttr("disabled");$("#edit_name_edit").hide(); $("#edit_name_save").fadeIn();\'>EDIT</button>';
            html_content += '<button class="span1 btn header-btn accept" id="edit_name_save" style="display:none" onclick=\'header.change_profile("fname");$("#edit_name input").attr("disabled","disabled");$("#edit_name_save").hide(); $("#edit_name_edit").fadeIn();\'>SAVE</button></div>';
            
            html_content += '<div class="row well"><div class="span6 form-horizontal">';
            html_content += '<label class="control-label" for="fname">Gender</label>'; 
            html_content += '<label class="radio">';
            html_content += '<input type="radio" name="gender" value="m"';
            html_content += (data.gender == 'm') ? "checked " : " ";
            html_content += 'disabled>Male</label>';
            
            html_content += '<label class="radio">';
            html_content += '<input type="radio" name="gender" value="f"';
            html_content += (data.gender == 'f') ? "checked " : " ";
            html_content += 'disabled>Female</label>';
            html_content += '</div><button class="span1 btn header-btn" id="edit_gender_edit" onclick=\'$("input:radio[name=gender]").removeAttr("disabled");$("#edit_gender_edit").hide(); $("#edit_gender_save").fadeIn();\'>EDIT</button>';
            html_content += '<button class="span1 btn header-btn accept" id="edit_gender_save" style="display:none" onclick=\'header.change_profile("gender");$("input:radio[name=gender]").attr("disabled","disabled");$("#edit_gender_save").hide(); $("#edit_gender_edit").fadeIn();\'>SAVE</button></div>';
            
            html_content += '<div class="row well"><div class="span6 form-horizontal">';
            html_content += '<label class="control-label" for="fname">Interested in</label>'; 
            html_content += '<label class="radio">';
            html_content += '<input type="radio" name="interested_in" value="m"';
            html_content += (data.interested_in == 'm') ? "checked " : " ";
            html_content += 'disabled>Male</label>';
            
            html_content += '<label class="radio">';
            html_content += '<input type="radio" name="interested_in" value="f"';
            html_content += (data.interested_in == 'f') ? "checked " : " ";
            html_content += 'disabled>Female</label>';
            html_content += '</div><button class="span1 btn header-btn" id="edit_interested_in_edit" onclick=\'$("input:radio[name=interested_in]").removeAttr("disabled");$("#edit_interested_in_edit").hide(); $("#edit_interested_in_save").fadeIn();\'>EDIT</button>';
            html_content += '<button class="span1 btn header-btn accept" id="edit_interested_in_save" style="display:none" onclick=\'header.change_profile("interested_in");$("input:radio[name=interested_in]").attr("disabled","disabled");$("#edit_interested_in_save").hide(); $("#edit_interested_in_edit").fadeIn();\'>SAVE</button></div>';
            
            
            html_content += '</div>';
            $('#acct_set').html(html_content);
        }
        function error (){
        
        }
    },
    "update_acct_set_sec" : function () {
        header.set_acct_side();
        var html_content = "";
        acct_user(success, error)
        function success (data) {
            html_content += '<div class="span8" style="font-size:16px"><div class="row">&nbsp;</div>';
            
            html_content += '<div class="row well"><div class="span6 form-horizontal">';
            html_content += '<label class="control-label">Email</label>'; 
            html_content += '<input type="text" class="input" value="' + data.email + '" disabled /></div></div>'; 
            
            
            html_content += '<div class="row well"><div class="span6 form-horizontal" id="edit_pw">';
            html_content += '<label class="control-label" for="fname">Password</label>';  
            html_content += '<input type="password" name="new_pw" id="new_pw" class="input" placeholder="New password" style="display:none"/>'; 
            html_content += '<input type="password" name="new_pw_conf" id="new_pw_conf" class="input" placeholder="Retype new password" style="display:none"/>';
            html_content += '</div><button class="span1 btn header-btn" id="edit_pw_edit" onclick=\'$("#edit_pw input").fadeIn();$("#edit_pw_edit").hide(); $("#edit_pw_save").fadeIn();\'>EDIT</button>';
            html_content += '<button class="span1 btn header-btn accept" id="edit_pw_save" style="display:none" onclick=\'header.change_pw();$("#edit_pw input").fadeOut();$("#edit_pw_save").hide(); $("#edit_pw_edit").fadeIn();\'>SAVE</button></div>';
            
            html_content += '</div>';
            $('#acct_set').html(html_content);
        }
        function error (){
        
        }
    },
    "update_acct_set_pic" : function () {
        header.set_acct_side();
        var html_content = "";
        acct_user(success, error)
        function success (data) {
            html_content += '<div class="span8" style="font-size:16px"><div class="row">&nbsp;</div>';
            
            html_content += '<div class="row well"><div class="span2">';
            html_content += '<label class="control-label" for="fname">Profile pic</label>'; 
            html_content += '<img class="span2 chrome" id="edit_pic_img" src="'+ data.profile_pic_url + '"/></div>'; 
            
            
            html_content += '<form enctype="multipart/form-data class="span5 form-horizontal" id="edit_pic" onsubmit="return false;"><div class="row"><div class="span3 offset2" id="upload_area" style="display:none">';
            html_content += '<label class="control-label" for="fname">Upload</label>';  
            html_content += '<input type="file" name="upload" id="upload_field" class="input-file span2" /><progress id="prog" style="display:none"></progress>';
            html_content += '</form><br />'; 
            html_content += '</div><div><div class="row"><div class="span3 offset2"><input type="hidden" id="new_pic_url" value="" />'; 
            html_content += '<button class="span2 btn header-btn accept" id="edit_pic_upload" style="display:none" onclick=\'header.upload_file();\'>UPLOAD</button>';
            html_content += '<button class="span1 btn header-btn" id="edit_pic_edit" onclick=\'$("#upload_area").fadeIn();$("#edit_pic_edit").hide(); $("#edit_pic_upload").fadeIn(); $("#edit_pic_cancel").fadeIn();\'>EDIT</button>';
            html_content += '<button class="span2 btn header-btn accept" id="edit_pic_save" style="display:none" onclick=\'header.change_profile("pic"); $("#edit_pic_save").hide(); $("#edit_pic_cancel").hide(); $("#edit_pic_edit").fadeIn();\'>SAVE</button>';
            html_content += '<button class="span2 btn header-btn deny" id="edit_pic_cancel" style="display:none" onclick=\'header.update_acct_set_pic();\'>CANCEL</button></div></div></div>';
            
            html_content += '</div>';
            $('#acct_set').html(html_content);
        }
        function error (){
        
        }
    },
    "set_priv_side" : function () {
        var side_html = "";
        side_html += '<div class="row">&nbsp;</div>';
        side_html += '<div class="row">&nbsp;</div>';
        side_html += '<div class="row"><button style="margin-left:15px" class="span2 btn header-btn" onclick="header.update_priv_set();event.stopImmediatePropagation()">CONNECTIONS</button></div>';
        side_html += '<div class="row"><button style="margin-left:15px" class="span2 btn header-btn" onclick="header.update_priv_set_tagging();event.stopImmediatePropagation()">TAGGING</button></div>';
        side_html += '<div class="row"><button style="margin-left:15px" class="span2 btn header-btn" onclick="header.update_priv_set_apps();event.stopImmediatePropagation()">APPS & WEB</button></div>';
        side_html += '<div class="row"><button style="margin-left:15px" class="span2 btn header-btn" onclick="header.update_priv_set_posts();event.stopImmediatePropagation()">PAST POSTS</button></div>';
        side_html += '<div class="row"><button style="margin-left:15px" class="span2 btn header-btn" onclick="header.update_priv_set_block();event.stopImmediatePropagation()">BLOCKING</button></div>';
        $('#header_side').html(side_html);
    },
    "update_priv_set" : function () {
        header.set_priv_side();
        var html_content = "";
        acct_user(success, error)
        function success (data) {
            html_content += '<div class="span8" style="font-size:16px"><div class="row">&nbsp;</div>';
            
            html_content += '<div class="row well"><div class="span8 form-horizontal">';
            html_content += '<div class="row">'; 
            html_content += '<label class="control-label span3 header-txt" for="fname">Who can look you up by name or contact info?</label>'; 
            html_content += '<div class="btn-group span5" data-toggle="buttons-radio">'
            html_content += '<button class="btn header-btn span1_5">Public</button>';
            html_content += '<button class="selected btn header-btn span1_5">Private</button>';
            html_content += '<button class="btn header-btn span1_5">Custom</button>';
            html_content += '</div></div></div></div>';
            
            html_content += '<div class="row well"><div class="span8 form-horizontal">';
            html_content += '<div class="row">'; 
            html_content += '<label class="control-label span3 header-txt" for="fname">Who can send you favorite requests?</label>'; 
            html_content += '<div class="btn-group span5" data-toggle="buttons-radio">'
            html_content += '<button class="btn header-btn span1_5">Public</button>';
            html_content += '<button class="selected btn header-btn span1_5">Private</button>';
            html_content += '<button class="btn header-btn span1_5">Custom</button>';
            html_content += '</div></div></div></div>';
            
            html_content += '<div class="row well"><div class="span8 form-horizontal">';
            html_content += '<div class="row">'; 
            html_content += '<label class="control-label span3 header-txt" for="fname">Who can send you Private Messages?</label>'; 
            html_content += '<div class="btn-group span5" data-toggle="buttons-radio">'
            html_content += '<button class="btn header-btn span1_5">Public</button>';
            html_content += '<button class="selected btn header-btn span1_5">Private</button>';
            html_content += '<button class="btn header-btn span1_5">Custom</button>';
            html_content += '</div></div></div></div>';
            
            html_content += '</div></div>'; 
            html_content += '</div>';
            $('#priv_set').html(html_content);
        }
        function error (){
        
        }
    },
    "update_priv_set_tagging" : function () {
        header.set_priv_side();
        var html_content = "";
        acct_user(success, error)
        function success (data) {
            html_content += '<div class="span8" style="font-size:16px"><div class="row">&nbsp;</div>';
            
            html_content += '<div class="row well"><div class="span8 form-horizontal">';
            html_content += '<div class="row">'; 
            html_content += '<label class="control-label span3 header-txt" for="fname">Who can tag you?</label>'; 
            html_content += '<div class="btn-group span5" data-toggle="buttons-radio">'
            html_content += '<button class="btn header-btn span1_5">Public</button>';
            html_content += '<button class="selected btn header-btn span1_5">Private</button>';
            html_content += '<button class="btn header-btn span1_5">Custom</button>';
            html_content += '</div></div></div></div>';
            
            html_content += '</div></div>'; 
            html_content += '</div>';
            $('#priv_set').html(html_content);
        }
        function error (){
        
        }
    },
    "update_priv_set_apps" : function () {
        header.set_priv_side();
        var html_content = "";
        acct_user(success, error)
        function success (data) {
            html_content += '<div class="span8" style="font-size:16px"><div class="row">&nbsp;</div>';
            
            html_content += '</div></div>'; 
            html_content += '</div>';
            $('#priv_set').html(html_content);
        }
        function error (){
        
        }
    },
    "update_priv_set_posts" : function () {
        header.set_priv_side();
        var html_content = "";
        acct_user(success, error)
        function success (data) {
            html_content += '<div class="span8" style="font-size:16px"><div class="row">&nbsp;</div>';
            
            html_content += '<div class="row well"><div class="span8 form-horizontal">';
            html_content += '<div class="row">'; 
            html_content += '<label class="control-label span3 header-txt" for="fname">Default post visibility:</label>'; 
            html_content += '<div class="btn-group span5" data-toggle="buttons-radio">'
            html_content += '<button class="btn header-btn span1_5">Public</button>';
            html_content += '<button class="selected btn header-btn span1_5">Private</button>';
            html_content += '<button class="btn header-btn span1_5">Custom</button>';
            html_content += '</div></div></div></div>';
            html_content += '</div></div>'; 
            html_content += '</div>';
            $('#priv_set').html(html_content);
        }
        function error (){
        
        }
    },
    "update_priv_set_block" : function () {
        header.set_priv_side();
        var html_content = "";
        acct_user(success, error)
        function success (data) {
            html_content += '<div class="span8" style="font-size:16px"><div class="row">&nbsp;</div>';
            
            html_content += '</div></div>'; 
            html_content += '</div>';
            $('#priv_set').html(html_content);
        }
        function error (){
        
        }
    },
    "upload_file" : function () {
        $('#edit_pic progress').fadeIn();
        var myxhr = function() { 
            myXhr = $.ajaxSettings.xhr();
            if(myXhr.upload){
                myXhr.upload.addEventListener('progress', header.handleProgress, false);
            }
            return myXhr;
        }
        var success = function (data) {
            $('#prog').hide();
            $('#edit_pic_img').attr('src', data.data);
            $('#new_pic_url').val(data.data);
            $("#edit_pic_save").fadeIn();
            $("#edit_pic_upload").hide();
            $("#upload_area").hide(); 
        }
        upload_file($('#edit_pic'), success, myxhr);
    },
    "handleProgress" : function (e) {
        if(e.lengthComputable){
            $('#edit_pic progress').attr({
                value:e.loaded,
                max:e.total
            });
        }
    }
}