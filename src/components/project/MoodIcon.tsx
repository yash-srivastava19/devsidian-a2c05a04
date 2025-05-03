
import React from 'react';
import { Entry } from '@/types';

interface MoodIconProps {
  mood: Entry['mood'];
}

const MoodIcon: React.FC<MoodIconProps> = ({ mood }) => {
  switch (mood) {
    case 'productive':
      return <span title="Productive">🚀</span>;
    case 'stuck':
      return <span title="Stuck">😓</span>;
    case 'learning':
      return <span title="Learning">📚</span>;
    case 'refactoring':
      return <span title="Refactoring">🔧</span>;
    case 'planning':
      return <span title="Planning">🗓️</span>;
    default:
      return null;
  }
};

export default MoodIcon;
