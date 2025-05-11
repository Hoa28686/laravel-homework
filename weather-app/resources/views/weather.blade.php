<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Weather App</title>
    <link rel="stylesheet" href={{ asset('css/style.css') }}>

</head>

<body>
    <div class="container">
        <header>
            <h1>Weather App</h1>
        </header>
        <label for="city">Enter city name</label>
        <form method="get" action="{{ route('weather') }}">
            <input type="text" name="city" class="input" placeholder="e.g., London" autocomplete="off"
                value="{{ $city }}" />
            <button type="submit" class="btn">Get Weather</button>
        </form>
        @if ($error)
            <div class="alert">
                {{ $error }}
            </div>
        @elseif (!empty($weatherData))
            <h2>Weather in {{ $weatherData['name'] }}</h2>

            <table>
                <thead>
                    <th>Attribute</th>
                    <th>Value</th>
                </thead>
                <tbody>
                    <tr>
                        <td>Temperature</td>
                        <td>{{ $weatherData['main']['temp'] }} °C</td>
                    </tr>
                    <tr>
                        <td>Weather</td>
                        <td> {{ $weatherData['weather'][0]['description'] }}</td>
                    </tr>
                    <tr>
                        <td>Humidity</td>
                        <td>{{ $weatherData['main']['humidity'] }}%</td>
                    </tr>
                    <tr>
                        <td>Wind speed</td>
                        <td>{{ $weatherData['wind']['speed'] }} m/s</td>
                    </tr>
                </tbody>
            </table>
        @endif
    </div>
</body>

</html>
