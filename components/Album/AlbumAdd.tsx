import Album from '@/interfaces/album';
import supabase from '@/utils/supabase';
import React, { useEffect, useState } from 'react';

type Props = {
    visibility: boolean
    changeVisible : any
};

const AlbumAdd = ({ visibility, changeVisible }: Props) => {

    const[album, setAlbum] = useState<Album>();
    const[albumName, setAlbumName] = useState<string>("");
    const[groupe, setGroupe] = useState<string>("");
    const[nbTitle,setNbTitle] = useState<number>(0);
    const[styleOne, setStyleOne] = useState<string>("");
    const[image, setImage] = useState<string>("");
    const[releaseDate, setReleaseDate] = useState<string>("");

    async function fillNewAlbum(
        albumName:string,
        groupe:string,
        nbTitle:number,
        styleOne:string,
        releaseDate:string,
        image:string,
    ){  
        let lastInsertedId:number = await fetchLastAlbum();    
        const data = {
            id: ++lastInsertedId,
            name: albumName,
            groupe: groupe,
            nb_title: nbTitle,
            styleOne: styleOne,
            release_date: releaseDate,
            image: image,
        };
        try{
            let {error} = await supabase
                .from('albums')
                .insert([
                    data
                ])
            ;
            if(error) throw error;

            alert("Album added with success !");
        } catch(errorAdd){
            alert("An error has occured, you album have not been added !");
        }
    }

    async function fetchLastAlbum(){

        let { data, error } = await supabase
            .from('albums')
            .select('id')
            .order('id', {ascending: false})
        ;

        if(data){
            return data[0].id;
        }
        return 0;
    }

    useEffect(() => {
        fetchLastAlbum();
    })

    return (
        <>
            { visibility && <div className='modal'>
                <div className='modal_content'>
                    <div className='modal_header'>
                        <h1>Ajouter un nouvel album</h1>
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
            }   
        </>
    );
};

export default AlbumAdd;