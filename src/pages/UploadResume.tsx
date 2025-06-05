
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Brain, Upload, ArrowLeft, ArrowRight, FileText, Award, Code, Moon, Sun } from 'lucide-react';
import { ChangeEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'next-themes';
import Chatbot from '@/components/Chatbot';

const UploadResume = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const { setTheme, theme } = useTheme();

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleContinue = () => {
    // Simulate upload progress
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        const newProgress = prevProgress + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            navigate('/interview-guidelines');
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-6 py-8">
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

        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Upload Your <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Resume</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Upload your resume to get personalized interview questions tailored to your experience and skills
          </p>
        </div>

        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-gray-600 shadow-xl animate-bounce-in">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-gray-900 dark:text-white">Resume Upload</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Supported formats: PDF, DOC, DOCX (Max size: 10MB)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div 
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 hover:scale-105 ${
                file 
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' 
                  : 'border-gray-300 dark:border-gray-600 hover:border-emerald-400'
              }`}
            >
              <Upload className={`w-12 h-12 mx-auto mb-4 ${file ? 'text-emerald-600' : 'text-gray-400'} animate-float`} />
              <p className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">
                {file ? file.name : 'Drop your resume here or click to browse'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {file ? `File size: ${(file.size / 1024 / 1024).toFixed(2)} MB` : 'PDF, DOC, DOCX up to 10MB'}
              </p>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept=".pdf,.doc,.docx"
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="mt-4 border-emerald-200 hover:bg-emerald-50 dark:border-emerald-600 dark:hover:bg-emerald-900/20 transition-all duration-300 hover:scale-105"
              >
                Choose File
              </Button>
            </div>

            {uploadProgress > 0 && (
              <div className="space-y-2 animate-fade-in">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Uploading...</span>
                  <span className="text-emerald-600">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}

            <div className="flex justify-between">
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                className="border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              <Button
                onClick={handleContinue}
                disabled={!file || uploadProgress > 0}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Guidelines
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            {
              icon: FileText,
              title: "Clear Format",
              description: "Ensure your resume is well-formatted and easy to read"
            },
            {
              icon: Award,
              title: "Highlight Skills",
              description: "Include relevant technical skills and programming languages"
            },
            {
              icon: Code,
              title: "Show Projects",
              description: "Include projects that demonstrate your coding abilities"
            }
          ].map((tip, index) => (
            <Card 
              key={index} 
              className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-emerald-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-6 text-center">
                <tip.icon className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{tip.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default UploadResume;
