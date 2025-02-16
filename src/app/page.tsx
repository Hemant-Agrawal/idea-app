'use client';

import { useState, useEffect } from 'react';
import IdeaForm from '@/components/IdeaForm';
import IdeaList, { Idea } from '@/components/IdeaList';



export default function Home() {
  const [ideas, setIdeas] = useState<Idea[]>([]);

  useEffect(() => {
    fetch('/api/ideas')
      .then((res) => res.json())
      .then((data) => setIdeas(data));
  }, []);

  const addIdea = async (idea: Partial<Idea>) => {
    const res = await fetch('/api/ideas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(idea),
    });

    if (res.ok) {
      const newIdea = await res.json();
      setIdeas((prevIdeas) => [newIdea, ...prevIdeas]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Share Your Ideas</h1>
      <IdeaForm onSubmit={addIdea} />
      <IdeaList 
        ideas={ideas} 
        onIdeaUpdate={(updatedIdea) => {
          setIdeas(ideas.map(idea => 
            idea._id === updatedIdea._id ? updatedIdea : idea
          ));
        }} 
      />
    </div>
  );
}
