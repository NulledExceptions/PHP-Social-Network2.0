<?php
require_once('amazon/sdk.class.php');
class AWS {
    var $S3;
    var $bucket;
    
    function __construct() {
        $this->S3 = new AmazonS3();
        $this->bucket = 'pm-uploads-akiaiqtuynh3va4rqwza';
    }
    
    function s3_put($file) {
        $filename = explode(DIRECTORY_SEPARATOR, $file);
        $filename = array_pop($filename);
        $this->S3->batch()->create_object($this->bucket, $filename, 
                array('fileUpload' => $file, 'acl'=> AmazonS3::ACL_PUBLIC));
        $this->S3->batch()->send();
        return $this->S3->get_object_url($this->bucket, $filename);
    }
}