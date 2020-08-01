import { SECRET_KEY } from "../config/constant";
import jwt from 'jsonwebtoken'; // Dependencia de JWebToken (JWT)


class JWT {

    private secretKey = SECRET_KEY as string;

    // Firma del token
    sign( data: any ): string {
        return jwt.sign( 
                {user: data.user}, // datos del usuario
                this.secretKey, // clave del token
                { expiresIn: 24 * 60 * 60 } // 24 hs de validación
            );
    }    

    // verificar token
    verify( token: string ): string {

        try {

            return jwt.verify( token, this.secretKey ) as string;

        } catch (e) {

            // De haber un error en la verificación
            return 'La autenticación del token es inválida. Por favor, inicia sesión para obtener un nuevo token'

        }

    }

}


export default JWT;