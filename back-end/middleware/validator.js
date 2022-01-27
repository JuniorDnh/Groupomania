const { check } = require('express-validator');

exports.signupValidator = [

    check('username')
    .trim()
    .notEmpty()
    .withMessage('First Name Required')
    .matches (/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/)
    .withMessage('Les caractères spéciaux et les espaces ne sont pas autorisés'),

    check('email')
    .isEmail()
    .normalizeEmail()
    .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    .withMessage('Merci de renseigner un email valide. (format: Abc@example.com)'),

    check('password')
    .trim()
    .blacklist('{}$')
    .isStrongPassword()
    .withMessage('👀 Le mot de passe doit contenir au moins 8 caractère et minimum: 1 Minuscule, 1 Majuscule, 1 Chiffre, 1 Symbole')
    

]

exports.loginValidator = [
    check('email')
    .isEmail()
    .normalizeEmail()
    .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    .withMessage('Merci de renseigner un email valide. (format: Abc@example.com)'),

    check('password')
    .trim()
    .blacklist('{}$')
    .isStrongPassword()
    .withMessage('👀 Le mot de passe doit contenir au moins 8 caractère et minimum: 1 Minuscule, 1 Majuscule, 1 Chiffre, 1 Symbole')

]

exports.profileValidator = [

    check('username')
    .trim()
    .notEmpty()
    .withMessage('Username Required')
    .matches(/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/)
    .withMessage('Les caractères spéciaux et les espaces ne sont pas autorisés'),

    check('email')
    .isEmail()
    .normalizeEmail()
    .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    .withMessage('Merci de renseigner un email valide. (format: Abc@example.com)'),

    check('password')
    .trim()
    .blacklist('{}$')
    .isStrongPassword()
    .withMessage('👀 Le mot de passe doit contenir au moins 8 caractère et minimum: 1 Minuscule, 1 Majuscule, 1 Chiffre, 1 Symbole')
]