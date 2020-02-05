<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;

class TableRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => 'required|string',
            'data' => 'required|array',
            'merge' => 'nullable|array',
            'column' => 'required|array',
            'cell' => 'nullable|array',
        ];
    }
}
