import React from 'react';

interface FeedbackCardProps {
  titulo: string;
  descricao: string;
  icone: React.ReactNode;
}

export default function FeedbackCard({ titulo, descricao, icone }: FeedbackCardProps) {
  return (
    <div className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
      <div className="flex-shrink-0 w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600">
        {icone}
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-bold text-gray-900 text-sm leading-tight">{titulo}</h3>
        <p className="text-gray-500 text-xs leading-relaxed">{descricao}</p>
      </div>
    </div>
  );
}
