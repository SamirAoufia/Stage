/* tableau des routes publiques
* les routes publiques sont les routes qui ne nécessitent pas d'authentification
* elles sont accessibles par tout le monde
*@type {string[]}
*/

export const publicRoutes = [

  "/",
  "/information",
]

/* les routes privées sont les routes qui nécessitent une authentification
* elles sont accessibles uniquement par les utilisateurs connectés
*@type {string[]}
*/

export const authRoutes = [
  "/auth/login",
  "/auth/register",
]

/* les routes api sont les routes qui sont utilisées pour les appels api
* @type {string}
*/
export const apiAuthPrefix = "/api/auth"

/* Apres la connexion rediriger l'utilisateur vers cette page
*@type {string}
*/

export const DEFAULT_LOGIN_REDIRECT = "/settings"

