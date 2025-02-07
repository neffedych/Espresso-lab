import React, { useEffect, useState } from "react";
import "./AgentList.css";

interface Agent {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Inactive";
  lastSeen: string;
}

const initialAgents: Agent[] = [
    { id: "1", name: "Art Nef", email: "artnef@example.com", status: "Active", lastSeen: "2024-02-06 10:00 AM" },
    { id: "2", name: "Alex Fen", email: "alexfen@example.com", status: "Inactive", lastSeen: "2024-02-05 8:30 PM" },
  ];

const AgentList: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>(() => {
    const storedAgents = localStorage.getItem("agents");
    return storedAgents ? JSON.parse(storedAgents) : initialAgents;
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");
  const [emailError, setEmailError] = useState(false);
  const [editingAgentId, setEditingAgentId] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"All" | "Active" | "Inactive">("All");

  useEffect(() => {
    localStorage.setItem("agents", JSON.stringify(agents));
  }, [agents]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(!validateEmail(value) && value.length > 0);
  };

  const addOrUpdateAgent = () => {
    if (!name || !email || emailError) return;

    if (editingAgentId) {
      setAgents((prevAgents) =>
        prevAgents.map((agent) =>
          agent.id === editingAgentId ? { ...agent, name, email, status } : agent
        )
      );
      setEditingAgentId(null);
    } else {
      const newAgent: Agent = {
        id: crypto.randomUUID(),
        name,
        email,
        status,
        lastSeen: new Date().toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" }),
      };
      setAgents([...agents, newAgent]);
    }

    setName("");
    setEmail("");
    setStatus("Active");
  };

  const deleteAgent = (id: string) => {
    setAgents((prevAgents) => prevAgents.filter((agent) => agent.id !== id));
  };

  const handleEdit = (agent: Agent) => {
    setEditingAgentId(agent.id);
    setName(agent.name);
    setEmail(agent.email);
    setStatus(agent.status);
  };

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === "All" || agent.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container">
      <div className="form">
        <h3>{editingAgentId ? "Edit Agent" : "Add New Agent"}</h3>
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
        <button onClick={addOrUpdateAgent} disabled={!name || !email || emailError} className="button">
          {editingAgentId ? "Update Agent" : "Add Agent"}
        </button>
      </div>


      <div className="filter-container">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input search-bar"
        />

        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as "All" | "Active" | "Inactive")} className="input">
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {filteredAgents.length === 0 ? (
        <p>No agents found.</p>
      ) : (
        <table className="agent-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Last Seen</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAgents.map((agent) => (
              <tr key={agent.id}>
                <td>{agent.name}</td>
                <td>{agent.email}</td>
                <td>{agent.status}</td>
                <td>{new Date(agent.lastSeen).toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" })}</td>
                <td>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <button onClick={() => handleEdit(agent)} className="edit-button">Edit</button>
                    <button onClick={() => deleteAgent(agent.id)} className="delete-button">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AgentList;