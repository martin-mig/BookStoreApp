import React,{ useState } from 'react';
import addImage from '../images/add1.png';
import minusImage from '../images/minus1.png';

export const FileTable = ( data ) => {

    const [isClosed, setIsClosed] = useState(true);

    const toggleImage = () => {
        setIsClosed(!isClosed);
    };
    
    const formatDetails = () => {
        return (
             
            <div style={{ display: 'flex'}}>
            <div style={{ marginLeft: '5px' }}>
                <p style={{ marginBottom: '10px' }}>
                    Country:&nbsp;&nbsp; Arg
                </p>
                <p>
                    Place:&nbsp; Row 1 
                </p>
            </div>
            <div >
                <img src={require('../images/arg.png')} style={{ marginLeft: '10px' }}  alt="Londres" /><br />
            </div>
        </div>
        );
    };
 
    return (
        <>
           
            
               {/* <td className="details-control" onClick={toggleImage}><img src={isClosed ? addImage : minusImage} alt={isClosed ? 'Agregar' : 'Remover'} /></td>
                
                <td  className="sorting sorting_asc">Cien años de soledad</td>
                <td >Gabriel García Márquez</td>
                <td>Novela</td>
                <td>1982</td>    
                <td>Sudamericana</td>  
              */} 

                {
                    data.data.map((libro, indice) => {
                        return( <tr key={indice}>
                                    <td className="details-control" onClick={toggleImage}><img src={isClosed ? addImage : minusImage} alt={isClosed ? 'Agregar' : 'Remover'} /></td>
                                    <td className="sorting sorting_asc">{libro.title}</td>
                                    <td className="sorting sorting_asc">{libro.isbn}</td>
                                    <td className="sorting sorting_asc">{libro.publishedDate}</td>
                                    <td className="sorting sorting_asc">{libro.pageCount}</td>
                                    <td className="sorting sorting_asc">{libro.status}</td>
                                </tr>
                        )
                    })
                }
              


           
            {isClosed ? null : (
                <tr>  
                    <td colSpan={6} style={{textAlign: 'left'}}>{formatDetails()}</td>
                </tr> 
                
            )}
        </>

    )

}