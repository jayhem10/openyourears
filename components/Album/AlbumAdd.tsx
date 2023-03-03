import Album from '@/interfaces/album';
import supabase from '@/utils/supabase';
import React, { useEffect, useState } from 'react';
import FormAlbum from './fragments/FormAlbum';

type Props = {
    visibility: boolean
    changeVisible : any
};

const AlbumAdd = ({ visibility, changeVisible }: Props) => {

    const[album, setAlbum] = useState<Album>();

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
            { visibility && 
                <FormAlbum 
                    formLabel = "Ajouter un album"
                    visibility = {visibility}
                    changeVisible = {changeVisible}
                    actionAlbum = {fillNewAlbum}
                    isEdit = {false}
                    album = {album}
                />
            }   
        </>
    );
};

export default AlbumAdd;