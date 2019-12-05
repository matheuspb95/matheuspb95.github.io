import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
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
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import clsx from 'clsx';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import SearchIcon from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import MailIcon from '@material-ui/icons/Mail';

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
    padding: theme.spacing(4, 0, 2),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
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
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [
  {
    key:1,
    produto:'Bolo',
    vendedor:'Carlos',
    preco:'1.00',
    foto:"https://source.unsplash.com/random",
  },
  {
    key:2,
    produto:'Bolo',
    vendedor:'Carlos',
    preco:'1.00',
    foto:"https://source.unsplash.com/random",
  },
  {
    key:3,
    produto:'Bolo',
    vendedor:'Carlos',
    preco:'1.00',
    foto:"https://source.unsplash.com/random",
  },
  {
    key:4,
    produto:'Bolo',
    vendedor:'Carlos',
    preco:'1.00',
    foto:"https://source.unsplash.com/random",
  }
];

export default function Album() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

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
      <main>
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
          {['Perfil', 'Pedidos', 'Vendas'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          <Divider />
          <ListItem gutterBottom button key={'sair'}>
              <ListItemText primary={'Sair'} />
            </ListItem>
        </List>
      </div>
      </Drawer>
      <Box component="span" m={5}>
      <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Buscar</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            endAdornment={
              <InputAdornment position="end">
                <SearchIcon
                  aria-label="toggle password visibility"
                  edge="end"
                >
                </SearchIcon>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
      </Box>      
        {/* Hero unit */}
        <div className={classes.heroContent}>

          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              SNACK
            </Typography>
            <Typography  variant="h5" align="center" color="textSecondary" paragraph>
              Perfeito pra hora do lanche, a qualquer hora.
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map(card => (
              <Grid item key={card.key} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.foto}
                    title="Foto"
                  >
                    <Typography color='secondary' gutterBottom align='right' variant="h5" component="h2">
                      {card.preco + "$"}
                    </Typography>
                  </CardMedia>
                  <CardContent className={classes.cardContent}>                    
                    <Typography align='justify'>
                      {card.produto}
                    </Typography>
                    <Typography align='justify'>
                      {card.vendedor}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      Ver produto
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
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
