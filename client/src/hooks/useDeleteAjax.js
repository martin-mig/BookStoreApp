import { useState } from "react";

export const useDeleteAjax = (url) => {
    const [deleteData, setDeleteData] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteError, setDeleteError] = useState(null);
  
    const funcDeleteData = async (requestData) => {
      try {
        setDeleteLoading(true);
        console.log("CLIENT: esta es la url " + url);
        console.log("CLIENT: request data: ", requestData);
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });
  
        if (!response.ok) {
          throw new Error('Error en la solicitud al servidor');
        }
  
        const responseData = await response.json();
        setDeleteData(responseData);
      } catch (error) {
        setDeleteError(error.message);
      } finally {
        setDeleteLoading(false);
      }
    };
  
    return { deleteData, deleteLoading, deleteError, funcDeleteData };
};  
