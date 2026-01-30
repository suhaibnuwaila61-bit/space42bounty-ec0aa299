import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, Square, Play, RotateCcw, CheckCircle2 } from 'lucide-react';

interface VoiceRecorderProps {
  onRecordingComplete: () => void;
  isRecorded: boolean;
}

export function VoiceRecorder({ onRecordingComplete, isRecorded }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((t) => {
          if (t >= 60) {
            setIsRecording(false);
            onRecordingComplete();
            return t;
          }
          return t + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, onRecordingComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    if (recordingTime >= 10) {
      onRecordingComplete();
    }
  };

  const handleReset = () => {
    setRecordingTime(0);
    setIsPlaying(false);
  };

  const handlePlay = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), recordingTime * 1000);
  };

  return (
    <div className="flex flex-col items-center py-8">
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
        {!isRecording && !isRecorded && (
          <div className="text-center text-muted-foreground">
            <Mic className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Click to start recording</p>
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
        {!isRecording && !isRecorded && (
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

        {!isRecording && isRecorded && (
          <>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={handlePlay}
              disabled={isPlaying}
              className="gap-2"
            >
              <Play className="h-5 w-5" />
              {isPlaying ? 'Playing...' : 'Play'}
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
