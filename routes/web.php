<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
Route::group(['middleware' => ['auth', 'verified']], function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/products', function () {
        return Inertia::render('Product/Index');
    })->name('products.index');

    Route::get('/products/create', function () {
        return Inertia::render('Product/Create');
    })->name('products.create');

    Route::get('/products/{product}/show', function ($product) {
        return Inertia::render('Product/Create', ['product' => $product]);
    })->name('products.show');

    Route::get('/products/{product}/edit', function ($product) {
        return Inertia::render('Product/Create', ['product' => $product]);
    })->name('products.edit');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';


