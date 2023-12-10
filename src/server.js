import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import {
    categoriasRouter,
    emisorasDeTarjetasRouter,
    entidadesFinancierasRouter,
    rolesRouter,
    tiposDePagoRouter,
    subCategoriasRouter,
    formasDePagoRouter,
    usuariosRouter,
    ordenesRouter,
    productosRouter,
    usuariosDireccionesRouter,
    ordenesProductosRouter,
    pagosRouter
} from './routes/index.js'

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/categorias', categoriasRouter);
app.use('/emisoras-de-tarjetas', emisorasDeTarjetasRouter);
app.use('/entidades-financieras', entidadesFinancierasRouter);
app.use('/roles', rolesRouter);
app.use('/tipos-de-pago', tiposDePagoRouter);

app.use('/subcategorias', subCategoriasRouter);
app.use('/formas-de-pago', formasDePagoRouter);
app.use('/usuarios', usuariosRouter);
app.use('/pagos', pagosRouter);

app.use('/ordenes', ordenesRouter);
app.use('/productos', productosRouter);
app.use('/usuarios-direcciones', usuariosDireccionesRouter);

app.use('/ordenes-productos', ordenesProductosRouter);

export default app;