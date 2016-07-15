/* Auth */
// Login
var api_url = "http://teamrecon.nayeem.co/";
function acct_login(success_fxn, error_fxn, email, password, remember) {
    $.ajax({
        type: "POST",
        url: api_url + "acct/login",
        data:"sign_in_username_email=" + email + "&sign_in_password=" + password + "&sign_in_remember=" + remember,
        success: function(response) {
            if (response.success) {
                success_fxn();
            } else {
                error_fxn();
            }
        },
        error: function() {
            error_fxn();
        }
    });
}
// Logout
function acct_logout(success_fxn, error_fxn) {
    $.ajax({
        type: "POST",
        url: api_url + "acct/logout",
        data: {
            "logout" : true
        },
        dataType: "json",
        success: function(response) {
            if (response.success) {
                success_fxn();
            } else {
                error_fxn();
            }
        },
        error: function(response) {
            error_fxn();
        }
    });
}
// Get User Data
function acct_user(success_fxn, error_fxn, account_id) {
    ajaxData = {
        type: "GET",
        url: api_url + "acct/user",
        dataType: "json",
        success: function(response) {
            if (response.success) {
                success_fxn(response.data);
            } else {
                error_fxn();
            }
        },
        error: function(response) {
            error_fxn();
        }
    }
    if (account_id) {
        ajaxData.data = {
            "account_id" : account_id
        };
    }
    $.ajax(ajaxData);
}

// Get User Data
function acct_get_feed(success_fxn, error_fxn, account_id) {
    ajaxData = {
        type: "GET",
        url: api_url + "acct/get_feed",
        dataType: "json",
        success: function(response) {
            if (response.success) {
                success_fxn(response.data);
            } else {
                error_fxn();
            }
        },
        error: function(response) {
            error_fxn();
        }
    }
    if (account_id) {
        ajaxData.data = {
            "account_id" : account_id
        };
    }
    $.ajax(ajaxData);
}
function acct_get_local_feed(success_fxn, error_fxn) {
    ajaxData = {
        type: "GET",
        url: api_url + "acct/get_local_feed",
        dataType: "json",
        success: function(response) {
            if (response.success) {
                success_fxn(response.data);
            } else {
                error_fxn();
            }
        },
        error: function(response) {
            error_fxn();
        }
    }
    $.ajax(ajaxData);
}
// Register
function acct_register(success_fxn, error_fxn, sign_up_email, sign_up_password) {
    $.ajax({
        type: "POST",
        url: api_url + "acct/register",
        data:"sign_up_email=" + sign_up_email + "&" + "sign_up_password=" + sign_up_password,
        success: function(response) {
            if (response.success) {
                success_fxn();
            } else {
                error_fxn();
            }
        },
        error: function() {
            error_fxn();
        }
    });
}
// Update Profile
function acct_update_profile(success_fxn, error_fxn, data) {
    $.ajax({
        type: "POST",
        url: api_url + "acct/update_profile",
        data: data,
        dataType: "json",
        success: function(response) {
            if (response.success) {
                success_fxn();
            } else {
                error_fxn();
            }
        },
        error: function(response) {
            error_fxn();
        }
    });
}
// Change Password
function acct_change_password(success_fxn, error_fxn, password_new) {
    $.ajax({
        type: "POST",
        url: api_url + "acct/change_password",
        data: {
            "password_new" : password_new
        },
        dataType: "json",
        success: function(response) {
            if (response.success) {
                success_fxn();
            } else {
                error_fxn();
            }
        },
        error: function(response) {
            error_fxn();
        }
    });
}
// Forget Password
function acct_forgot_password(success_fxn, error_fxn, email) {
    $.ajax({
        type: "POST",
        url: api_url + "acct/forgot_password",
        data: {
            "forgot_password_email" : email
        },
        dataType: "JSON",
        success: function(response) {
            if (response.success) {
                success_fxn();
            } else {
                error_fxn();
            }
        },
        error: function(response) {
            error_fxn();
        }
    });
}
// Get Plate
function plate_get(success_fxn, error_fxn, plate_id, plate, state) {
    ajaxData = {
        type: "GET",
        url: api_url + "plate/get",
        dataType: "json",
        success: function(response) {
            if (response.success) {
                success_fxn(response.data);
            } else {
                error_fxn();
            }
        },
        error: function(response) {
            error_fxn();
        }
    }
    if (plate_id) {
        ajaxData.data = {
            "plate_id" : plate_id
        };
    } else if (plate&&state) {
        ajaxData.data = {
            "plate" : plate,
            "state" : state
        };
    }
    $.ajax(ajaxData);
}

