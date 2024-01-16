import React , { useState, useEffect } from 'react'
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Dropdown } from 'primereact/dropdown';


export const VentasC = () => {
    let product = [
        {
            "_id": {
              "$oid": "65a4360e21abee8f5684da89"
            },
            "title": "Cien Años de Soledad",
            "isbn": "193518217X",
            "pageCount": 325,
            "publishedDate": {
              "$date": "2011-12-12T08:00:00.000Z"
            },
            "shortDescription": "Enterprise OSGi shows a Java developer how to develop to the OSGi Service Platform Enterprise specification, an emerging Java-based technology for developing modular enterprise applications. Enterprise OSGi addresses several shortcomings of existing enterprise platforms, such as allowing the creation of better maintainable and extensible applications, and provide a simpler, easier-to-use, light-weight solution to enterprise software development.",
            "status": "PUBLISH",
            "stock": 1,
            "authors": [
              "Alexandre de Castro Alves"
            ],
            "categories": 
              "Novel"
            ,
            "rating": 5,
            "price": 2,
          },
          {
            "_id": {
              "$oid": "65a4360e21abee8f5684da90"
            },
            "title": "Hello! Flex 4",
            "isbn": "1933988762",
            "pageCount": 258,
            "publishedDate": {
              "$date": "2009-11-01T07:00:00.000Z"
            },
            "shortDescription": "Hello! Flex 4 progresses through 26 self-contained examples selected so you can progressively master Flex. They vary from small one-page apps, to a 3D rotating haiku, to a Connect Four-like game. And in the last chapter you'll learn to build a full Flex application called SocialStalkr   a mashup that lets you follow your friends by showing their tweets on a Yahoo map.",
            "status": "PUBLISH",
            "stock": 10,
            "authors": [
              "Peter Armstrong"
            ],
            "categories": 
              "Programming"
            ,
            "rating": 4,
            "price": 2,
          },
          {
            "_id": {
              "$oid": "65a4360e21abee8f5684da91"
            },
            "title": "MongoDB in Action",
            "isbn": "1935182870",
            "pageCount": 0,
            "publishedDate": {
              "$date": "2011-12-12T08:00:00.000Z"
            },
            "shortDescription": "MongoDB In Action is a comprehensive guide to MongoDB for application developers. The book begins by explaining what makes MongoDB unique and describing its ideal use cases. A series of tutorials designed for MongoDB mastery then leads into detailed examples for leveraging MongoDB in e-commerce, social networking, analytics, and other common applications.",
            "status": "PUBLISH",
            "stock": 5,
            "authors": [
              "Kyle Banker"
            ],
            "categories": 
              "Terror"
            ,
            "rating": 5,
            "price": 2,
          },
          {
            "_id": {
              "$oid": "65a4360e21abee8f5684da92"
            },
            "title": "Libro de cocina",
            "isbn": "1884777686",
            "pageCount": 504,
            "publishedDate": {
              "$date": "1998-06-01T07:00:00.000Z"
            },
            "status": "PUBLISH",
            "stock": 71,
            "authors": [
              "Michael J. Barlotta"
            ],
            "categories": 
              "Cook"
            ,
            "rating": 3,
            "price": 2,
          },
          {
            "_id": {
              "$oid": "65a4360e21abee8f5684da93"
            },
            "title": "Libro de Viaje",
            "isbn": "1884777864",
            "pageCount": 550,
            "publishedDate": {
              "$date": "1999-08-01T07:00:00.000Z"
            },
            "shortDescription": "Jaguar Development with PowerBuilder 7 is the definitive guide to distributed application development with PowerBuilder. It is the only book dedicated to preparing PowerBuilder developers for Jaguar applications and has been approved by Sybase engineers and product specialists who build the tools described in the book.",
            "status": "PUBLISH",
            "stock": 1,
            "authors": [
              "Michael Barlotta"
            ],
            "categories": [
             "Travel"
            ],
            "rating": 4,
            "price": 3,
        }
    ]

    const [products, setProducts] = useState([]);
    const [sortKey, setSortKey] = useState('');
    const [sortOrder, setSortOrder] = useState(0);
    const [sortField, setSortField] = useState('');
    const sortOptions = [
        { label: 'Price High to Low', value: '!price' },
        { label: 'Price Low to High', value: 'price' }
    ];
   

    useEffect(() => {
       setProducts(product);
   
    }, []);

    const stockConvert = (value) => {
        let stockObj = {};
        if (value >= 50){
            stockObj.valueStr = "IN STOCK";
            stockObj.severity = "success";
        }
        else if(value > 1){
            stockObj.valueStr = "LOW STOCK";
            stockObj.severity = "warning";
        }
        else{
            stockObj.valueStr = "OUT OF STOCK";
            stockObj.severity = "danger"
        }
        return stockObj; 
    }

    const stockBodyTemplate = (data) => {
        let {valueStr, severity} = stockConvert(data.stock);
        return <Tag value={valueStr} severity={severity}></Tag>;
    }

    const onSortChange = (event) => {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            setSortOrder(-1);
            setSortField(value.substring(1, value.length));
            setSortKey(value);
        } else {
            setSortOrder(1);
            setSortField(value);
            setSortKey(value);
        }
    };
     
    const header = () => {
        return <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By Price" onChange={onSortChange} className="flex justify-start w-full sm:w-14rem" />;
    };

    <h1>Pagina de Consulta de ventas</h1> 
    const itemTemplate = (product) => {
        return(
            <>    
                <div className="col-12">
                    <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"  src={require('../../images/' + product.categories + '.png')} />
                        <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                                <div className="text-2xl font-bold text-900">{product.title}</div>
                                <Rating value={product.rating} readOnly cancel={false}></Rating>
                                <div className="flex align-items-center gap-3">
                                    <span className="flex align-items-center gap-2">
                                        <i className="pi pi-tag"></i>
                                        <span className="font-semibold">{product.categories}</span>
                                    </span>
                                    {stockBodyTemplate(product)}
                                </div>
                            </div>
                            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                                <span className="text-2xl font-semibold">${product.price}</span>
                                <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }
    return (
        <div className="card">
            <DataView value={products} itemTemplate={itemTemplate} paginator rows={3} header={header()} sortField={sortField} sortOrder={sortOrder}/>
        
        </div>
    )
}