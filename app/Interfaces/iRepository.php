<?php

namespace App\Interfaces;


interface iRepository
{
    public function all($orderby = 'id', $sort = 'desc');

    public function create(array $input);

    public function update($model, array $input);

    public function delete(int $input);

    public function find(int $id);

    public function exists(int $id);

    public function paginate(int $limit, $orderby = 'id', $sort = 'desc');
}
