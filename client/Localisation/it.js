define([], function() {
	'use strict';
	var _it = {
		CONTACT_ADMIN:	"Si prega di contattare un amministratore."
	};
	return {
		LOGIN: {
			LOGIN:			"Accedi",
			TITLE:			"Accedi al suo account",
			MESSAGE:		"Non puoi accedere a questa pagina",
			ERRORS: {
				"403": {
					TITLE:		"Accesso Fallito",
					CONTENT:	"Nome utente e password non corrispondono.  "
				}
			}
		},
		SIGNUP: {
			SIGNUP:						"Iscriviti",
			TITLE:						"Crea un account",
			NOT_A_USER:					"Non sei un utente?",
			ALREADY_USER:				"Sei già un utente?",
			CONFIRM_EMAIL:				"Conferma email",
			CONFIRM_EMAIL_NO_MATCH:		"I tuoi indirizzi d'email non corrispondono.",
			CONFIRM_PASSWORD:			"Conferma password",
			CONFIRM_PASSWORD_NO_MATCH:	"Le tue password non corrispondono.",
			USERNAME_INVALID:			"I nomi utente possono contenere solo lettere, numeri, _, o -.",
			EMAIL_INVALID:				"Quello non è un indirizzo d'email valido.",
			ERRORS:{
				"409": {
					TITLE:		"Utente Già Esiste",
					CONTENT:	"Nome utente o indirizzo email è già usato."
				}
			},
			PASSWORD:	{
				SHORT:	"Troppo corto",
				LOWER:	"Tutti sono minuscoli",
				UPPER:	"Tutti sono maiuscoli"
			}
		},
		USER: {
			INFO: {
				USER:						"Utente",
				EMAIL_CHANGE:				"Cambia",
				EMAIL_DELETE:				"Elimina",
				CHANGE_PASSWORD:			"Cambia Password",
				DELETE:						"Elimina Account",
				BEGIN_EDIT:					"Comincia a modificare",
				STOP_EDIT:					"Finisci di modificare",
				FULL_NAME:					"Nome e Cognome",
				NO_FULL_NAME:				"Il nome non fornito. ",
				CHANGE_NAME:				"Cambia nome",
				ADDRESSES:					"Indirizzi di contatto",
				SAVING:						"Salvataggio in corso..."
			},
			CHANGE_PASSWORD:	{
				TITLE: {
					MAIN:		"Cambia Password",
					CREATING:	"Cambiamento Password in corso..."
				},
				ERRORS:	{
					"409": {
						TITLE:		"Cambiamento Password Falito",
						CONTENT:	"La password inserita non è corretta.  "
					}
				},
				OLD_PASSWORD:	"Password Corrente",
				NEW_PASSWORD:	"Password Nuova",
				CONFIRM:		"Conferma Password"
			},
			REDIR:	"Sarai rediretto alla pagina del tuo utente quando accedi.  "
		},
		GENERAL: {
			USERNAME_EMAIL:	"Nome utente o email",
			USERNAME:		"Nome utente",
			ACCOUNTS:		"Account",
			EMAIL:			"Email",
			PASSWORD:		"Password",
			CAPTCHA:		"CAPTCHA",
			SEARCH:			"Cerca",
			FORM: {
				ERROR: {
					REQUIRED_FIELD:	"Questo campo è obbligatorio."
				},
				RESPONSE: {
					OK:			"OK",
					CANCEL:		"Cancella",
					CHANGE:		"Cambia",
					CREATE:		"Crea",
					ADD:		"Aggiungi"
				}
			},
			ERRORS:	{
				"500": {
					TITLE:		"Qualcosa È Sbagliato",
					CONTENT:	"C'è un errore del server.  " + _it.CONTACT_ADMIN
				},
				DEFAULT: {
					TITLE:		"Errore Sconosciuto",
					CONTENT:	"Una risposta inattesa è stata ricevuta dal server. " + _it.CONTACT_ADMIN
				},
				CONTACT_ADMIN:	_it.CONTACT_ADMIN
			},
			SIGNOUT:		"Esci"
		},
		FILE: {
			MOVE:		"Sposta",
			DELETE:		"Elimina",
			DOWNLOAD:	"Scarica",
			NEW:		"Nuova file",
			NEW_FOLDER:	"Nuova Cartela",
			EMPTY_FOLDER: "Questa cartella è vuoto",
			CLIPBOARD: {
				EMPTY: "Non ci sono appunti"
			}
		}
	};
});
