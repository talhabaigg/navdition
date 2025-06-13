<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class ProjectsTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        // Assuming you have user IDs 1 to 10 in users table
        $userIds = range(1, 2);

        for ($i = 0; $i < 20; $i++) { // create 20 projects
            DB::table('projects')->insert([
                'title' => $faker->sentence(3),
                'description' => $faker->paragraph(),
                'type' => $faker->randomElement(['Web', 'Mobile', 'Desktop']),
                'due_date' => $faker->optional()->dateTimeBetween('now', '+1 year'),
                'price' => $faker->optional()->randomFloat(2, 1000, 10000),
                'assigned_to' => $faker->randomElement($userIds),
                'created_by' => $faker->randomElement($userIds),
                'updated_by' => $faker->randomElement($userIds),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}