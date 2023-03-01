import React, { useState } from 'react';

type Props = {
    formLabel: string
    visibility: boolean
    changeVisible : any
    fillNewAlbum: any
};

const FormAlbum = ({formLabel, visibility, changeVisible, fillNewAlbum}: Props) => {

    const[albumName, setAlbumName] = useState<string>("");
    const[groupe, setGroupe] = useState<string>("");
    const[nbTitle,setNbTitle] = useState<number>(0);
    const[styleOne, setStyleOne] = useState<string>("");
    const[image, setImage] = useState<string>("");
    const[releaseDate, setReleaseDate] = useState<string>("");

    return (
        <div className='modal'>
            <div className='modal_content'>
                <div className='modal_header'>
                    <h1>{formLabel}</h1>
                </div>
                <div className='modal_body'>
                    <div className='form-group'>
                        <label htmlFor="albumName">Nom de l'album</label>
                        <input type="text" name='albumName' id='albumName' placeholder='Album name' onChange={(e) => setAlbumName(e.currentTarget.value)}/>
                    </div>  
                    <div className='form-group'>
                        <label htmlFor="groupe">Groupe</label>
                        <input type="text" name='groupe' id='groupe' placeholder='groupe name' onChange={(e) => setGroupe(e.currentTarget.value)}/>
                    </div>                                                        
                    <div className='form-group'>
                        <label htmlFor="style">Style de musique</label>
                        <input type="text" name='styleOne' id='styleOne' placeholder='style' onChange={(e) => {setStyleOne(e.currentTarget.value)}}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="nbtitle">Nombre de titres</label>
                        <input type="number" name='nbtitle' id='nbTitle' min={0} onChange={(e)=>setNbTitle(parseInt(e.currentTarget.value))}/>
                    </div>                            
                    <div className='form-group'>
                        <label htmlFor="release-date">Date de sortie</label>
                        <input type="date" name='releaseDate' id='release-date' onChange={(e) => setReleaseDate(e.currentTarget.value)}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="release-date">URL Cover</label>
                        <input type="text" name='image' id='image' onChange={(e) => setImage(e.currentTarget.value)}/>
                    </div>
                    <button type="submit" onClick={
                        () => fillNewAlbum(
                            albumName,
                            groupe,
                            nbTitle,
                            styleOne,
                            releaseDate,
                            image
                        )
                    }>  
                        valider
                    </button>
                </div>
                <div className='modal_footer'>
                    <a href="#" onClick={() => changeVisible(visibility)}>Fermer</a>
                </div>
            </div>
        </div>
    );
};

export default FormAlbum;