
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Home, RotateCcw, Trophy, Clock, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const InterviewComplete = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Interview <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Completed!</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Congratulations! You have successfully completed your AI interview session. 
            Your responses have been recorded and will be reviewed shortly.
          </p>
        </div>

        <div className="space-y-6">
          {/* Success Message */}
          <Card className="bg-white/80 backdrop-blur-sm border-green-200 shadow-xl">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-green-800">Interview Successfully Submitted</CardTitle>
                  <CardDescription className="text-green-600">
                    Your responses have been recorded and analyzed
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-3">What happens next?</h4>
                <ul className="space-y-2 text-green-700">
                  <li>• Your interview responses are being processed and analyzed</li>
                  <li>• A detailed evaluation report will be generated</li>
                  <li>• You'll receive feedback on your technical knowledge and communication skills</li>
                  <li>• Suggestions for improvement areas will be provided</li>
                  <li>• Your interview recording will be available for review</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Interview Summary */}
          <Card className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-xl">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>Interview Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-blue-800">Questions Answered</h4>
                  <p className="text-2xl font-bold text-blue-600">15</p>
                  <p className="text-sm text-blue-600">Comprehensive coverage</p>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-purple-800">Time Taken</h4>
                  <p className="text-2xl font-bold text-purple-600">45 min</p>
                  <p className="text-sm text-purple-600">Great pacing</p>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-green-800">Completion</h4>
                  <p className="text-2xl font-bold text-green-600">100%</p>
                  <p className="text-sm text-green-600">All questions covered</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="bg-white/80 backdrop-blur-sm border-indigo-200 shadow-xl">
            <CardHeader>
              <CardTitle className="text-indigo-800">Next Steps</CardTitle>
              <CardDescription className="text-indigo-600">
                Continue improving your interview skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                  <h4 className="font-semibold text-indigo-800 mb-2">📧 Check Your Email</h4>
                  <p className="text-indigo-700 text-sm">
                    You'll receive a detailed interview report within 24 hours with personalized feedback and suggestions.
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">🎯 Practice More</h4>
                  <p className="text-blue-700 text-sm">
                    Take another interview session to practice different types of questions and improve your skills.
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-800 mb-2">📚 Study Resources</h4>
                  <p className="text-purple-700 text-sm">
                    Access our curated study materials and practice problems to strengthen your technical knowledge.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold"
            >
              <Home className="mr-2 w-5 h-5" />
              Back to Home
            </Button>
            
            <Button
              onClick={() => navigate('/upload-resume')}
              variant="outline"
              className="border-gray-300 hover:bg-gray-50 px-8 py-3 text-lg font-semibold"
            >
              <RotateCcw className="mr-2 w-5 h-5" />
              Take Another Interview
            </Button>
          </div>
        </div>

        {/* Thank You Message */}
        <div className="text-center mt-12 p-6 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
          <p className="text-gray-600">
            We appreciate you using AI Interviewer Pro. Your dedication to improving your interview skills 
            will help you succeed in your software engineering career.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InterviewComplete;
