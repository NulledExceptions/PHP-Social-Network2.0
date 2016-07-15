<?php

class Ios_Push {

    var $passphrase;
    var $CI;

    function __construct() {
        $this->passphrase = 'PlateMe2012';
        $this->CI = & get_instance();
    }

    function push($account_id, $message, $data) {
        $this->CI->load->model('account/account_model');
        $account = $this->CI->account_model->get_by_id($account_id);

        if ( ! $account || ! $account->token) {
            return;
        }

        $deviceToken = $account->token;
        
        $ctxDev = stream_context_create();
        stream_context_set_option($ctxDev, 'ssl', 'local_cert', 'keys/PlateMe.pem');
        stream_context_set_option($ctxDev, 'ssl', 'passphrase', $this->passphrase);
        $ctxDist = stream_context_create();
        stream_context_set_option($ctxDist, 'ssl', 'local_cert', 'keys/PlateMeDistribution.pem');
        stream_context_set_option($ctxDist, 'ssl', 'passphrase', $this->passphrase);

        // Open a connection to the APNS server
        $fpDev = stream_socket_client(
                'ssl://gateway.sandbox.push.apple.com:2195', $err, $errstr, 60, STREAM_CLIENT_CONNECT, $ctxDev);
        $fpDist = stream_socket_client(
                'ssl://gateway.push.apple.com:2195', $err, $errstr, 60, STREAM_CLIENT_CONNECT, $ctxDist);

        if ( ! $fpDev)
            return;
        if ( ! $fpDist)
            return;
        //echo 'Connected to APNS' . PHP_EOL;

         
        $body['aps'] = array(
            'alert' => $message,
            'sound' => 'default'
        );
        
        //Add our own data to the notification
        $body['data'] = $data;

        $payload = json_encode($body);

        $msg = chr(0) . pack('n', 32) . pack('H*', $deviceToken) . pack('n', strlen($payload)) . $payload;
        fwrite($fpDev, $msg, strlen($msg));
        fwrite($fpDist, $msg, strlen($msg));

        fclose($fpDev);
        fclose($fpDist);
    }

}
