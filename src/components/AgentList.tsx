import React, { useState } from "react";
import "./AgentList.css"; // Import styles

interface Agent {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Inactive";
  lastSeen: string;
}

const initialAgents: Agent[] = [
  { id: "1", name: "John Doe", email: "john@example.com", status: "Active", lastSeen: "2024-02-06 10:00 AM" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", status: "Inactive", lastSeen: "2024-02-05 8:30 PM" },
];

const AgentList: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");
  const [emailError, setEmailError] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(!validateEmail(value) && value.length > 0);
  };

  const addAgent = () => {
    if (!name || !email || emailError) return;

    const newAgent: Agent = {
      id: crypto.randomUUID(),
      name,
      email,
      status,
      lastSeen: new Date().toLocaleString(),
    };

    setAgents([...agents, newAgent]);
    setName("");
    setEmail("");
    setStatus("Active");
  };

  return (
    <div className="container">
     

      <div className="form">
        <h3>Add New Agent</h3>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
        />
         <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className={`input ${emailError ? "error" : ""}`}
          />
          <div className="error-message">{emailError ? "Invalid email format" : "\u00A0"}</div>
       
        <select value={status} onChange={(e) => setStatus(e.target.value as "Active" | "Inactive")} className="input">
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button onClick={addAgent} disabled={!name || !email || emailError} className="button">
          Add Agent
        </button>
      </div>
      <h2>Agent List</h2>
      {agents.length === 0 ? (
        <p>No agents found.</p>
      ) : (
        <ul>
          {agents.map((agent) => (
            <li key={agent.id}>
              <strong>{agent.name}</strong> - {agent.email} - {agent.status} - Last seen: {agent.lastSeen}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AgentList;