function plate_get_by_account(success_fxn, error_fxn) {
    ajaxData = {
        type: "GET",
        url: api_url + "plate/get_by_account",
        dataType: "json",
        success: function(response) {
            if (response.success) {
                success_fxn(response.data);
            } else {
                error_fxn();
            }
        },
        error: function(response) {
            error_fxn();
        }
    }
    $.ajax(ajaxData);
}
// Get Wall
function plate_get_wall(success_fxn, error_fxn, plate_id) {
    ajaxData = {
        type: "GET",
        url: api_url + "plate/get_wall",
        dataType: "json",
        success: function(response) {
            if (response.success) {
                success_fxn(response.data);
            } else {
                error_fxn();
            }
        },
        error: function(response) {
            error_fxn();
        }
    }
    if (plate_id) {
        ajaxData.data = {
            "plate_id" : plate_id
        };
    }
    $.ajax(ajaxData);
}
// Update Plate
function update_plate(success_fxn, error_fxn, make, model, year, color, state, access, plate_pic_url, plate_id) {
    ajaxData = {
        type: "POST",
        url: api_url + "plate/update_plate",
        dataType: "json",
        success: function(response) {
            if (response.success) {
                success_fxn();
            } else {
                error_fxn();
            }
        },
        error: function(response) {
            error_fxn();
        }
    }
    ajaxData.data = {};
    if (make) {
        ajaxData.data.make = make
    }
    if (model) {
        ajaxData.data.model = model
    }
    if (year) {
        ajaxData.data.year = year
    }
    if (color) {
        ajaxData.data.color = color
    }
    if (state) {
        ajaxData.data.state = state
    }
    if (access) {
        ajaxData.data.access = access
    }
    if (plate_pic_url) {
        ajaxData.data.plate_pic_url = plate_pic_url
    }
    if (plate_id) { 
        ajaxData.data.plate_id = plate_id
    }   
    $.ajax(ajaxData);
}
// Update Location
function plate_update_location(success_fxn, error_fxn, plate_id, lat, lon) {
    $.ajax({
        type: "POST",
        url: api_url + "plate/update_location",
        data: {
            "plate_id" : plate_id,
            "lat" : lat,
            "lon" : lon
        },
        dataType: "json",
        success: function(response) {
            if (response.success) {
                success_fxn();
            } else {
                error_fxn();
            }
        },
        error: function(response) {
            error_fxn();
        }
    });
}
// Plate Post
function plate_post(success_fxn, error_fxn, plate_id, content, parent_id, img_url, vid_url, link_url, anon) {
    var d = {
            "plate_id" : plate_id,
            "content" : content,
            "parent_id" : parent_id,
            "img_url" : img_url,
            "vid_url" : vid_url,
            "link_url" : link_url
            
        };
    if (anon) {
        d["account_id"] = 0;
    }
    $.ajax({
        type: "POST",
        url: api_url + "plate/post",
        data: d,
        dataType: "json",
        success: function(response) {
            if (response.success) {
                success_fxn();
            } else {
                error_fxn();
            }
        },
        error: function(response) {
            error_fxn();
        }
    });
}
// Plate Delete
function plate_delete(success_fxn, error_fxn, wall_post_id) {
    $.ajax({
        type: "POST",
        url: api_url + "plate/delete",
        data: {
            "wall_post_id" : wall_post_id
        },
        dataType: "json",
        success: function(response) {
            if (response.success) {
                success_fxn();
            } else {
                error_fxn();
            }
        },
        error: function(response) {
            error_fxn();
        }
    });
}
// Favorite Add
function favorite_add(success_fxn, error_fxn, target_id){
    $.ajax({
        type: "POST",
        url: api_url + "favorite/add",
        data: {
            "target_id" : target_id
        },
        dataType: "json",
        success: function(response) {
            if (response.success) {
                success_fxn();
            } else {
                error_fxn();
            }
        },
        error: function(response) {
            error_fxn();
        }
    });
} 
// Favorite Confirm
function favorite_confirm(success_fxn, error_fxn, target_id){
    $.ajax({
        type: "POST",
        url: api_url + "favorite/confirm",
        data: {
            "target_id" : target_id
            
        },
        dataType: "json",
        success: function(response) {
            if (response.success) {
                success_fxn();
            } else {
                error_fxn();
            }
        },
        error: function(response) {
            error_fxn();
        }
    });
}  
// Favorite Remove
function favorite_remove(success_fxn, error_fxn, target_id){
    $.ajax({
        type: "POST",
        url: api_url + "favorite/remove",
        data: {
            "target_id" : target_id
            
        },
        dataType: "json",
        success: function(response) {
            if (response.success) {
                success_fxn();
            } else {
                error_fxn();
            }
        },
        error: function(response) {
            error_fxn();
        }
    });
}
// Get Favorite
function favorite_get(success_fxn, error_fxn, account_id) {
    ajaxData = {
        type: "GET",
        url: api_url + "favorite/get",
        dataType: "json",
        success: function(response) {
            if (response.success) {
                success_fxn(response.data);
            } else {
                error_fxn();
            }
        },
        error: function(response) {
            error_fxn();
        }
    }
    if (account_id) {
        ajaxData.data = {
            "account_id" : account_id
        };
    }
    $.ajax(ajaxData);
} 
// Pending Favorite Get
function favorite_get_pending(success_fxn, error_fxn) {
    $.ajax({
        type: "GET",
        url: api_url + "favorite/get_pending",
        dataType: "json",
        success: function(response) {
            if (response.success) {
                success_fxn(response.data);
            } else {
                error_fxn();
            }
        },
        error: function(response) {
            error_fxn();
        }
    });
}
// Favorite Is A Favorite
function favorite_check(success_fxn, error_fxn, favorite_id) {
    $.ajax({
        type: "GET",
        url: api_url + "favorite/check",
        dataType: "json",
        data: {
            "favorite_id" : favorite_id            
        },
        success: function(response) {
            if (response.success) {
                success_fxn(response.data);
            } else {
                error_fxn();
            }
        },
        error: function(response) {
            error_fxn();
        }
    });
}
// Remove Follower
function follower_remove(success_fxn, error_fxn, plate_id){
    $.ajax({
        type: "POST",
        url: api_url + "follower/remove",
        data: {
            "plate_id" : plate_id
            
        },
        dataType: "json",
        success: function(response) {
            if (response.success) {
                success_fxn();
            } else {
                error_fxn();
            }
        },
        error: function(response) {
            error_fxn();
        }
    });
}
// Add Follower
function follower_add(success_fxn, error_fxn, plate_id){
    $.ajax({
        type: "POST",
        url: api_url + "follower/add",
        data: {
            "plate_id" : plate_id
            
        },
        dataType: "json",
        success: function(response) {
            if (response.success) {
                success_fxn();
            } else {
                error_fxn();
            }
        },
        error: function(response) {
            error_fxn();
        }
    });
}
// Follower is following
function follower_check(success_fxn, error_fxn, plate_id) {
    $.ajax({
        type: "GET",
        url: api_url + "follower/check",
        data: {
            "plate_id" : plate_id
        },
        dataType: "json",
        success: function(response) {
            if (response.success) {
                success_fxn(response.data);
            } else {
                error_fxn();
            }
        },
        error: function(response) {
            error_fxn();
        }
    });
}
// Get Follower
function follower_get(success_fxn, error_fxn) {
    $.ajax({
        type: "GET",
        url: api_url + "follower/get",
        dataType: "json",
        success: function(response) {
            if (response.success) {
                success_fxn(response.data);
            } else {
                error_fxn();
            }
        },
        error: function(response) {
            error_fxn();
        }
    });
}
// Get Five Star
function five_star_get(success_fxn, error_fxn, wall_post_id) {
    $.ajax({
        type: "GET",
        url: api_url + "five_star/get",
        dataType: "json",
        data: {
            "wall_post_id" : wall_post_id
        },
        success: function(response) {
            if (response.success) {
                success_fxn(response.data);
            } else {
                error_fxn();
            }
        },
        error: function(response) {
            error_fxn();
        }
    });
}
// Rate Five Star
function five_star_rate(success_fxn, error_fxn, wall_post_id, rating){
    $.ajax({
        type: "POST",
        url: api_url + "five_star/rate",
        data: {
            "wall_post_id" : wall_post_id,
            "rating" : rating
            
        },
        dataType: "json",
        success: function(response) {
            if (response.success) {
                success_fxn();
            } else {
                error_fxn();
            }
        },
        error: function(response) {
            error_fxn();
        }
    });
}

