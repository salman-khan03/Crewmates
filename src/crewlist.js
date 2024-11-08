import React, { useState, useEffect } from 'react';
import { supabase } from '../client';

const deleteCrewmate = async (id) => {
  const { error } = await supabase
    .from('crewmates')
    .delete()
    .eq('id', id);

  if (error) console.error(error);
  else console.log("Crewmate deleted");
};

const CrewList = () => {
  const [crewmates, setCrewmates] = useState([]);

  useEffect(() => {
    const fetchCrewmates = async () => {
      const { data, error } = await supabase
        .from('crewmates')
        .select();

      if (error) console.error(error);
      else setCrewmates(data);
    };

    fetchCrewmates();
  }, []);

  return (
    <div>
      {crewmates.map((crewmate) => (
        <div key={crewmate.id}>
          <h3>{crewmate.name}</h3>
          <p>Attribute: {crewmate.attribute}</p>
          <button onClick={() => deleteCrewmate(crewmate.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default CrewList;
  