<?php

namespace App\Traits;

use App\Contracts\ResponseMaker;
use App\Helpers\HttpStatus;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\ResourceCollection;

trait ApiCommonResponse {
    /**
     * @param int $status
     * @param string $message
     * @param array $data
     * @param array $errors
     * @return JsonResponse
     */
    public function response(int $status, string $message, array $data = [], $errors = []): JsonResponse
    {
        if ($data instanceof ResourceCollection)
            $data = $data->toArray(request());
        $output = ResponseMaker::message($message);
        if (count($data) > 0)
            $output = $output->array($data);
        if (count($errors) > 0)
            $output = $output->errors($errors);
        $output = $output->toArray();
        return response()->json($output, $status);
    }

    public function success(string $message = 'response.stored', $data = []): JsonResponse
    {
        if ($data instanceof ResourceCollection)
            $data = $data->toArray(request());
        $message = ($message) ? __($message) : $message;
        return $this->response(HttpStatus::HTTP_OK, $message, $data);
    }

    public function data($data = []): JsonResponse
    {
        if ($data instanceof ResourceCollection)
            $data = $data->toArray(request());
        return $this->response(HttpStatus::HTTP_OK, '', $data);
    }

    // usually use when operation not successfully
    // for example create on mysql db failed
    public function fail(string $message = 'response.error', $data = []): JsonResponse
    {
        if ($data instanceof ResourceCollection)
            $data = $data->toArray(request());
        $message = ($message) ? __($message) : $message;
        return $this->response(HttpStatus::HTTP_INTERNAL_SERVER_ERROR, $message, $data);
    }

    // usually use when operation not successfully
    // for example create on mysql db failed
    public function badRequest(string $message = 'response.unvalid', $data = []): JsonResponse
    {
        if ($data instanceof ResourceCollection)
            $data = $data->toArray(request());
        $message = ($message) ? __($message) : $message;
        return $this->response(HttpStatus::HTTP_BAD_REQUEST, $message, $data);
    }

    // quick access and cerfully programming :)
    public function stored(string $message = 'response.stored', $data = []): JsonResponse
    {
        return $this->success($message,$data);
    }

    // quick access and cerfully programming :)
    public function deleted(string $message = 'response.deleted', $data = []): JsonResponse
    {
        return $this->success($message,$data);
    }

    // quick access and cerfully programming :)
    public function updated(string $message = 'response.updated', $data = []): JsonResponse
    {
        return $this->success($message,$data);
    }



    public function notFound(string $message = 'response.http.NOT_FOUNDED'): JsonResponse
    {
        $message = ($message) ? __($message) : $message;
        return $this->response(HttpStatus::HTTP_NOT_FOUND, $message);
    }

    public function disallow(string $message = 'response.http.NOT_ALLOWED'): JsonResponse
    {
        $message = ($message) ? __($message) : $message;
        return $this->response(HttpStatus::HTTP_METHOD_NOT_ALLOWED, $message);
    }

    public function forbidden(string $message = 'response.http.FORBIDDEN'): JsonResponse
    {
        $message = ($message) ? __($message) : $message;
        return $this->response(HttpStatus::HTTP_FORBIDDEN, $message);
    }

    public function unauthorised(string $message = 'response.http.UNAUTHORIZED'): JsonResponse
    {
        $message = ($message) ? __($message) : $message;
        return $this->response(HttpStatus::HTTP_UNAUTHORIZED, $message);
    }

    public function unProcess(string $message = 'response.http.unProcess', $data = []): JsonResponse
    {
        $message = ($message) ? __($message) : $message;
        return $this->response(HttpStatus::HTTP_UNPROCESSABLE_ENTITY, $message, $data);
    }

    public function redirect($url, $data = []): JsonResponse
    {
        if ($data instanceof ResourceCollection || $data instanceof Collection)
            $data = $data->toArray(request());
        $data['redirect'] = $url;
        return $this->response(HttpStatus::HTTP_MOVED_PERMANENTLY, '', $data);
    }
}