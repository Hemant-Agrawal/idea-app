import React, { useState } from 'react';

interface AddCommentProps {
    ideaId: string;
    onCommentAdded: (comment: { text: string; createdAt: Date }) => void;
}

const AddComment: React.FC<AddCommentProps> = ({ ideaId, onCommentAdded }) => {
    const [commentText, setCommentText] = useState('');

    const handleAddComment = async () => {
        if (!commentText.trim()) {
            alert('Comment cannot be empty');
            return;
        }

        try {
            const response = await fetch(`/api/ideas/${ideaId}/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: commentText }),
            });

            if (!response.ok) {
                throw new Error('Failed to add comment');
            }

            const data = await response.json();
            onCommentAdded({text: commentText, createdAt: new Date()});
            setCommentText('');
        } catch (error) {
            console.error('Error adding comment:', error);
            // Handle error (show toast notification, etc.)
        }
    };

    return (
        <div className="mt-4">
            <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                className="w-full p-2 border rounded"
            />
            <button
                onClick={handleAddComment}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Add Comment
            </button>
        </div>
    );
};

export default AddComment; 