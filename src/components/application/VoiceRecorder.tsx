import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, Square, Play, Pause, RotateCcw, CheckCircle2 } from 'lucide-react';

interface VoiceRecorderProps {
  onRecordingComplete: (audioBlob: Blob) => void;
  isRecorded: boolean;
}

export function VoiceRecorder({ onRecordingComplete, isRecorded }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((t) => {
          if (t >= 60) {
            handleStopRecording();
            return t;
          }
          return t + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Cleanup audio URL on unmount
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      
      streamRef.current = stream;
      audioChunksRef.current = [];
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4'
      });
      
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mediaRecorder.mimeType });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        
        if (recordingTime >= 10) {
          onRecordingComplete(audioBlob);
        }
      };
      
      mediaRecorder.start(100); // Collect data every 100ms
      setIsRecording(true);
      setRecordingTime(0);
      
      // Clear previous audio
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
      }
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Could not access microphone. Please ensure you have granted permission.');
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Stop all tracks
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    }
  };

  const handleReset = () => {
    setRecordingTime(0);
    setIsPlaying(false);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handlePlay = () => {
    if (audioRef.current && audioUrl) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="flex flex-col items-center py-8">
      {/* Hidden audio element for playback */}
      {audioUrl && (
        <audio 
          ref={audioRef} 
          src={audioUrl} 
          onEnded={handleAudioEnded}
          className="hidden"
        />
      )}

      {/* Waveform / Recording Indicator */}
      <div className={`relative mb-6 flex h-32 w-full items-center justify-center rounded-xl ${
        isRecording ? 'bg-danger-light' : isRecorded ? 'bg-success-light' : 'bg-muted'
      } transition-colors`}>
        {isRecording && (
          <>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-danger/20 animate-pulse-ring" />
            </div>
            <div className="flex items-end gap-1 h-12">
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i}
                  className="w-1.5 bg-danger rounded-full animate-pulse"
                  style={{ 
                    height: `${Math.random() * 100}%`,
                    animationDelay: `${i * 50}ms`
                  }}
                />
              ))}
            </div>
          </>
        )}
        {!isRecording && !isRecorded && !audioUrl && (
          <div className="text-center text-muted-foreground">
            <Mic className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Click to start recording</p>
          </div>
        )}
        {!isRecording && audioUrl && !isRecorded && (
          <div className="flex items-center gap-4">
            <div className={`h-12 w-12 rounded-full flex items-center justify-center ${isPlaying ? 'bg-primary' : 'bg-muted-foreground/20'}`}>
              {isPlaying ? (
                <Pause className="h-6 w-6 text-primary-foreground" />
              ) : (
                <Play className="h-6 w-6 text-muted-foreground" />
              )}
            </div>
            <div>
              <p className="font-medium">Recording ready</p>
              <p className="text-sm text-muted-foreground">{formatTime(recordingTime)} - Click play to review</p>
            </div>
          </div>
        )}
        {!isRecording && isRecorded && (
          <div className="flex items-center gap-4">
            <CheckCircle2 className="h-12 w-12 text-success" />
            <div>
              <p className="font-medium text-success">Recording complete</p>
              <p className="text-sm text-muted-foreground">{formatTime(recordingTime)} recorded</p>
            </div>
          </div>
        )}
      </div>

      {/* Timer */}
      <div className="mb-6 text-center">
        <p className="font-display text-3xl font-bold tabular-nums">
          {formatTime(recordingTime)}
        </p>
        <p className="text-sm text-muted-foreground">
          {isRecording ? 'Recording...' : recordingTime > 0 ? 'Recorded' : 'Ready to record'}
        </p>
        {recordingTime > 0 && recordingTime < 30 && !isRecording && !isRecorded && (
          <p className="text-xs text-warning mt-1">
            Minimum 30 seconds recommended
          </p>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        {!isRecording && !audioUrl && (
          <Button 
            variant="hero" 
            size="lg" 
            onClick={handleStartRecording}
            className="gap-2"
          >
            <Mic className="h-5 w-5" />
            Start Recording
          </Button>
        )}

        {isRecording && (
          <Button 
            variant="danger" 
            size="lg" 
            onClick={handleStopRecording}
            className="gap-2"
          >
            <Square className="h-5 w-5" />
            Stop Recording
          </Button>
        )}

        {!isRecording && audioUrl && (
          <>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={handlePlay}
              className="gap-2"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-5 w-5" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-5 w-5" />
                  Play
                </>
              )}
            </Button>
            <Button 
              variant="secondary" 
              size="lg" 
              onClick={handleReset}
              className="gap-2"
            >
              <RotateCcw className="h-5 w-5" />
              Re-record
            </Button>
          </>
        )}
      </div>

      {/* Tips */}
      <div className="mt-8 w-full max-w-md">
        <p className="text-sm font-medium mb-2">Tips for a great recording:</p>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Speak clearly and at a natural pace</li>
          <li>• Find a quiet environment</li>
          <li>• Aim for 30-60 seconds</li>
          <li>• Be yourself and speak naturally</li>
        </ul>
      </div>
    </div>
  );
}
