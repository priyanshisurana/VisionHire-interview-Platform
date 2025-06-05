
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Mic, CheckCircle, XCircle, ArrowRight, AlertCircle, Moon, Sun, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from 'next-themes';
import Chatbot from '@/components/Chatbot';

const SetupRecording = () => {
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);
  const [microphonePermission, setMicrophonePermission] = useState<boolean | null>(null);
  const [isTestingCamera, setIsTestingCamera] = useState(false);
  const [isTestingMicrophone, setIsTestingMicrophone] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  const requestCameraPermission = async () => {
    setIsTestingCamera(true);
    try {
      // Stop any existing streams first
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        }
      });
      
      console.log('Camera stream obtained:', stream);
      setCameraPermission(true);
      setCameraStream(stream);
      
      // Set video source and play
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        try {
          await videoRef.current.play();
          console.log('Video is now playing');
        } catch (playError) {
          console.error('Error playing video:', playError);
        }
      }
      
      toast({
        title: "Camera access granted",
        description: "Your camera is working properly and recording.",
      });
    } catch (error) {
      console.error('Camera permission error:', error);
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

    // Cleanup camera stream on unmount
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Auto-play video when stream is available
  useEffect(() => {
    if (cameraStream && videoRef.current) {
      videoRef.current.srcObject = cameraStream;
      videoRef.current.play().catch(error => {
        console.error('Error auto-playing video:', error);
      });
    }
  }, [cameraStream]);

  const allPermissionsGranted = cameraPermission && microphonePermission;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-6 py-16 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div className="flex items-center space-x-3">
            <Brain className="w-8 h-8 text-emerald-600 animate-float" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">VisionHire</h1>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="border-emerald-200 hover:bg-emerald-50 dark:border-gray-600 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-emerald-600" />
            ) : (
              <Moon className="h-4 w-4 text-emerald-600" />
            )}
          </Button>
        </div>

        {/* Camera Preview - Enhanced visibility and positioning */}
        {cameraStream && cameraPermission && (
          <div className="fixed top-6 right-6 z-50 animate-fade-in">
            <div className="relative bg-black rounded-lg shadow-2xl border-4 border-emerald-500">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-64 h-48 rounded-lg object-cover"
              />
              {/* Recording indicator */}
              <div className="absolute top-3 left-3 flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-white text-xs font-medium bg-black/70 px-2 py-1 rounded">REC</span>
              </div>
              {/* Live indicator */}
              <div className="absolute bottom-3 right-3 bg-red-600 text-white text-xs px-3 py-1 rounded font-bold">
                ● LIVE
              </div>
              {/* Camera status */}
              <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded">
                <Camera className="w-3 h-3 inline mr-1" />
                ON
              </div>
            </div>
          </div>
        )}

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Setup <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Recording</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We need access to your camera and microphone to conduct the interview. Please grant permissions below.
          </p>
        </div>

        <div className="space-y-6">
          {/* Camera Setup */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-gray-600 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                    <Camera className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <CardTitle className="text-emerald-800 dark:text-emerald-200">Camera Access</CardTitle>
                    <CardDescription className="text-emerald-600 dark:text-emerald-400">
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
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    {cameraPermission === true && "Camera access granted successfully - Live feed active in top-right corner"}
                    {cameraPermission === false && "Camera access denied or unavailable"}
                    {cameraPermission === null && "Camera permission not yet requested"}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Your camera will be used to record your responses during the interview.
                  </p>
                </div>
                <Button
                  onClick={requestCameraPermission}
                  disabled={isTestingCamera || cameraPermission === true}
                  variant={cameraPermission === true ? "outline" : "default"}
                  className={cameraPermission === true ? "border-green-300 text-green-700 dark:border-green-600 dark:text-green-400" : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"}
                >
                  {isTestingCamera ? "Testing..." : cameraPermission === true ? "Granted" : "Allow Camera"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Microphone Setup */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-gray-600 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center">
                    <Mic className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <CardTitle className="text-teal-800 dark:text-teal-200">Microphone Access</CardTitle>
                    <CardDescription className="text-teal-600 dark:text-teal-400">
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
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    {microphonePermission === true && "Microphone access granted successfully"}
                    {microphonePermission === false && "Microphone access denied or unavailable"}
                    {microphonePermission === null && "Microphone permission not yet requested"}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Your microphone will be used to capture your voice responses.
                  </p>
                </div>
                <Button
                  onClick={requestMicrophonePermission}
                  disabled={isTestingMicrophone || microphonePermission === true}
                  variant={microphonePermission === true ? "outline" : "default"}
                  className={microphonePermission === true ? "border-green-300 text-green-700 dark:border-green-600 dark:text-green-400" : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"}
                >
                  {isTestingMicrophone ? "Testing..." : microphonePermission === true ? "Granted" : "Allow Microphone"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Status Card */}
          {allPermissionsGranted && (
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 shadow-lg animate-fade-in">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">Ready to Start!</h3>
                    <p className="text-green-700 dark:text-green-300">All permissions granted. Your camera is live and recording. You can now begin your interview.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {(cameraPermission === false || microphonePermission === false) && (
            <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <XCircle className="w-8 h-8 text-red-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">Permissions Required</h3>
                    <p className="text-red-700 dark:text-red-300">Please grant camera and microphone access to continue with the interview.</p>
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
              className="border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105"
            >
              Back to Guidelines
            </Button>
            
            <Button
              onClick={handleStartInterview}
              disabled={!allPermissionsGranted}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105"
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
