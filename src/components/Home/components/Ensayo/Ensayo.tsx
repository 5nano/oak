import * as React from 'react'
import { IEnsayo } from '../../../../Interfaces/IEnsayo'
import Button from '../../../Utilities/Buttons/DefaultButton/Button';
import Popper from '@material-ui/core/Popper';
import AssayOptions from '../AssayOptions/AssayOptions';
import BushService from '../../../../services/bush';
import { ITag } from '../../../../Interfaces/Tags';
import { RouteComponentProps } from 'react-router';
var randomColor = require('randomcolor');


export interface IEnsayoProps extends RouteComponentProps{
    ensayo: IEnsayo,
}

const Ensayo:React.SFC<IEnsayoProps> = (props) => {

    const {ensayo} = props;
    const [anchorEl,setAnchorEl] = React.useState(null);
    const [placement,setPlacement] = React.useState();
    const [options,setOptions] = React.useState(false);

    const [tags,setTags] = React.useState<Array<ITag>>([])

    React.useEffect(()=>{
        BushService.get(`/ensayo/tags?idAssay=${ensayo.idAssay}`)
                   .then((data:Array<ITag>) => {
                       data.map(tag => {
                           tag.color = randomColor();
                           return {tag}
                       })
                       setTags(data)
                   })
    },[])

    const handleOptions = (newPlacement,event) => {
        setAnchorEl(event.currentTarget);
        setOptions(prev => placement !== newPlacement || !prev)
        setPlacement(newPlacement)
    }

    const removeTag = (tag:ITag) => {
        BushService.delete(`/tags/ensayo/eliminar?idTag=${tag.idTag}&idAssay=${ensayo.idAssay}`)
                    .then(()=>setTags(tags.filter(selectedTag => selectedTag.name != tag.name)))
    }

    const addTag = (tag:ITag) => {
        BushService.post(`/tags/ensayo/insertar?idTag=${tag.idTag}&idAssay=${ensayo.idAssay}`,{})
                    .then(()=>setTags(tags.concat([tag])))
    }

    const handleTag= (tag:ITag) => {
        tags.some(selectedTag => selectedTag.name === tag.name)?
            removeTag(tag):addTag(tag)
    }

    const goToQrs = () => {
        props.history.push(`/assay/${ensayo.idAssay}/qrs`);
    }

    const goToTreatments = () => {
        props.history.push(`/assay/${ensayo.idAssay}/treatments`);
    }

    const  remove = () =>{
        BushService.delete(`/ensayo/eliminar/idAssay=${ensayo.idAssay}`)
    }

    const goToDashboard = () =>{
        props.history.push(`/assay/${ensayo.idAssay}/dashboard`);
    }

    const activeAssay = () => {
        BushService.patch(`/ensayo/activar?idAssay=${ensayo.idAssay}`)
                   .then(()=>console.log("activado"))
    }

    const finishAssay = () => {
         BushService.patch(`/ensayo/terminar?idAssay=${ensayo.idAssay}`)
                   .then(()=>console.log("finalizado"))
    }

    const archiveAssay = () => {
         BushService.patch(`/ensayo/archivar?idAssay=${ensayo.idAssay}`)
                   .then(()=>console.log("archivado"))
    }



    return(
        <div className="assay-wrapper">
            <div className="assay">
                <div className="assay-header">
                    <div className="name">
                        {ensayo.name}
                    </div>
                    <div className="options">
                        <a onClick={e=>handleOptions('right-start',e)}>
                            <i className="icon icon-menu"/>
                        </a>
                        <Popper open={options}
                                anchorEl={anchorEl}
                                placement={placement}
                                transition
                            >
                        <AssayOptions   idAssay={ensayo.idAssay}
                                        onTreatments={goToTreatments}
                                        onQrs={goToQrs}
                                        onRemove={remove}
                                        handleTag={handleTag}
                                        selectedTags={tags}
                                        activeAssay={activeAssay}
                                        finishAssay={finishAssay}
                                        archiveAssay={archiveAssay}
                        />
                        </Popper>
                    </div>
                </div>

                <div className="assay-tags">
                    {tags.map(tag => {
                        return (
                            <div className="assay-tag"
                                 style={{backgroundColor:tag.color}}>
                                {tag.name}
                            </div>
                        )
                    })}
                </div>

                <div className="assay-components">
                    <div className="component">
                        <div className="component-img">
                            <img src='../../../../assets/images/agrochemical-icon.png'/>
                        </div>
                        <div className="component-name">
                            Galant
                        </div>
                    </div>

                    <div className="component">
                        <div className="component-img">
                            <img src='../../../../assets/images/crop-icon.png'/>
                        </div>
                        <div className="component-name">
                            Soja
                        </div>
                    </div>

                    <div className="component">
                        <div className="component-img">
                            <img src='../../../../assets/images/mix-icon.png'/>
                        </div>
                        <div className="component-name">
                            A
                        </div>
                    </div>
                </div>

                <div className="assay-description">
                    <div className="title">Descripción</div>
                    <div className="content">{ensayo.description}</div>
                </div>
            </div>
            
            <Button title="Dashboard"
                    className="action-button"
                    onClick={()=>goToDashboard}
                /> 

        </div>
    )
}

export default Ensayo;