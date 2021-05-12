<?php

namespace App\Helpers;

use Carbon\Carbon;


class MediaUrl
{
    public static function map(array $records, array $columns, $keepId = false, $thumbnail = false): ?array
    {
        $data = [];
        foreach ($records as $key => $record) {
            $data[$key] = $record;
            foreach ($columns as $column) {
                if (isset($record[$column]['id'])) {
                    $data[$key][$column] = [
                        'url' => self::make($record[$column], $thumbnail),
                        'alt' => $record[$column]['alt'],
                    ];
                    if ($keepId === true) {
                        $data[$key][$column]['id'] = (int)$record[$column]['id'];
                    }
                }
            }
        }
        return $data;
    }

    public static function make($media, $thumbnail = false): string
    {
        if (is_object($media))
            $media = (array)$media;
        if (isset($media['id'])) {
            if ($media['access_type'] === 'private')
                return (env('APP_CDN') . 'v1/media/' . Carbon::parse($media['created_at'])->format('Y-m-d') . '/' . $media['id'] . '-' . (($thumbnail !== false) ? $thumbnail . '-' : '') . $media['filename'] . '.' . $media['extension']);
            return (env('APP_CDN') . 'uploads' . $media['path'] . (($thumbnail !== false) ? '/' . $thumbnail . '/' : '/') . $media['filename'] . '.' . $media['extension']);
        }
        return '';
    }
}
