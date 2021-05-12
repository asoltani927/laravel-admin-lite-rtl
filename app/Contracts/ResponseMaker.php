<?php

namespace App\Contracts;


/**
 *
 * @property mixed|string message
 * @property bool|mixed|string status
 * @property mixed|string errors
 * @property array|mixed|string records
 * @method static message(string $_)
 * @method static array($success)
 */
class ResponseMaker
{
    private $response = [];
    private static $instance = null;

    public function make()
    {
        return $this;
    }

    private function _message(string $message)
    {
        $this->message = $message;
        return $this;
    }

    private function _status(bool $status)
    {
        $this->status = $status;
        return $this;
    }

    private function _array($array)
    {
        foreach ($array as $k => $i) {
            $this->$k = $i;
        }
        return $this;
    }

    private function _errors($errors)
    {
        $this->errors = $errors;
        return $this;
    }

    private function _records(array $records)
    {
        $this->records = $records;
        return $this;
    }

    public function __set($name, $value)
    {
        // TODO: Implement __set() method.
        $this->response[$name] = $value;
    }

    public function __get($name)
    {
        // TODO: Implement __set() method.
        return (isset($this->response[$name]) ? $this->response[$name] : '');
    }

    public function toArray()
    {
        return (array)$this->response;
    }

    public static function __callStatic($name, $arguments)
    {
        $name = '_' . $name;
        self::$instance = new self();
        if (method_exists(self::$instance, $name))
            return call_user_func_array([self::$instance, $name], $arguments);
        return false;
    }

    public function __call($name, $arguments)
    {
        $name = '_' . $name;
        if (self::$instance === null)
            self::$instance = new self();
        if (method_exists(self::$instance, $name))
            return call_user_func_array([self::$instance, $name], $arguments);
        return false;
    }


}
