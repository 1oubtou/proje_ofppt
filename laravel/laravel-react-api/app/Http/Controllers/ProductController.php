<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    
    public function index()
    {
        return Product::select("id" , "image" , "title" , "description" , "category" , "price")->get();
    }
}
