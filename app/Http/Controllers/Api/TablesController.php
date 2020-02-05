<?php

namespace App\Http\Controllers\Api;

use App\Models\Table;
use Illuminate\Http\Request;
use App\Http\Resources\TableResource;
use App\Http\Requests\Api\TableRequest;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class TablesController extends Controller
{
    //
    public function store(TableRequest $request, Table $table)
    {
        //dd($request->data);
        //$header = implode(",",$request->header);
        $data = \GuzzleHttp\json_encode($request->data);
        $merge = \GuzzleHttp\json_encode($request->merge);
        $cell =  \GuzzleHttp\json_encode($request->cell);
        $column =  \GuzzleHttp\json_encode($request->column);
        $table = new Table;
        $table->name = $request->name;
        //$table->header = $header;
        $table->data = $data;
        $table->merge = $merge;
        $table->cell = $cell;
        $table->column = $column;
        $table->user_id = $request->user()->id;
        $table->save();
        return new TableResource($table);
    }
    public function show(Table $table){
        return new TableResource($table);
    }
    public function index(Request $request){
        return TableResource::collection($request->user()->table()->orderBy('updated_at','desc')->get());
    }
    public function update(TableRequest $request, Table $table)
    {
        $this->authorize('update', $table);
        $data = \GuzzleHttp\json_encode($request->data);
        $merge = \GuzzleHttp\json_encode($request->merge);
        $cell =  \GuzzleHttp\json_encode($request->cell);
        $column =  \GuzzleHttp\json_encode($request->column);
        $table->name = $request->name;
        //$table->header = $header;
        $table->data = $data;
        $table->merge = $merge;
        $table->cell = $cell;
        $table->column = $column;
        $table->update();
        return new TableResource($table);
    }
    public function destroy(Table $table)
    {
        $this->authorize('destroy', $table);

        $table->delete();

        if($table->trashed()){
            return response(null, 204);
        }else{
            return '软删除失败！';
        }
    }
    public function trashIndex(Request $request)
    {
        return TableResource::collection($request->user()->table()->onlyTrashed()->get());
    }
    public function trashDelete(Request $request, $id)    {
        $table = $request->user()->table()->onlyTrashed()->find($id);
        if($request->user()->id == $table->user_id && $table->forceDelete()){
            return response(null, 204);
        }else{
            return '彻底删除文件失败！';
        }

    }
    public function trashDeleteAll(Request $request)    {

        try {
            $table = $request->user()->table()->onlyTrashed();
            if($table->forceDelete()){
                abort(204, '清空回收站成功！');
            }else{
                abort(403, '清空回收站失败！');
            }
        }catch (Exception $e) {
            abort(403, '清空回收站失败！');
        }
    }
    public function trashRestore(Request $request, $id)    {

        $table = $request->user()->table()->onlyTrashed()->find($id);
        if($request->user()->id == $table->user_id && $table->restore()){
            return response(null, 204);
        }else{
            return '恢复文件失败！';
        }

    }
}

