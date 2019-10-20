import * as React from 'react'
import Button from '../../../Utilities/Buttons/DefaultButton/Button'

interface IAssayOptionsProps{
    idAssay: Number,
    onTreatments:Function,
    onQrs:Function,
    onRemove:Function
}


const AssayOptions:React.SFC<IAssayOptionsProps> = (props) => {
    const {onTreatments,onRemove,onQrs,idAssay} = props;

    const [tags,setTags] = React.useState(false)

    const handleTags = () => {
        setTags(!tags)
    }

    return(
        <div className="assay-options">
            <Button title="Tratamientos"
                    className="action-button"
                    onClick={()=>onTreatments(idAssay)}
                    />
            <Button title="Códigos QR"
                    className="action-button"
                    onClick={()=>onQrs(idAssay)}
                />
            <Button title="Tags"
                    className="action-button"
                    onClick={()=>handleTags}
                />
            {tags && 
            <div className="tags-container">
                Tags
            </div>
            }
            <Button title="Eliminar"
                    className="action-button"
                    onClick={()=>onRemove(idAssay)}
                />
     </div>
    )
}

export default AssayOptions;