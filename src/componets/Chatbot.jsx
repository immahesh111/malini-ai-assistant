import { useState, useEffect } from 'react';
import { Send, Mic, MicOff } from 'lucide-react';
import avatarPng from '../assets/malini.png'; // Your PNG avatar
import avatarGif from '../assets/malini.gif'; // Your GIF avatar
import logo from '../assets/Padget.png'; // Your logo PNG

function Chatbot({ data }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [voice, setVoice] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const loadVoices = () => {
      const voices = synth.getVoices();
      const femaleVoice =
        voices.find(v =>
          v.name.toLowerCase().includes('zira') ||
          v.name.toLowerCase().includes('female') ||
          v.name.toLowerCase().includes('susan') ||
          v.name.toLowerCase().includes('samantha') ||
          v.name.toLowerCase().includes('google us english')
        ) || voices.find(v => v.gender === 'female') || voices[0];
      setVoice(femaleVoice);
    };

    if (synth.getVoices().length) {
      loadVoices();
    } else {
      synth.addEventListener('voiceschanged', loadVoices);
    }

    return () => {
      synth.removeEventListener('voiceschanged', loadVoices);
    };
  }, []);

  useEffect(() => {
    if (data && voice) {
      const introMessage = { text: data.introduction, isBot: true };
      setMessages([introMessage]);
      speak(introMessage.text);
    }
  }, [data, voice]);

  const speak = (text) => {
    if (voice) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = voice;
      utterance.rate = 0.9;
      utterance.pitch = 1.1;

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSubmit = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);

    const faq = data.faqs.find(faq =>
      faq.question.toLowerCase().includes(input.toLowerCase()) ||
      input.toLowerCase().includes(faq.question.toLowerCase())
    );

    let botMessage;
    if (faq) {
      botMessage = { text: faq.answer, isBot: true };
    } else {
      botMessage = {
        text: "I apologize, but I don't have information about that specific question. Could you please rephrase or ask about something else?",
        isBot: true
      };
    }

    setTimeout(() => {
      setMessages(prev => [...prev, botMessage]);
      speak(botMessage.text);
    }, 500);

    setInput('');
  };

  const toggleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      if (!isListening) {
        setIsListening(true);
        recognition.start();

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInput(transcript);
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="Malini AI Logo" className="w-24 h-24 object-contain" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Malini AI Assistant</h1>
                <p className="text-sm text-gray-600">Machine AI Line Integration and IoT</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${isSpeaking ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
                <span className="text-sm text-gray-600">{isSpeaking ? 'Speaking' : 'Ready'}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Avatar Section */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full shadow-2xl overflow-hidden border-4 border-white">
              <img
                src={isSpeaking ? avatarGif : avatarPng}
                alt={isSpeaking ? 'Speaking Avatar' : 'Static Avatar'}
                className="w-full h-full object-cover"
              />
            </div>
            {isSpeaking && (
              <div className="absolute inset-0 rounded-full border-4 border-blue-400 animate-ping"></div>
            )}
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">💬</span>
                </div>
                <div>
                  <h2 className="text-white font-semibold">Chat Assistant</h2>
                  <p className="text-blue-100 text-sm">Online • Ready to help</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-green-400 animate-pulse' : 'bg-gray-300'}`}></div>
              </div>
            </div>
          </div>

          {/* Messages Container */}
          <div className="h-96 sm:h-80 md:h-96 overflow-y-auto p-6 space-y-4 bg-gray-50">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <div className="text-4xl mb-4">👋</div>
                <p className="text-lg">Hello! I'm here to help you.</p>
                <p className="text-sm">Ask me anything to get started.</p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-2xl px-4 py-3 shadow-md ${
                    msg.isBot
                      ? 'bg-white text-gray-800 border border-gray-200'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  }`}>
                    {msg.isBot && (
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">🤖</span>
                        </div>
                        <span className="text-xs text-gray-500">Assistant</span>
                      </div>
                    )}
                    <p className="text-sm sm:text-base leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input Area */}
          <div className="bg-white border-t border-gray-200 p-4 sm:p-6">
            <div className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                  placeholder="Type your message here..."
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                />
                <button
                  onClick={toggleVoiceInput}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-colors ${
                    isListening
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              </div>
              <button
                onClick={handleSubmit}
                disabled={!input.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {data?.faqs?.slice(0, 3).map((faq, index) => (
                <button
                  key={index}
                  onClick={() => setInput(faq.question)}
                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  {faq.question}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Powered by AI • Built with ❤️ for better user experience</p>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
