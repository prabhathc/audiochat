import React from 'react';
import BoringAvatar from 'boring-avatars';

interface AvatarProps {
  clientId: string;
  size?: number | string;
  variant?: 'marble' | 'beam' | 'pixel' | 'sunset' | 'ring' | 'bauhaus';
  colors?: string[];
}

const Avatar: React.FC<AvatarProps> = ({
  clientId,
  size = 40,
  variant = 'beam',
  colors = ['#affbff', '#d2fdfe', '#fefac2', '#febf97', '#fe6960'],
}) => {
  return (
    <BoringAvatar
      size={size}
      name={clientId}
      variant={variant}
      colors={colors}
    />
  );
};

export default Avatar;
