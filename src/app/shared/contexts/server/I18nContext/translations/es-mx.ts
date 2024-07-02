const common = {
  'common.business.email': 'Email',
  'common.business.name': 'Negocio',
  'common.business.phone': 'Teléfono',
  'common.business.tryNow': 'Pruébalo Ahora',
  'common.business.website': 'Sitio Web',
  'common.business.address': 'Dirección',
  'common.business.zipCode': 'Código Postal',
  'common.property.name': 'Nombre de la Propiedad',
  'common.general.country': 'País',
  'common.general.state': 'Estado',
  'common.general.city': 'Ciudad',
  'common.general.login': 'Iniciar Sesión',
  'common.general.logout': 'Cerrar Sesión',
  'common.general.cabin': 'Cabaña',
  'common.general.hotel': 'Hotel',
  'common.general.back': 'Atrás',
  'common.general.next': 'Siguiente',
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
  'home.header.links.dashboard': 'Panel de Control',
  'home.header.links.logout': common['common.general.logout'],
  'home.hero.information.headline': 'Aumenta los ingresos de tu negocio en +30% en solo 6 meses',
  'home.hero.information.text':
    'Eleva tus reservas en +30% en solo seis meses. Nuestra plataforma inteligente optimiza tu flujo de trabajo, reduciendo los gastos operativos y liberando hasta el 80% de tu tiempo, permitiéndote enfocarte en otras áreas de tu negocio. Transforma tu experiencia de reserva y aprovecha las herramientas de última generación para una expansión sin esfuerzo con hosgu.com.',
  'home.hero.form.input.fullName': common['common.user.fullName'],
  'home.hero.form.input.businessName': common['common.business.name'],
  'home.hero.form.input.businessEmail': common['common.business.email'],
  'home.hero.form.input.businessPhone': common['common.business.phone'],
  'home.hero.form.input.businessWebsite': common['common.business.website'],
  'home.hero.form.input.country': common['common.general.country'],
  'home.hero.form.button.getStarted': 'Comenzar',
  'home.hero.form.privacyPolicy.text':
    'Nos comprometemos con tu privacidad. hosgu.com utiliza la información que nos proporcionas para contactarte sobre nuestro contenido, productos y servicios relevantes. Puedes darte de baja en cualquier momento.',
  'home.hero.success.justOneMoreStep': '¡Solo un paso más para comenzar!',
  'home.hero.success.thankYouForRegistering':
    '¡Gracias por registrarte! Por favor revisa tu correo electrónico para completar la configuración de tu perfil y activar tu cuenta.',
  'home.blocks.features.headline.line1': 'Gestiona tus reservas',
  'home.blocks.features.headline.line2': 'de principio a fin',
  'home.blocks.features.items.booking.title': 'Gestiona tus reservas',
  'home.blocks.features.items.booking.text': 'Simplifica las Reservas para Todos',
  'home.blocks.features.items.pricing.title': 'Precios Flexibles',
  'home.blocks.features.items.pricing.text':
    'Elige entre nuestro nivel gratuito o características mejoradas que se adapten a las necesidades de tu negocio.',
  'home.blocks.features.items.business.title': 'Mide tu negocio',
  'home.blocks.features.items.business.text': 'Mide Tu Éxito Fácilmente',
  'home.blocks.features.items.connect.title': 'Gestiona tu negocio desde tu teléfono',
  'home.blocks.features.items.connect.text': 'Mantente Conectado y Procesa Ventas',
  'home.blocks.tryNow.headline.line1':
    '¿Listo para transformar tu experiencia de gestión de propiedades?',
  'home.blocks.tryNow.headline.line2': '',
  'home.blocks.tryNow.button': common['common.business.tryNow'],
  'home.footer.links.aboutUs': 'Sobre Nosotros',
  'home.footer.links.pricing': 'Precios',
  'home.footer.links.careers': 'Carreras',
  'home.footer.links.blog': 'Blog',
  'home.footer.links.contactUs': 'Contáctanos',
  'login.invalidLogin': 'Inicio de sesión no válido',
  'login.headline': 'Inicia sesión en tu cuenta',
  'login.input.email.placeholder': 'Por favor, introduce tu correo electrónico',
  'login.input.password.placeholder': 'Por favor, introduce tu contraseña',
  'login.forgotPassword': '¿Olvidaste tu contraseña?',
  'login.or': 'O',
  'login.newHere': '¿Eres nuevo aquí?',
  'login.createAccount': 'Crear Cuenta',
  'profile.setup.error.pleaseEnterYourPropertyName':
    'Por favor, introduce el nombre de tu propiedad.',
  'profile.setup.error.pleaseEnterAValidPropertyName':
    'Por favor, introduce un nombre de propiedad válido.',
  'profile.setup.error.pleaseEnterYourPropertyAddress':
    'Por favor, introduce la dirección de tu propiedad.',
  'profile.setup.error.pleaseEnterAValidPropertyAddress':
    'Por favor, introduce una dirección de propiedad válida.',
  'profile.setup.error.pleaseEnterYourPropertyCity':
    'Por favor, introduce la ciudad de tu propiedad.',
  'profile.setup.error.pleaseEnterAValidPropertyCity':
    'Por favor, introduce una ciudad de propiedad válida.',
  'profile.setup.error.pleaseEnterYourPropertyState':
    'Por favor, introduce el estado de tu propiedad.',
  'profile.setup.error.pleaseEnterAValidPropertyState':
    'Por favor, introduce un estado de propiedad válido.',
  'profile.setup.error.pleaseEnterYourPropertyPostalCode':
    'Por favor, introduce el código postal de tu propiedad.',
  'profile.setup.error.pleaseEnterAValidPropertyPostalCode':
    'Por favor, introduce un código postal de propiedad válido.',
  'profile.setup.error.pleaseEnterYourPropertyCountry':
    'Por favor, introduce el país de tu propiedad.',
  'profile.setup.error.pleaseEnterYourNightPrice': 'Por favor, introduce tu precio por noche.',
  'profile.setup.error.pleaseEnterYourGoogleMaps': 'Por favor, introduce tu enlace de Google Maps.',
  'profile.setup.error.pleaseEnterAValidGoogleMaps': 'Introduce un enlace de Google Maps válido.',
  'profile.setup.validation.passwordDigit': 'La contraseña debe contener al menos un dígito.',
  'profile.setup.validation.passwordLength': 'La contraseña debe tener al menos 8 caracteres.',
  'profile.setup.validation.passwordLowercase':
    'La contraseña debe contener al menos una letra minúscula.',
  'profile.setup.validation.passwordSpecial':
    'La contraseña debe contener al menos un carácter especial.',
  'profile.setup.validation.passwordUppercase':
    'La contraseña debe contener al menos una letra mayúscula.',
  'profile.setup.step.step': 'Paso',
  'profile.setup.step.of': 'de',
  'profile.setup.step1.headline': '¡Empecemos!',
  'profile.setup.step1.propertyDetails': 'Detalles de la Propiedad',
  'profile.setup.step1.streetAddress': 'Dirección',
  'profile.setup.step1.placeholder': 'Apto, suite, edificio, piso, etc.',
  'profile.setup.step2.entirePlace': 'Lugar Entero',
  'profile.setup.step2.hotel': 'Hotel',
  'profile.setup.step2.hotelPlaceholder': 'Hotel, Motel o Hostel.',
  'profile.setup.step2.cabin': 'Cabaña, Casa o Apartamento.',
  'profile.setup.step3.guests': 'Invitados',
  'profile.setup.step3.bathrooms': 'Baños',
  'profile.setup.step3.bedrooms': 'Dormitorios',
  'profile.setup.step3.beds': 'Camas',
  'profile.setup.step2.headline': '¿Qué tipo de propiedad estás listando?',
  'profile.setup.step3.headline': 'Información sobre tu',
  'profile.setup.step4.headline': '¡Diles a los huéspedes cuáles son los servicios!',
  'profile.setup.step5.headline': 'Establece tu precio por noche y tiempos',
  'profile.setup.step6.headline': 'Agrega algunas fotos de tu lugar',
  'profile.setup.step7.headline': '¡Casi allí, verifica la información primero!',
  'profile.setup.step8.headline': '¡Felicidades, su propiedad ya está listada!',
  'profile.setup.step4.kitchen': 'Cocina',
  'profile.setup.step4.extraBed': 'Cama extra',
  'profile.setup.step4.refrigerator': 'Refrigerador',
  'profile.setup.step4.bedSheets': 'Sábanas',
  'profile.setup.step4.freeParking': 'Estacionamiento',
  'profile.setup.step4.towels': 'Toallas',
  'profile.setup.step4.pool': 'Piscina',
  'profile.setup.step4.coffeeMachine': 'Cafetera',
  'profile.setup.step4.hotWater': 'Agua caliente',
  'profile.setup.step4.oven': 'Horno',
  'profile.setup.step4.ac': 'Aire Acondicionado',
  'profile.setup.step4.garden': 'Jardín',
  'profile.setup.step4.laundry': 'Lavandería',
  'profile.setup.step4.smokingArea': 'Área para fumar',
  'profile.setup.step5.currency': 'Moneda',
  'profile.setup.step6.dragYourPhoto': 'Arrastre su foto aquí',
  'profile.setup.step6.uploadPhotos': 'Subir fotos',
  'profile.setup.step6.addMorePhotos': 'Agregar más fotos',
  'profile.setup.step6.uploadFromDevice': 'Subir desde tu dispositivo',
  'profile.setup.step7.price': 'Precio',
  'profile.setup.step7.location': 'Ubicación',
  'profile.setup.step7.information': 'Información',
  'profile.setup.step7.perNight': 'por noche',
  'profile.setup.step7.guests': 'Invitados',
  'profile.setup.step7.bedrooms': 'Dormitorios',
  'profile.setup.step7.bathrooms': 'Baños',
  'profile.setup.step7.beds': 'Camas',
  'profile.setup.step7.amenities': 'Servicios',
  'profile.setup.step8.successNote': 'Su negocio ha sido registrado exitosamente.',
  'profile.setup.step8.acessThe': 'Acceda al',
  'profile.setup.step8.startUsingPlatform': 'para comenzar a utilizar la plataforma.'
} as const

export default translations
