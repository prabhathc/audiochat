"use client"
import { useAudioStream } from '@/hooks/useAudioStream';
import { ConnectionState, useConnection } from '@/hooks/useConnection';
import React from 'react'

const Footer = () => {
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
    return (
        <footer className="w-full bg-blue-500 text-white p-2 flex items-center justify-between">
            {connectionState === ConnectionState.CONNECTED ? (
                <div className="flex items-center">
                    <span className="bg-green-500 h-4 w-4 rounded-full mr-2"></span>
                    <span className='text-sm'>{getStatusMessage()}</span>
                </div>
            ) : (
                <span>{getStatusMessage()}</span>
            )}
            <div className="text-sm">
                {clients?.length} {clients?.length === 1 ? 'person' : 'people'} online
            </div>
        </footer>
    )
}

export default Footer