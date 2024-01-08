<?php

namespace App\Http\Controllers;

use App\Jobs\productNotificationJob;
use App\Models\Product;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Response;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::availiableProducts();
        return Response::json(
            $products,
            200
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $product = Product::create($request->all());
        try {
            $product->save();
            sendEmail($product->name);
            
        
            return Response::json(
                $product,
                201
            );
        } catch (Exception $e) {
            return Response::json(['error' => 'Product not created error : ' . $e]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $product = Product::product($request->id);
        if ($product) {
            return Response::json(
                $product,
                201
            );
        } else {
            return Response::json(['error' => 'Product not exist']);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request)
    {
        $product = Product::product($request->id);
        $user = Auth::user();
        
        if ($user->role === true)
            if ($request->has('article')) $product->article = $request->article;
        if ($request->has('name')) $product->name = $request->name;
        if ($request->has('data')) $product->data = $request->data;
        if ($request->has('status')) $product->status = $request->status;

        try {

            $product->update();
            return Response::json(
                $product,
                201
            );
        } catch (Exception $e) {

            return Response::json(['error' => 'Product not updated error : ' . $e]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $product = Product::product($request->id);
        try {
            $product->delete();
            return Response::json(
                ["success" => "Product deleted"],
                201
            );
        } catch (Exception $e) {
            return Response::json(['error' => 'Product not deleted, error : ' . $e]);
        }
    }
}





function sendEmail($title)
{

    $details = [
        'title' => 'New Product',
        'from' => 'yazansy097@gmail.com',
        'body' => 'Product with Name ' . $title . ' Created',
    ];
   
    dispatch(new productNotificationJob($details));
}
