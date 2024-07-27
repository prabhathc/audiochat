import React from 'react';
import Avatar from './Avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import stc from 'string-to-color';

interface AudioCardProps {
    clientId: string;
    title: string;
    canvasId: string;
    isYou?: boolean;
    audioLevel?: number;
}

const AudioCard: React.FC<AudioCardProps> = ({ clientId, title, canvasId, isYou = false, audioLevel = 0 }) => {
    const badgeColor = stc(title);
    const borderColor = isYou ? 'border-purple-800' : `border-[rgba(128,0,128,${Math.min(audioLevel / 100, 1)})]`;

    return (
        <div className={cn(
            "relative flex flex-col items-center p-4 rounded-lg min-h-12 py-10 bg-gray-200",
            isYou ? "border-2" : "",
            borderColor
        )}>
            <Avatar clientId={clientId} size={96} />
            <canvas id={canvasId} width="400" height="100" className="w-full h-24 mt-2" />
            <div className="absolute bottom-4 left-4">
                <Badge className={cn('opacity-50 rounded-full bg-purple-800')} >
                    {title} 
                </Badge>
            </div>
        </div>
    );
};

export default AudioCard;
