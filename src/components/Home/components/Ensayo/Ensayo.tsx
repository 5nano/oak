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
        ensayo.tags.map(tag=>{
            tag.color = randomColor();
            return {tag}
        })
        setTags(ensayo.tags)
    },[])

    const handleOptions = (newPlacement,event) => {
        setAnchorEl(event.currentTarget);
        setOptions(prev => placement !== newPlacement || !prev)
        setPlacement(newPlacement)
    }

    const goToDashboard = () =>{
        props.history.push(`/assay/${ensayo.idAssay}/dashboard`);
    }

    const removeTag = (tag:ITag):Promise<void> => {
       return BushService.post(`/tags/ensayo/eliminar?idTag=${tag.idTag}&idAssay=${ensayo.idAssay}`,{})
                    .then(()=>setTags(tags.filter(selectedTag => selectedTag.name != tag.name)))
    }

    const addTag = (tag:ITag):Promise<void>=> {
       return  BushService.post(`/tags/ensayo/insertar?idTag=${tag.idTag}&idAssay=${ensayo.idAssay}`,{})
                    .then(()=>setTags(tags.concat([tag])))
    }

    const handleTag= (tag:ITag):Promise<void> => {
       return tags.some(selectedTag => selectedTag.name === tag.name)?
            removeTag(tag):addTag(tag)
    }


    return(
        <div key={ensayo.idAssay} className="assay-wrapper">
            <div className="assay">
                <div className="assay-header">
                    <div className="header-content">
                        <div className="name">
                            {ensayo.name}
                        </div>
                        <div className="state">
                        { (() => { 
                       switch (ensayo.state) {
                        case 'ALL':
                            return 'TODOS'
                        case 'ACTIVE':
                            return 'ACTIVO'
                        case 'FINISHED':
                            return 'FINALIZADO'
                        case 'ARCHIVED':
                            return 'ARCHIVADO'
                        default:
                            return null;
                                }
                             }
                            )()}
                        </div>
                    </div>
                    <div className="options" onClick={e=>handleOptions('right-start',e)} >
                        <i className="icon icon-menu"/>
                    </div>
                        <Popper open={options}
                                anchorEl={anchorEl}
                                placement={placement}
                                transition
                            >
                            <AssayOptions  {...props} 
                                            idAssay={ensayo.idAssay}
                                            selectedTags={tags}
                                            handleTag={handleTag}
                                            setOptions={setOptions}
                            />
                        </Popper>
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

                <div className="assay-description">
                    <div className="title">Descripción</div>
                    <div className="content">{ensayo.description}</div>
                </div>
            </div>
            
            <Button title="Dashboard"
                    className="action-button"
                    onClick={()=>goToDashboard()}
                /> 
            

        </div>
    )
}

export default Ensayo;