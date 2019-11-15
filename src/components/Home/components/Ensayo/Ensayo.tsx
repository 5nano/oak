import * as React from 'react'
import { IEnsayo } from '../../../../Interfaces/IEnsayo'
import Button from '../../../Utilities/Buttons/DefaultButton/Button';
import Popper from '@material-ui/core/Popper';
import AssayOptions from '../AssayOptions/AssayOptions';
import BushService from '../../../../services/bush';
import { ITag } from '../../../../Interfaces/Tags';
import { RouteComponentProps } from 'react-router';

import { makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 345,
      margin:'20px',
      display:'flex',
      flexDirection: 'column',
      justifyContent:'space-between'
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: 'rgba(106, 193, 169,0.1)',
      color: 'rgb(106, 193, 169)'
    },
  }),
);

export interface IEnsayoProps extends RouteComponentProps{
    ensayo: IEnsayo,
}

const Ensayo:React.SFC<IEnsayoProps> = (props) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const {ensayo} = props;
    const [anchorEl,setAnchorEl] = React.useState(null);
    const [placement,setPlacement] = React.useState();
    const [options,setOptions] = React.useState(false);

    const [tags,setTags] = React.useState<Array<ITag>>([])

    React.useEffect(()=>{
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

    const getTranslate = (state:string):string => {
        switch (state) {
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

    const startDate = new Intl.DateTimeFormat('en-GB', {year: 'numeric', month: 'short',day: '2-digit'}).format(Date.parse(ensayo.created))
    const endDate = new Intl.DateTimeFormat('en-GB', {year: 'numeric', month: 'short',day: '2-digit'}).format(Date.parse(ensayo.estimatedFinished))
    return(

        <Card className={classes.card}>
            <CardHeader
                avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                    {ensayo.user.charAt(0).toUpperCase()}
                </Avatar>
                }
                action={
                <IconButton aria-label="settings" onClick={e=>handleOptions('right-start',e)} >
                    <MoreVertIcon />
                </IconButton>
                }
                title={ensayo.name}
                subheader={startDate + " al " + endDate}
            />
            <div className="assay-state-tags">
                <div className="assay-state">
                    {getTranslate(ensayo.state)}
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
            </div>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {ensayo.description}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Cantidad de tratamientos: {ensayo.treatments}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Cultivo de ensayo: {ensayo.crop.name}
                </Typography>
            </CardContent>
            <CardActions>
                <Button title="Dashboard"
                        className="action-button"
                        onClick={()=>goToDashboard()}
                    /> 
            </CardActions>
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
        </Card>

/*
        <div key={ensayo.idAssay} className="assay-wrapper">
            <div className="assay">
                <div className="assay-header">
                    <div className="header-content">
                        <div className="name">
                            {ensayo.name}
                        </div>
                        <div className="state">
                            {getTranslate(ensayo.state)}
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
                <div className="assay-description">
                    <div className="title">Autor</div>
                    <div className="content">{ensayo.user}</div>
                </div>
                <div className="assay-description">
                    <div className="title">Cultivo de ensayo</div>
                    <div className="content">{ensayo.crop.name}</div>
                </div>
                <div className="assay-description">
                    <div className="title">Cantidad de tratamientos</div>
                    <div className="content">{ensayo.treatments}</div>
                </div>
                <div className="assay-description">
                    <div className="title">Fecha de creación</div>
                    <div className="content">{new Intl.DateTimeFormat('en-GB', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(Date.parse(ensayo.created))}</div>
                </div>
                <div className="assay-description">
                    <div className="title">Fecha estimada de finalización</div>
                    <div className="content">{new Intl.DateTimeFormat('en-GB', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(Date.parse(ensayo.estimatedFinished))}</div>
                </div>
            </div>
            
            <Button title="Dashboard"
                    className="action-button"
                    onClick={()=>goToDashboard()}
                /> 
            

        </div>
        */
    )
}

export default Ensayo;