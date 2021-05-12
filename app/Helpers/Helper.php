<?php

namespace App\Helpers;


use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Helper
{
    public static function isEmail($email)
    {
        return filter_var($email, FILTER_VALIDATE_EMAIL);
    }

    public static function isMobile($mobile)
    {
        return preg_match('/^0[0-9]{10}+$/', $mobile);
    }

    public static function convert($input)
    {
        $persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        $english = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        return str_replace($persian, $english, $input);
    }

    public static function phoneMap(&$uNumber, $prefix = '+98')
    {
        $uNumber = Trim($uNumber);
        $ret = &$uNumber;

        if (substr($uNumber, 0, 3) == '%2B') {
            $ret = substr($uNumber, 3);
            $uNumber = $ret;
        }

        if (substr($uNumber, 0, 3) == '%2b') {
            $ret = substr($uNumber, 3);
            $uNumber = $ret;
        }

        if (substr($uNumber, 0, 4) == '0098') {
            $ret = substr($uNumber, 4);
            $uNumber = $ret;
        }

        if (substr($uNumber, 0, 3) == '098') {
            $ret = substr($uNumber, 3);
            $uNumber = $ret;
        }


        if (substr($uNumber, 0, 3) == '+98') {
            $ret = substr($uNumber, 3);
            $uNumber = $ret;
        }

        if (substr($uNumber, 0, 2) == '98') {
            $ret = substr($uNumber, 2);
            $uNumber = $ret;
        }

        if (substr($uNumber, 0, 1) == '0') {
            $ret = substr($uNumber, 1);
            $uNumber = $ret;
        }
        $ret = $prefix . $ret;
        return $ret;
    }
}
