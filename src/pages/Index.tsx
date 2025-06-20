
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Code, MessageSquare, FileText, Camera, Award, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'next-themes';
import Chatbot from '@/components/Chatbot';

const Index = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Questions",
      description: "Get personalized interview questions based on your resume and experience level."
    },
    {
      icon: Code,
      title: "Software Engineering Focus",
      description: "Specialized questions covering algorithms, data structures, system design, and more."
    },
    {
      icon: MessageSquare,
      title: "Voice & Text Responses",
      description: "Answer questions using your voice or by typing - whatever feels more comfortable."
    },
    {
      icon: FileText,
      title: "Resume Analysis",
      description: "Upload your resume to get targeted questions about your skills and projects."
    },
    {
      icon: Camera,
      title: "Real Interview Experience",
      description: "Practice with camera and microphone enabled for authentic interview conditions."
    },
    {
      icon: Award,
      title: "Instant Feedback",
      description: "Receive intelligent feedback and follow-up questions based on your responses."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header with Theme Toggle */}
        <div className="flex justify-between items-center mb-16 animate-fade-in">
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

        {/* Hero Section */}
        <div className="text-center mb-20 animate-fade-in">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Master Your <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Software Engineering</span> Interviews
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
            Practice with our AI-powered interviewer that adapts to your responses, provides intelligent follow-ups, 
            and helps you build confidence for your next software engineering interview.
          </p>
          <Button
            onClick={() => navigate('/upload-resume')}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-in"
          >
            Start Your Interview Practice
            <Brain className="ml-2 w-5 h-5" />
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-gray-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <feature.icon className="w-12 h-12 text-emerald-600 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <CardTitle className="text-xl text-gray-900 dark:text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How it Works Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: FileText, title: "Upload Resume", description: "Upload your resume to personalize the interview experience" },
              { icon: Camera, title: "Setup Recording", description: "Enable camera and microphone for realistic practice" },
              { icon: Brain, title: "AI Interview", description: "Answer 10-15 personalized questions with follow-ups" },
              { icon: Award, title: "Get Feedback", description: "Receive detailed feedback and improvement suggestions" }
            ].map((step, index) => (
              <div 
                key={index} 
                className="space-y-4 group animate-fade-in hover:scale-105 transition-transform duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto group-hover:animate-bounce">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Index;
