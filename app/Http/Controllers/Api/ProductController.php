<?php
/**
 * Created by HoanXuanMai
 * Email: hoanxuanmai@gmail.com
 * Date: 6/22/2024
 */

namespace App\Http\Controllers\Api;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProductController
{
    function index(): AnonymousResourceCollection
    {
        return ProductResource::collection(Product::query()->paginate());
    }

    function store(Request $request): ProductResource
    {
        $data = $request->validate([
            'name' => 'required',
            'description' => 'required',
            'price' => 'required|numeric',
            'stock' => 'required|numeric',
        ]);

        $product = Product::create($data);

        return new ProductResource($product);
    }

    function update(Request $request, Product $product): ProductResource
    {
        $data = $request->validate([
            'name' => 'required',
            'description' => 'required',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|numeric|min:0',
        ]);

        $product->update($data);

        return new ProductResource($product);
    }

    function show(Product $product): ProductResource
    {
        return new ProductResource($product);
    }

    function destroy(Product $product): ProductResource
    {
        $product->delete();

        return new ProductResource($product);
    }
}
