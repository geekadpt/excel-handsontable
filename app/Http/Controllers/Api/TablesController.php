<?php

namespace App\Http\Controllers\Api;

use App\Models\Table;
use function GuzzleHttp\Psr7\str;
use Illuminate\Http\Request;
use App\Http\Resources\TableResource;
use App\Http\Requests\Api\TableRequest;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class TablesController extends Controller
{
    //
    public function store(TableRequest $request, Table $sheet)
    {
        //dd($request->data);
        //$header = implode(",",$request->header);
        $data = \GuzzleHttp\json_encode($request->data);
        $merge = \GuzzleHttp\json_encode($request->merge);
        $cell =  \GuzzleHttp\json_encode($request->cell);
        $column =  \GuzzleHttp\json_encode($request->column);
        $sheet = new Table;
        $sheet->name = $request->name;
        //$sheet->header = $header;
        $sheet->data = $data;
        $sheet->merge = $merge;
        $sheet->cell = $cell;
        $sheet->column = $column;
        $sheet->user_id = $request->user()->id;
        $sheet->save();
        return new TableResource($sheet);
    }
    public function show(Table $sheet){
        return new TableResource($sheet);
    }
    public function index(Request $request){
        return TableResource::collection($request->user()->sheet()->orderBy('updated_at','desc')->get());
    }
    public function update(TableRequest $request, Table $sheet)
    {
        $this->authorize('update', $sheet);
        $data = \GuzzleHttp\json_encode($request->data);
        $merge = \GuzzleHttp\json_encode($request->merge);
        $cell =  \GuzzleHttp\json_encode($request->cell);
        $column =  \GuzzleHttp\json_encode($request->column);
        $sheet->name = $request->name;
        //$sheet->header = $header;
        $sheet->data = $data;
        $sheet->merge = $merge;
        $sheet->cell = $cell;
        $sheet->column = $column;
        $sheet->update();
        return new TableResource($sheet);
    }
    public function destroy(Table $sheet)
    {
        $this->authorize('destroy', $sheet);

        $sheet->delete();

        if($sheet->trashed()){
            return response(null, 204);
        }else{
            return '软删除失败！';
        }
    }
}

