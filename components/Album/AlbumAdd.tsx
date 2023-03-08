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

    // async function fetchLastAlbum(){

    //     let { data, error } = await supabase
    //         .from('albums')
    //         .select('id')
    //         .order('id', {ascending: false})
    //     ;

    //     if(data){
    //         return data[0].id;
    //     }
    //     return 0;
    // }

    // useEffect(() => {
    //     fetchLastAlbum();
    // })

    return (
        <>
            { visibility && 
                <FormAlbum 
                    formLabel = "Ajouter un album"
                    visibility = {visibility}
                    changeVisible = {changeVisible}
                    actionAlbum = {()=>{}}
                    isEdit = {false}
                    album = {album}
                />
            }   
        </>
    );
};

export default AlbumAdd;