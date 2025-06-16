import React, { useState } from "react";
import { useTodo } from "../Context";

function TodoItem({ todo }) {
    const { updateTodo, deleteTodo, toggleComplete } = useTodo();
    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const [todoMsg, setTodoMsg] = useState(todo.todo);

    const editTodo = () => {
        updateTodo(todo.id, { ...todo, todo: todoMsg });
        setIsTodoEditable(false);
    };

    const toggleCompleted = () => {
        toggleComplete(todo.id);
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high':
                return 'bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-300';
            case 'medium':
                return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300';
            case 'low':
                return 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300';
            default:
                return 'bg-gradient-to-r from-gray-500/20 to-slate-500/20 text-gray-300';
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    return (
        <div
            className={`flex flex-col border border-white/20 rounded-xl p-4 gap-y-3 shadow-lg shadow-purple-500/10 duration-300 backdrop-blur-sm ${
                todo.completed ? "bg-white/5" : "bg-white/10"
            } hover:bg-white/15 transition-all`}
        >
            <div className="flex items-center gap-x-3">
                <input
                    type="checkbox"
                    className="w-5 h-5 cursor-pointer rounded border-white/20 text-purple-500 focus:ring-purple-500 bg-white/10"
                    checked={todo.completed}
                    onChange={toggleCompleted}
                />
                <input
                    type="text"
                    className={`border outline-none w-full bg-transparent rounded-lg text-white ${
                        isTodoEditable ? "border-white/20 px-3 py-1" : "border-transparent"
                    } ${todo.completed ? "line-through opacity-50" : ""}`}
                    value={todoMsg}
                    onChange={(e) => setTodoMsg(e.target.value)}
                    readOnly={!isTodoEditable}
                />
                <div className="flex gap-2">
                    <button
                        className="inline-flex w-8 h-8 rounded-lg text-sm border border-white/20 justify-center items-center bg-white/10 hover:bg-white/20 text-white shrink-0 disabled:opacity-50 transition-all"
                        onClick={() => {
                            if (todo.completed) return;
                            if (isTodoEditable) {
                                editTodo();
                            } else setIsTodoEditable((prev) => !prev);
                        }}
                        disabled={todo.completed}
                    >
                        {isTodoEditable ? "💾" : "✏️"}
                    </button>
                    <button
                        className="inline-flex w-8 h-8 rounded-lg text-sm border border-white/20 justify-center items-center bg-white/10 hover:bg-white/20 text-white shrink-0 transition-all"
                        onClick={() => deleteTodo(todo.id)}
                    >
                        🗑️
                    </button>
                </div>
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
                <span className={`px-3 py-1 rounded-full ${getPriorityColor(todo.priority)}`}>
                    {todo.priority} priority
                </span>
                {todo.dueDate && (
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-300">
                        Due: {formatDate(todo.dueDate)}
                    </span>
                )}
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300">
                    Created: {formatDate(todo.createdAt)}
                </span>
            </div>
        </div>
    );
}

export default TodoItem;
