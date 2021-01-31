import React, { useEffect, useState } from 'react';
import LinkForm from './LinksForm';

import { db } from '../firebase'

import { toast } from 'react-toastify';

const Links = () => {

    const [link, setLink] = useState([]);

    const [currentId, setCurrentId] = useState('');

    const addOrEditLink = async (linkObject) => {
       try {
        if (currentId === '') {
            await db.collection('link').doc().set(linkObject)
            toast('New Link added', {
                type: 'success',
                autoClose:1500
            })
        } else {
            await db.collection('link').doc(currentId).update(linkObject);
            toast('Link Updated Successfully', {
                type: 'info',
                autoClose:1500
            });
            setCurrentId('');
        }
       } catch (error) {
            console.error(error)  
       }
        //console.log('new task add')
    };

    const onDeleteLink = async id => {
        if (window.confirm('Are you sure want to delete this link?')) {
            await db.collection('link').doc(id).delete();
            toast('Link removed successfully', {
                type: 'error',
                autoClose: 1500,
            })
            //console.log('task deleted')
            //console.log('id')
        }
        //console.log(id);
    }

    const getLinks = async () => {
        db.collection('link').onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                //console.log(doc.data());
                //console.log(doc.id);
                docs.push({ ...doc.data(), id: doc.id });
            });
            //console.log(docs);
            setLink(docs);
        });
    };

    useEffect(() => {
        getLinks();
        //console.log('getting data...')
    }, []);

    return (
        <div>
            <div className="col-md-4 p-2">
                <LinkForm {...{ addOrEditLink, currentId, link }} />
            </div>
            <div className="col-md-8 p-2">
                {link.map((link) => (
                    <div className="card mb-1" key={link.id}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h4>{link.name}</h4>
                                <div>
                                    <i className="material-icons text-danger" onClick={() => onDeleteLink(link.id)}>close</i>
                                    <i className="material-icons" onClick={() => setCurrentId(link.id)}>create</i>
                                </div>
                            </div>
                            <p>{link.description}</p>
                            <a href={link.url} target="_blank" rel="noreferrer">Go to website</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Links; 