<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class EmployeesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
{
    $query = $request->input('search', '');
    $sortColumn = $request->input('sortColumn', 'emp_no');
    $sortDirection = $request->input('sortDirection', 'asc');

    $employees = DB::table('employees')
        ->where('first_name', 'like', '%' . $query . '%')
        ->orWhere('last_name', 'like', '%' . $query . '%')
        ->orderBy($sortColumn, $sortDirection)
        ->paginate(10);  // กำหนดให้ข้อมูลแบ่งหน้า

    return Inertia::render('Employee/Index', [
        'employees' => $employees,
        'query' => $query,
        'sortColumn' => $sortColumn,
        'sortDirection' => $sortDirection,
    ]);
}






    /**
 * Show the form for creating a new resource.
 */
 public function create()
 {
        // ดึงรายชื่อแผนกจากฐานข%อมูล เพื่อไปแสดงให%เลือกรายการในแบบฟอร,ม
        $departments = DB::table('departments')->select('dept_no', 'dept_name')->get();
        // สMงข%อมูลไปยังหน%า Inertia
        return inertia::render('Employees/Create', ['departments' => $departments]);
 }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Employee $employee)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        //
    }
}
