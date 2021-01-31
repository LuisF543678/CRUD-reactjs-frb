import React, { useState, useEffect } from 'react';
import { db } from "../firebase";
import { toast } from "react-toastify";
const LinkForm = (props) => {

    const initalStateValues = {
        url: '',
        name: '',
        description: ''
    };

    const [values, setValues] = useState(initalStateValues);

    const handleInputchange = e => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })
        //console.log(name, value);
        //console.log(e.target.value)
    }

    const validateUrl = str => {
        return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(str);
    }

    const handleSumit = e => {
        e.preventDefault();

        //console.log(validateUrl(values.url));
        if (!validateUrl(values.url)) {
            return toast('Invalid Url', {
                type: 'warning',
                autoClose: 1000,
            });
        }
        //console.log(values)
        props.addOrEditLink(values);
        setValues({ ...initalStateValues })
    }

    const getLinkById = async (id) => {
        const doc = await db.collection('link').doc(id).get();
        setValues({ ...doc.data() })
        //console.log(doc.data())
    }



    useEffect(() => {
        //console.log(props.currentId);
        if (props.currentId === '') {
            setValues({ ...initalStateValues });
        } else {
            getLinkById(props.currentId);
            //console.log(props.currentId)
            //console.log('editing...')
        }
    }, [props.currentId]);


    return (
        <form className="card card-body" onSubmit={handleSumit}>
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">insert_link</i>
                </div>
                <input type="text" className="form-control" placeholder="https://someurl.com" name="url" onChange={handleInputchange} value={values.url} />
            </div>
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">create</i>
                </div>
                <input type="text" className="form-control" name="name" placeholder="website name" onChange={handleInputchange} value={values.name} />
            </div>

            <div className="form-group">
                <textarea name="description" rows="3" className="form-control" placeholder="write a description" onChange={handleInputchange} value={values.description} ></textarea>
            </div>

            <button className="btn btn-primary btn-block">
                {props.currentId === '' ? 'Save' : 'Update'}
            </button>
        </form>
    )
};

export default LinkForm;