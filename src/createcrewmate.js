import React, { useState } from 'react';
import { supabase } from '../client';

const CreateCrewmate = ({ addCrewmate }) => {
  const [crewmate, setCrewmate] = useState({ name: "", attribute: "", category: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCrewmate({ ...crewmate, [name]: value });
  };

  const handleAddCrewmate = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('crewmates')
      .insert([crewmate]);

    if (error) console.error(error);
    else console.log("Crewmate added:", data);
  };

  return (
    <div>
      <form onSubmit={handleAddCrewmate}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} />
        <input type="text" name="attribute" placeholder="Attribute" onChange={handleChange} />
        <input type="text" name="category" placeholder="Category" onChange={handleChange} />
        <button type="submit">Add Crewmate</button>
      </form>
      <label>Category</label>
      <select name="category" onChange={handleChange}>
        <option value="warrior">Warrior</option>
        <option value="mage">Mage</option>
        <option value="archer">Archer</option>
      </select>
        {crewmate.category === 'warrior' && (
          <input type="text" name="strength" placeholder="Strength" onChange={handleChange} />
        )}
        {crewmate.category === 'mage' && (
          <input type="text" name="magic" placeholder="Magic Power" onChange={handleChange} />
        )}
      </div>
    );
};

export { CreateCrewmate };
const calculateStatistics = (crewmates) => {
    const total = crewmates.length;
    const warriors = crewmates.filter(c => c.category === 'warrior').length;
    const mages = crewmates.filter(c => c.category === 'mage').length;
    const archers = crewmates.filter(c => c.category === 'archer').length;

    return {
        warriorPercent: (warriors / total) * 100,
        magePercent: (mages / total) * 100,
        archerPercent: (archers / total) * 100,
    };
};
const CrewStatistics = ({ stats }) => (
    <div>
        <p>Warrior Percentage: {stats.warriorPercent}%</p>
        <p>Mage Percentage: {stats.magePercent}%</p>
        <p>Archer Percentage: {stats.archerPercent}%</p>
    </div>
);
const calculateSuccessMetric = (crewmates) => {
    return crewmates.reduce((sum, c) => sum + (c.strength || 0), 0);
};

const CrewmateApp = () => {
    const [crewmates, setCrewmates] = useState([]);
    const [stats, setStats] = useState({ warriorPercent: 0, magePercent: 0, archerPercent: 0 });
    const [successMetric, setSuccessMetric] = useState(0);

    const addCrewmate = async (crewmate) => {
        const { data, error } = await supabase
            .from('crewmates')
            .insert([crewmate]);

        if (error) {
            console.error(error);
        } else {
            setCrewmates([...crewmates, ...data]);
            setStats(calculateStatistics([...crewmates, ...data]));
            setSuccessMetric(calculateSuccessMetric([...crewmates, ...data]));
        }
    };

    return (
        <div>
            <CreateCrewmate addCrewmate={addCrewmate} />
            <CrewStatistics stats={stats} />
            <p>Success Metric: {successMetric}</p>
        </div>
    );
};

export default CrewmateApp;
