import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

export type TaskDialogData = {
  id?: string;
  name: string;
  dueDate: string;
  tag: string;
  description: string;
};

type AddTaskDialogProps = {
  open: boolean;
  initialData?: TaskDialogData;
  tags?: string[];
  onSave: (data: TaskDialogData) => void;
  onDelete?: (id: string) => void;
  onCancel: () => void;
};

const defaultTags = ['Personal', 'Work', 'Urgent'];

export default function AddTaskDialog({
  open,
  initialData,
  tags = defaultTags,
  onSave,
  onDelete,
  onCancel,
}: AddTaskDialogProps) {
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tag, setTag] = useState(tags[0] || '');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setDueDate(initialData.dueDate || '');
      setTag(initialData.tag || tags[0] || '');
      setDescription(initialData.description || '');
    } else {
      setName('');
      setDueDate('');
      setTag(tags[0] || '');
      setDescription('');
    }
  }, [initialData, tags]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl p-8 relative animate-fadeIn">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
          onClick={onCancel}
          aria-label="Close"
        >
          <FaTimes />
        </button>
        
        <form
          onSubmit={e => {
            e.preventDefault();
            onSave({
              id: initialData?.id,
              name,
              dueDate,
              tag,
              description,
            });
          }}
        >
          {/* Title Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-1">Task Title</label>
            <input
              type="text"
              className="w-full text-2xl font-bold text-gray-800 border-b-2 border-gray-200 px-0 py-2 focus:outline-none focus:border-orange-400"
              placeholder="Enter task title..."
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-6 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1">Due date</label>
              <input
                type="date"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1">Tag</label>
              <select
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={tag}
                onChange={e => setTag(e.target.value)}
              >
                {tags.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Description</label>
            <textarea
              className="w-full border rounded-lg px-4 py-2 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
              placeholder="Your description..."
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-between mt-8">
            <button
              type="button"
              className="px-6 py-2 rounded-lg border border-gray-300 text-gray-800 font-semibold hover:bg-gray-100"
              onClick={onCancel}
            >
              Cancel
            </button>
            <div className="flex gap-2">
              {onDelete && initialData?.id && (
                <button
                  type="button"
                  className="px-6 py-2 rounded-lg border border-red-300 text-red-600 font-semibold hover:bg-red-50"
                  onClick={() => onDelete(initialData.id!)}
                >
                  Delete
                </button>
              )}
              <button
                type="submit"
                className="px-8 py-2 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 shadow"
              >
                Done
              </button>
            </div>
          </div>
        </form>
      </div>
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
} 