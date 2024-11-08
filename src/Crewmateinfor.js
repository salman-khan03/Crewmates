import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';

const CrewmateInfo = () => {
  const { id } = useParams();
  const [crewmate, setCrewmate] = useState(null);

  useEffect(() => {
    const fetchCrewmate = async () => {
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
        .eq('id', id)
        .single();

      if (error) console.error(error);
      else setCrewmate(data);
    };

    fetchCrewmate();
  }, [id]);

  return (
    <div>
      {crewmate ? (
        <>
          <h2>{crewmate.name}</h2>
          <p>Attribute: {crewmate.attribute}</p>
          <p>Category: {crewmate.category}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CrewmateInfo;
