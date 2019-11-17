import * as React from 'react'
import { IEnsayo } from '../../../../Interfaces/IEnsayo'
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
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';

import RateReviewIcon from '@material-ui/icons/RateReview';
import RestoreIcon from '@material-ui/icons/Restore';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import { HomeContext, IHomeContext } from '../../Home';
import Rating from '@material-ui/lab/Rating';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';


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
      color: 'rgb(106, 193, 169)',
    },
    button: {
        backgroundColor: 'rgb(106, 193, 169)',
        color: 'white',
        fontSize: '14px',
        "&:hover" : {
            backgroundColor: 'white',
            color: 'rgb(106, 193, 169)',
            border: '1px solid rgb(106, 193, 169)'
        }
    }
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

    const [update,setUpdate] = React.useState(false)
    const [updateValue,setUpdateValue] = React.useState('')
    const [reviewAnchor,setReviewAnchor] = React.useState(null)
    const [reviewPlacement,setReviewPlacement] = React.useState();

    const [tags,setTags] = React.useState<Array<ITag>>([])

    React.useEffect(()=>{
        setTags(ensayo.tags)
    },[])

    const handleOptions = (newPlacement,event) => {
        setAnchorEl(event.currentTarget);
        setOptions(prev => placement !== newPlacement || !prev)
        setPlacement(newPlacement)
    }

    const openReview = (newPlacement:string,e:React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        setReviewAnchor(reviewAnchor===null? e.currentTarget:null)
        setReviewPlacement(newPlacement)
    }

    const handleUpdate = (field:string) => {
        console.log(updateValue)
        console.log(field)
        let updatedAssay = ensayo
        updatedAssay[field] = updateValue
        setUpdate(false)
        BushService.patch('/ensayos/modificar',updatedAssay)
    }

    const handleUpdateRequest = (initialValue:any) => {
        setUpdateValue(initialValue)
        setUpdate(true)
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

    const activeAssay = (context:IHomeContext):Promise<void> => {
        return BushService.patch(`/ensayo/activar?idAssay=${ensayo.idAssay}`)
                            .then(()=>{
                                context.setFeedback({variant:'success',message:'Ensayo activado exitosamente'})
                                context.updateAssays()
                            })
                            .catch((error)=>{
                                error.json().then(error=>context.setFeedback({variant:'error',message:error.message}))
                            })
                   
    }
    const archiveAssay = (context:IHomeContext):Promise<void> => {
        return BushService.patch(`/ensayo/archivar?idAssay=${ensayo.idAssay}`)
                          .then(()=>{
                              context.setFeedback({variant:'success',message:'Ensayo archivado exitosamente'})
                              context.updateAssays()
                          })
                          .catch((error)=>{
                              error.json().then(error=>context.setFeedback({variant:'error',message:error.message}))
                          })
                  
    }

    const removeAssay = (context:IHomeContext):Promise<void> =>{
       return BushService.post(`/ensayos/eliminar?assayId=${ensayo.idAssay}`)
                            .then(()=>{
                                context.setFeedback({variant:'success',message:'Ensayo eliminado exitosamente'})
                                context.updateAssays()
                            })
                            .catch((error)=>{
                                error.json().then(error=>context.setFeedback({variant:'error',message:error.message}))
                            })
    }

    const startDate = new Intl.DateTimeFormat('en-GB', {year: 'numeric', month: 'short',day: '2-digit'}).format(Date.parse(ensayo.created))
    const endDate = new Intl.DateTimeFormat('en-GB', {year: 'numeric', month: 'short',day: '2-digit'}).format(Date.parse(ensayo.estimatedFinished))
    return(
        <HomeContext.Consumer>
            {(context:IHomeContext) => (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {ensayo.user.charAt(0).toUpperCase()}
                    </Avatar>
                    }
                    action={
                    <IconButton aria-label="settings" 
                                onClick={e=>handleOptions('right-start',e)} >
                        <MoreVertIcon />
                    </IconButton>
                    }
                    title={
                        <div onKeyDown={(e)=>e.key==='Enter'?handleUpdate('name'):{}}
                             onBlur={(e) => setUpdateValue(ensayo.name)}
                             onClick={()=>handleUpdateRequest(ensayo.name)}>
                                {update? 
                                    <input type='text'
                                           value={updateValue}
                                           className="update-value"
                                           defaultValue={ensayo.name}
                                           onChange={(e) => setUpdateValue(e.currentTarget.value)}
                                           />
                                    :
                                    ensayo.name
                                }
                        </div>
                    }
                    subheader={
                                <div className="assay-subtitle">
                                    {startDate + " al " + endDate}
                                    {ensayo.state === 'FINISHED' && 
                                        <div>
                                        <Rating name="read-only" value={ensayo.stars} readOnly />
                                        <RateReviewIcon style={{marginLeft:'10px',cursor:'pointer'}} 
                                                        fontSize="small"
                                                        onClick={(e)=>openReview('right-start',e)}/>
                                        </div>
                                    }
                                </div>}
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
                    <IconButton disabled={ensayo.state === 'FINISHED'} aria-label="finish"
                                onClick={()=>context.finishAssay(ensayo.idAssay)}>
                        <CheckCircleOutlineOutlinedIcon/>
                    </IconButton>
                    <IconButton disabled={ensayo.state === 'ARCHIVED'} aria-label="archive"
                                onClick={()=>archiveAssay(context)}>
                        <ArchiveOutlinedIcon/>
                    </IconButton>
                    <IconButton disabled={ensayo.state === 'ACTIVE'} aria-label="active"
                                onClick={()=>activeAssay(context)}>
                        <RestoreIcon />
                    </IconButton>
                    <IconButton  aria-label="delete"
                                onClick={()=>removeAssay(context)}
                                >
                        <DeleteOutlinedIcon />
                    </IconButton>
                    <Button size="large" 
                            color="primary"
                            className={classes.button}
                            onClick={()=> goToDashboard()}>
                        Dashboard
                    </Button>
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
                <Popper open={Boolean(reviewAnchor)}
                        anchorEl={reviewAnchor}
                        placement={reviewPlacement}
                        transition
                        >
                        <div className="assay-review">
                            {ensayo.comments}
                        </div>
                </Popper>
            </Card>
            )}
        </HomeContext.Consumer>
    )
}

export default Ensayo;