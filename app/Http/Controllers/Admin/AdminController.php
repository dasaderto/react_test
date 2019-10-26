<?php

namespace App\Http\Controllers\Admin;

use App\Models\Question;
use App\Models\Test;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
//auth('api')->user()
class AdminController extends Controller
{
    public function projectCreate(Request $request){

        $project = new Test();
        $project->test_link = $request->projectSettings['url'];
        $project->animation_type = $request->projectSettings['animateType'];
        $project->sender_email = $request->projectSettings['email'];
        $project->ya_counter = $request->projectSettings['metrics'];
        $project->user_id = auth('api')->user()->id;
        $project->save();

        foreach ($request->questions as $question) {
            $newQuestion = new Question();
            $newQuestion->item_text = $question['ask'];
            $newQuestion->type = $question['askType'];
            $newQuestion->test_id = $project->id;
            $newQuestion->save();
            foreach ($question['answers'] as $answer) {
                $newAnswer = new Question();
                $newAnswer->item_text = $answer;
                $newAnswer->type = $question['askType'];
                $newAnswer->parent_item_id = $newQuestion->id;
                $newAnswer->test_id = $project->id;
                $newAnswer->save();
            }
        }


        return response()->json([
            'success' => "Data success stored",
        ]);
    }
}
