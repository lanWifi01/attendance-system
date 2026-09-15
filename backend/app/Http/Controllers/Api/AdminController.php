<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function login(Request $request) {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required' 
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid credentials.',
            ], 401);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Login successful.',
            'user' => $user
        ]);
    }

    public function getUsers(Request $request) {
        $users = User::orderBy('created_at', 'desc')->get();
        return response()->json([
            'status' => 'success',
            'data' => $users
        ]);
    }

    public function storeUser(Request $request) {
        $fields = $request->validate([
            'rfid_uid' => 'required|string|unique:users,rfid_uid',
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6'
        ]);

        $user = User::create([
            'rfid_uid' => $fields['rfid_uid'],
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password'])
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully.',
            'data' => $user
        ]);
    }
}
