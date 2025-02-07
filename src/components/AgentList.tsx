import React, { useState } from "react";
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
  return (
    <div>
      <h3>Agents</h3>
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