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
    console.log("form prop",props)
    const [movie,setMovie]= useState(initialItem)


    


    useEffect(()=> {
        
        const MovieToEdit =  props.movies.find(movie => 
            `${movie.id}` === props.match.params.id
        );if (MovieToEdit) {
            setMovie(MovieToEdit);}
    },[props.movies, props.match.params.id])

    // props.movies, props.match.params.id
    const changeHandler = e => {
        e.persist();

        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        });
    }


    const handleSubmit = e => {
        e.preventDefault();
    
        
        axios
        .put(`http://localhost:5000/api/movies/${movie.id}` , movie)
        .then(res => {
            const newMovies = props.movies.map(color =>{
                if(movie.id === color.id){
                    return res.data
                }else{
                    return color
                }
                
            })
            props.setMovies(newMovies)
        
            
            console.log("edit res", res)
            props.history.push(`/`)
        })
        .catch(err => console.log(err.message))
    }

    return(
    <div>
        <h2>Update movie</h2>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            name="title"
            onChange={changeHandler}
            placeholder="title"
            value={movie.title}
            />
            <div className="baseline" />

            <input
            type="text"
            name="director"
            onChange={changeHandler}
            placeholder="director"
            value={movie.director}
            />
            <div className="baseline" />

            <input
            type="text"
            name="metascore"
            onChange={changeHandler}
            placeholder="metascore"
            value={movie.metascore}
            />
            <div className="baseline" />

            <input
            type="text"
            name="stars"
            onChange={changeHandler}
            placeholder="stars"
            value={movie.stars}
            />
            <div className="baseline" />

            
        <div className="baseline" />

        <button className="md-button form-button">Update</button>
    </form>
</div>
    )
}

export default UpdateForm;