
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Mic, MicOff, Send, Brain, Clock, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: number;
  question: string;
  category: string;
}

interface Answer {
  questionId: number;
  answer: string;
  timestamp: Date;
}

const Interview = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Sample CS interview questions
  const questions: Question[] = [
    {
      id: 1,
      question: "Tell me about yourself and your experience in software development.",
      category: "Introduction"
    },
    {
      id: 2,
      question: "What's the difference between a stack and a queue? Can you provide use cases for each?",
      category: "Data Structures"
    },
    {
      id: 3,
      question: "Explain the concept of Big O notation and why it's important in algorithm analysis.",
      category: "Algorithms"
    },
    {
      id: 4,
      question: "What are the principles of Object-Oriented Programming? Can you explain each one?",
      category: "OOP"
    },
    {
      id: 5,
      question: "How would you approach debugging a performance issue in a web application?",
      category: "Problem Solving"
    },
    {
      id: 6,
      question: "What's the difference between SQL and NoSQL databases? When would you use each?",
      category: "Databases"
    },
    {
      id: 7,
      question: "Explain how HTTP works and the difference between GET and POST requests.",
      category: "Web Development"
    },
    {
      id: 8,
      question: "What is version control and why is it important? Have you used Git?",
      category: "Tools"
    },
    {
      id: 9,
      question: "How do you ensure code quality in your projects? What practices do you follow?",
      category: "Best Practices"
    },
    {
      id: 10,
      question: "Describe a challenging project you worked on. What obstacles did you face and how did you overcome them?",
      category: "Experience"
    },
    {
      id: 11,
      question: "What are design patterns? Can you explain the Singleton pattern and when you'd use it?",
      category: "Design Patterns"
    },
    {
      id: 12,
      question: "How do you handle errors and exceptions in your code? What's your approach to error handling?",
      category: "Error Handling"
    },
    {
      id: 13,
      question: "What is the difference between synchronous and asynchronous programming? Can you give examples?",
      category: "Programming Concepts"
    },
    {
      id: 14,
      question: "How do you stay updated with new technologies and programming trends?",
      category: "Learning"
    },
    {
      id: 15,
      question: "Do you have any questions about our company or the role you're applying for?",
      category: "Conclusion"
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = Math.min(questions.length, 15);
  const isLastQuestion = currentQuestionIndex >= totalQuestions - 1;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      toast({
        title: "Recording stopped",
        description: "You can now type your answer or start recording again.",
      });
    } else {
      // Start recording
      setIsRecording(true);
      toast({
        title: "Recording started",
        description: "Speak your answer clearly. Click the mic button again to stop.",
      });
      
      // Simulate voice recognition (in real app, you'd integrate with Web Speech API)
      setTimeout(() => {
        if (isRecording) {
          const simulatedTranscription = "This is a simulated voice response. In a real implementation, this would be the transcribed text from speech recognition.";
          setCurrentAnswer(prev => prev + (prev ? " " : "") + simulatedTranscription);
          setIsRecording(false);
        }
      }, 3000);
    }
  };

  const handleSubmitAnswer = () => {
    if (!currentAnswer.trim()) {
      toast({
        title: "Please provide an answer",
        description: "You need to answer the question before proceeding.",
        variant: "destructive",
      });
      return;
    }

    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      answer: currentAnswer.trim(),
      timestamp: new Date()
    };

    setAnswers(prev => [...prev, newAnswer]);
    setCurrentAnswer('');

    toast({
      title: "Answer submitted",
      description: "Moving to the next question...",
    });

    setTimeout(() => {
      if (isLastQuestion) {
        navigate('/interview-complete');
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">AI Interview</span>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{formatTime(timeElapsed)}</span>
                </div>
              </div>
            </div>
            
            <div className="text-sm text-gray-600">
              Category: <span className="font-medium text-blue-600">{currentQuestion?.category}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <Card className="bg-white/80 backdrop-blur-sm border-blue-200 shadow-xl mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-1">
                {currentQuestionIndex + 1}
              </div>
              <span className="leading-relaxed">{currentQuestion?.question}</span>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Answer Section */}
        <Card className="bg-white/80 backdrop-blur-sm border-purple-200 shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900 flex items-center space-x-2">
              <MessageSquare className="w-5 h-5" />
              <span>Your Answer</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              placeholder="Type your answer here, or use voice recording..."
              className="min-h-[120px] resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button
                  variant={isRecording ? "destructive" : "outline"}
                  size="sm"
                  onClick={handleToggleRecording}
                  className={`flex items-center space-x-2 ${
                    isRecording 
                      ? "bg-red-500 hover:bg-red-600 text-white" 
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  <span>{isRecording ? "Stop Recording" : "Voice Answer"}</span>
                </Button>
                
                {isRecording && (
                  <div className="flex items-center space-x-2 text-red-600">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm">Recording...</span>
                  </div>
                )}
              </div>

              <Button
                onClick={handleSubmitAnswer}
                disabled={!currentAnswer.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLastQuestion ? "Finish Interview" : "Next Question"}
                <Send className="ml-2 w-4 h-4" />
              </Button>
            </div>

            <div className="text-sm text-gray-500">
              {currentAnswer.length > 0 && (
                <span>{currentAnswer.length} characters</span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="mt-8 flex justify-center">
          <Button
            variant="outline"
            onClick={() => {
              if (confirm("Are you sure you want to end the interview early?")) {
                navigate('/interview-complete');
              }
            }}
            className="border-gray-300 hover:bg-gray-50 text-gray-700"
          >
            End Interview Early
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Interview;
