<?php
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\EmployeesController;
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

Route::get('/dashboard', function () { //กำหนดเส้นทาง HTTP แบบ GET สำหรับ URL /dashboard
    return Inertia::render('Dashboard'); //ส่งคืนการเรียกใช้เทมเพลต Inertia ที่ชื่อว่า Dashboard
})->middleware(['auth', 'verified'])->name('dashboard');  //กำหนด middleware ที่ต้องผ่านเพื่อเข้าถึงเส้นทางนี้

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/employee', [EmployeesController::class, 'index'])->name('employees.index');
    Route::get('/employee/create', [EmployeesController::class, 'create'])->name('employee.create');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
});

require __DIR__.'/auth.php';
