import { FaHeart } from 'react-icons/fa';
import React from 'react';
import AddComment from './AddComment';

export interface Idea {
    _id: string;
    title: string;
    description: string;
    linkedinUrl?: string;
    createdAt: string;
    likes: number;
    comments: { text: string; createdAt: Date }[];
}

interface IdeaListProps {
    ideas: Idea[];
    onIdeaUpdate: (updatedIdea: Idea) => void;
}

const IdeaList = ({ ideas, onIdeaUpdate }: IdeaListProps) => {
    const handleLike = async (idea: Idea) => {
        try {
            const response = await fetch(`/api/ideas/${idea._id}/like`, {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error('Failed to like the idea');
            }

            const data = await response.json();
            console.log(data.message);
            onIdeaUpdate(data.idea);
        } catch (error) {
            console.error('Error liking idea:', error);
            // Handle error (show toast notification, etc.)
        }
    };

    const handleCommentAdded = (ideaId: string, newComment: { text: string; createdAt: Date }) => {
        const updatedIdeas = ideas.map(idea => 
            idea._id === ideaId ? { ...idea, comments: [...idea.comments, newComment] } : idea
        );
        onIdeaUpdate(updatedIdeas.find(idea => idea._id === ideaId)!);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 py-4">
            {ideas.map((idea) => (
                <div key={idea._id} className="border rounded-lg p-4 shadow-md">
                    <h3 className="text-lg font-semibold">{idea.title}</h3>
                    <p className="text-gray-600 mt-2">{idea.description}</p>
                    
                    {idea.linkedinUrl && (
                        <a href={idea.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            Connect on LinkedIn
                        </a>
                    )}

                    <button 
                        onClick={() => handleLike(idea)}
                        className="flex items-center gap-2 mt-2 text-gray-600 hover:text-red-500"
                    >
                        <FaHeart className={idea.likes > 0 ? 'text-red-500' : ''} />
                        <span>{idea.likes}</span>
                    </button>

                    <div className="mt-4">
                        <h4 className="font-semibold">Comments:</h4>
                        {idea.comments.length > 0 ? (
                            <ul className="list-disc list-inside">
                                {idea.comments.map((comment, index) => (
                                    <li key={index} className="text-gray-700">
                                        {comment.text} <span className="text-sm text-gray-500">({new Date(comment.createdAt).toLocaleDateString()})</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No comments yet.</p>
                        )}
                    </div>

                    <AddComment ideaId={idea._id} onCommentAdded={(newComment) => handleCommentAdded(idea._id, newComment)} />
                </div>
            ))}
        </div>
    );
};

export default IdeaList; 