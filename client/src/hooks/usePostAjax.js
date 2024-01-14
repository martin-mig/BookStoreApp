import { useState } from "react";

export const usePostAjax = (url) => {

    const [databook, setDataBook] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const postData = async (requestData) => {
      try {
        setLoading(true);
        console.log("esta es la url " + url);
        console.log("request data " + requestData);
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Puedes agregar otros encabezados según tus necesidades
          },
          body: JSON.stringify(requestData),
        });
  
        if (!response.ok) {
          throw new Error('Error en la solicitud al servidor');
        }
  
        const responseData = await response.json();
        setDataBook(responseData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    return { databook, loading, error, postData };
};  
