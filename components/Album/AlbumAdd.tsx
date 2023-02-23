import Album from '@/interfaces/album';
import React, { FormEvent, useEffect, useState } from 'react';

type Props = {
    visibility: boolean
    changeVisible : any
};

const AlbumAdd = ({ visibility, changeVisible }: Props) => {

    const[album, setAlbum] = useState<Album>();

    const fillNewAlbum = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let data = new FormData(event.currentTarget);
        console.log(data.entries());
    }

    useEffect(() => {
        console.log(visibility);
    })

    return (
        <>
            { visibility && <div className='modal'>
                <div className='modal_content'>
                    <div className='modal_header'>
                        <h1>Ajouter un nouvel album</h1>
                    </div>
                    <div className='modal_body'>
                        <form action="" method="post" onSubmit={(e) => fillNewAlbum(e)}>
                            <div className='form-group'>
                                <label htmlFor="name">Nom de l'album</label>
                                <input type="text" name='name' id='name' placeholder='Album name'/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor="groupe">Groupe</label>
                                <input type="text" name='groupe' id='groupe' placeholder='groupe name'/>
                            </div>                                                        
                            <div className='form-group'>
                                <label htmlFor="style">Style de musique</label>
                                <input type="text" name='style' id='style' placeholder='style'/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor="name">Nombre de titres</label>
                                <input type="number" name='name' id='name' min={0}/>
                            </div>                            
                            <div className='form-group'>
                                <label htmlFor="release-date">Date de sortie</label>
                                <input type="date" name='releaseDate' id='release-date'/>
                            </div>

                            <button type="submit">
                                valider
                            </button>
                        </form>
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