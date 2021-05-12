<?php

namespace App\Interfaces\Contracts;

interface iModule
{
    public static function getServiceName(): string;

    public static function getServices(): array;

    // @return Array all enabled gateway on this project
    public static function getAll(): array;

    // @return Array gateway by name on this project
    public static function getByName($gatewayName);

    public static function handle(array $input = []);
}
