
import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, ArrowRight, CheckCircle, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from 'next-themes';

const UploadResume = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === 'application/pdf' || droppedFile.type.includes('document'))) {
      setFile(droppedFile);
      toast({
        title: "Resume uploaded successfully!",
        description: "Your resume has been processed and is ready for the interview.",
      });
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or document file.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      toast({
        title: "Resume uploaded successfully!",
        description: "Your resume has been processed and is ready for the interview.",
      });
    }
  };

  const handleContinue = () => {
    if (file) {
      navigate('/interview-guidelines');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header with Theme Toggle */}
        <div className="flex justify-end mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="border-emerald-200 hover:bg-emerald-50 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-emerald-600" />
            ) : (
              <Moon className="h-4 w-4 text-emerald-600" />
            )}
          </Button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Upload Your <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Resume</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Upload your resume to get personalized interview questions based on your experience and skills.
          </p>
        </div>

        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-gray-600 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-gray-900 dark:text-white">Resume Upload</CardTitle>
            <CardDescription className="text-center text-gray-600 dark:text-gray-300">
              Supported formats: PDF, DOC, DOCX (Max size: 10MB)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 cursor-pointer ${
                isDragOver
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                  : file
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-emerald-400 hover:bg-emerald-25 dark:hover:bg-emerald-900/10'
              }`}
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onClick={() => document.getElementById('file-input')?.click()}
            >
              {file ? (
                <div className="space-y-4">
                  <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto" />
                  <div>
                    <p className="text-lg font-semibold text-emerald-700 dark:text-emerald-400">{file.name}</p>
                    <p className="text-emerald-600 dark:text-emerald-500">File uploaded successfully!</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto" />
                  <div>
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                      Drop your resume here or click to browse
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">PDF, DOC, or DOCX files only</p>
                  </div>
                </div>
              )}
              
              <input
                id="file-input"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {file && (
              <div className="mt-8 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-700">
                <div className="flex items-center space-x-3">
                  <FileText className="w-6 h-6 text-emerald-600" />
                  <div>
                    <p className="font-medium text-emerald-800 dark:text-emerald-300">{file.name}</p>
                    <p className="text-sm text-emerald-600 dark:text-emerald-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-between items-center">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Back to Home
              </Button>
              
              <Button
                onClick={handleContinue}
                disabled={!file}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Guidelines
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UploadResume;
