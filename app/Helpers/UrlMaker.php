<?php

namespace App\Helpers;

class UrlMaker
{

    public static function avatar($user): string
    {
        $avatar = config('const.users.default_avatar');
        if (isset($user['avatar']['id']) and !empty($user['avatar']['id'])) {
            $avatar = MediaUrl::make($user['avatar'], '4x');
        } else if (isset($user['social_avatar']) and !empty($user['social_avatar'])) {
            $avatar = $user['social_avatar'];
        }
        return $avatar;

    }

    public static function getPayInvoiceUrl($serial, $number): string
    {
        return env('APP_URL') . '?serial=' . $serial . '&number=' . $number;
    }
}
