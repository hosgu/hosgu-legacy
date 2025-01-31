const common = {
  'common.business.address': 'Address',
  'common.business.email': 'Business Email',
  'common.business.name': 'Business Name',
  'common.business.phone': 'Business Phone',
  'common.business.tryNow': 'Try it Now',
  'common.business.website': 'Business Website',
  'common.business.zipCode': 'Zip Code',
  'common.general.back': 'Back',
  'common.general.cabin': 'Cabin',
  'common.general.city': 'City',
  'common.general.country': 'Country',
  'common.general.hotel': 'Hotel',
  'common.general.login': 'Login',
  'common.general.logout': 'Logout',
  'common.general.next': 'Next',
  'common.general.finish': 'Finish',
  'common.general.state': 'State',
  'common.input.invalidEmail': 'Invalid email',
  'common.input.invalidPhone': 'Invalid phone (e.g. +1 123 456 7890)',
  'common.input.invalidUrl': 'Invalid url (e.g. https://example.com)',
  'common.input.password': 'Password',
  'common.input.required': 'Required',
  'common.profile.setup.bathrooms': 'Bathrooms',
  'common.profile.setup.bedrooms': 'Bedrooms',
  'common.profile.setup.beds': 'Beds',
  'common.profile.setup.guests': 'Guests',
  'common.property.name': 'Property Name',
  'common.user.email': 'Email',
  'common.user.fullName': 'Full Name',
  'common.user.guestUser': 'Guest User'
} as const

