import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

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
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function NovoProduto() {
  const classes = useStyles();
  
  var titulo, descricao, preco, foto;
  return (
    <React.Fragment>
        <AppBar position="relative">
        <Toolbar>
          <KeyboardBackspaceIcon onClick={()=> window.open('http://localhost:3000/#/home', 'self')} className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            SNACK
          </Typography>
        </Toolbar>
      </AppBar>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Novo Produto
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="titulo"
                label="Titulo"
                name="titulo"
                onChange = {(text) => {
                    titulo = text.target.value;
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="descricao"
                label="Descricao"
                name="descricao"
                autoComplete="descricao"
                onChange = {(text) => {
                    descricao = text.target.value;
                }}
              />
            </Grid>
            <Grid item xs={12}>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="preco"
                label="Preço"
                type="number"
                name="preco"
                autoComplete="preco"
                onChange = {(text) => {
                    preco = text.target.value;
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="foto"
                label="Foto"
                type="file"
                id="foto"
                onChange = {(text) => {
                    foto = text.target.value;
                }}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={
              () => {
                var body = JSON.stringify({
                    vendedor:1575553240,
                    descricao:descricao,
                    foto:foto,
                    titulo:titulo,
                    preco:preco
                })
                console.log(body);
                fetch('http://0.0.0.0:8000/produto', {
                  method : 'POST',
                  body : body,
                  headers: new Headers({
                    "Content-Type": "application/json",
                  })
                }).then((res)=>{
                  console.log(res);
                  if(res.ok){
                    
                  }
                })
              }
            }
          >
            Adicionar
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
    </React.Fragment>
  );
}
