<?php

namespace App\Services;
use Illuminate\Support\Facades\Http;
class CallApiService
{
    public function getWeather($city): array{

        // Make API request
        $apiKey = config('services.openweather.key');
        $apiUrl = "http://api.openweathermap.org/data/2.5/weather?q={$city}&units=metric&appid={$apiKey}";
        $response = Http::get($apiUrl);
        return $response->successful()
        ? $response->json()
        : [];
}}
