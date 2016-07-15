var views = {
    "landing" : "#landing",
    "profile" : "#profile-body",
    "login_box" : ".login_box",
    "acct_box" : "#acct",
    "logout_link" : "#logout_link",
    "headerbox" : "#header-box",
    
    "refresh" : function () {
        $(this.headerbox).slideUp('fast');
        $('.overlay').fadeOut('fast');
        if (is_logged_in) {
            //hide anon/landing
            $(this.login_box).hide();
            $(this.landing).slideUp('fast');
            
            //show content
            $(this.acct_box).fadeIn('fast');
            $(this.logout_link).fadeIn('fast');
            $(this.profile).fadeIn('fast');
            
            $('#icon-area').fadeIn();
            
        } else {
            //hide content
            $(this.acct_box).hide();
            $(this.logout_link).hide();
            $(this.profile).fadeOut('fast');
            
            //show anon/landing
            $(this.login_box).fadeIn('fast');
            $(this.landing).slideDown('fast');
            
            $('#icon-area').fadeOut();
        }
    },
    
    "show_profile" : function () {
        $(this.landing).slideUp('fast');
        $(this.profile).fadeIn('fast');
    },
    
    "show_messages" : function() {
        $('#header-box').slideDown('fast');
        $('.overlay').fadeIn('fast');
        $('#messages-tab').click();
        event.stopImmediatePropagation();
        header.update_messages();
    },
    
    "show_favorites" : function() {
        $('#header-box').slideDown('fast');
        $('.overlay').fadeIn('fast');
        $('#favorites-tab').click();
        event.stopImmediatePropagation();
        header.update_favorites();
    },
    
    "show_settings" : function() {
        $('#header-box').slideDown('fast');
        $('.overlay').fadeIn('fast');
        $('#acct_set-tab').click();
        event.stopImmediatePropagation();
        header.update_settings();
    },
    
    "show_notifications" : function() {
        $('#header-box').slideDown('fast');
        $('.overlay').fadeIn('fast');
        $('#notifications-tab').click();
        event.stopImmediatePropagation();
        header.update_notifications();
    }
}

