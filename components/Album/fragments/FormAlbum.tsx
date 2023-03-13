import Album from '@/interfaces/album';
import supabase from '@/utils/supabase';
import React, { useEffect, useState } from 'react';

type Props = {
    formLabel: string
    visibility: boolean
    changeVisible : any
    actionAlbum: any
    isEdit: boolean
    album: Album|undefined
    closePopUp: any
};

const FormAlbum = ({formLabel, visibility, changeVisible, actionAlbum, isEdit, album, closePopUp}: Props) => {

    const[albumName, setAlbumName] = useState<string>(album ? album.name : "");
    const[groupe, setGroupe] = useState<string>(album ? album.groupe : "");
    const[nbTitle,setNbTitle] = useState<number>(album ? album.nb_title : 0);
    const[styleOne, setStyleOne] = useState<string>(album ? album.styleOne : "");
    const[image, setImage] = useState<string>(album ? album.image : "");
    const[releaseDate, setReleaseDate] = useState<string>(album ? album.release_date : "2022-01-01");

    useEffect(() => {
        if(album){
            setAlbumName(album.name);
            setGroupe(album.groupe);
            setNbTitle(album.nb_title);
            setStyleOne(album.styleOne);
            setImage(album.image);
            setReleaseDate(album.release_date);
        }
    },[visibility])

    async function editAlbum(
        albumName:string,
        groupe:string,
        nbTitle:number,
        styleOne:string,
        releaseDate:string,
        image:string,
    ){
        const data = {
            name: albumName,
            groupe: groupe,
            nb_title: nbTitle,
            styleOne: styleOne,
            release_date: "2022-02-01",
            // releaseDate,
            image: image
        }

        console.log(data);

        try{
            let {error} = await supabase
                .from('albums')
                .update([data]).eq('id', album?.id)
            if(error) throw error;

            closePopUp();
            alert("Your album has been edited with success");
        }catch(errorEdit){
            alert("An error has occured, your album has not been edited");
        }

    }

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
        <div className='modal'>
            <div className='modal_content border border-black'>
                <div className='modal_header bg-[#4547a8]'>
                    <h1>{formLabel}</h1>
                </div>
                <div className='modal_body'>
                    <div className='form-group'>
                        <label htmlFor="albumName">Nom de l'album</label>
                        <input type="text" name='albumName' id='albumName' placeholder='Album name' onChange={(e) => setAlbumName(e.currentTarget.value)} defaultValue={album?.name} />
                    </div>  
                    <div className='form-group'>
                        <label htmlFor="groupe">Groupe</label>
                        <input type="text" name='groupe' id='groupe' placeholder='groupe name' onChange={(e) => setGroupe(e.currentTarget.value)} defaultValue={album?.groupe}/>
                    </div>                                                        
                    <div className='form-group'>
                        <label htmlFor="style">Style de musique</label>
                        <input type="text" name='styleOne' id='styleOne' placeholder='style' onChange={(e) => {setStyleOne(e.currentTarget.value)}} defaultValue={album?.styleOne}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="nbtitle">Nombre de titres</label>
                        <input type="number" name='nbtitle' id='nbTitle' min={0} onChange={(e)=>setNbTitle(parseInt(e.currentTarget.value))} defaultValue={album?.nb_title}/>
                    </div>                            
                    <div className='form-group'>
                        <label htmlFor="release-date">Date de sortie</label>
                        <input type="date" name='releaseDate' id='release-date' onChange={(e) => setReleaseDate(e.currentTarget.value)} defaultValue={album?.release_date}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="release-date">URL Cover</label>
                        <input type="text" name='image' id='image' onChange={(e) => setImage(e.currentTarget.value)} defaultValue={album?.image}/>
                    </div>
                    {!isEdit &&
                        <button type="submit" className="bg-[#313378]" onClick={
                            () => 
                            {
                            console.log('eee');
                            fillNewAlbum(
                                albumName,
                                groupe,
                                nbTitle,
                                styleOne,
                                releaseDate,
                                image
                            )
                            }
                            }
                        >  
                            valider
                        </button>
                    }
                    {isEdit &&
                        <button type="submit" className='bg-[#313378]' onClick={
                            () => 
                            editAlbum(
                                albumName,
                                groupe,
                                nbTitle,
                                styleOne,
                                releaseDate,
                                image
                            )
                            }
                        >  
                            Modifier
                        </button>
                    }
                </div>
                <div className='modal_footer bg-[#4547a8]'>
                    <a href="#" onClick={() => changeVisible(visibility)}>Fermer</a>
                </div>
            </div>
        </div>
    );
};

export default FormAlbum;