function update_average(success_fxn, error_fxn, wall_post_id) {
    $.ajax({
        type: "GET",
        url: api_url + "plate/update_average",
        data: {
            "wall_post_id" : wall_post_id
        },
        dataType: "json",
        success: function(response) {
            if (response.success) {
                success_fxn(response.data);
            } else {
                error_fxn();
            }
        },
        error: function(response) {
            error_fxn();
        }
    });
}
function associate_user(success_fxn, error_fxn, plate_id) {
    $.ajax({
        type: "POST",
        url: api_url + "plate/assoc_user",
        data: {
            "plate_id" : plate_id
        },
        dataType: "json",
        success: function(response) {
            if (response.success) {
                success_fxn();
            } else {
                error_fxn();
            }
        },
        error: function(response) {
            error_fxn();
        }
    });
}

// Send Private Message
function pm_send(success_fxn, error_fxn, receiver_id, content){
    $.ajax({
        type: "POST",
        url: api_url + "pm/send",
        data: {
            "receiver_id" : receiver_id,
            "content": content
            
        },
        dataType: "json",
        success: function(response) {
            if (response.success) {
                success_fxn();
            } else {
                error_fxn();
            }
        },
        error: function(response) {
            error_fxn();
        }
    });
}
// Get Private Message
function pm_get(success_fxn, error_fxn) {
    $.ajax({
        type: "GET",
        url: api_url + "pm/get",
        dataType: "json",
        success: function(response) {
            if (response.success) {
                success_fxn(response.data);
            } else {
                error_fxn();
            }
        },
        error: function(response) {
            error_fxn();
        }
    });
}

