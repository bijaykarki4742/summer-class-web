"use client"

import React from "react"
import Sidebar from "@/component/sidebar"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"

type Note = {
    id: string
    title: string
    content: string
    color: string
}

const presetColors = [
    "#BFDBFE", // blue-200
    "#FECACA", // red-200
    "#FEF08A", // yellow-200
    "#E9D5FF", // purple-200
    "#DCFCE7", // green-200
    "#E5E7EB", // gray-200
]

export default function StickyNotesPage() {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();
    const [notes, setNotes] = React.useState<Note[]>([
        { id: crypto.randomUUID(), title: "Sticky Note Title", content: "I Have my meeting at 5 PM, so i should make every preparation for the meeting as this is one of the most important meeting of my life", color: presetColors[0] },
        { id: crypto.randomUUID(), title: "Meeting at 5 PM", content: "I Have my meeting at 5 PM, so i should make every preparation for the meeting as this is one of the most important meeting of my life", color: presetColors[1] },
        { id: crypto.randomUUID(), title: "Meeting at 5 PM", content: "I Have my meeting at 5 PM, so i should make every preparation for the meeting as this is one of the most important meeting of my life", color: presetColors[2] },
        { id: crypto.randomUUID(), title: "Meeting at 5 PM", content: "I Have my meeting at 5 PM, so i should make every preparation for the meeting as this is one of the most important meeting of my life", color: presetColors[3] },
        { id: crypto.randomUUID(), title: "Meeting at 5 PM", content: "I Have my meeting at 5 PM, so i should make every preparation for the meeting as this is one of the most important meeting of my life", color: presetColors[4] },
        { id: crypto.randomUUID(), title: "Meeting at 5 PM", content: "I Have my meeting at 5 PM, so i should make every preparation for the meeting as this is one of the most important meeting of my life", color: presetColors[5] },
    ])

    const [showDialog, setShowDialog] = React.useState(false)
    const [title, setTitle] = React.useState("")
    const [content, setContent] = React.useState("")
    const [color, setColor] = React.useState(presetColors[0])

    React.useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    function addNote() {
        setShowDialog(true)
    }

    function saveNote() {
        const newNote: Note = { id: crypto.randomUUID(), title, content, color }
        setNotes(prev => [newNote, ...prev])
        setShowDialog(false)
        setTitle("")
        setContent("")
        setColor(presetColors[0])
    }

    return (
        <div className="flex">
            <Sidebar />
            <div className="w-full h-full p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">Sticky Notes</h1>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                        onClick={addNote}
                    >
                        Add Sticky Note
                    </button>
                </div>

                {/* Notes Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {notes.map(note => (
                        <div key={note.id} className="rounded-xl p-5 shadow-sm" style={{ backgroundColor: note.color }}>
                            <h3 className="text-xl font-bold mb-2">{note.title}</h3>
                            <p className="text-sm leading-5">
                                {note.content}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Dialog */}
                {showDialog && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                        <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
                            <h2 className="text-lg font-semibold mb-4">Add Sticky Note</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-700 mb-1">Title</label>
                                    <input
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Sticky Note Title"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-700 mb-1">Content</label>
                                    <textarea
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder="Write your note here..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-700 mb-2">Color</label>
                                    <div className="flex gap-2 flex-wrap">
                                        {presetColors.map(c => (
                                            <button
                                                key={c}
                                                type="button"
                                                onClick={() => setColor(c)}
                                                className="w-8 h-8 rounded-md border"
                                                style={{ backgroundColor: c, outline: color === c ? '2px solid #2563EB' : 'none' }}
                                                aria-label="pick-color"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end gap-2">
                                <button className="px-4 py-2 rounded-md border" onClick={() => setShowDialog(false)}>Cancel</button>
                                <button className="px-4 py-2 rounded-md bg-blue-600 text-white" onClick={saveNote}>Save Note</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

