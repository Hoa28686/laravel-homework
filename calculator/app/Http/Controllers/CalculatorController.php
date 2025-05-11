<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CalculatorController extends Controller
{
    public function index(){
        return view('calculator');
    }

    public function calculate(Request $request){
        $request->validate([
            'num1'=>'required|numeric',
            'num2'=>'required|numeric',
            'operator'=>'required|in:+,-,×,÷,Reset'
        ]);

        $num1=$request->input('num1');
        $num2=$request->input('num2');
        $operator=$request->input('operator');
        $result=0;
        
        switch ($operator) {
            case "Reset":
                return view('calculator');
                break;
            case "+":
                $result = $num1 + $num2;
                break;
            case "-":
                $result = $num1 - $num2;
                break;
            case "×":
                $result = $num1 * $num2;
                break;
            case "÷":
                if ($num2 != 0) {
                    $result = $num1 / $num2;
                } else {
                    $result = "Can't divide by zero.";
                }
                break;
        }
        (is_numeric($result)) && $result=round($result,6);
        return view('calculator',[
            'num1'=>$num1,
            'num2'=>$num2,
            'operator'=>$operator,
            'result'=>$result,
        ]);
    }
}
