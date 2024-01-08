<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory , SoftDeletes;

    protected $fillable = [
        'article',
        'name',
        'status',
        'data',
    ];

    protected $dates = ['deleted_at'];

    protected $casts = [
        'data' => 'array'
    ];

    public function scopeAvailiableProducts($query)
    {
        return $query->where('status', '=' , 'available' )->get();
    }
    public function scopeProduct($query , $id)
    {
        return $query->where('id', '=' , $id )->first();
    }

    public function rules(){
        return [
                'article' => 'required|regex:/^[a-zA-Z0-9_.-]*$/|unique',
                'name' => 'required|min:10'
        ];
    }
}
