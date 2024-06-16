const common = {
  'common.business.email': 'Email de la Empresa',
  'common.business.name': 'Nombre de la Empresa',
  'common.business.phone': 'Teléfono de la Empresa',
  'common.business.tryNow': 'Pruébalo Ahora',
  'common.business.website': 'Sitio Web de la Empresa',
  'common.general.country': 'País',
  'common.general.login': 'Iniciar Sesión',
  'common.general.logout': 'Cerrar Sesión',
  'common.user.email': 'Correo Electrónico',
  'common.user.fullName': 'Nombre Completo',
  'common.user.guestUser': 'Usuario Invitado',
  'common.input.required': 'Requerido',
  'common.input.invalidEmail': 'Correo Electrónico Inválido',
  'common.input.invalidPhone': 'Teléfono Inválido (ej. +1 123 456 7890)',
  'common.input.invalidUrl': 'URL Inválido (ej. https://ejemplo.com)',
  'common.input.password': 'Contraseña'
} as const

const translations = {
  ...common,
  'home.header.button.login': common['common.general.login'],
  'home.header.button.tryNow': common['common.business.tryNow'],
  'home.header.links.profile': 'Perfil',
  'home.header.links.dashboard': 'Tablero',
  'home.header.links.logout': common['common.general.logout'],
  'home.hero.information.headline': 'Aumenta los Ingresos de Tu Empresa en un 30% en Solo 6 Meses',
  'home.hero.information.text':
    'Eleva tus reservas en un 30% en solo seis meses. Nuestra plataforma inteligente optimiza tu flujo de trabajo, reduciendo los gastos operativos y liberando hasta un 80% de tu tiempo, permitiéndote enfocarte en otras áreas de tu negocio. Transforma tu experiencia de reservas y aprovecha herramientas de última generación para una expansión sin esfuerzo con hosgu.com.',
  'home.hero.form.input.fullName': common['common.user.fullName'],
  'home.hero.form.input.businessName': common['common.business.name'],
  'home.hero.form.input.businessEmail': common['common.business.email'],
  'home.hero.form.input.businessPhone': common['common.business.phone'],
  'home.hero.form.input.businessWebsite': common['common.business.website'],
  'home.hero.form.input.country': common['common.general.country'],
  'home.hero.form.button.getStarted': 'Comenzar',
  'home.hero.form.privacyPolicy.text':
    'Estamos comprometidos con tu privacidad. hosgu.com utiliza la información que nos proporcionas para contactarte sobre nuestro contenido, productos y servicios relevantes. Puedes darte de baja en cualquier momento.',
  'home.hero.success.justOneMoreStep': '¡Solo Un Paso Más Para Comenzar!',
  'home.hero.success.thankYouForRegistering':
    '¡Gracias por registrarte! Por favor, revisa tu correo electrónico para completar la configuración de tu perfil y activar tu cuenta.',
  'home.blocks.features.headline.line1': 'Gestiona tus reservas',
  'home.blocks.features.headline.line2': 'de principio a fin',
  'home.blocks.features.items.booking.title': 'Gestiona tus reservas',
  'home.blocks.features.items.booking.text': 'Simplifica las Reservas para Todos',
  'home.blocks.features.items.pricing.title': 'Precios Flexibles',
  'home.blocks.features.items.pricing.text':
    'Elige entre nuestra tarifa gratuita o características mejoradas que se adapten a las necesidades de tu negocio.',
  'home.blocks.features.items.business.title': 'Mide tu negocio',
  'home.blocks.features.items.business.text': 'Mide tu Éxito Fácilmente',
  'home.blocks.features.items.connect.title': 'Gestiona tu negocio desde tu teléfono',
  'home.blocks.features.items.connect.text': 'Mantente Conectado y Procesa Ventas',
  'home.blocks.tryNow.headline.line1': '¿Listo para transformar la gestión de tu propiedad?',
  'home.blocks.tryNow.headline.line2': 'experiencia?',
  'home.blocks.tryNow.button': common['common.business.tryNow'],
  'home.footer.links.aboutUs': 'Sobre Nosotros',
  'home.footer.links.pricing': 'Precios',
  'home.footer.links.careers': 'Carreras',
  'home.footer.links.blog': 'Blog',
  'home.footer.links.contactUs': 'Contáctanos',
  'login.invalidLogin': 'Inicio de sesión inválido',
  'login.headline': 'Inicia sesión en tu cuenta',
  'login.input.email.placeholder': 'Por favor, introduce tu correo electrónico',
  'login.input.password.placeholder': 'Por favor, introduce tu contraseña',
  'login.forgotPassword': '¿Olvidaste tu contraseña?',
  'login.or': 'O',
  'login.newHere': '¿Eres nuevo aquí?',
  'login.createAccount': 'Crear Cuenta'
} as const

export default translations
