import { useState, useEffect } from "react";

export const useFetch = (url) => {
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch(url);  
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        const result = await response.json(); 
        setData(result); 
      } catch (error) {
        setError(error.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchData(); 
  }, [url]); 

  
  return { data, loading, error };
};