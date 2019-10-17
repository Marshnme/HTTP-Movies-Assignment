import React, { useState, useEffect } from "react";
import axios from "axios";

const initialItem = {
    id: Date.now(),
    title: "",
    director: "",
    metascore: "",
    stars: ""
};




const UpdateForm = (props) => {
    console.log(props)
    const [item,setItem]= useState(initialItem)
console.log(item);

    useEffect(()=> {
        const itemToEdit = props.movies.find(movie => 
            `${movie.id}` === props.match.params.id
        );if (itemToEdit) {
            setItem(itemToEdit)
        }
    },[props.movies, props.match.params.id])


    const changeHandler = e => {
        // e.persist();

        setItem({
            ...item,
            [e.target.name]: e.target.value
        });
    }


    const handleSubmit = e => {
        e.preventDefault();
        axios
        .put(`http://localhost:5000/api/movies/${item.id}` , item)
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err.message))
    }

    return(
    <div>
        <h2>Update Item</h2>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            name="title"
            onChange={changeHandler}
            placeholder="title"
            value={item.title}
            />
            <div className="baseline" />

            <input
            type="text"
            name="director"
            onChange={changeHandler}
            placeholder="director"
            value={item.director}
            />
            <div className="baseline" />

            <input
            type="text"
            name="metascore"
            onChange={changeHandler}
            placeholder="metascore"
            value={item.metascore}
            />
            <div className="baseline" />

            <input
            type="text"
            name="stars"
            onChange={changeHandler}
            placeholder="stars"
            value={item.stars}
            />
            <div className="baseline" />

            
        <div className="baseline" />

        <button className="md-button form-button">Update</button>
    </form>
</div>
    )
}

export default UpdateForm;