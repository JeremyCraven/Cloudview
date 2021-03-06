define([], function() {
	'use strict';
	var _en = {
		CONTACT_ADMIN:	"Please contact an administrator.",
		LOGIN_WITH: "Login"
	};
	return {
		LOGIN: {
			LOGIN:			"Login",
			TITLE:			"Log into your account",
			MESSAGE:		"You are not logged in.",
			ERRORS: {
				"403": {
					TITLE:		"Login Failed",
					CONTENT:	"Username or password do not match."
				}
			}
		},
		SIGNUP: {
			SIGNUP:						"Sign Up",
			TITLE:						"Create an account",
			NOT_A_USER:					"Not a user yet?",
			ALREADY_USER:				"Aready a user?",
			CONFIRM_EMAIL:				"Confirm Email",
			CONFIRM_EMAIL_NO_MATCH:		"Your email addresses do not match.",
			CONFIRM_PASSWORD:			"Confirm password",
			CONFIRM_PASSWORD_NO_MATCH:	"Your passwords do not match",
			USERNAME_INVALID:			"Usernames may only contain letters, number, _, or -.",
			EMAIL_INVALID:				"That is not a valid email address.",
			ERRORS:{
				"409": {
					TITLE:		"User Already Exists",
					CONTENT:	"Username or Email already in use."
				}
			},
			PASSWORD:	{
				SHORT: "This password is too short",
				LOWER: "Passwords must contain uppercase letters",
				UPPER:	"Passwrods must contain lowercase letters"
			}
		},
		USER: {
			INFO: {
				ACCOUNT: 					"Account",
				USER:						"User",
				EMAIL_CHANGE:				"Change",
				EMAIL_DELETE:				"Delete",
				CHANGE_PASSWORD:			"Change Password",
				DELETE:						"Delete Account",
				BEGIN_EDIT:					"Begin Editing",
				STOP_EDIT:					"Stop Editing",
				FULL_NAME:					"Full Name",
				NO_FULL_NAME:				"No name set. ",
				CHANGE_NAME:				"Change Name",
				ADDRESSES:					"Contact Addresses",
				SAVING:						"Saving..."
			},
			CHANGE_PASSWORD:	{
				TITLE: {
					MAIN:		"Change Password",
					CREATING:	"Changing Password..."
				},
				ERRORS:	{
					"409": {
						TITLE:		"Password Change Failed",
						CONTENT:	"You did not enter your current password correctly"
					}
				},
				OLD_PASSWORD:	"Current Password",
				NEW_PASSWORD:	"New Password",
				CONFIRM:		"Confirm Password"
			},
			REDIR:	"You will be redirected back to your user once you log in. ",
			ACCOUNT: {
				NEW:	"Add Account",
				GOOGLE: _en.LOGIN_WITH + "Google",
				DROPBOX: _en.LOGIN_WITH + "Dropbox",
				ONEDRIVE: _en.LOGIN_WITH + "OneDrive"
			},
			NEW: {
				FILE:	"New File",
				FOLDER: "New Folder"
			},
			FILE: {
				NEW: "New File",

			},
			FOLDER: {
				NEW: "New Folder"
			}
		},
		GENERAL: {
			USERNAME_EMAIL:	"Username or Email",
			USERNAME:		"Username",
			ACCOUNTS:		"Accounts",
			EMAIL:			"Email",
			PASSWORD:		"Password",
			CAPTCHA:		"CAPTCHA",
			SEARCH:			"Search",
			FILE_NAME:		"File name",
			FORM: {
				ERROR: {
					REQUIRED_FIELD:	"This field is required."
				},
				RESPONSE: {
					OK:			"OK",
					CANCEL:		"Cancel",
					CHANGE:		"Change",
					CREATE:		"Create",
					ADD:		"Add"
				}
			},
			ERRORS:	{
				"500": {
					TITLE:		"Something Went Wrong",
					CONTENT:	"The server has encountered an error.  " + _en.CONTACT_ADMIN
				},
				DEFAULT: {
					TITLE:		"Unknown Error",
					CONTENT:	"An unexpected response was received from the server. " + _en.CONTACT_ADMIN
				},
				CONTACT_ADMIN:	_en.CONTACT_ADMIN
			},
			SIGNOUT:		"Sign out"
		},
		FILE: {
			MOVE:		"Move",
			COPY:       "Copy", 
			DELETE:		"Delete",
			DOWNLOAD:	"Download",
			NEW:		"New File",
			NEW_FOLDER:	"New Folder",
			EMPTY_FOLDER: "This folder is empty",
			CLIPBOARD: {
				EMPTY: "Your clipboard is empty"
			}
		}
	};
});
