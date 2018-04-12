import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string='usuario'): any {

  	let url = URL_SERVICIOS + '/img';

  	if( !img )
  		return url + '/usuarios/xxx';

  	if( img.indexOf('https') >=0 ){
  		return img;
  	}

  	switch (tipo) {
  		case "usuario":
  			img = url + '/usuarios/' + img;
  			break;
		
  		case "medicos":
  			img = url + '/medicos/' + img;
  			break;
  		
  		case "hospitales":
  			img = url + '/hospitales/' + img;
  			break;
  		
    	default:
    		img = url + '/usuarios/xxx';
    		break;
  	}
    console.log(img)
    return img;
  }

}
