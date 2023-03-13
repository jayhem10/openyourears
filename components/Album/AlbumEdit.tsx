import Album from '@/interfaces/album';
import supabase from '@/utils/supabase';
import React, { useEffect, useState } from 'react';
import FormAlbum from './fragments/FormAlbum';

type Props = {
    visibility: boolean
    changeVisible : any
    editAlbum: Album
    closeEditAlbum: any
};

const AlbumEdit = ({visibility, changeVisible, editAlbum, closeEditAlbum}:Props) => {

    const [album, setAlbum] = useState<Album>();

    // async function getAlbum(idAlbum:number){
    //     let {data, error, status} = await supabase
    //         .from('albums')
    //         .select('*')
    //         .eq('id', idAlbum)
    //         .single()
    //     ;

    //     if(error && status !== 406){
    //         throw error;
    //     }

    //     if(data){
    //         setAlbum(data);
    //     }
    // }

    return (
        <>
            {visibility && 
                <FormAlbum 
                    formLabel='Editer un album'
                    visibility={visibility}
                    changeVisible={changeVisible}
                    actionAlbum={()=>{}}
                    isEdit={true}
                    album={editAlbum}
                    closePopUp={closeEditAlbum}
                />
            }
        </>
    );
};

export default AlbumEdit;