import Album from '@/interfaces/album';
import supabase from '@/utils/supabase';
import React, { FormEvent, useEffect, useState } from 'react';

type Props = {
    visibility: boolean
    changeVisible : any
};

const AlbumAdd = ({ visibility, changeVisible }: Props) => {

    const[album, setAlbum] = useState<Album>();
    const[albumName, setAlbumName] = useState<string>("");
    const[groupe, setGroupe] = useState<string>("");
    const[nbTitle,setNbTitle] = useState<number>(0);
    const[style, setStyle] = useState<string>("");
    const[releaseDate, setReleaseDate] = useState<string>("");
    let[lastInsertedId, setLastInsertedId] = useState<number>(0)

    async function fillNewAlbum(
        albumName:string,
        groupe:string,
        nbTitle:number,
        style:string,
        releaseDate:string
    ){        
        const dateNow = new Date();
        const dateOptions = {year:'numeric',month:'numeric',day:'numeric'}
        const createdAt = dateNow.toLocaleDateString('US', dateOptions);

         const data = {
            id: ++lastInsertedId,
            name: albumName,
            groupe: groupe,
            nb_title: nbTitle,
            style: style,
            release_date: releaseDate,
            created_at: createdAt,
        };

        const {error} = await supabase
            .from('albums')
            .insert([
                data
            ])


    }

    async function fetchLastAlbum(){

        let { data, error } = await supabase
            .from('albums')
            .select('id')
            .order('id', {ascending: false})
        ;

        
        if(data){
            setLastInsertedId(data[0].id);
        }
    }

    useEffect(() => {
        fetchLastAlbum();
    })

    useEffect(() => {
        console.log(lastInsertedId);
    }, [lastInsertedId])

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
                            <input type="text" name='style' id='style' placeholder='style' onChange={(e) => {setStyle(e.currentTarget.value)}}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="nbtitle">Nombre de titres</label>
                            <input type="number" name='nbtitle' id='nbTitle' min={0} onChange={(e)=>setNbTitle(parseInt(e.currentTarget.value))}/>
                        </div>                            
                        <div className='form-group'>
                            <label htmlFor="release-date">Date de sortie</label>
                            <input type="date" name='releaseDate' id='release-date' onChange={(e) => setReleaseDate(e.currentTarget.value)}/>
                        </div>

                        <button type="submit" onClick={
                            () => fillNewAlbum(
                                albumName,
                                groupe,
                                nbTitle,
                                style,
                                releaseDate
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