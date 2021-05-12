<?php

namespace App\Contracts;

use App\Interfaces\iRepository;
use Illuminate\Contracts\Foundation\Application;

abstract class Repository implements iRepository
{
    /**
     * @var Application|mixed
     */
    protected $model;

    /**
     * @var array
     */
    protected array $modelWith = [];


    abstract public function model(): string;

    public function __construct()
    {
        $this->model = app($this->model());
    }

    public function all($orderby = 'id', $sort = 'desc')
    {
        $model = $this->with();
        return $model->orderBy($orderby, $sort)->get();
    }

    public function paginate(int $limit = 15, $orderby = 'id', $sort = 'desc')
    {
        $model = $this->with();
        return $model->orderBy($orderby, $sort)->paginate($limit);
    }

    public function create(array $input)
    {
        return $this->model->create($input);
    }

    public function find(int $id)
    {
        $model = $this->with();
        return $model->find($id);
    }

    public function update($model, array $input)
    {
        return $this->model->where('id', '=', $model)->update($input);
    }

    public function delete(int $input)
    {
        return $this->model->where('id', '=', $input)->delete();
    }

    public function exists(int $id)
    {
        return $this->model->where('id', '=', $id)->exists();
    }

    public function updateOrCreate(array $conditions, array $data)
    {
        return $this->model->updateOrCreate($conditions, $data);
    }

    protected function with()
    {
        $with = $this->getWith();
        if ($with)
            return $this->model->with($with);
        return $this->model;
    }

    public function setWith(array $with = []): Repository
    {
        $this->modelWith = $with;
        return $this;
    }

    protected function getWith(): array
    {
        return $this->modelWith;
    }

}
