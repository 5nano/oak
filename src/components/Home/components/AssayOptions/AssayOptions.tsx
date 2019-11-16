import * as React from 'react'
import { ITag } from '../../../../Interfaces/Tags';
import Tags from '../../../Tags/Tags';
import { RouteComponentProps } from 'react-router';
import { HomeContext, IHomeContext } from '../../Home';
import Typography from '@material-ui/core/Typography';
import { Paper, MenuList, ListItemIcon, MenuItem, IconButton } from '@material-ui/core';
import PhotoIcon from '@material-ui/icons/Photo';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import CropFreeIcon from '@material-ui/icons/CropFree';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

interface IAssayOptionsProps extends RouteComponentProps{
    idAssay: Number
    selectedTags:Array<ITag>
    handleTag:Function,
    setOptions:Function,
}


const AssayOptions:React.SFC<IAssayOptionsProps> = (props) => {
    const {selectedTags,
           idAssay,
           handleTag,
           setOptions} = props;

    const [tagsRequest,setTagsRequest] = React.useState(false)
   
    const isSelected = (tag:ITag):boolean => {
        return selectedTags.some(selectedTag => selectedTag.name === tag.name)
    }

    const goToQrs = () => {
        props.history.push(`/assay/${idAssay}/qrs`);
    }

    const goToTreatments = () => {
        props.history.push(`/assay/${idAssay}/treatments`);
    }

    const goToImageGallery = () => {
        props.history.push(`/photos?assay=${idAssay}`);
    }

    

    
    return(
        <HomeContext.Consumer>
            {(context:IHomeContext) => (
                <Paper className="assay-options-container">

                    {!tagsRequest?
                        [<div className="options-header">
                            <IconButton onClick={()=>{setOptions(false)}}>
                                <ArrowBackIosIcon/>
                            </IconButton>
                            <Typography variant="body1" className="options-title">
                                Opciones
                            </Typography >
                            <IconButton onClick={()=> {setOptions(false)}}>
                                <CloseIcon/>
                            </IconButton>
                        </div>,
                        <MenuList className="assay-options">
                            
                            <MenuItem onClick={()=>goToImageGallery()}>
                                <ListItemIcon>
                                    <PhotoIcon/>
                                </ListItemIcon>
                                <Typography variant="body1" className="option">
                                    Ver imágenes
                                </Typography>
                            </MenuItem>

                            <MenuItem  onClick={()=>goToTreatments()}>
                                <ListItemIcon>
                                    <ViewModuleIcon/>
                                </ListItemIcon>
                                <Typography variant="body1" className="option">
                                    Tratamientos
                                </Typography >
                            </MenuItem>

                            <MenuItem onClick={()=>goToQrs()}>
                                <ListItemIcon>
                                    <CropFreeIcon/>
                                </ListItemIcon>
                                <Typography variant="body1" className="option">
                                    Códigos QR
                                </Typography>
                            </MenuItem>

                            <MenuItem  onClick={()=>setTagsRequest(!tagsRequest)}>
                                <ListItemIcon>
                                    <LocalOfferIcon/>
                                </ListItemIcon>
                                <Typography variant="body1" className="option">
                                    Etiquetas
                                </Typography>
                            </MenuItem>
                        </MenuList>]
                    :
                    <Tags isSelected={isSelected} 
                        setTagsRequest={setTagsRequest}
                        handleTag={handleTag}
                        updateAssays={context.updateAssays}/>
                    }
            </Paper>
                    )}
     </HomeContext.Consumer>
    )
}

export default AssayOptions;