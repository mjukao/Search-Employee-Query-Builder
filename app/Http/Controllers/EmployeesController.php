<?php
//'employees.age'
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
    ->join('titles', 'employees.emp_no', '=', 'titles.emp_no') // JOIN ตาราง titles
    ->select('employees.*', 'titles.title as position') // เลือกข้อมูล position จาก titles ถ
        ->where('first_name', 'like', '%' . $query . '%')// ค้นหาชื่อที่ตรงกับคำค้นหา (first_name)
        ->orWhere('last_name', 'like', '%' . $query . '%')// ค้นหานามสกุล
        ->orderBy($sortColumn, $sortDirection)// เรียงข้อมูลตามคอลัมน์ ( emp_no หรือ birth_date)
        ->paginate(10);  // กำหนดให้ข้อมูลแบ่งหน้า

    return Inertia::render('Employee/Index', [
        'employees' => $employees,// ส่งข้อมูลพนักงานที่ผ่านการกรองไปที่ frontend
        'query' => $query,// ส่งค่าคำค้นหาไปที่ frontend เพื่อใช้แสดงในช่องค้นหา
        'sortColumn' => $sortColumn,// ส่งค่าคอลัมน์ที่เรียงลำดับ
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