const translations = {
  ...common,
  'home.header.button.login': common['common.general.login'],
  'home.header.button.tryNow': common['common.business.tryNow'],
  'home.header.links.profile': 'Profile',
  'home.header.links.dashboard': 'Dashboard',
  'home.header.links.logout': common['common.general.logout'],
  'home.hero.information.headline': 'Boost Your Business Revenue by +30% in just 6 months',
  'home.hero.information.text':
    'Elevate your bookings by +30% in just six months. Our intelligent platform streamlines your workflow, slashing operational expenses and freeing up to 80% of your time—empowering you to focus on other areas of your business. Transform your booking experience and leverage cutting-edge tools for effortless expansion with hosgu.com.',
  'home.hero.form.input.fullName': common['common.user.fullName'],
  'home.hero.form.input.businessName': common['common.business.name'],
  'home.hero.form.input.businessEmail': common['common.business.email'],
  'home.hero.form.input.businessPhone': common['common.business.phone'],
  'home.hero.form.input.businessWebsite': common['common.business.website'],
  'home.hero.form.input.country': common['common.general.country'],
  'home.hero.form.button.getStarted': 'Get Started',
  'home.hero.form.privacyPolicy.text':
    'We are committed to your privacy. hosgu.com uses the information you provide to us to contact you about our relevant content, products, and services. You may unsubscribe at any time.',
  'home.hero.success.justOneMoreStep': 'Just One More Step to Get Started!',
  'home.hero.success.thankYouForRegistering':
    'Thank you for registering! Please check your email to complete your profile setup and activate your account.',
  'home.blocks.features.headline.line1': 'Manage your bookings',
  'home.blocks.features.headline.line2': 'from start to end',
  'home.blocks.features.items.booking.title': 'Manage your bookings',
  'home.blocks.features.items.booking.text': 'Simplify Booking for Everyone',
  'home.blocks.features.items.pricing.title': 'Flexible Pricing',
  'home.blocks.features.items.pricing.text':
    'Choose from our free tier or enhanced features to fit your business needs.',
  'home.blocks.features.items.business.title': 'Measure your business',
  'home.blocks.features.items.business.text': 'Easily Measure Your Success',
  'home.blocks.features.items.connect.title': 'Run your business from your phone',
  'home.blocks.features.items.connect.text': 'Stay Connected and Process Sales',
  'home.blocks.tryNow.headline.line1': 'Ready to transform your property management',
  'home.blocks.tryNow.headline.line2': 'experience?',
  'home.blocks.tryNow.button': common['common.business.tryNow'],
  'home.footer.links.aboutUs': 'About Us',
  'home.footer.links.pricing': 'Pricing',
  'home.footer.links.careers': 'Careers',
  'home.footer.links.blog': 'Blog',
  'home.footer.links.contactUs': 'Contact Us',
  'login.invalidLogin': 'Invalid login',
  'login.headline': 'Login to your account',
  'login.input.email.placeholder': 'Please enter your email',
  'login.input.password.placeholder': 'Please enter your password',
  'login.forgotPassword': 'Forgot your password?',
  'login.or': 'Or',
  'login.newHere': 'You’re new here?',
  'login.createAccount': 'Create Account',
  'profile.setup.error.pleaseEnterYourPropertyName': 'Please enter your property name.',
  'profile.setup.error.pleaseEnterAValidPropertyName': 'Please enter a valid property name.',
  'profile.setup.error.pleaseEnterYourPropertyAddress': 'Please enter your property address.',
  'profile.setup.error.pleaseEnterAValidPropertyAddress': 'Please enter a valid property address.',
  'profile.setup.error.pleaseEnterYourPropertyCity': 'Please enter your property city.',
  'profile.setup.error.pleaseEnterAValidPropertyCity': 'Please enter a valid property city.',
  'profile.setup.error.pleaseEnterYourPropertyState': 'Please enter your property state.',
  'profile.setup.error.pleaseEnterAValidPropertyState': 'Please enter a valid property state.',
  'profile.setup.error.pleaseEnterYourPropertyPostalCode':
    'Please enter your property postal code.',
  'profile.setup.error.pleaseEnterAValidPropertyPostalCode':
    'Please enter a valid property postal code.',
  'profile.setup.error.pleaseEnterYourPropertyCountry': 'Please enter your property country.',
  'profile.setup.error.pleaseEnterYourNightPrice': 'Please enter your night price.',
  'profile.setup.error.pleaseEnterYourGoogleMaps': 'Please enter your Google Maps URL.',
  'profile.setup.error.pleaseEnterAValidGoogleMaps': 'Please enter a valid Google Maps URL.',
  'profile.setup.validation.passwordDigit': 'Password must contain at least one digit.',
  'profile.setup.validation.passwordLength': 'Password must be at least 8 characters long.',
  'profile.setup.validation.passwordLowercase':
    'Password must contain at least one lowercase letter.',
  'profile.setup.validation.passwordSpecial':
    'Password must contain at least one special character.',
  'profile.setup.validation.passwordUppercase':
    'Password must contain at least one uppercase letter.',
  'profile.setup.step.step': 'Step',
  'profile.setup.step.of': 'of',
  'profile.setup.step1.headline': "Let's start!",
  'profile.setup.step2.headline': 'What property type are you listing?',
  'profile.setup.step3.headline': 'Information about your',
  'profile.setup.step4.headline': 'Tell guests what are the amenities!',
  'profile.setup.step5.headline': 'Set your night price and times!',
  'profile.setup.step8.headline': 'Congratulations! Your property is now listed!',
  'profile.setup.step8.subheadline': 'Your business has been properly registered.',
  'profile.setup.step8.subheadline2': 'Proceed to the ',
  'profile.setup.step8.subheadline2cont': 'to start using the platform',
  'profile.setup.step1.propertyDetails': 'Property Details',
  'profile.setup.step1.streetAddress': 'Street Address',
  'profile.setup.step1.placeholder': 'Apt, suite, building, floor, etc.',
  'profile.setup.step2.entirePlace': 'Entire Place',
  'profile.setup.step2.cabin': 'Cabin, House or Apartment.',
  'profile.setup.step2.hotel': 'Hotel',
  'profile.setup.step2.hotelPlaceholder': 'Hotel, Motel or Hostel.',
  'profile.setup.step3.guests': 'Guests',
  'profile.setup.step3.beds': 'Beds',
  'profile.setup.step4.kitchen': 'Kitchen',
  'profile.setup.step4.extraBed': 'Extra bed',
  'profile.setup.step4.refrigerator': 'Refrigerator',
  'profile.setup.step4.bedSheets': 'Bed sheets',
  'profile.setup.step4.freeParking': 'Free Parking',
  'profile.setup.step4.towels': 'Towels',
  'profile.setup.step4.pool': 'Pool',
  'profile.setup.step4.coffeeMachine': 'Coffee machine',
  'profile.setup.step4.hotWater': 'Hot water',
  'profile.setup.step4.oven': 'Oven',
  'profile.setup.step4.ac': 'AC',
  'profile.setup.step4.garden': 'Garden',
  'profile.setup.step4.laundry': 'Laundry',
  'profile.setup.step4.smokingArea': 'Smoking Area',
  'profile.setup.step5.currency': 'Currency',
  'profile.setup.step6.uploadPhotos': 'Upload your Photos',
  'profile.setup.step6.dragYourPhoto': 'Drag your photo here',
  'profile.setup.step6.addMorePhotos': 'Add more photos',
  'profile.setup.step6.uploadFromDevice': 'Upload from your device',
  'profile.setup.step6.headline': 'Add some photos of your place',
  'profile.setup.step7.headline': 'Almost there, please validate the information first!',
  'profile.setup.step7.price': 'Price:',
  'profile.setup.step7.pernight': 'per night',
  'profile.setup.step7.location': 'Location:',
  'profile.setup.step7.amenities': 'Amenities:',
  'profile.setup.step7.information': 'Information',
  'profile.setup.step7.floors': 'Floors',
  'profile.setup.step7.rooms': 'Rooms',
  'profile.setup.hotelsetup.roomsetup': 'Hotel Room Setup',
  'profile.setup.hotelsetup.roomcount': 'Room Count',
  'profile.setup.hotelsetup.roomtype': 'Room Type',
  'profile.setup.hotelsetup.addroomtype': 'Add Room Type',
  'profile.setup.hotelsetup.addfloor': 'Add Floor',
  'profile.setup.hotelsetup.dontskip13': 'Do not skip floor 13',
  'profile.setup.hotelsetup.generatedrooms': 'Generated Rooms',
  'profile.setup.hotelsetup.room': 'Room'
} as const