function gallery_upload(success_fxn, error_fxn, url, plate_id) {
    $.ajax({
        type: "POST",
        url: api_url + "gallery/upload",
        data: {
            "url" : url,
            "plate_id" : plate_id
        },
        dataType: "json",
        success: function(response) {
            if (response.success) {
                success_fxn();
            } else {
                error_fxn();
            }
        },
        error: function(response) {
            error_fxn();
        }
    });
}

function gallery_get(success_fxn, error_fxn, plate_id) {
    $.ajax({
        type: "GET",
        url: api_url + "pm/get",
        data: {
            "plate_id" : plate_id
        },
        dataType: "json",
        success: function(response) {
            if (response.success) {
                success_fxn(response.data);
            } else {
                error_fxn();
            }
        },
        error: function(response) {
            error_fxn();
        }
    });
}
function get_advertisements(success_fxn, error_fxn) {
    $.ajax({
        type: "GET",
        url: api_url + "advertisements/submit",
        dataType: "json",
        success: function(response) {
            if (response.success) {
                success_fxn(response.data);
            } else {
                error_fxn();
            }
        },
        error: function(response) {
            error_fxn();
        }
    });
}

function submit_advertisements(success_fxn, error_fxn, title, body, payment, budget, schedule, location, audience) {
    ajaxData = {
        type: "POST",
        url: api_url + "advertisements/submit",
        dataType: "json",
        success: function(response) {
            if (response.success) {
                success_fxn();
            } else {
                error_fxn();
            }
        },
        error: function(response) {
            error_fxn();
        }
    }
    ajaxData.data = {};
    if (title) {
        ajaxData.data.title = title
    }
    if (body) {
        ajaxData.data.body = body
    }
    if (payment) {
        ajaxData.data.payment = payment
    }
    if (budget) {
        ajaxData.data.budget = budget
    }
    if (schedule) {
        ajaxData.data.schedule = schedule
    }
    if (location) {
        ajaxData.data.location = location
    }
    if (audience) {
        ajaxData.data.audience = audience
    }   
    $.ajax(ajaxData);
}

function notifications_get (success_fxn, error_fxn) {
    $.ajax({
        type: "GET",
        url: api_url + "notifications/get",
        dataType: "json",
        success: function(response) {
            if (response.success) {
                success_fxn(response.data);
            } else {
                error_fxn();
            }
        },
        error: function(response) {
            error_fxn();
        }
    });
    
}

function notifications_hide (success_fxn, error_fxn, notification_id) {
    $.ajax({
        type: "POST",
        url: api_url + "notifications/hide",
        data: {
            "notification_id" : notification_id
        },
        dataType: "json",
        success: function(response) {
            if (response.success) {
                success_fxn();
            } else {
                error_fxn();
            }
        },
        error: function(response) {
            error_fxn();
        }
    });
}

function util_get_link_info (success_fxn, error_fxn, url) {
    $.ajax({
        type: "GET",
        url: api_url + "util/get_link_info",
        data: {
            "url" : url
        },
        dataTyle: "json",
        success: function(response) {
            if (response.success) {
                success_fxn(response.data);
            } else {
                error_fxn();
            }
        },
        error: function() {
            error_fxn();
        }
    })
}
