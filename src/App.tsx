import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AgentList from "../src/components/AgentList";
import AgentDetails from "../src/components/AgentDetails";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AgentList />} />
        <Route path="/agent/:id" element={<AgentDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