// const translations2 = {
//   aboutUs: 'About Us',
//   accountCreated: 'Account created',
//   accountNotActivated: 'Account not activated',
//   allRightsReserved: 'All rights reserved.',
//   back: 'Back',
//   basic: 'Basic',
//   boostYourBusiness: 'Boost Your Business Revenue by +30% in just 6 months',
//   businessEmail: 'Business Email',
//   businessName: 'Business Name',
//   businessPhone: 'Business Phone',
//   businessPhonePlaceholder: '+1 123 456 7890',
//   businessWebsite: 'Business Website',
//   cabin: 'Cabin',
//   cabinName: 'Cabin Name',
//   changeToDarkMode: 'Change to dark mode',
//   changeToLightMode: 'Change to light mode',
//   chooseFromOurFreeTier:
//     'Choose from our free tier or enhanced features to fit your business needs.',
//   city: 'City',
//   connect: 'Connect',
//   contactUs: 'Contact Us',
//   continue: 'Continue',
//   country: 'Country',
//   createNewAccount: 'Create new account',
//   creatingAccount: 'Creating account...',
//   elevateYourBookings:
//     'Elevate your bookings by +30% in just six months. Our intelligent platform streamlines your workflow, slashing operational expenses and freeing up to 80% of your time—empowering you to focus on other areas of your business. Transform your booking experience and leverage cutting-edge tools for effortless expansion with hosgu.com.',
//   email: 'Email',
//   emailAlreadyExists: 'Email already exists',
//   enterprise: 'Enterprise',
//   features: 'Features',
//   flexiblePricing: 'Flexible Pricing',
//   forgot: 'Forgot your password?',
//   free: 'Free',
//   fromReservationsToHousekeeping: 'From reservations to housekeeping, every tool in one platform.',
//   fullName: 'Full Name',
//   getStarted: 'Get Started',
//   holisticManagement: 'Holistic Management',
//   home: 'Home',
//   hospitality: 'Hospitality',
//   hotel: 'Hotel',
//   hotelName: 'Hotel Name',
//   ifYouDoNotReceiveTheEmail: 'If you do not receive the email, please check your spam folder.',
//   increasedVisibility: 'Increased Visibility',
//   informationAboutYour: 'Information about your',
//   invalidEmail: 'Invalid email',
//   invalidLogin: 'Invalid login',
//   invalidPhone: 'Invalid phone (e.g. +1 123 456 7890)',
//   invalidUrl: 'Invalid url (e.g. https://example.com)',
//   justOneMoreStep: 'Just One More Step to Get Started!',
//   letsStart: "",
//   login: 'Login',
//   logout: 'Logout',
//   manageGuests: 'Manage guests, reservations, cancellations efficiently.',
//   missingFields: 'Missing fields',
//   missionText:
//     'We are committed to empowering small and medium-sized hospitality businesses with innovative, efficient, and user-friendly property management software. Our mission is to streamline operations, enhance guest experiences, and foster business growth through our comprehensive digital solutions.',
//   monthly: 'Monthly',
//   off: 'off',
//   ourMission: 'Our Mission',
//   ourTrustedClients: 'Our Trusted Clients',
//   ourVision: 'Our Vision',
//   password: 'Password',
//   phoneNumber: 'Phone Number',
//   pleaseEnterAValidFullName: 'Please enter a valid full name.',
//   pleaseEnterAValidPhoneNumber: 'Please enter a valid phone number.',
//   pleaseEnterAValidPropertyAddress: 'Please enter a valid property address.',
//   pleaseEnterAValidPropertyCity: 'Please enter a valid property city.',
//   pleaseEnterAValidPropertyCountry: 'Please enter a valid property country.',
//
//   pleaseEnterAValidPropertyPostalCode: 'Please enter a valid property postal code.',
//   pleaseEnterAValidPropertyState: 'Please enter a valid property state.',
//   pleaseEnterYourBusinessName: 'Please enter your business name.',
//   pleaseEnterYourFullName: 'Please enter your full name.',
//   pleaseEnterYourPhoneNumber: 'Please enter your phone number',
//   pleaseEnterYourPropertyAddress: 'Please enter your property address.',
//   pleaseEnterYourPropertyCity: 'Please enter your property city.',
//   pleaseEnterYourPropertyCountry: 'Please enter your property country.',
//   pleaseEnterYourPropertyName: 'Please enter your property name.',
//   pleaseEnterYourPropertyPostalCode: 'Please enter your property postal code.',
//   pleaseEnterYourPropertyState: 'Please enter your property state.',
//   pleaseFollowTheInstructions: 'Please follow the instructions to activate your account.',
//   postalCode: 'Postal Code',
//   pricing: 'Pricing',
//   propertyAddress1Placeholder: 'Street Address',
//   propertyAddress2Placeholder: 'Apt, Suite, Bldg. (optional)',
//   propertyAddress: 'Property Address',
//   propertyName: 'Property Name',
//   readyToTransformYourExperience: 'Ready to transform your property management experience?',
//   required: 'Required',
//   reservations: 'Reservations',
//   save: 'Save',
//   selectYourCountry: 'Select your country',
//   showcaseYourProperty: 'Showcase your property to a wider audience and increase bookings.',
//   signUp: 'Sign Up',
//   simplify: 'Simplify, Streamline, Succeed with hosgu.com',
//   slogan: 'Smart Booking',
//   state: 'State',
//   streamlinedOperations: 'Streamlined Operations',
//   thankYouForRegistering:
//     'Thank you for registering! Please check your email to complete your profile setup and activate your account.',
//   transforming: 'Transforming',
//   trustedBy: 'Trusted by',
//   tryForFree: 'Try for free',
//   tryNow: 'Try it now',
//   username: 'Username',
//   visionText:
//     'Our vision is to become the leading provider of property management solutions, renowned for transforming the hospitality industry through technology. We aspire to expand globally, continuously innovating and adapting to meet the evolving needs of the hospitality sector, ultimately setting new standards in property management efficiency and customer service excellence.',
//   weAreCommitted:
//     'We are committed to your privacy. hosgu.com uses the information you provide to us to contact you about our relevant content, products, and services. You may unsubscribe at any time.',
//   weHaveSentAConfirmationEmailTo: 'We have sent a confirmation email to:',
//   website: 'Website',
//   welcome: 'Welcome',
//   whatPropertyTypeAreYouListing: 'What property type are you listing?',
//   yearly: 'Yearly',
//   yourDataIsSafeWithUs: 'Your data is safe with us.'
// } as const

export default translations
