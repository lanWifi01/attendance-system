<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::create([
            'rfid_uid' => 'admin123',
            'name' => 'Admin Dylan',
            'email' => 'admin@test.com',
            'password' => bcrypt('password') // Ensure you hash the password
        ]);

        User::create([
            'rfid_uid' => '1234567890',
            'name' => 'Dylan Bro',
            'email' => 'dylan@test.com',
            'password' => bcrypt('password')
        ]);

        User::create([
            'rfid_uid' => '3647621950',
            'name' => 'Leander Bro',
            'email' => 'leander@test.com',
            'password' => bcrypt('password')
        ]);
    }
}
