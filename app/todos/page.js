"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../firebaseConfig";
import useTodoStore from "../store/todoStore";

export default function TodoManager() {
  const router = useRouter();
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  
  const { todos, addTodo, deleteTodo, updateTodo } = useTodoStore();

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo("");
    }
  };

  const handleEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const handleUpdate = (id) => {
    if (editText.trim()) {
      updateTodo(id, editText.trim());
      setEditingId(null);
      setEditText("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Todo Manager</h1>
            <div className="space-x-2">
              <button
                onClick={() => router.push("/dashboard")}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  auth.signOut();
                  router.push("/signin");
                }}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>

          <form onSubmit={handleAddTodo} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new todo..."
                className="flex-1 border border-gray-300 p-3 rounded focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
              >
                Add
              </button>
            </div>
          </form>

          <div className="space-y-2">
            {todos.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No todos yet. Add one above!</p>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded"
                >

                  
                  {editingId === todo.id ? (
                    <div className="flex-1 flex gap-2">
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="flex-1 border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                      />
                      <button
                        onClick={() => handleUpdate(todo.id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="flex-1 text-gray-800">
                        {todo.text}
                      </span>
                      <button
                        onClick={() => handleEdit(todo)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              ))
            )}
          </div>


        </div>
      </div>
    </div>
  );
}