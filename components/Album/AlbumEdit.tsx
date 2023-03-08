import Album from '@/interfaces/album';
import supabase from '@/utils/supabase';
import React, { useEffect, useState } from 'react';
import FormAlbum from './fragments/FormAlbum';

type Props = {
    visibility: boolean
    changeVisible : any
    idAlbum: number
};

const AlbumEdit = ({visibility, changeVisible, idAlbum}:Props) => {

    const [album, setAlbum] = useState<Album>();

    async function getAlbum(idAlbum:number){
        let {data, error, status} = await supabase
            .from('albums')
            .select('*')
            .eq('id', idAlbum)
            .single()
        ;

        if(error && status !== 406){
            throw error;
        }

        if(data){
            console.log(data);
            setAlbum(data);
        }
    }

    useEffect(() => {
        if(visibility)
            getAlbum(idAlbum);
    }, [visibility]);

    return (
        <>
            {visibility && 
                <FormAlbum 
                    formLabel='Editer un album'
                    visibility={visibility}
                    changeVisible={changeVisible}
                    actionAlbum={()=>{}}
                    isEdit={true}
                    album={album}
                />
            }
        </>
    );
};

export default AlbumEdit;