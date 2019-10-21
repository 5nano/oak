import * as React from 'react'
import { IEnsayo } from '../../../../Interfaces/IEnsayo'
import Button from '../../../Utilities/Buttons/DefaultButton/Button';
import Popper from '@material-ui/core/Popper';
import AssayOptions from '../AssayOptions/AssayOptions';
import BushService from '../../../../services/bush';
import { ITag } from '../../../../Interfaces/Tags';
export interface IEnsayoProps{
    ensayo: IEnsayo
    onSelect: Function
    onQrs: Function
    onRemove: Function
    onTreatments:Function
}

const Ensayo:React.SFC<IEnsayoProps> = (props) => {

    const {ensayo,onSelect,onTreatments,onQrs,onRemove} = props;
    const [anchorEl,setAnchorEl] = React.useState(null);
    const [placement,setPlacement] = React.useState();
    const [options,setOptions] = React.useState(false);

    const [tags,setTags] = React.useState<Array<ITag>>([])

    React.useEffect(()=>{
        BushService.get(`/ensayo/tags?idAssay=${ensayo.idAssay}`)
                   .then((data:Array<ITag>) => setTags(data))
    },[])

    const handleOptions = (newPlacement,event) => {
        setAnchorEl(event.currentTarget);
        setOptions(prev => placement !== newPlacement || !prev)
        setPlacement(newPlacement)
    }

    const setNewTag = (tag:ITag) => {
        tags.push(tag)
        setTags(tags);
    }

    const handleTag= (tag:ITag) => {
        tags.some(selectedTag => selectedTag.name === tag.name)?
            setTags(tags.filter(selectedTag => selectedTag.name != tag.name))
            :
            setNewTag(tag)
    }

    return(
        <div className="assay-wrapper">
            <div className="assay">
                <div className="assay-header">
                    <div className="name">
                        {ensayo.name}
                    </div>
                    <div className="options">
                        <button type="button" onClick={e => handleOptions('right-start',e)}>
                            ...
                        </button>
                        <Popper open={options}
                                anchorEl={anchorEl}
                                placement={placement}
                                transition
                            >
                        <AssayOptions idAssay={ensayo.idAssay}
                                    onTreatments={onTreatments}
                                    onQrs={onQrs}
                                    onRemove={onRemove}
                                    handleTag={handleTag}
                                    selectedTags={tags}
                        />
                        </Popper>
                    </div>
                </div>

                <div className="assay-tags">
                    {tags.map(tag => {
                        return (
                            <div className="assay-tag">
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

               
                <Button title="Dashboard"
                        className="action-button"
                        onClick={()=>onSelect(ensayo.idAssay)}
                    /> 
            </div>

        </div>
    )
}

export default Ensayo;