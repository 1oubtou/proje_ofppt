<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductuserController extends Controller
{
    public function index()
    {
        $id_user = auth()->id();
        $product = Product::select("id" , "image" , "title" , "description" , "category" , "price")->where('user_id', $id_user)->get();
        return response()->json($product);
    }
    
    public function store(Request $request)
    {
        $request -> validate([
            'image' => 'required|image',
            'title' => 'required|max:50',
            'description' => 'required|string',
            'category' => 'required|string',
            'price' => 'required|numeric|min:10',
        ]);
        if($request->hasFile('image') && $request->file('image')->isValid()) {
            $imageName = time() . '.' . $request->image->getClientOriginalExtension();
            $request->image->storeAs('public', $imageName);

        Product::create([
            'image' => $imageName,
            'title' => $request->title,
            'description' => $request->description,
            'category' => $request->category,
            'price' => $request->price,
            'user_id' => auth()->user()->id,
        ]);
    
        return response()->json(['message' => 'Product saved successfully.']);
    } else {
        return response()->json(['message' => $request->all()]);
    }}

    public function show($id)
    {
        $id_user = auth()->id();
        $products = Product::select("id" , "image" , "title" , "description" , "category" , "price")->where('user_id', $id_user)->find($id);
        return response()->json($products);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'image' => 'nullable',
            'title' => 'required|max:50',
            'description' => 'required|string',
            'category' => 'required|string',
            'price' => 'required|numeric|min:10',
        ]);
    
        $product = Product::findOrFail($id);
    
        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            if ($product->image) {
                Storage::delete('public/' . $product->image);
            }
    
            $imageName = time() . '.' . $request->image->getClientOriginalExtension();
            $request->image->storeAs('public', $imageName);
    
            $product->image = $imageName;
        }
    
        $product->title = $request->title;
        $product->description = $request->description;
        $product->category = $request->category;
        $product->price = $request->price;
        $product->save();
    
        return response()->json(['message' => 'Product updated successfully.']);
    }
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        if ($product->image) {
            Storage::delete('public/' . $product->image);
        }
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully.']);
    }
}
