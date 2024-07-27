// @ts-nocheck
import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import SimplePeer from 'simple-peer';
import { CONNECTION_URL } from '@/lib/constants';

export enum ConnectionState {
  INITIALIZING,
  CONNECTING,
  CONNECTED,
  DISCONNECTED,
  ERROR,
  FORCED_DISCONNECT,
}

export enum CallState {
  NOT_IN_CALL,
  IN_CALL,
}

export const useConnection = (stream: MediaStream | null) => {
  const [clients, setClients] = useState([]);
  const [callClients, setCallClients] = useState([]);
  const [connectionState, setConnectionState] = useState(ConnectionState.INITIALIZING);
  const [callState, setCallState] = useState(CallState.NOT_IN_CALL);
  const [clientId, setClientId] = useState(null);
  const peersRef = useRef({});
  const socketRef = useRef();
  const [audioRefs, setAudioRefs] = useState<Record<string, HTMLAudioElement>>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setConnectionState(ConnectionState.CONNECTING);
      socketRef.current = io(CONNECTION_URL, {
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      const handleConnect = () => {
        setConnectionState(ConnectionState.CONNECTED);
        setClientId(socketRef.current.id);
        console.log('Connected to signaling server');
      };

      const handleClients = (clients) => {
        console.log('Clients updated:', clients);
        setClients(clients);
      };

      const handleCallClients = (callClients) => {
        console.log('Call clients updated:', callClients);
        setCallClients(callClients);
      };

      const handleSignal = (data) => {
        console.log(`Signal received from ${data.from}`);
        if (peersRef.current[data.from]) {
          peersRef.current[data.from].signal(data.signal);
        } else {
          const peer = new SimplePeer({
            initiator: false,
            trickle: false,
            stream,
          });

          peer.on('signal', (signal) => {
            console.log(`Sending signal to ${data.from}`);
            socketRef.current.emit('signal', { to: data.from, signal });
          });

          peer.on('stream', (stream) => {
            console.log(`Stream received from ${data.from}`);
            const audio = document.createElement('audio');
            audio.srcObject = stream;
            audio.play();
            setAudioRefs((prev) => ({ ...prev, [data.from]: audio }));
          });

          peer.on('error', (err) => {
            console.error(`Peer connection error with ${data.from}:`, err);
          });

          peer.signal(data.signal);
          peersRef.current[data.from] = peer;
        }
      };

      const handleDisconnect = () => {
        setConnectionState(ConnectionState.DISCONNECTED);
        console.log('Disconnected from signaling server');
      };

      const handleForceDisconnect = () => {
        setConnectionState(ConnectionState.FORCED_DISCONNECT);
        console.log('Forced to disconnect by server');
        socketRef.current.disconnect();
      };

      socketRef.current.on('connect', handleConnect);
      socketRef.current.on('clients', handleClients);
      socketRef.current.on('callClients', handleCallClients);
      socketRef.current.on('signal', handleSignal);
      socketRef.current.on('disconnect', handleDisconnect);
      socketRef.current.on('forceDisconnect', handleForceDisconnect);

      return () => {
        socketRef.current.off('connect', handleConnect);
        socketRef.current.off('clients', handleClients);
        socketRef.current.off('callClients', handleCallClients);
        socketRef.current.off('signal', handleSignal);
        socketRef.current.off('disconnect', handleDisconnect);
        socketRef.current.off('forceDisconnect', handleForceDisconnect);
        socketRef.current.disconnect();
      };
    }
  }, [stream]);

  const joinCall = () => {
    console.log('Joining call...');
    socketRef.current.emit('joinCall');
    callClients.forEach((clientId) => {
      if (clientId !== socketRef.current.id) {
        console.log(`Creating peer connection to ${clientId}`);
        const peer = new SimplePeer({
          initiator: true,
          trickle: false,
          stream,
        });

        peer.on('signal', (signal) => {
          console.log(`Sending signal to ${clientId}`);
          socketRef.current.emit('signal', { to: clientId, signal });
        });

        peer.on('stream', (stream) => {
          console.log(`Stream received from ${clientId}`);
          const audio = document.createElement('audio');
          audio.srcObject = stream;
          audio.play();
          setAudioRefs((prev) => ({ ...prev, [clientId]: audio }));
        });

        peer.on('error', (err) => {
          console.error(`Peer connection error with ${clientId}:`, err);
        });

        peersRef.current[clientId] = peer;
      }
    });
    setCallState(CallState.IN_CALL);
  };

  const leaveCall = () => {
    console.log('Leaving call...');
    socketRef.current.emit('leaveCall');
    Object.values(peersRef.current).forEach(peer => peer.destroy());
    peersRef.current = {};
    setAudioRefs({});
    setCallState(CallState.NOT_IN_CALL);
  };

  const getStatusMessage = () => {
    switch (connectionState) {
      case ConnectionState.INITIALIZING:
        return 'Initializing...';
      case ConnectionState.CONNECTING:
        return 'Connecting to signaling server...';
      case ConnectionState.CONNECTED:
        return `Connected: ${clientId}`;
      case ConnectionState.DISCONNECTED:
        return 'Disconnected from signaling server';
      case ConnectionState.ERROR:
        return 'Error obtaining user media';
      case ConnectionState.FORCED_DISCONNECT:
        return 'Forced to disconnect by server';
      default:
        return '';
    }
  };

  return {
    clients,
    callClients,
    connectionState,
    callState,
    clientId,
    joinCall,
    leaveCall,
    getStatusMessage,
    audioRefs,
  };
};
