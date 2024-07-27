"use client"
import { useRef, useEffect } from 'react';
import { useConnection, ConnectionState, CallState } from '../hooks/useConnection';
import { continuousVisualizer } from 'sound-visualizer';
import { useAudioStream } from '@/hooks/useAudioStream';
import AudioCard from '@/components/AudioCard';
import { Button } from '@/components/ui/button';

export default function Home() {
  const userVideo = useRef<HTMLVideoElement>(null);
  const { stream, audioLevel } = useAudioStream();
  const {
    clients,
    callClients,
    connectionState,
    clientId,
    joinCall,
    leaveCall,
    getStatusMessage,
    callState,
    audioRefs,
  } = useConnection(stream);

  useEffect(() => {
    // Set up visualizer for user's own stream
    if (stream) {
      const userCanvas = document.getElementById('canvas-user') as HTMLCanvasElement;
      if (userCanvas) {
        const visualizer = continuousVisualizer(stream, userCanvas);
        visualizer.start();
      }
    }

    // Set up visualizers for other clients' streams
    Object.keys(audioRefs).forEach((clientId) => {
      const audio = audioRefs[clientId];
      const canvas = document.getElementById(`canvas-${clientId}`) as HTMLCanvasElement;
      if (canvas && audio && audio.srcObject instanceof MediaStream) {
        const visualizer = continuousVisualizer(audio.srcObject, canvas);
        visualizer.start();
      }
    });

    // Set up visualizer for the stream variable
    if (stream && callState === CallState.IN_CALL) {
      const streamCanvas = document.getElementById(`canvas-${clientId}`) as HTMLCanvasElement;
      if (streamCanvas) {
        const visualizer = continuousVisualizer(stream, streamCanvas);
        visualizer.start();
      }
    }
  }, [stream, audioRefs, clientId, callState]);

  return (
    <div className="flex flex-col min-h-screen">
 
      <video ref={userVideo} autoPlay muted className="hidden" />
      <main className="flex-grow flex flex-col items-center justify-center bg-gray-100 py-4">
        {callState === CallState.IN_CALL ? (
          <div className="grid grid-cols-2 gap-4 w-full max-w-4xl">
            {
              callState === CallState.IN_CALL && (
                <AudioCard clientId={clientId!!} title="You" canvasId={`canvas-${clientId}`} isYou audioLevel={audioLevel} />
              )
            }
            {callClients.map(
              (client) => client !== clientId &&
                <AudioCard key={client} clientId={client} title={client === clientId ? 'You' : client} canvasId={`canvas-${client}`} />
            )}
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl mb-4">Welcome to the Audio Call App</h2>
            <p className="mb-4">Click the button to join the call.</p>
            <Button
              onClick={joinCall}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Join Call
            </Button>
            <div className="mt-4 text-sm">
              {clients.length} {clients.length === 1 ? 'person' : 'people'} online
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
