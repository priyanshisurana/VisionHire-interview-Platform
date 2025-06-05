import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Mic, CheckCircle, XCircle, ArrowRight, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Chatbot from '@/components/Chatbot';

const SetupRecording = () => {
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);
  const [microphonePermission, setMicrophonePermission] = useState<boolean | null>(null);
  const [isTestingCamera, setIsTestingCamera] = useState(false);
  const [isTestingMicrophone, setIsTestingMicrophone] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const requestCameraPermission = async () => {
    setIsTestingCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraPermission(true);
      stream.getTracks().forEach(track => track.stop());
      toast({
        title: "Camera access granted",
        description: "Your camera is working properly.",
      });
    } catch (error) {
      setCameraPermission(false);
      toast({
        title: "Camera access denied",
        description: "Please allow camera access to continue.",
        variant: "destructive",
      });
    }
    setIsTestingCamera(false);
  };

  const requestMicrophonePermission = async () => {
    setIsTestingMicrophone(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicrophonePermission(true);
      stream.getTracks().forEach(track => track.stop());
      toast({
        title: "Microphone access granted",
        description: "Your microphone is working properly.",
      });
    } catch (error) {
      setMicrophonePermission(false);
      toast({
        title: "Microphone access denied",
        description: "Please allow microphone access to continue.",
        variant: "destructive",
      });
    }
    setIsTestingMicrophone(false);
  };

  const handleStartInterview = () => {
    if (cameraPermission && microphonePermission) {
      navigate('/interview');
    }
  };

  useEffect(() => {
    // Check existing permissions
    navigator.permissions.query({ name: 'camera' as PermissionName }).then((result) => {
      if (result.state === 'granted') {
        setCameraPermission(true);
      }
    });

    navigator.permissions.query({ name: 'microphone' as PermissionName }).then((result) => {
      if (result.state === 'granted') {
        setMicrophonePermission(true);
      }
    });
  }, []);

  const allPermissionsGranted = cameraPermission && microphonePermission;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Setup <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Recording</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We need access to your camera and microphone to conduct the interview. Please grant permissions below.
          </p>
        </div>

        <div className="space-y-6">
          {/* Camera Setup */}
          <Card className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Camera className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-blue-800">Camera Access</CardTitle>
                    <CardDescription className="text-blue-600">
                      Required for video recording during the interview
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {cameraPermission === true && <CheckCircle className="w-6 h-6 text-green-500" />}
                  {cameraPermission === false && <XCircle className="w-6 h-6 text-red-500" />}
                  {cameraPermission === null && <AlertCircle className="w-6 h-6 text-yellow-500" />}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700 mb-2">
                    {cameraPermission === true && "Camera access granted successfully"}
                    {cameraPermission === false && "Camera access denied or unavailable"}
                    {cameraPermission === null && "Camera permission not yet requested"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Your camera will be used to record your responses during the interview.
                  </p>
                </div>
                <Button
                  onClick={requestCameraPermission}
                  disabled={isTestingCamera || cameraPermission === true}
                  variant={cameraPermission === true ? "outline" : "default"}
                  className={cameraPermission === true ? "border-green-300 text-green-700" : ""}
                >
                  {isTestingCamera ? "Testing..." : cameraPermission === true ? "Granted" : "Allow Camera"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Microphone Setup */}
          <Card className="bg-white/80 backdrop-blur-sm border-purple-200 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Mic className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-purple-800">Microphone Access</CardTitle>
                    <CardDescription className="text-purple-600">
                      Required for voice responses during the interview
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {microphonePermission === true && <CheckCircle className="w-6 h-6 text-green-500" />}
                  {microphonePermission === false && <XCircle className="w-6 h-6 text-red-500" />}
                  {microphonePermission === null && <AlertCircle className="w-6 h-6 text-yellow-500" />}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700 mb-2">
                    {microphonePermission === true && "Microphone access granted successfully"}
                    {microphonePermission === false && "Microphone access denied or unavailable"}
                    {microphonePermission === null && "Microphone permission not yet requested"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Your microphone will be used to capture your voice responses.
                  </p>
                </div>
                <Button
                  onClick={requestMicrophonePermission}
                  disabled={isTestingMicrophone || microphonePermission === true}
                  variant={microphonePermission === true ? "outline" : "default"}
                  className={microphonePermission === true ? "border-green-300 text-green-700" : ""}
                >
                  {isTestingMicrophone ? "Testing..." : microphonePermission === true ? "Granted" : "Allow Microphone"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Status Card */}
          {allPermissionsGranted && (
            <Card className="bg-green-50 border-green-200 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-green-800">Ready to Start!</h3>
                    <p className="text-green-700">All permissions granted. You can now begin your interview.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {(cameraPermission === false || microphonePermission === false) && (
            <Card className="bg-red-50 border-red-200 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <XCircle className="w-8 h-8 text-red-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-red-800">Permissions Required</h3>
                    <p className="text-red-700">Please grant camera and microphone access to continue with the interview.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6">
            <Button
              variant="outline"
              onClick={() => navigate('/interview-guidelines')}
              className="border-gray-300 hover:bg-gray-50"
            >
              Back to Guidelines
            </Button>
            
            <Button
              onClick={handleStartInterview}
              disabled={!allPermissionsGranted}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start Interview
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      <Chatbot />
    </div>
  );
};

export default SetupRecording;
