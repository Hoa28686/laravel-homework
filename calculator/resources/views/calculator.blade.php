<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Calculator</title>
<link rel="stylesheet" href={{asset('css/style.css')}}>
</head>
<body>
    <div class="container">
        <h3>Calculator</h3>
        <form class="flex form" method="POST" action="{{route('calculator.calculate')}}">
            @csrf
            <div class="number">
                <input type="number" step="any" name="num1" value={{old('num1',isset($num1)?$num1:'')}} required>
                <input type="number" step="any" name="num2" value={{old('num2',isset($num2)?$num2:'')}} required>
                <input class="reset" type="submit" name="operator" value="Reset"  >
            </div>
            <div class="operator">
                <button name="operator" value="+">+</button>
                <button name="operator" value="-">-</button>
                <button name="operator" value="×">×</button>
                <button name="operator" value="÷">÷</button>
            </div>

        </form>
        
        @if(isset($result))
            @if (is_numeric($result))
                <div class="result">
                {{-- <h3>Result: </h3> --}}
                {{$num1}} {{$operator}} {{$num2}} = {{$result}}
                </div>       
            @else
                <div class="result">
                {{$result}}
                </div>      
            @endif
            @endif
    </div>
</body>
</html>