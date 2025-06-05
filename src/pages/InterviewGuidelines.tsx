
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Eye, Mic, Shield, Camera, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Checkbox } from '@/components/ui/checkbox';

const InterviewGuidelines = () => {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (agreedToTerms) {
      navigate('/setup-recording');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Interview <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Guidelines</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Please read and acknowledge these important guidelines before starting your interview.
          </p>
        </div>

        <div className="space-y-6">
          {/* Recording Notice */}
          <Card className="bg-white/80 backdrop-blur-sm border-red-200 shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Camera className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <CardTitle className="text-red-800">Recording in Progress</CardTitle>
                  <CardDescription className="text-red-600">
                    This interview session will be recorded for evaluation purposes
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-2">
                  <Eye className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Your video and audio will be recorded throughout the interview</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Mic className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Voice responses will be transcribed and analyzed</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Shield className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Recordings are used solely for interview assessment and feedback</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Anti-Cheating Policy */}
          <Card className="bg-white/80 backdrop-blur-sm border-orange-200 shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <CardTitle className="text-orange-800">Academic Integrity</CardTitle>
                  <CardDescription className="text-orange-600">
                    Maintain honesty and authenticity throughout the interview
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-3">Prohibited Activities:</h4>
                <ul className="space-y-2 text-orange-700">
                  <li>• Using external resources or references during the interview</li>
                  <li>• Getting assistance from other people</li>
                  <li>• Copy-pasting answers from online sources</li>
                  <li>• Using AI tools to generate responses</li>
                  <li>• Switching tabs or applications during the interview</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Technical Requirements */}
          <Card className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-blue-800">Technical Requirements</CardTitle>
                  <CardDescription className="text-blue-600">
                    Ensure your setup meets these requirements
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-700">
                <li>• Stable internet connection</li>
                <li>• Working camera and microphone</li>
                <li>• Quiet, well-lit environment</li>
                <li>• Updated web browser</li>
                <li>• No other applications running in background</li>
              </ul>
            </CardContent>
          </Card>

          {/* Agreement Checkbox */}
          <Card className="bg-white/80 backdrop-blur-sm border-green-200 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                  className="mt-1"
                />
                <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
                  I have read and understood all the guidelines above. I agree to maintain academic integrity 
                  and acknowledge that this interview will be recorded. I understand that any violation of 
                  these guidelines may result in disqualification.
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6">
            <Button
              variant="outline"
              onClick={() => navigate('/upload-resume')}
              className="border-gray-300 hover:bg-gray-50"
            >
              Back to Resume Upload
            </Button>
            
            <Button
              onClick={handleContinue}
              disabled={!agreedToTerms}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Proceed to Setup
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewGuidelines;
