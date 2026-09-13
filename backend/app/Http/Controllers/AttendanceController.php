<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Attendance;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    public function scan(Request $request)
    {
        $request->validate([
            'rfid_uid' => 'required|string',
        ]);

        $user = User::where('rfid_uid', $request->rfid_uid)->first();

        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'RFID tag not registered.',
            ], 404);
        }

        // Determine if this scan is a check_in or check_out
        $lastAttendance = Attendance::where('user_id', $user->id)
            ->latest('scanned_at')
            ->first();

        $type = ($lastAttendance && $lastAttendance->type === 'check_in') ? 'check_out' : 'check_in';

        $attendance = Attendance::create([
            'user_id' => $user->id,
            'type' => $type,
            'scanned_at' => now(),
        ]);

        return response()->json([
            'status' => 'success',
            'message' => "Successfully recorded {$type} for {$user->name}.",
            'data' => [
                'user' => $user->name,
                'type' => $type,
                'scanned_at' => $attendance->scanned_at,
            ],
        ], 200);
    }
}