import { useState, useEffect, useRef } from 'react';

export const useAudioStream = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [audioLevel, setAudioLevel] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  useEffect(() => {
    const getAudioStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setStream(stream);

        audioContextRef.current = new (window.AudioContext)();
        const source = audioContextRef.current.createMediaStreamSource(stream);
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 256;
        const bufferLength = analyserRef.current.frequencyBinCount;
        dataArrayRef.current = new Uint8Array(bufferLength);
        source.connect(analyserRef.current);

        const updateAudioLevel = () => {
          if (analyserRef.current && dataArrayRef.current) {
            analyserRef.current.getByteFrequencyData(dataArrayRef.current);
            const sum = dataArrayRef.current.reduce((a, b) => a + b, 0);
            const average = sum / dataArrayRef.current.length;
            setAudioLevel(average);
            requestAnimationFrame(updateAudioLevel);
          }
        };

        updateAudioLevel();
      } catch (error) {
        console.error('Error obtaining user media:', error);
      }
    };

    getAudioStream();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return { stream, audioLevel };
};
