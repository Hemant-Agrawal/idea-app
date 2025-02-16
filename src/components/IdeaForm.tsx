import { useState, FormEvent, ChangeEvent } from 'react';

interface IdeaFormProps {
  onSubmit: (data: IdeaFormData) => void;
}

interface IdeaFormData {
  title: string;
  description: string;
  linkedinUrl: string;
}

export default function IdeaForm({ onSubmit }: IdeaFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ title, description, linkedinUrl });
    setTitle('');
    setDescription('');
    setLinkedinUrl('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        className="w-full p-2 border rounded text-black"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
        className="w-full p-2 border rounded text-black"
        required
      />
      <input
        type="url"
        placeholder="LinkedIn URL"
        value={linkedinUrl}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setLinkedinUrl(e.target.value)}
        className="w-full p-2 border rounded text-black"
        required
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Post Idea
      </button>
    </form>
  );
} 