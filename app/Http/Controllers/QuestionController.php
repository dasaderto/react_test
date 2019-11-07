<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Models\Question;
use App\User;
use Illuminate\Http\Request;
use Barryvdh\Debugbar\Facade as Debugbar;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;
use JWTAuth;

class QuestionController extends Controller
{

    public function getNullQuestion()
    {
        $nullQuestion = Question::where('parent_item_id', null)->skip(request()->nullQuestion)->first();
        if ($nullQuestion) {
            if ($nullQuestion->type == 'test' || $nullQuestion->type == 'checkbox') {
                $answers = Question::where('parent_item_id', $nullQuestion->id)->pluck('item_text')->toArray();
                if ($answers) {
                    return response()->json([
                        'ask' => $nullQuestion->item_text,
                        'answer' => $answers,
                        'type' => $nullQuestion->type,
                        "nullQuestion" => request()->nullQuestion + 1
                    ], 200);
                }
            } else {
                return response()->json([
                    'ask' => $nullQuestion->item_text,
                    'answer' => '',
                    'type' => $nullQuestion->type,
                    "nullQuestion" => request()->nullQuestion + 1
                ], 200);
            }
        } else {
            return response()->json([
                'ask' => "LAST_RESPONSE",
                'type' => "text",
                "nullQuestion" => null
            ], 200);
        }
    }

    public function index(Request $request)
    {
        if ($request->file("fileData")) {
            try {
                $fileList = "";
                foreach ($request->file("fileData") as $file) {
                    $file->move('./img/files', $file->getClientOriginalName());
                    $fileList .= $file->getClientOriginalName() . ";";
                }

                if ($request->cookie("token")) {
                    $askId = Question::where("item_text", "=", $request->question)->first();
                    $storeAnswer = new Answer;
                    $storeAnswer->user_token = $request->cookie("token");
                    $storeAnswer->question_id = $askId->id;
                    $storeAnswer->answer = $fileList;
                    $storeAnswer->save();
                }
            } catch (Exception $e) {
                Debugbar::info($e);
            }
            return $this->getNullQuestion();
        }
        Debugbar::info($request->files);
        if ($request->answer) {
            Log::info($request->answer);
            $askId = Question::where("item_text", "=", $request->question)->first();
            $storeAnswer = new Answer;
            $storeAnswer->user_token = $request->cookie("token");
            $storeAnswer->question_id = $askId->id;
            $storeAnswer->answer = implode("%/%",$request->answer);
            $storeAnswer->save();
        }
        return $this->getNullQuestion();
    }

    public function startPage()
    {
        return Response::view("welcome");
    }

    public function testStart()
    {
        $startQuestion = Question::where('parent_item_id', null)->first();
        $answers = Question::where('parent_item_id', $startQuestion->id)->pluck('item_text')->toArray();

        return response()->json([
            'ask' => $startQuestion->item_text,
            'answer' => $answers,
            'type' => $startQuestion->type,
            "nullQuestion" => 1
        ], 200);
    }
}
