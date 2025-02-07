import React from "react";
import { useParams, Link } from "react-router-dom";

interface Agent {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Inactive";
  lastSeen: string;
}

const AgentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const agents: Agent[] = JSON.parse(localStorage.getItem("agents") || "[]");
  const agent = agents.find((agent) => agent.id === id);

  if (!agent) {
    return <p>Agent not found.</p>;
  }

  return (
    <div className="container">
      <h2>Agent Details</h2>
      <p><strong>Name:</strong> {agent.name}</p>
      <p><strong>Email:</strong> {agent.email}</p>
      <p><strong>Status:</strong> {agent.status}</p>
      <p><strong>Last Seen:</strong> {new Date(agent.lastSeen).toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" })}</p>
      <Link to="/" className="back-button">Back to List</Link>
    </div>
  );
};

export default AgentDetails;
