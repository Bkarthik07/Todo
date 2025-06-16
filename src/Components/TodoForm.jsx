import { useState } from "react";
import { useTodo } from "../Context";

function TodoForm() {
    const [todo, setTodo] = useState("");
    const [priority, setPriority] = useState("medium");
    const [dueDate, setDueDate] = useState("");
    const { addTodo } = useTodo();

    const add = (e) => {
        e.preventDefault();
        if (!todo) return;
        
        const newTodo = {
            todo,
            completed: false,
            priority,
            dueDate: dueDate || null,
            createdAt: new Date().toISOString(),
        };
        
        addTodo(newTodo);
        setTodo("");
        setPriority("medium");
        setDueDate("");
    };

    return (
        <form className="space-y-4" onSubmit={add}>
            <div className="flex gap-3">
                <input
                    type="text"
                    placeholder="Write Todo..."
                    className="w-full border border-white/20 rounded-xl px-4 py-3 outline-none duration-150 bg-white/10 text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 hover:bg-white/20 transition-all"
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                />
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="border border-white/20 rounded-xl px-4 py-3 outline-none duration-150 bg-white/10 text-white focus:ring-2 focus:ring-purple-500 hover:bg-white/20 transition-all"
                >
                    <option value="low" className="bg-purple-900">Low Priority</option>
                    <option value="medium" className="bg-purple-900">Medium Priority</option>
                    <option value="high" className="bg-purple-900">High Priority</option>
                </select>
            </div>
            <div className="flex gap-3">
                <input
                    type="datetime-local"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full border border-white/20 rounded-xl px-4 py-3 outline-none duration-150 bg-white/10 text-white focus:ring-2 focus:ring-purple-500 hover:bg-white/20 transition-all"
                />
                <button 
                    type="submit" 
                    className="rounded-xl px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white hover:opacity-90 transition-all font-medium shadow-lg shadow-purple-500/20"
                >
                    Add Todo
                </button>
            </div>
        </form>
    );
}

export default TodoForm;

