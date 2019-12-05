import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem'
import { TextField } from '@material-ui/core';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        SNACK
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [{
    key:0,
    produto:'Bolo',
    qtd:2
}];

export default function Produtos() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
    produtos:[],
    loaded:false
  });

  React.useEffect(()=>{
    if(!state.loaded){
      fetch('http://0.0.0.0:8000/produtos').then(function(res){
        if(res.ok){
          return res.json();
        }else{
          console.log(res);
        }
      }).then(function(data){
        setState({...state, produtos:data, loaded:true})
      })
    }
  })

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <MenuIcon onClick={toggleDrawer('left', true)} className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            SNACK
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        <div
          className={classes.list}
          role="presentation"
          onClick={toggleDrawer('left', false)}
          onKeyDown={toggleDrawer('left', false)}
        >
        <List>
            <ListItem button key={'perfil'}>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="https://source.unsplash.com/random" />
            </ListItemAvatar>
              <ListItemText marginLeft='10' primary={'nome'} />
            </ListItem>
            <Divider />
          <ListItem button key={'Perfil'}>
              <ListItemText primary={'Perfil'} />
            </ListItem>
            <ListItem button key={'Pedidos'}>
              <ListItemText primary={'Pedidos'} />
            </ListItem>
            <ListItem onClick={()=>{
                window.open('http://localhost:3000/#/produtos', '_self');   
            }} button key={'Vendas'}>
              <ListItemText primary={'Vendas'} />
            </ListItem>
          <Divider />
          <ListItem gutterBottom button key={'sair'}>
              <ListItemText primary={'Sair'} />
            </ListItem>
        </List>
      </div>
      </Drawer>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Produtos a venda
            </Typography>
            
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {state.produtos.map(card => (
            
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                      
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.titulo}
                    </Typography>
                    <div margin={10}>
                        <TextField
                            id="standard-select-currency"
                            select
                            value={card.qtd}
                            onChange={(event)=>{
                                console.log(event.target.value)
                                card.qtd = event.target.value;
                            }}
                        >
                            {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(option => (
                                <MenuItem align='right' key={option} value={option}>
                                {'x'+option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              
            ))}
          </Grid>
        </Container>
<Container maxWidth="md">
        <Button onClick={()=> window.open('http://localhost:3000/#/novoproduto', '_self')} 
        variant="contained" size="Large" color="primary">
                          Adicionar
            </Button>

</Container>


      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
