USE [EYWW]
GO
/****** Object:  Table [dbo].[ClientePremio]    Script Date: 30/6/2020 20:00:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ClientePremio](
	[idCliente] [int] NOT NULL,
	[idPremio] [int] NOT NULL,
	[fechaObtencion] [datetime] NOT NULL,
	[fechaFin] [datetime] NOT NULL,
	[utilizado] [tinyint] NOT NULL,
	[activo] [tinyint] NOT NULL,
 CONSTRAINT [PK_ClientePremio] PRIMARY KEY CLUSTERED 
(
	[idCliente] ASC,
	[idPremio] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Clientes]    Script Date: 30/6/2020 20:00:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Clientes](
	[idCliente] [int] IDENTITY(1,1) NOT NULL,
	[dni] [int] NULL,
	[nombre] [varchar](50) NULL,
	[apellido] [varchar](50) NULL,
	[email] [varchar](70) NOT NULL,
	[fechaNacimiento] [date] NULL,
	[activo] [tinyint] NOT NULL DEFAULT ((1)),
	[guid] [varchar](255) NULL,
 CONSTRAINT [PK_Clientes] PRIMARY KEY CLUSTERED 
(
	[idCliente] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [UQ__dni] UNIQUE NONCLUSTERED 
(
	[dni] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[EncuestaCliente]    Script Date: 30/6/2020 20:00:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EncuestaCliente](
	[IdEncuesta] [int] NOT NULL,
	[idCliente] [int] NOT NULL,
	[idPregunta] [int] NOT NULL,
	[puntaje] [tinyint] NOT NULL,
	[fechaEncuesta] [datetime] NOT NULL,
	[activo] [tinyint] NOT NULL,
 CONSTRAINT [PK_EncuestaCliente] PRIMARY KEY CLUSTERED 
(
	[IdEncuesta] ASC,
	[idCliente] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Encuestas]    Script Date: 30/6/2020 20:00:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Encuestas](
	[idEncuesta] [int] IDENTITY(1,1) NOT NULL,
	[titulo] [varchar](20) NOT NULL,
	[descripcion] [varchar](50) NULL,
	[fechaBaja] [datetime] NOT NULL,
	[activo] [tinyint] NOT NULL,
 CONSTRAINT [PK_Encuestas] PRIMARY KEY CLUSTERED 
(
	[idEncuesta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[FilaCliente]    Script Date: 30/6/2020 20:00:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FilaCliente](
	[idCliente] [int] NOT NULL,
	[cantComensales] [tinyint] NULL,
	[fechaIngFila] [datetime] NOT NULL,
	[fechaEgrFila] [datetime] NULL,
	[esConfirmado] [tinyint] NOT NULL,
	[activo] [tinyint] NOT NULL CONSTRAINT [DF__FilaClien__activ__2B3F6F97]  DEFAULT ((1)),
 CONSTRAINT [PK_FilaCliente] PRIMARY KEY CLUSTERED 
(
	[idCliente] ASC,
	[fechaIngFila] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[PreguntasEncuesta]    Script Date: 30/6/2020 20:00:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[PreguntasEncuesta](
	[idPregunta] [int] NOT NULL,
	[idEncuesta] [int] NOT NULL,
	[descripcion] [varchar](150) NOT NULL,
	[activo] [tinyint] NOT NULL,
 CONSTRAINT [PK_PreguntasEncuesta] PRIMARY KEY CLUSTERED 
(
	[idPregunta] ASC,
	[idEncuesta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Premio]    Script Date: 30/6/2020 20:00:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Premio](
	[idPremio] [int] IDENTITY(1,1) NOT NULL,
	[idPromocion] [int] NOT NULL,
	[cantDias] [tinyint] NOT NULL,
	[fechaBaja] [datetime] NULL,
	[activo] [tinyint] NOT NULL,
 CONSTRAINT [PK_Premio] PRIMARY KEY CLUSTERED 
(
	[idPremio] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Productos]    Script Date: 30/6/2020 20:00:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Productos](
	[idProducto] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](150) NOT NULL,
	[precio] [decimal](6, 2) NOT NULL,
	[idTipo] [int] NOT NULL,
	[imagen] [nvarchar](100) NULL,
	[activo] [tinyint] NOT NULL DEFAULT ((1)),
 CONSTRAINT [PK_Productos] PRIMARY KEY CLUSTERED 
(
	[idProducto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Promociones]    Script Date: 30/6/2020 20:00:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Promociones](
	[idPromocion] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [varchar](50) NOT NULL,
	[fechaInicio] [datetime] NOT NULL,
	[fechaBaja] [datetime] NULL,
	[esPremio] [tinyint] NOT NULL,
	[activo] [tinyint] NOT NULL DEFAULT ((1)),
 CONSTRAINT [PK_Promociones] PRIMARY KEY CLUSTERED 
(
	[idPromocion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[PromocionProducto]    Script Date: 30/6/2020 20:00:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PromocionProducto](
	[idProducto] [int] NOT NULL,
	[idPromocion] [int] NOT NULL,
	[activo] [tinyint] NOT NULL DEFAULT ((1)),
 CONSTRAINT [PK_PromocionProducto_1] PRIMARY KEY CLUSTERED 
(
	[idProducto] ASC,
	[idPromocion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Roles]    Script Date: 30/6/2020 20:00:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Roles](
	[idRol] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [varchar](70) NOT NULL,
	[activo] [tinyint] NOT NULL DEFAULT ((1)),
 CONSTRAINT [PK_Roles] PRIMARY KEY CLUSTERED 
(
	[idRol] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[TipoProducto]    Script Date: 30/6/2020 20:00:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[TipoProducto](
	[idTipo] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [varchar](50) NULL,
	[activo] [tinyint] NOT NULL DEFAULT ((1)),
 CONSTRAINT [PK_TipoProducto] PRIMARY KEY CLUSTERED 
(
	[idTipo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Usuarios]    Script Date: 30/6/2020 20:00:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Usuarios](
	[idUsuario] [int] IDENTITY(1,1) NOT NULL,
	[dni] [int] NOT NULL,
	[nombre] [varchar](50) NOT NULL,
	[apellido] [varchar](50) NOT NULL,
	[email] [varchar](70) NOT NULL,
	[fechaNacimiento] [date] NOT NULL,
	[contrasena] [varchar](50) NOT NULL,
	[idRol] [int] NOT NULL,
	[fechaPrimerIngreso] [datetime] NULL,
	[activo] [tinyint] NOT NULL DEFAULT ((1)),
 CONSTRAINT [PK_Usuarios] PRIMARY KEY CLUSTERED 
(
	[idUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
ALTER TABLE [dbo].[ClientePremio] ADD  DEFAULT ((1)) FOR [activo]
GO
ALTER TABLE [dbo].[EncuestaCliente] ADD  DEFAULT ((1)) FOR [activo]
GO
ALTER TABLE [dbo].[Encuestas] ADD  DEFAULT ((1)) FOR [activo]
GO
ALTER TABLE [dbo].[PreguntasEncuesta] ADD  DEFAULT ((1)) FOR [activo]
GO
ALTER TABLE [dbo].[Premio] ADD  DEFAULT ((1)) FOR [activo]
GO
ALTER TABLE [dbo].[ClientePremio]  WITH CHECK ADD  CONSTRAINT [FK_ClientePremio_Clientes] FOREIGN KEY([idCliente])
REFERENCES [dbo].[Clientes] ([idCliente])
GO
ALTER TABLE [dbo].[ClientePremio] CHECK CONSTRAINT [FK_ClientePremio_Clientes]
GO
ALTER TABLE [dbo].[ClientePremio]  WITH CHECK ADD  CONSTRAINT [FK_ClientePremio_Premio] FOREIGN KEY([idPremio])
REFERENCES [dbo].[Premio] ([idPremio])
GO
ALTER TABLE [dbo].[ClientePremio] CHECK CONSTRAINT [FK_ClientePremio_Premio]
GO
ALTER TABLE [dbo].[EncuestaCliente]  WITH CHECK ADD  CONSTRAINT [FK_EncuestaCliente_Cliente] FOREIGN KEY([idCliente])
REFERENCES [dbo].[Clientes] ([idCliente])
GO
ALTER TABLE [dbo].[EncuestaCliente] CHECK CONSTRAINT [FK_EncuestaCliente_Cliente]
GO
ALTER TABLE [dbo].[EncuestaCliente]  WITH CHECK ADD  CONSTRAINT [FK_EncuestaCliente_Encuesta] FOREIGN KEY([IdEncuesta])
REFERENCES [dbo].[Encuestas] ([idEncuesta])
GO
ALTER TABLE [dbo].[EncuestaCliente] CHECK CONSTRAINT [FK_EncuestaCliente_Encuesta]
GO
ALTER TABLE [dbo].[FilaCliente]  WITH CHECK ADD  CONSTRAINT [FK_FilaCliente_Cliente] FOREIGN KEY([idCliente])
REFERENCES [dbo].[Clientes] ([idCliente])
GO
ALTER TABLE [dbo].[FilaCliente] CHECK CONSTRAINT [FK_FilaCliente_Cliente]
GO
ALTER TABLE [dbo].[PreguntasEncuesta]  WITH CHECK ADD  CONSTRAINT [FK_PreguntasEncuesta_PreguntasEncuesta] FOREIGN KEY([idEncuesta])
REFERENCES [dbo].[Encuestas] ([idEncuesta])
GO
ALTER TABLE [dbo].[PreguntasEncuesta] CHECK CONSTRAINT [FK_PreguntasEncuesta_PreguntasEncuesta]
GO
ALTER TABLE [dbo].[Premio]  WITH CHECK ADD  CONSTRAINT [FK_Premio_Promocion] FOREIGN KEY([idPromocion])
REFERENCES [dbo].[Promociones] ([idPromocion])
GO
ALTER TABLE [dbo].[Premio] CHECK CONSTRAINT [FK_Premio_Promocion]
GO
ALTER TABLE [dbo].[Productos]  WITH CHECK ADD  CONSTRAINT [FK_Productos_TipoProducto] FOREIGN KEY([idTipo])
REFERENCES [dbo].[TipoProducto] ([idTipo])
GO
ALTER TABLE [dbo].[Productos] CHECK CONSTRAINT [FK_Productos_TipoProducto]
GO
ALTER TABLE [dbo].[PromocionProducto]  WITH CHECK ADD  CONSTRAINT [FK_PromocionProducto_Producto] FOREIGN KEY([idProducto])
REFERENCES [dbo].[Productos] ([idProducto])
GO
ALTER TABLE [dbo].[PromocionProducto] CHECK CONSTRAINT [FK_PromocionProducto_Producto]
GO
ALTER TABLE [dbo].[PromocionProducto]  WITH CHECK ADD  CONSTRAINT [FK_PromocionProducto_Promocion] FOREIGN KEY([idPromocion])
REFERENCES [dbo].[Promociones] ([idPromocion])
GO
ALTER TABLE [dbo].[PromocionProducto] CHECK CONSTRAINT [FK_PromocionProducto_Promocion]
GO
ALTER TABLE [dbo].[Usuarios]  WITH CHECK ADD  CONSTRAINT [FK_Usuarios_Roles] FOREIGN KEY([idRol])
REFERENCES [dbo].[Roles] ([idRol])
GO
ALTER TABLE [dbo].[Usuarios] CHECK CONSTRAINT [FK_Usuarios_Roles]
GO
/****** Object:  StoredProcedure [dbo].[spActualizarEstadoClientesEnRestaurante]    Script Date: 30/6/2020 20:00:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spActualizarEstadoClientesEnRestaurante] @tiempoEstimado int
AS
	UPDATE FilaCliente
	SET activo = 0
	WHERE esConfirmado = 1 AND DATEADD(minute, @tiempoEstimado,  fechaEgrFila) <= GETDATE()
GO
/****** Object:  StoredProcedure [dbo].[spCalcularTiempoYPersonasCliente]    Script Date: 30/6/2020 20:00:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spCalcularTiempoYPersonasCliente] @idCliente int, @capacidadMax int, @tiempoEstimado int
AS
	--Calculo la cantidad de mesas ocupadas en el restaurante
	DECLARE @cantMesasOcupadas INT = (SELECT COUNT(1) AS cantMesasOcupadas FROM FilaCliente
		WHERE esConfirmado = 1 AND activo = 1)

	--Cantidad de personas en fila
	DECLARE @clientesEnFila INT = (SELECT COUNT(1) AS cantEnFila FROM FilaCliente
		WHERE esConfirmado = 0 AND activo = 1 AND fechaEgrFila IS NULL)

	--Fecha de ingreso a la fila del cliente
	DECLARE @fechaIngreso DATETIME = (SELECT fechaIngFila FROM FilaCliente
		WHERE idCliente = @idCliente AND activo = 1)

	--Fecha estimada del primero en irse del restaurante en caso de existir clientes dentro del restaurante
	DECLARE @fechaSalidaPrimero DATETIME

	--Cantidad de clientes en fila adelante de determinado cliente
	DECLARE @cantClientesAdelante INT

	IF @capacidadMax > @cantMesasOcupadas
	BEGIN 
		SELECT 0 AS tiempoEspera, 0 as cantPersonasAdelante
	END
	ELSE
	BEGIN
		IF @clientesEnFila = 1
		BEGIN
			SET @fechaSalidaPrimero = (SELECT DATEADD(minute, @tiempoEstimado,  MIN(fechaEgrFila)) FROM FilaCliente 
				WHERE esConfirmado = 1 AND activo = 1)
			SELECT DATEDIFF(mi, GETDATE(), @fechaSalidaPrimero) AS tiempoEspera, 0 as cantPersonasAdelante
		END
		ELSE
		BEGIN
			SET @fechaSalidaPrimero = (SELECT DATEADD(minute, @tiempoEstimado,  fechaEgrFila) FROM FilaCliente
				WHERE fechaIngFila = (SELECT MIN(fechaIngFila) FROM FilaCliente WHERE esConfirmado = 1 AND activo = 1))
			SET @cantClientesAdelante = (SELECT COUNT(1) AS cantAdelante FROM FilaCliente 
				WHERE EsConfirmado = 0 AND activo = 1 AND fechaEgrFila IS NULL AND fechaIngFila < @fechaIngreso)
			IF @cantClientesAdelante > 0
			BEGIN
				SELECT DATEDIFF(mi, GETDATE(), @fechaSalidaPrimero) + (15 * @cantClientesAdelante) AS tiempoEspera, @cantClientesAdelante as cantPersonasAdelante
			END
			ELSE
			BEGIN
				SELECT DATEDIFF(mi, GETDATE(), @fechaSalidaPrimero) AS tiempoEspera, 0 as cantPersonasAdelante
			END
		END	   
	END	   

GO
/****** Object:  StoredProcedure [dbo].[spCalcularTiempoYPersonasGeneral]    Script Date: 30/6/2020 20:00:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spCalcularTiempoYPersonasGeneral] @capacidadMax int, @tiempoEstimado int
AS
	--Calculo la cantidad de mesas ocupadas en el restaurante
	DECLARE @cantMesasOcupadas INT = (SELECT COUNT(1) AS cantMesasOcupadas FROM FilaCliente
		WHERE esConfirmado = 1 AND activo = 1)

	--Cantidad de personas en fila
	DECLARE @clientesEnFila INT = (SELECT COUNT(1) AS cantEnFila FROM FilaCliente
		WHERE esConfirmado = 0 AND activo = 1 AND fechaEgrFila IS NULL)

	--Fecha estimada del primero en irse del restaurante en caso de existir clientes dentro del restaurante
	DECLARE @fechaSalidaPrimero DATETIME

	--Cantidad de clientes en fila adelante de determinado cliente
	DECLARE @cantClientesAdelante INT

	IF @capacidadMax > @cantMesasOcupadas
	BEGIN 
		SELECT 0 AS tiempoEspera, 0 as cantPersonasAdelante
	END
	ELSE
	BEGIN
		SET @fechaSalidaPrimero = (SELECT DATEADD(minute, @tiempoEstimado,  fechaEgrFila) FROM FilaCliente
				WHERE fechaIngFila = (SELECT MIN(fechaIngFila) FROM FilaCliente WHERE esConfirmado = 1 AND activo = 1))
		SET @cantClientesAdelante = (SELECT COUNT(1) AS cantAdelante FROM FilaCliente 
				WHERE EsConfirmado = 0 AND activo = 1 AND fechaEgrFila IS NULL AND fechaIngFila < GETDATE())	
		IF @cantClientesAdelante > 0
			BEGIN
				SELECT DATEDIFF(mi, GETDATE(), @fechaSalidaPrimero) + (15 * @cantClientesAdelante) AS tiempoEspera, @cantClientesAdelante as cantPersonasAdelante
			END
			ELSE
			BEGIN
				SELECT DATEDIFF(mi, GETDATE(), @fechaSalidaPrimero) AS tiempoEspera, 0 as cantPersonasAdelante
			END			   
	END	   

GO
