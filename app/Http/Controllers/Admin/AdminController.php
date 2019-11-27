<?php

namespace App\Http\Controllers\Admin;

use App\Models\Question;
use App\Models\Test;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

//auth('api')->user()
class AdminController extends Controller
{

    public function index()
    {
        $projects = Test::where('user_id', auth('api')->user()->id)->get();
        $projects_ids = $projects->pluck('id')->toArray();
        $questions = Question::whereIn('test_id', $projects_ids)->get();
        foreach ($projects as $project) {
            $questionsList = $questions->where('parent_item_id', null)->where('test_id', $project->id);
            $questArr = [];
            foreach ($questionsList as $question) {
                $answers = $questions->where('parent_item_id', $question->id)
                    ->where('test_id', $project->id)
                    ->pluck('item_text');
                $cur_question = [
                    'id' => $question->id,
                    'ask' => $question->item_text,
                    'type' => $question->type,
                    'answers' => $answers
                ];
                $questArr[] = $cur_question;
            }
            $project['questions'] = $questArr;
        }

        return response()->json([
            'success' => true,
            'data' => $projects
        ]);
    }

    public function projectCreate(Request $request)
    {

        $project = new Test();
        $project->test_link = $request->projectSettings['url'];
        $project->test_name = $request->projectSettings['projectName'];
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
            if (!empty($question['answers']))
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

    public function projectEdit($id)
    {
        $test = Test::where('user_id', auth('api')->user()->id)->where('id', $id)->first();

        return response()->json([
            'success' => true,
            'data' => $test
        ]);
    }

    public function projectUpdate(Request $request)
    {
        $newTest = Test::where('user_id', auth('api')->user()->id)->where('id', $request->projectId)->first();
        $newTest->test_link = $request->projectSettings['url'];
        $newTest->animation_type = $request->projectSettings['animateType'];
        $newTest->sender_email = $request->projectSettings['email'];
        $newTest->ya_counter = $request->projectSettings['metrics'];
        $newTest->save();
        Question::where('test_id',$newTest->id)->delete();
        foreach ($request->questions as $question) {
            $newQuestion = new Question();
            $newQuestion->item_text = $question['ask'];
            $newQuestion->type = $question['type'];
            $newQuestion->test_id = $newTest->id;
            $newQuestion->save();
            if (!empty($question['answers']))
                foreach ($question['answers'] as $answer) {
                    $newAnswer = new Question();
                    $newAnswer->item_text = $answer;
                    $newAnswer->type = $question['type'];
                    $newAnswer->parent_item_id = $newQuestion->id;
                    $newAnswer->test_id = $newTest->id;
                    $newAnswer->save();
                }
        }

        return response()->json([
            'success' => true,
            'data' => $request->all()
        ]);
    }
}
